declare global {
  interface Window {
    google: typeof google;
  }
}

declare namespace google {
  namespace maps {
    class Map {
      constructor(mapDiv: HTMLElement, opts?: MapOptions);
      addListener(eventName: string, handler: Function): MapsEventListener;
      panTo(latLng: LatLng): void;
    }

    class Marker {
      constructor(opts?: MarkerOptions);
      setPosition(latLng: LatLng | LatLngLiteral): void;
      getPosition(): LatLng | null;
      addListener(eventName: string, handler: Function): MapsEventListener;
    }

    class LatLng {
      constructor(lat: number, lng: number);
      lat(): number;
      lng(): number;
    }

    class Geocoder {
      geocode(request: GeocoderRequest, callback: (results: GeocoderResult[] | null, status: GeocoderStatus) => void): void;
    }

    interface MapOptions {
      center?: LatLng | LatLngLiteral;
      zoom?: number;
      mapTypeId?: MapTypeId;
    }

    interface MarkerOptions {
      position?: LatLng | LatLngLiteral;
      map?: Map;
      draggable?: boolean;
      title?: string;
    }

    interface LatLngLiteral {
      lat: number;
      lng: number;
    }

    interface MapMouseEvent {
      latLng?: LatLng;
    }

    interface GeocoderRequest {
      address?: string;
      region?: string;
    }

    interface GeocoderResult {
      geometry: {
        location: LatLng;
      };
    }

    enum MapTypeId {
      ROADMAP = 'roadmap',
      SATELLITE = 'satellite',
      HYBRID = 'hybrid',
      TERRAIN = 'terrain'
    }

    enum GeocoderStatus {
      OK = 'OK',
      ERROR = 'ERROR',
      INVALID_REQUEST = 'INVALID_REQUEST',
      OVER_QUERY_LIMIT = 'OVER_QUERY_LIMIT',
      REQUEST_DENIED = 'REQUEST_DENIED',
      UNKNOWN_ERROR = 'UNKNOWN_ERROR',
      ZERO_RESULTS = 'ZERO_RESULTS'
    }

    interface MapsEventListener {
      remove(): void;
    }
  }
}

export {};
