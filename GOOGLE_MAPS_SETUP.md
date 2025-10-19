# Configuración de Google Maps

Este directorio contiene la configuración para el uso de Google Maps en la aplicación.

## Configuración del API Key

El API Key de Google Maps está configurado directamente en el código en el archivo `src/config/google-maps.ts`. No es necesario configurar variables de entorno.

**API Key actual:** `AIzaSyDwstUP4l6RPQt5PZDp6XmxMEMGI7oNRV4`

## Componentes que usan Google Maps

Los siguientes componentes han sido actualizados para usar la configuración directa del API Key:

- `DeliveryForm.tsx` - Formulario de entrega con mapa interactivo

## Cambios realizados

1. **Eliminada la funcionalidad de solicitar API Key en el mapa** - Los componentes ya no muestran formularios para ingresar el API Key
2. **API Key configurado directamente en el código** - El API Key está hardcodeado en `google-maps.ts`
3. **Simplificada la inicialización del mapa** - Los mapas se inicializan automáticamente sin configuración adicional
4. **Mejorado el manejo de errores** - Los errores del mapa se muestran de manera más clara

## Funcionalidades implementadas:

- ✅ Mapa interactivo de Google Maps
- ✅ Marcador arrastrable personalizado
- ✅ Selección por clic en el mapa
- ✅ Geocodificación de direcciones
- ✅ Geolocalización del usuario
- ✅ Información de coordenadas en tiempo real
- ✅ Manejo de errores mejorado

## Uso en componentes

```typescript
import { getGoogleMapsApiKey, GOOGLE_MAPS_CONFIG, createCustomMarker } from '@/config/google-maps';

// Obtener el API Key
const apiKey = getGoogleMapsApiKey();

// Usar configuración
const markerIcon = createCustomMarker(
  GOOGLE_MAPS_CONFIG.MARKERS.DELIVERY.COLOR,
  GOOGLE_MAPS_CONFIG.MARKERS.DELIVERY.ICON
);
```

## Configuración disponible

- **API_KEY**: API Key de Google Maps configurado directamente
- **DEFAULT_CENTER**: Centro por defecto del mapa (Caracas, Venezuela)
- **DEFAULT_ZOOM**: Nivel de zoom por defecto
- **MARKERS**: Configuración de colores y iconos de marcadores
- **MAP_STYLES**: Estilos de mapa disponibles

## Notas importantes:

- La API key debe tener las APIs habilitadas: Maps JavaScript API, Geocoding API, Places API
- Para producción, configura restricciones de dominio en Google Cloud Console
- Google Maps tiene límites de uso gratuitos
- El mapa se carga dinámicamente para mejorar el rendimiento
