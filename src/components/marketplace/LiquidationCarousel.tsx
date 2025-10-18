import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin, ShoppingCart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { Product } from '@/store/slices/marketplaceSlice';

interface LiquidationCarouselProps {
  products: Product[];
}

const PRODUCTS_PER_PAGE = 5;

export const LiquidationCarousel = ({ products }: LiquidationCarouselProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const currency = useAppSelector((state) => state.cart.currency);
  const exchangeRate = useAppSelector((state) => state.cart.exchangeRate);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const startIndex = currentPage * PRODUCTS_PER_PAGE;
  const visibleProducts = products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    if (totalPages <= 1) return;

    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 5000);

    return () => clearInterval(interval);
  }, [totalPages]);

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="bg-gradient-to-r from-accent/10 to-accent/5 border-2 border-accent/20 rounded-2xl overflow-hidden mx-8 md:mx-16 lg:mx-24">
      <div className="px-8 md:px-12 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
              ⚡ Ofertas Especiales
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Aprovecha estos precios por tiempo limitado</p>
          </div>
        </div>

        <div className="relative">
          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-6xl">
            {visibleProducts.map((product) => {
              const displayPrice = product.salePrice || product.price;
              const finalPrice = currency === 'BS' ? displayPrice * exchangeRate : displayPrice;
              const originalPrice = currency === 'BS' ? product.price * exchangeRate : product.price;
              const discount = Math.round(((product.price - (product.salePrice || product.price)) / product.price) * 100);

              return (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full group">
                  <Link to={`/product/${product.id}`} className="flex flex-col h-full">
                    <CardContent className="p-0 flex flex-col h-full">
                      {/* Product Image */}
                      <div className="relative overflow-hidden bg-white h-36">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* Liquidación Badge */}
                        <Badge variant="destructive" className="absolute top-2 left-2 shadow-lg text-xs px-2 py-1 font-bold">
                          LIQUIDACIÓN
                        </Badge>
                        {/* Discount Badge */}
                        <Badge variant="accent" className="absolute top-2 right-2 shadow-lg text-xs px-2 py-1">
                          -{discount}%
                        </Badge>
                      </div>

                      {/* Product Info */}
                      <div className="p-3 flex flex-col flex-1 space-y-2">
                        <h3 className="text-sm font-semibold text-foreground line-clamp-1">
                          {product.name}
                        </h3>
                        
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {product.producer.location}
                        </p>

                        <div className="flex items-center justify-between pt-1">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-accent">
                              {currency === 'USD' ? '$' : 'Bs.'} {finalPrice.toFixed(2)}
                            </span>
                            <span className="text-xs text-muted-foreground line-through">
                              {currency === 'USD' ? '$' : 'Bs.'} {originalPrice.toFixed(2)}
                            </span>
                          </div>

                          <Button 
                            variant="accent" 
                            size="sm" 
                            className="shrink-0 h-7 w-7 p-0"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              // Aquí se puede agregar lógica para agregar al carrito
                            }}
                          >
                            <ShoppingCart className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          {totalPages > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-background/90 backdrop-blur-sm hover:bg-background shadow-lg"
                onClick={handlePrevious}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-background/90 backdrop-blur-sm hover:bg-background shadow-lg"
                onClick={handleNext}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>

              {/* Indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    className={`h-2 rounded-full transition-all ${
                      index === currentPage 
                        ? 'w-8 bg-accent' 
                        : 'w-2 bg-border hover:bg-muted-foreground'
                    }`}
                    onClick={() => setCurrentPage(index)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
