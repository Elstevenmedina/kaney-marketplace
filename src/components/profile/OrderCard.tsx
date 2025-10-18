import { Package, Eye, RotateCcw, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface Order {
  id: string;
  orderNumber: string;
  date: Date;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  currency: 'USD' | 'BS';
  items: { id: string; name: string; quantity: number; image: string }[];
  canReorder: boolean;
  canRate: boolean;
  rating?: number;
}

interface OrderCardProps {
  order: Order;
  onViewDetails: () => void;
  onReorder: () => void;
  onRate?: (rating: number) => void;
}

export const OrderCard = ({ order, onViewDetails, onReorder, onRate }: OrderCardProps) => {
  const getStatusBadge = (status: Order['status']) => {
    const variants: Record<string, any> = {
      pending: { variant: 'secondary', label: 'Pendiente' },
      processing: { variant: 'default', label: 'Procesando' },
      shipped: { variant: 'default', label: 'Enviado' },
      delivered: { variant: 'success', label: 'Entregado' },
      cancelled: { variant: 'destructive', label: 'Cancelado' },
    };
    const config = variants[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="bg-muted/50">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Orden #{order.orderNumber}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {new Date(order.date).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          {getStatusBadge(order.status)}
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        {/* Items */}
        <div className="space-y-2">
          {order.items.slice(0, 3).map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 object-cover rounded"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  Cantidad: {item.quantity}
                </p>
              </div>
            </div>
          ))}
          {order.items.length > 3 && (
            <p className="text-xs text-muted-foreground">
              +{order.items.length - 3} productos más
            </p>
          )}
        </div>

        <Separator />

        {/* Total */}
        <div className="flex items-center justify-between">
          <span className="font-semibold">Total</span>
          <span className="text-xl font-bold text-primary">
            {order.currency === 'USD' ? '$' : 'Bs.'} {order.total.toFixed(2)}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onViewDetails}
          >
            <Eye className="h-4 w-4 mr-2" />
            Ver Detalles
          </Button>
          {order.canReorder && (
            <Button
              variant="secondary"
              className="flex-1"
              onClick={onReorder}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reordenar
            </Button>
          )}
        </div>

        {/* Rating */}
        {order.canRate && onRate && (
          <div className="pt-2 border-t">
            <p className="text-sm font-medium mb-2">Califica tu experiencia:</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => onRate(star)}
                  className="hover:scale-110 transition-transform"
                >
                  <Star
                    className={`h-5 w-5 ${
                      order.rating && star <= order.rating
                        ? 'fill-accent text-accent'
                        : 'text-muted-foreground'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
