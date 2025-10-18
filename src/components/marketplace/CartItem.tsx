import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    unit: string;
  };
  currency: 'USD' | 'BS';
  exchangeRate: number;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
  className?: string;
}

export const CartItem = ({
  item,
  currency,
  exchangeRate,
  onQuantityChange,
  onRemove,
  className
}: CartItemProps) => {
  const displayPrice = currency === 'BS' ? item.price * exchangeRate : item.price;
  const totalPrice = displayPrice * item.quantity;
  const minQuantity = 5;

  const handleIncrement = () => {
    onQuantityChange(item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > minQuantity) {
      onQuantityChange(item.quantity - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= minQuantity) {
      onQuantityChange(value);
    }
  };

  return (
    <Card className={cn("overflow-hidden animate-fade-in", className)}>
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Product Image */}
          <Link
            to={`/product/${item.id}`}
            className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-muted hover:opacity-80 transition-opacity"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </Link>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1 min-w-0 pr-4">
                <Link
                  to={`/product/${item.id}`}
                  className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-1"
                >
                  {item.name}
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  {currency === 'USD' ? '$' : 'Bs.'} {displayPrice.toFixed(2)} por {item.unit}
                </p>
              </div>

              {/* Remove Button */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="flex-shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Eliminar producto?</AlertDialogTitle>
                    <AlertDialogDescription>
                      ¿Estás seguro de que deseas eliminar "{item.name}" del carrito?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={onRemove} className="bg-destructive hover:bg-destructive/90">
                      Eliminar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleDecrement}
                  disabled={item.quantity <= minQuantity}
                  className="h-8 w-8"
                >
                  <Minus className="h-3 w-3" />
                </Button>

                <Input
                  type="number"
                  value={item.quantity}
                  onChange={handleInputChange}
                  min={minQuantity}
                  className="w-16 h-8 text-center text-sm"
                />

                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleIncrement}
                  className="h-8 w-8"
                >
                  <Plus className="h-3 w-3" />
                </Button>

                <span className="text-sm text-muted-foreground ml-1">{item.unit}</span>
              </div>

              {/* Total Price */}
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-lg font-bold text-primary">
                  {currency === 'USD' ? '$' : 'Bs.'} {totalPrice.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Minimum Quantity Notice */}
            {item.quantity === minQuantity && (
              <p className="text-xs text-muted-foreground mt-2">
                Cantidad mínima: {minQuantity} {item.unit}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
