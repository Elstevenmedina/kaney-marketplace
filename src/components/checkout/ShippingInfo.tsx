import { MapPin, Truck, Clock, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ShippingInfoProps {
  deliveryInfo?: {
    coordinates: { lat: number; lng: number };
    address: string;
    deliveryTime: string;
  };
  shippingCost: number;
  currency: 'USD' | 'BS';
  estimatedDelivery?: string;
}

export const ShippingInfo = ({ deliveryInfo, shippingCost, currency, estimatedDelivery }: ShippingInfoProps) => {
  if (!deliveryInfo?.coordinates) {
    return (
      <Card className="border-dashed">
        <CardContent className="p-4">
          <div className="text-center space-y-2">
            <MapPin className="h-8 w-8 mx-auto text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Selecciona una ubicación para calcular el envío
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const deliveryTypeInfo = { 
    label: 'Estándar', 
    time: '24-48 horas', 
    icon: Truck, 
    color: 'bg-blue-100 text-blue-600' 
  };
  const DeliveryIcon = deliveryTypeInfo.icon;

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <MapPin className="h-5 w-5 text-primary" />
          Información de Envío
        </CardTitle>
        <CardDescription>
          Detalles de entrega basados en tu ubicación
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Delivery Address */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Dirección de Entrega:</p>
          <p className="text-sm text-muted-foreground">{deliveryInfo.address}</p>
          <div className="text-xs text-muted-foreground">
            Lat: {deliveryInfo.coordinates.lat.toFixed(4)}, Lng: {deliveryInfo.coordinates.lng.toFixed(4)}
          </div>
        </div>

        {/* Delivery Type & Time */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg ${deliveryTypeInfo.color}`}>
              <DeliveryIcon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium">{deliveryTypeInfo.label}</p>
              <p className="text-xs text-muted-foreground">{deliveryTypeInfo.time}</p>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            {deliveryInfo.deliveryTime === 'morning' ? 'Mañana' : 
             deliveryInfo.deliveryTime === 'afternoon' ? 'Tarde' : 'Noche'}
          </Badge>
        </div>

        {/* Shipping Cost */}
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium">Costo de Envío:</span>
          </div>
          <span className="text-lg font-bold text-primary">
            {currency === 'USD' ? '$' : 'Bs.'} {shippingCost.toFixed(2)}
          </span>
        </div>

        {/* Estimated Delivery */}
        {estimatedDelivery && (
          <div className="text-center p-3 bg-primary/5 rounded-lg">
            <p className="text-sm font-medium text-primary">Entrega Mínima</p>
            <p className="text-xs text-muted-foreground">{estimatedDelivery}</p>
          </div>
        )}

        {/* Additional Info */}
        <div className="space-y-2 text-xs text-muted-foreground">
          <p>✓ Envío calculado por distancia y peso</p>
          <p>✓ Envío gratis en compras mayores a {currency === 'USD' ? '$100' : 'Bs. 3,600'}</p>
          <p>✓ Seguimiento en tiempo real</p>
        </div>
      </CardContent>
    </Card>
  );
};
