// Currency service for fetching USD to VES exchange rate from BCV and Venezuelan sources
export interface ExchangeRateResponse {
  rate: number;
  lastUpdated: string;
  source: string;
}

// Cache for exchange rate to avoid excessive API calls
let cachedRate: ExchangeRateResponse | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours in milliseconds (BCV updates multiple times per day)

/**
 * Extracts the USD to VES exchange rate from BCV HTML
 * Uses multiple selectors to find the rate in different possible formats
 */
function extractRateFromBCVHTML(html: string): number | null {
  try {
    // Common patterns for BCV rate extraction
    const patterns = [
      // Pattern 1: Look for dollar rate in various formats
      /dolar[^>]*>.*?(\d+[.,]\d+)/gi,
      /usd[^>]*>.*?(\d+[.,]\d+)/gi,
      /dólar[^>]*>.*?(\d+[.,]\d+)/gi,
      
      // Pattern 2: Look for specific BCV selectors
      /#dolar[^>]*>.*?(\d+[.,]\d+)/gi,
      /\.dolar[^>]*>.*?(\d+[.,]\d+)/gi,
      /dolar.*?value[^>]*>.*?(\d+[.,]\d+)/gi,
      
      // Pattern 3: Look for rate in table format
      /<td[^>]*>.*?dolar.*?<\/td>.*?<td[^>]*>.*?(\d+[.,]\d+)/gi,
      /<td[^>]*>.*?usd.*?<\/td>.*?<td[^>]*>.*?(\d+[.,]\d+)/gi,
      
      // Pattern 4: Look for JSON data in script tags
      /"dolar"[^}]*"venta"[^}]*?(\d+[.,]\d+)/gi,
      /"usd"[^}]*"venta"[^}]*?(\d+[.,]\d+)/gi,
      
      // Pattern 5: Look for rate in data attributes
      /data-rate[^>]*>.*?(\d+[.,]\d+)/gi,
      /data-value[^>]*>.*?(\d+[.,]\d+)/gi,
    ];

    for (const pattern of patterns) {
      const matches = html.match(pattern);
      if (matches) {
        for (const match of matches) {
          // Extract the number from the match
          const numberMatch = match.match(/(\d+[.,]\d+)/);
          if (numberMatch) {
            const rate = parseFloat(numberMatch[1].replace(',', '.'));
            if (rate && rate > 0 && rate < 1000) { // Reasonable range for VES rate
              return rate;
            }
          }
        }
      }
    }

    // Fallback: Look for any number that could be a rate
    const fallbackPattern = /(\d+[.,]\d{2,4})/g;
    const fallbackMatches = html.match(fallbackPattern);
    
    if (fallbackMatches) {
      for (const match of fallbackMatches) {
        const rate = parseFloat(match.replace(',', '.'));
        // Look for rates in a reasonable range for VES (typically 20-50)
        if (rate && rate >= 20 && rate <= 100) {
          return rate;
        }
      }
    }

    return null;
  } catch (error) {
    console.warn('Error extracting rate from BCV HTML:', error);
    return null;
  }
}

/**
 * Fetches the current USD to VES exchange rate from BCV official website
 * Prioritizes the official BCV website as the primary source
 */
export async function fetchExchangeRate(): Promise<ExchangeRateResponse> {
  // Check if we have a valid cached rate
  const now = Date.now();
  if (cachedRate && (now - lastFetchTime) < CACHE_DURATION) {
    return cachedRate;
  }

  try {
    // Try BCV API proxy services that extract from official BCV website
    const bcvProxyResponse = await fetch('https://api.bcv.org.ve/api/v1/tasas', {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (bcvProxyResponse.ok) {
      const data = await bcvProxyResponse.json();
      
      // Look for USD rate in the response
      if (data.usd && data.usd.venta) {
        const rate = parseFloat(data.usd.venta);
        
        if (rate && rate > 0) {
          const result: ExchangeRateResponse = {
            rate: rate,
            lastUpdated: new Date().toISOString(),
            source: 'BCV Oficial (API)'
          };
          
          cachedRate = result;
          lastFetchTime = now;
          return result;
        }
      }
    }
  } catch (error) {
    console.warn('BCV API proxy failed:', error);
  }

  try {
    // Try another BCV proxy service
    const bcvProxy2Response = await fetch('https://bcv.minetsystem.com/api/tasa', {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (bcvProxy2Response.ok) {
      const data = await bcvProxy2Response.json();
      
      if (data.tasa && data.tasa.usd) {
        const rate = parseFloat(data.tasa.usd);
        
        if (rate && rate > 0) {
          const result: ExchangeRateResponse = {
            rate: rate,
            lastUpdated: new Date().toISOString(),
            source: 'BCV Oficial (MinetSystem)'
          };
          
          cachedRate = result;
          lastFetchTime = now;
          return result;
        }
      }
    }
  } catch (error) {
    console.warn('BCV MinetSystem proxy failed:', error);
  }

  try {
    // Try DolarAPI as fallback (Venezuelan exchange rate API)
    const dolarApiResponse = await fetch('https://dolarapi.com/venezuela', {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (dolarApiResponse.ok) {
      const text = await dolarApiResponse.text();
      if (text.trim()) {
        const data = JSON.parse(text);
        
        // Look for BCV rate first, then other reliable sources
        let rate = null;
        let source = 'DolarAPI';
        
        if (data.bcv && data.bcv.venta) {
          rate = parseFloat(data.bcv.venta);
          source = 'BCV (DolarAPI)';
        } else if (data.promedio && data.promedio.venta) {
          rate = parseFloat(data.promedio.venta);
          source = 'Promedio (DolarAPI)';
        } else if (data.paralelo && data.paralelo.venta) {
          rate = parseFloat(data.paralelo.venta);
          source = 'Paralelo (DolarAPI)';
        }
        
        if (rate && rate > 0) {
          const result: ExchangeRateResponse = {
            rate: rate,
            lastUpdated: new Date().toISOString(),
            source: source
          };
          
          cachedRate = result;
          lastFetchTime = now;
          return result;
        }
      }
    }
  } catch (error) {
    console.warn('DolarAPI failed:', error);
  }

  try {
    // Try Fixer.io with VES support
    const fixerResponse = await fetch('https://api.fixer.io/latest?base=USD&symbols=VES', {
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (fixerResponse.ok) {
      const data = await fixerResponse.json();
      
      if (data.rates && data.rates.VES) {
        const rate = parseFloat(data.rates.VES);
        
        if (rate && rate > 0) {
          const result: ExchangeRateResponse = {
            rate: rate,
            lastUpdated: new Date().toISOString(),
            source: 'Fixer.io (VES)'
          };
          
          cachedRate = result;
          lastFetchTime = now;
          return result;
        }
      }
    }
  } catch (error) {
    console.warn('Fixer.io failed:', error);
  }

  try {
    // Try CurrencyAPI for VES
    const currencyApiResponse = await fetch('https://api.currencyapi.com/v3/latest?apikey=free&currencies=VES&base_currency=USD', {
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (currencyApiResponse.ok) {
      const data = await currencyApiResponse.json();
      
      if (data.data && data.data.VES && data.data.VES.value) {
        const rate = parseFloat(data.data.VES.value);
        
        if (rate && rate > 0) {
          const result: ExchangeRateResponse = {
            rate: rate,
            lastUpdated: new Date().toISOString(),
            source: 'CurrencyAPI (VES)'
          };
          
          cachedRate = result;
          lastFetchTime = now;
          return result;
        }
      }
    }
  } catch (error) {
    console.warn('CurrencyAPI failed:', error);
  }

  try {
    // Try ExchangeRate-API as fallback
    const exchangeRateResponse = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    if (exchangeRateResponse.ok) {
      const data = await exchangeRateResponse.json();
      const vefRate = data.rates.VEF || data.rates.VES;
      
      if (vefRate && vefRate > 0) {
        const result: ExchangeRateResponse = {
          rate: vefRate,
          lastUpdated: new Date().toISOString(),
          source: 'ExchangeRate-API'
        };
        
        cachedRate = result;
        lastFetchTime = now;
        return result;
      }
    }
  } catch (error) {
    console.warn('ExchangeRate-API failed:', error);
  }

  // If all APIs fail, return a reasonable default rate
  // This should be updated manually if needed
  // Using a more realistic BCV rate as of 2024
  const fallbackRate: ExchangeRateResponse = {
    rate: 36.50, // Default fallback rate (should be updated manually)
    lastUpdated: new Date().toISOString(),
    source: 'Fallback (Manual - Actualizar)'
  };

  console.warn('All exchange rate APIs failed, using fallback rate:', fallbackRate.rate);
  return fallbackRate;
}

/**
 * Gets the current exchange rate with caching
 */
export async function getCurrentExchangeRate(): Promise<number> {
  try {
    const response = await fetchExchangeRate();
    return response.rate;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    return 36.50; // Fallback rate
  }
}

/**
 * Formats the exchange rate for display
 */
export function formatExchangeRate(rate: number): string {
  return `1 USD = ${rate.toFixed(2)} Bs.`;
}

/**
 * Converts USD to VES
 */
export function convertUSDToVES(usdAmount: number, rate: number): number {
  return usdAmount * rate;
}

/**
 * Converts VES to USD
 */
export function convertVESToUSD(vesAmount: number, rate: number): number {
  return vesAmount / rate;
}
