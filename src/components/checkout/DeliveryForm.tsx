import { useState, useEffect, useCallback, useRef } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin, Clock, User, MessageSquare, Navigation, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { getGoogleMapsApiKey, GOOGLE_MAPS_CONFIG, createCustomMarker } from '@/config/google-maps';

const deliverySchema = z.object({
  address: z.string().min(10, 'La dirección debe tener al menos 10 caracteres').max(200),
  recipientName: z.string().min(3, 'El nombre debe tener al menos 3 caracteres').max(100),
  recipientPhone: z.string().min(10, 'El teléfono debe tener al menos 10 dígitos').max(15),
  deliveryTime: z.enum(['morning', 'afternoon', 'evening']),
  specialInstructions: z.string().max(500).optional(),
});

type DeliveryFormData = z.infer<typeof deliverySchema>;

interface DeliveryFormProps {
  onNext: (data: DeliveryFormData & { coordinates: { lat: number; lng: number } }) => void;
  onBack: () => void;
  initialData?: Partial<DeliveryFormData & { coordinates: { lat: number; lng: number } }>;
  loading?: boolean;
}

export const DeliveryForm = ({ onNext, onBack, initialData, loading }: DeliveryFormProps) => {
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>(
    initialData?.coordinates || GOOGLE_MAPS_CONFIG.DEFAULT_CENTER
  );
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  const form = useForm<DeliveryFormData>({
    resolver: zodResolver(deliverySchema),
    defaultValues: {
      address: initialData?.address || '',
      recipientName: initialData?.recipientName || '',
      recipientPhone: initialData?.recipientPhone || '',
      deliveryTime: initialData?.deliveryTime || 'morning',
      specialInstructions: initialData?.specialInstructions || '',
    },
  });

  const onSubmit = (data: DeliveryFormData) => {
    onNext({ ...data, coordinates });
  };

  // Función para cargar Google Maps
  const loadGoogleMaps = useCallback(() => {
    if (mapLoaded || !mapRef.current) return;

    const apiKey = getGoogleMapsApiKey();
    if (!apiKey) {
      setMapError("API Key de Google Maps no configurada");
      return;
    }

    // Función para inicializar el mapa de Google
    const initializeMap = () => {
      if (!mapRef.current || !window.google) return;

      try {
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: coordinates.lat, lng: coordinates.lng },
          zoom: GOOGLE_MAPS_CONFIG.DEFAULT_ZOOM,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        });

        // Crear marcador personalizado arrastrable usando la configuración
        const marker = new google.maps.Marker({
          position: { lat: coordinates.lat, lng: coordinates.lng },
          map: map,
          icon: createCustomMarker(
            GOOGLE_MAPS_CONFIG.MARKERS.DELIVERY.COLOR,
            GOOGLE_MAPS_CONFIG.MARKERS.DELIVERY.ICON
          ),
          title: GOOGLE_MAPS_CONFIG.MARKERS.DELIVERY.TITLE,
          draggable: true
        });

        // Actualizar coordenadas cuando se arrastra el marcador
        marker.addListener('dragend', () => {
          const position = marker.getPosition();
          if (position) {
            const newCoords = {
              lat: position.lat(),
              lng: position.lng()
            };
            setCoordinates(newCoords);
          }
        });

        // Actualizar coordenadas cuando se hace clic en el mapa
        map.addListener('click', (event: google.maps.MapMouseEvent) => {
          if (event.latLng) {
            const newCoords = {
              lat: event.latLng.lat(),
              lng: event.latLng.lng()
            };
            setCoordinates(newCoords);
            marker.setPosition(event.latLng);
          }
        });

        googleMapRef.current = map;
        markerRef.current = marker;
        setMapLoaded(true);
        setMapError(null);
      } catch (error) {
        console.error('Error al inicializar el mapa:', error);
        setMapError("Error al inicializar el mapa");
      }
    };

    // Cargar el script de Google Maps si no está cargado
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      script.onerror = () => {
        setMapError("Error al cargar Google Maps");
      };
      document.head.appendChild(script);
    } else {
      initializeMap();
    }
  }, [mapLoaded, coordinates.lat, coordinates.lng]);

  // Cargar el mapa cuando el componente se monta
  useEffect(() => {
    loadGoogleMaps();
  }, [loadGoogleMaps]);

  // Actualizar marcador cuando cambien las coordenadas
  useEffect(() => {
    if (markerRef.current && googleMapRef.current) {
      const newPosition = new google.maps.LatLng(coordinates.lat, coordinates.lng);
      markerRef.current.setPosition(newPosition);
      googleMapRef.current.panTo(newPosition);
    }
  }, [coordinates]);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocalización no está soportada por este navegador');
      return;
    }

    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newCoords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setCoordinates(newCoords);
        setIsGettingLocation(false);
      },
      (error) => {
        console.error('Error obteniendo ubicación:', error);
        alert('No se pudo obtener tu ubicación actual');
        setIsGettingLocation(false);
      }
    );
  };

  // Función para geocodificar una dirección usando Google Maps
  const geocodeAddress = async (address: string) => {
    if (!address.trim() || !window.google) return;
    
    setIsGeocoding(true);
    try {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        { 
          address: address + ', Venezuela',
          region: 'VE'
        },
        (results, status) => {
          if (status === 'OK' && results && results[0]) {
            const location = results[0].geometry.location;
            const newCoords = {
              lat: location.lat(),
              lng: location.lng()
            };
            setCoordinates(newCoords);
          } else {
            console.error('Error en geocodificación:', status);
          }
          setIsGeocoding(false);
        }
      );
    } catch (error) {
      console.error('Error en geocodificación:', error);
      setIsGeocoding(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Información de Entrega
          </CardTitle>
          <CardDescription>
            Completa los datos para la entrega de tu pedido
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Address */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Dirección de Entrega *
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Calle Principal #123, Zona Central"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            // Debounce geocoding
                            const timeoutId = setTimeout(() => {
                              if (e.target.value.length > 10) {
                                geocodeAddress(e.target.value);
                              }
                            }, 1000);
                            return () => clearTimeout(timeoutId);
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => geocodeAddress(field.value)}
                          disabled={isGeocoding || !field.value.trim()}
                          className="px-3"
                        >
                          {isGeocoding ? (
                            <RefreshCw className="h-4 w-4 animate-spin" />
                          ) : (
                            <MapPin className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <p className="text-xs text-muted-foreground">
                      Escribe la dirección o haz clic en el mapa para marcar la ubicación exacta
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Recipient Name */}
              <FormField
                control={form.control}
                name="recipientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Nombre del Receptor *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Persona que recibirá el pedido"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Recipient Phone */}
              <FormField
                control={form.control}
                name="recipientPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Teléfono del Receptor *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+58 412 123 4567"
                        type="tel"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Delivery Time */}
              <FormField
                control={form.control}
                name="deliveryTime"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Horario de Entrega *
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-3 gap-3"
                      >
                        <div>
                          <RadioGroupItem
                            value="morning"
                            id="morning"
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor="morning"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                          >
                            <div className="text-center">
                              <div className="mb-1">🌅</div>
                              <div className="font-semibold text-sm">Mañana</div>
                              <div className="text-xs text-muted-foreground">8:00 - 12:00</div>
                            </div>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem
                            value="afternoon"
                            id="afternoon"
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor="afternoon"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                          >
                            <div className="text-center">
                              <div className="mb-1">🌆</div>
                              <div className="font-semibold text-sm">Tarde</div>
                              <div className="text-xs text-muted-foreground">12:00 - 17:00</div>
                            </div>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem
                            value="evening"
                            id="evening"
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor="evening"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                          >
                            <div className="text-center">
                              <div className="mb-1">🌙</div>
                              <div className="font-semibold text-sm">Noche</div>
                              <div className="text-xs text-muted-foreground">17:00 - 20:00</div>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              {/* Special Instructions */}
              <FormField
                control={form.control}
                name="specialInstructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Instrucciones Especiales (Opcional)
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ej: Tocar el timbre dos veces, dejar en portería, etc."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Location Info */}
              <div className="bg-muted/50 rounded-lg p-3 text-sm">
                <p className="font-medium mb-1">Ubicación seleccionada:</p>
                <p className="text-muted-foreground">
                  Lat: {coordinates.lat.toFixed(4)}, Lng: {coordinates.lng.toFixed(4)}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onBack}
                  disabled={loading}
                  className="flex-1"
                >
                  Atrás
                </Button>
                <Button
                  type="submit"
                  variant="accent"
                  disabled={loading}
                  className="flex-1"
                >
                  Continuar
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Map */}
      <Card className="h-[600px] lg:sticky lg:top-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Selecciona la Ubicación</CardTitle>
              <CardDescription>
                Haz clic en el mapa para marcar tu ubicación exacta
              </CardDescription>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={getCurrentLocation}
              disabled={isGettingLocation}
              className="gap-2"
            >
              {isGettingLocation ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Navigation className="h-4 w-4" />
              )}
              {isGettingLocation ? 'Obteniendo...' : 'Mi Ubicación'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[500px] rounded-b-lg overflow-hidden relative">
            {/* Google Maps */}
            <div 
              ref={mapRef}
              className="w-full h-full rounded-b-lg"
            />
            
            {/* Loading overlay */}
            {!mapLoaded && !mapError && (
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <RefreshCw className="w-8 h-8 mx-auto mb-2 animate-spin" />
                  <p className="text-sm">Cargando Google Maps...</p>
                </div>
              </div>
            )}
            
            {/* Error overlay */}
            {mapError && (
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                <div className="text-center text-red-500">
                  <MapPin className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm font-medium">Error al cargar el mapa</p>
                  <p className="text-xs text-gray-500 mt-1">{mapError}</p>
                </div>
              </div>
            )}
            
            {/* Overlay con información de coordenadas */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
              <div className="text-sm space-y-1">
                <p className="font-semibold">Ubicación Seleccionada</p>
                <p className="text-muted-foreground">
                  Lat: {coordinates.lat.toFixed(4)}
                </p>
                <p className="text-muted-foreground">
                  Lng: {coordinates.lng.toFixed(4)}
                </p>
                <p className="text-xs text-blue-600 mt-2">
                  💡 Arrastra el marcador o haz clic en el mapa
                </p>
              </div>
            </div>

            {/* Botones de control en el mapa */}
            <div className="absolute bottom-4 left-4 space-y-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={getCurrentLocation}
                disabled={isGettingLocation}
                className="bg-white/90 backdrop-blur-sm shadow-lg"
              >
                {isGettingLocation ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Navigation className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
