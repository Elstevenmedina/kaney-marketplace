import { ShoppingCart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface EmptyCartProps {
  onContinueShopping?: () => void;
}

export const EmptyCart = ({ onContinueShopping }: EmptyCartProps) => {
  return (
    <Card className="border-2 border-dashed">
      <CardContent className="py-16">
        <div className="text-center space-y-6 max-w-md mx-auto">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
              <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">
              Tu carrito está vacío
            </h2>
            <p className="text-muted-foreground">
              Explora nuestro marketplace y encuentra productos frescos de la mejor calidad
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              variant="accent"
              asChild
              onClick={onContinueShopping}
            >
              <Link to="/marketplace">
                Explorar Productos
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>

          {/* Features */}
          <div className="grid sm:grid-cols-3 gap-4 mt-12 text-sm">
            <div className="space-y-1">
              <div className="font-semibold text-foreground">🌱 Productos Frescos</div>
              <p className="text-muted-foreground">Directo de productores locales</p>
            </div>
            <div className="space-y-1">
              <div className="font-semibold text-foreground">📦 Envío Rápido</div>
              <p className="text-muted-foreground">Entrega en 24-48 horas</p>
            </div>
            <div className="space-y-1">
              <div className="font-semibold text-foreground">💰 Mejores Precios</div>
              <p className="text-muted-foreground">Sin intermediarios</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
