import { useState, useEffect, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { updateExchangeRate } from '@/store/slices/cartSlice';
import { fetchExchangeRate, formatExchangeRate, convertUSDToVES, convertVESToUSD } from '@/services/currencyService';

export interface CurrencyInfo {
  rate: number;
  lastUpdated: string;
  source: string;
  formattedRate: string;
}

export function useCurrency() {
  const dispatch = useAppDispatch();
  const currency = useAppSelector((state) => state.cart.currency);
  const exchangeRate = useAppSelector((state) => state.cart.exchangeRate);
  
  const [currencyInfo, setCurrencyInfo] = useState<CurrencyInfo>({
    rate: exchangeRate,
    lastUpdated: new Date().toISOString(),
    source: 'Cached',
    formattedRate: formatExchangeRate(exchangeRate)
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch updated exchange rate
  const updateExchangeRate = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetchExchangeRate();
      
      setCurrencyInfo({
        rate: response.rate,
        lastUpdated: response.lastUpdated,
        source: response.source,
        formattedRate: formatExchangeRate(response.rate)
      });
      
      // Update the Redux store with the new rate
      dispatch(updateExchangeRate(response.rate));
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error fetching exchange rate';
      setError(errorMessage);
      console.error('Error updating exchange rate:', err);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  // Convert price based on current currency
  const convertPrice = useCallback((usdPrice: number): number => {
    if (currency === 'BS') {
      return convertUSDToVES(usdPrice, currencyInfo.rate);
    }
    return usdPrice;
  }, [currency, currencyInfo.rate]);

  // Format price for display
  const formatPrice = useCallback((usdPrice: number): string => {
    const convertedPrice = convertPrice(usdPrice);
    const symbol = currency === 'USD' ? '$' : 'Bs.';
    return `${symbol} ${convertedPrice.toFixed(2)}`;
  }, [convertPrice, currency]);

  // Get currency symbol
  const getCurrencySymbol = useCallback((): string => {
    return currency === 'USD' ? '$' : 'Bs.';
  }, [currency]);

  // Check if rate is stale (older than 6 hours for BCV rates)
  const isRateStale = useCallback((): boolean => {
    const lastUpdated = new Date(currencyInfo.lastUpdated);
    const now = new Date();
    const hoursDiff = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60);
    return hoursDiff > 6;
  }, [currencyInfo.lastUpdated]);

  // Auto-update rate if stale
  useEffect(() => {
    if (isRateStale()) {
      updateExchangeRate();
    }
  }, [isRateStale, updateExchangeRate]);

  // Update currency info when exchange rate changes
  useEffect(() => {
    setCurrencyInfo(prev => ({
      ...prev,
      rate: exchangeRate,
      formattedRate: formatExchangeRate(exchangeRate)
    }));
  }, [exchangeRate]);

  return {
    currency,
    exchangeRate: currencyInfo.rate,
    currencyInfo,
    isLoading,
    error,
    convertPrice,
    formatPrice,
    getCurrencySymbol,
    updateExchangeRate,
    isRateStale: isRateStale()
  };
}
