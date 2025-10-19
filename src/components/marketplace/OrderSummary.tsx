import { ShoppingCart, Truck, CreditCard, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ExchangeRateDisplay } from './ExchangeRateDisplay';

interface OrderSummaryProps {
  subtotal: number;
  logisticsEstimate: number;
  tax: number;
  total: number;
  currency: 'USD' | 'BS';
  onCheckout: () => void;
  onCurrencyToggle: () => void;
  loading?: boolean;
  itemCount: number;
}

export const OrderSummary = ({
  subtotal,
  logisticsEstimate,
  tax,
  total,
  currency,
  onCheckout,
  onCurrencyToggle,
  loading,
  itemCount
}: OrderSummaryProps) => {
  const freeShippingThreshold = currency === 'USD' ? 400 : 3600;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const remainingForFreeShipping = freeShippingThreshold - subtotal;

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Resumen de Compra</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={onCurrencyToggle}
          >
            {currency === 'USD' ? 'Cambiar a BS' : 'Cambiar a USD'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Free Shipping Progress */}
        {!isFreeShipping && remainingForFreeShipping > 0 && (
          <div className="bg-muted/50 rounded-lg p-3 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Truck className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                Falta {currency === 'USD' ? '$' : 'Bs.'} {remainingForFreeShipping.toFixed(2)} para envío gratis
              </span>
            </div>
            <div className="h-2 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-secondary transition-all"
                style={{ width: `${(subtotal / freeShippingThreshold) * 100}%` }}
              />
            </div>
          </div>
        )}

        {isFreeShipping && (
          <Badge variant="success" className="w-full justify-center py-2">
            <Truck className="h-4 w-4 mr-1" />
            ¡Envío Gratis!
          </Badge>
        )}

        {/* Price Breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
            <span className="font-medium">
              {currency === 'USD' ? '$' : 'Bs.'} {subtotal.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1">
              <Truck className="h-3 w-3" />
              Logística
            </span>
            <span className="font-medium text-muted-foreground">
              Por calcular
            </span>
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-2xl font-bold text-primary">
              {currency === 'USD' ? '$' : 'Bs.'} {total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Checkout Button */}
        <Button
          size="lg"
          variant="accent"
          className="w-full"
          onClick={onCheckout}
          disabled={loading || itemCount === 0}
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          Proceder al Checkout
        </Button>


     
      </CardContent>
    </Card>
  );
};
