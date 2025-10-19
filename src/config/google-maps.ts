// Configuración de Google Maps
export const GOOGLE_MAPS_CONFIG = {
  // API Key de Google Maps configurado directamente
  API_KEY: "AIzaSyDwstUP4l6RPQt5PZDp6XmxMEMGI7oNRV4",
  
  // Configuración por defecto del mapa
  DEFAULT_CENTER: {
    lat: 10.4806, // Caracas, Venezuela
    lng: -66.9036
  },
  DEFAULT_ZOOM: 13,
  
  // Configuración de marcadores
  MARKERS: {
    DELIVERY: {
      COLOR: '#ef4444',
      ICON: '📍',
      TITLE: 'Ubicación de entrega'
    },
    USER_LOCATION: {
      COLOR: '#3b82f6',
      ICON: '📍',
      TITLE: 'Tu ubicación'
    }
  },
  
  // Configuración de estilos del mapa
  MAP_STYLES: {
    ROADMAP: 'roadmap',
    SATELLITE: 'satellite',
    HYBRID: 'hybrid',
    TERRAIN: 'terrain'
  }
};

// Función para obtener la API Key de Google Maps
export const getGoogleMapsApiKey = (): string => {
  return GOOGLE_MAPS_CONFIG.API_KEY;
};

// Función para validar la API Key de Google Maps
export const validateGoogleMapsApiKey = (apiKey: string): boolean => {
  return apiKey.startsWith('AIza') && apiKey.length > 30;
};

// Función para crear un marcador personalizado
export const createCustomMarker = (color: string, icon: string) => {
  return {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="12" fill="${color}" stroke="white" stroke-width="3"/>
        <text x="16" y="20" text-anchor="middle" font-size="16">${icon}</text>
      </svg>
    `),
    scaledSize: new google.maps.Size(32, 32),
    anchor: new google.maps.Point(16, 32),
  };
};
