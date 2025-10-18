import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface QuantitySelectorProps {
  minQuantity: number;
  maxQuantity: number;
  currentQuantity: number;
  onQuantityChange: (quantity: number) => void;
  unit: string;
  pricePerUnit: number;
  currency: 'USD' | 'BS';
  className?: string;
}

export const QuantitySelector = ({
  minQuantity,
  maxQuantity,
  currentQuantity,
  onQuantityChange,
  unit,
  pricePerUnit,
  currency,
  className
}: QuantitySelectorProps) => {
  const handleIncrement = () => {
    if (currentQuantity < maxQuantity) {
      onQuantityChange(currentQuantity + 1);
    }
  };

  const handleDecrement = () => {
    if (currentQuantity > minQuantity) {
      onQuantityChange(currentQuantity - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= minQuantity && value <= maxQuantity) {
      onQuantityChange(value);
    }
  };

  const totalPrice = currentQuantity * pricePerUnit;
  const isMinReached = currentQuantity <= minQuantity;
  const isMaxReached = currentQuantity >= maxQuantity;

  return (
    <div className={cn("space-y-4", className)}>
      {/* Quantity Controls */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={handleDecrement}
          disabled={isMinReached}
          className="h-12 w-12"
        >
          <Minus className="h-4 w-4" />
        </Button>
        
        <div className="flex-1 text-center">
          <Input
            type="number"
            value={currentQuantity}
            onChange={handleInputChange}
            min={minQuantity}
            max={maxQuantity}
            className="text-center text-lg font-semibold h-12"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Mínimo: {minQuantity} {unit}
          </p>
        </div>
        
        <Button
          variant="outline"
          size="icon"
          onClick={handleIncrement}
          disabled={isMaxReached}
          className="h-12 w-12"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Price Summary */}
      <div className="bg-muted/50 rounded-lg p-4 space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Precio por {unit}:</span>
          <span className="font-medium">
            {currency === 'USD' ? '$' : 'Bs.'} {pricePerUnit.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Cantidad:</span>
          <span className="font-medium">{currentQuantity} {unit}</span>
        </div>
        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total:</span>
            <span className="text-2xl font-bold text-primary">
              {currency === 'USD' ? '$' : 'Bs.'} {totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Stock Warning */}
      {isMaxReached && (
        <p className="text-sm text-destructive">
          Solo hay {maxQuantity} {unit} disponibles
        </p>
      )}
    </div>
  );
};
