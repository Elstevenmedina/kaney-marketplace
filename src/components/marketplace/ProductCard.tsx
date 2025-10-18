import { ShoppingCart, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/store/slices/marketplaceSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart } from '@/store/slices/cartSlice';
import { Rating } from './Rating';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const currency = useAppSelector((state) => state.cart.currency);
  const exchangeRate = useAppSelector((state) => state.cart.exchangeRate);

  const displayPrice = product.onSale && product.salePrice ? product.salePrice : product.price;
  const finalPrice = currency === 'BS' ? displayPrice * exchangeRate : displayPrice;

  const rating = product.rating || 4.5;
  const stock = product.stock || 100;
  const isLowStock = stock < 20;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: displayPrice,
      quantity: product.minQuantity,
      image: product.image,
      unit: product.unit,
    }));
    toast.success(`${product.name} agregado al carrito`);
  };

  return (
    <Link to={`/product/${product.id}`} className="block group">
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer h-full animate-fade-in">
        <div className="relative overflow-hidden bg-white">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-32 sm:h-40 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 right-2 sm:top-3 sm:left-3 sm:right-3 flex justify-between items-start">
            <div className="flex flex-col gap-1 sm:gap-2">
              {product.onSale && (
                <Badge variant="accent" className="shadow-lg text-[10px] sm:text-xs">
                  ¡Oferta!
                </Badge>
              )}
              {product.featured && (
                <Badge variant="success" className="shadow-lg bg-primary/90 text-primary-foreground text-[10px] sm:text-xs">
                  Destacado
                </Badge>
              )}
            </div>
            
            {isLowStock && (
              <Badge variant="destructive" className="shadow-lg text-[10px] sm:text-xs">
                <Package className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                <span className="hidden xs:inline">Stock Bajo</span>
                <span className="xs:hidden">Bajo</span>
              </Badge>
            )}
          </div>
        </div>

        <CardContent className="p-2 sm:p-3 space-y-1 sm:space-y-2">
          {/* Producer (if available) */}
          {product.producer && (
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              {product.producer.name}
            </p>
          )}

          {/* Product Name */}
          <h3 className="font-semibold text-xs sm:text-sm text-foreground mb-1 line-clamp-1 group-hover:text-accent transition-colors">
            {product.name}
          </h3>
          
          {/* Description */}
          <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-2 min-h-[24px] sm:min-h-[32px]">
            {product.description}
          </p>

          {/* Rating */}
          <Rating rating={rating} showValue />

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex-1 min-w-0">
              {product.onSale && product.salePrice ? (
                <div className="flex flex-col">
                  <span className="text-sm sm:text-base font-bold text-accent">
                    {currency === 'USD' ? '$' : 'Bs.'} {finalPrice.toFixed(2)}
                  </span>
                  <span className="text-[10px] sm:text-xs text-muted-foreground line-through">
                    {currency === 'USD' ? '$' : 'Bs.'} {(currency === 'BS' ? product.price * exchangeRate : product.price).toFixed(2)}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col">
                  <span className="text-sm sm:text-base font-bold text-primary">
                    {currency === 'USD' ? '$' : 'Bs.'} {finalPrice.toFixed(2)}
                  </span>
                  <span className="text-[10px] sm:text-xs text-muted-foreground">por {product.unit}</span>
                </div>
              )}
            </div>

            <Button
              size="sm"
              variant="accent"
              onClick={handleAddToCart}
              className="shrink-0 hover-scale h-7 w-7 sm:h-8 sm:w-8 p-0 ml-2"
            >
              <ShoppingCart className="h-3 w-3" />
            </Button>
          </div>

          {/* Stock indicator */}
          {stock > 0 && (
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="flex-1 h-1 sm:h-1.5 bg-border rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all ${
                    isLowStock ? 'bg-destructive' : 'bg-secondary'
                  }`}
                  style={{ width: `${Math.min((stock / 100) * 100, 100)}%` }}
                />
              </div>
              <span className="text-[10px] sm:text-xs text-muted-foreground">
                {stock} {product.unit}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};
