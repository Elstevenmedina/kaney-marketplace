import { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from 'react-leaflet';
import { MapPin, Clock, User, MessageSquare, Navigation, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const deliverySchema = z.object({
  address: z.string().min(10, 'La dirección debe tener al menos 10 caracteres').max(200),
  recipientName: z.string().min(3, 'El nombre debe tener al menos 3 caracteres').max(100),
  recipientPhone: z.string().min(10, 'El teléfono debe tener al menos 10 dígitos').max(15),
  deliveryTime: z.enum(['morning', 'afternoon', 'evening']),
  deliveryType: z.enum(['standard', 'express', 'scheduled']),
  specialInstructions: z.string().max(500).optional(),
});

type DeliveryFormData = z.infer<typeof deliverySchema>;

interface DeliveryFormProps {
  onNext: (data: DeliveryFormData & { coordinates: { lat: number; lng: number } }) => void;
  onBack: () => void;
  initialData?: Partial<DeliveryFormData & { coordinates: { lat: number; lng: number } }>;
  loading?: boolean;
}

// Map click handler component
function LocationMarker({ position, setPosition }: any) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : <Marker position={position} />;
}

export const DeliveryForm = ({ onNext, onBack, initialData, loading }: DeliveryFormProps) => {
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>(
    initialData?.coordinates || { lat: 10.4806, lng: -66.9036 } // Caracas, Venezuela
  );
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const form = useForm<DeliveryFormData>({
    resolver: zodResolver(deliverySchema),
    defaultValues: {
      address: initialData?.address || '',
      recipientName: initialData?.recipientName || '',
      recipientPhone: initialData?.recipientPhone || '',
      deliveryTime: initialData?.deliveryTime || 'morning',
      deliveryType: initialData?.deliveryType || 'standard',
      specialInstructions: initialData?.specialInstructions || '',
    },
  });

  const onSubmit = (data: DeliveryFormData) => {
    onNext({ ...data, coordinates });
  };

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
                      <Input
                        placeholder="Calle Principal #123, Zona Central"
                        {...field}
                      />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">
                      Haz clic en el mapa para marcar la ubicación exacta
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

              {/* Delivery Type */}
              <FormField
                control={form.control}
                name="deliveryType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="flex items-center gap-2">
                      <Navigation className="h-4 w-4" />
                      Tipo de Entrega *
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-1 gap-3"
                      >
                        <div>
                          <RadioGroupItem
                            value="standard"
                            id="standard"
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor="standard"
                            className="flex items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                          >
                            <div>
                              <div className="font-semibold">Entrega Estándar</div>
                              <div className="text-sm text-muted-foreground">24-48 horas • Gratis</div>
                            </div>
                            <div className="text-lg">📦</div>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem
                            value="express"
                            id="express"
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor="express"
                            className="flex items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                          >
                            <div>
                              <div className="font-semibold">Entrega Express</div>
                              <div className="text-sm text-muted-foreground">2-6 horas • +$5.00</div>
                            </div>
                            <div className="text-lg">⚡</div>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem
                            value="scheduled"
                            id="scheduled"
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor="scheduled"
                            className="flex items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                          >
                            <div>
                              <div className="font-semibold">Entrega Programada</div>
                              <div className="text-sm text-muted-foreground">Fecha específica • Gratis</div>
                            </div>
                            <div className="text-lg">📅</div>
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
          <div className="h-[500px] rounded-b-lg overflow-hidden">
            <MapContainer
              center={[coordinates.lat, coordinates.lng]}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationMarker position={coordinates} setPosition={setCoordinates} />
              {coordinates && (
                <Marker position={[coordinates.lat, coordinates.lng]}>
                  <Popup>
                    <div className="text-center">
                      <p className="font-semibold">Ubicación de Entrega</p>
                      <p className="text-sm text-muted-foreground">
                        Lat: {coordinates.lat.toFixed(4)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Lng: {coordinates.lng.toFixed(4)}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              )}
            </MapContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
