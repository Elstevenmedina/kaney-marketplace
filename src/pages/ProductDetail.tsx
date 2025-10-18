import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Package, Calendar, Box } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Header } from '@/components/marketplace/Header';
import { ImageGallery } from '@/components/marketplace/ImageGallery';
import { QuantitySelector } from '@/components/marketplace/QuantitySelector';
import { ProducerInfo } from '@/components/marketplace/ProducerInfo';
import { QualityBadges } from '@/components/marketplace/QualityBadges';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { mockProducts } from '@/data/mockProducts';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart } from '@/store/slices/cartSlice';
import { toast } from 'sonner';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const currency = useAppSelector((state) => state.cart.currency);
  const exchangeRate = useAppSelector((state) => state.cart.exchangeRate);

  const product = mockProducts.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(product?.minQuantity || 5);

  useEffect(() => {
    if (product) {
      document.title = `${product.name} - Kaney Marketplace`;
    }
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <Package className="h-16 w-16 mx-auto text-muted-foreground" />
            <h2 className="text-2xl font-bold">Producto no encontrado</h2>
            <p className="text-muted-foreground">
              El producto que buscas no existe o ha sido removido
            </p>
            <Button onClick={() => window.history.back()} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver atrás
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const displayPrice = product.onSale && product.salePrice ? product.salePrice : product.price;
  const finalPrice = currency === 'BS' ? displayPrice * exchangeRate : displayPrice;
  const totalPrice = finalPrice * quantity;

  const relatedProducts = mockProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: displayPrice,
        quantity: quantity,
        image: product.image,
        unit: product.unit,
      })
    );
    toast.success(`${quantity} ${product.unit} de ${product.name} agregado al carrito`);
  };

  const images = product.images || [product.image];
  const isLowStock = product.stock && product.lowStockThreshold 
    ? product.stock < product.lowStockThreshold 
    : false;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {/* Back Button */}
        <div className="mb-4 sm:mb-6">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="gap-2 text-muted-foreground hover:text-foreground text-sm sm:text-base"
          >
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            Volver atrás
          </Button>
        </div>
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Image Gallery */}
          <div>
            <ImageGallery images={images} productName={product.name} />
          </div>

          {/* Product Info */}
          <div className="space-y-3 sm:space-y-4">
            {/* Category Badge */}
            <div>
              <Badge variant="secondary" className="mb-1 text-xs sm:text-sm">
                {product.category === 'hortalizas' && 'Hortalizas'}
                {product.category === 'frutas' && 'Frutas'}
                {product.category === 'granos-semillas' && 'Granos y Semillas'}
                {product.category === 'hojas-aromaticas' && 'Hojas o Aromáticas'}
                {product.category === 'tuberculos' && 'Tubérculos'}
              </Badge>
            </div>

            {/* Title and Badges */}
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-1 sm:mb-2">
                {product.name}
              </h1>
              <div className="flex gap-1 flex-wrap">
                {product.featured && (
                  <Badge variant="success" className="text-xs">Destacado</Badge>
                )}
                {product.onSale && (
                  <Badge variant="accent" className="text-xs">¡Oferta!</Badge>
                )}
                {isLowStock && (
                  <Badge variant="destructive" className="text-xs">
                    <Package className="h-3 w-3 mr-1" />
                    Stock Bajo
                  </Badge>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="space-y-1">
              {product.onSale && product.salePrice ? (
                <>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-bold text-accent">
                      {currency === 'USD' ? '$' : 'Bs.'} {finalPrice.toFixed(2)}
                    </span>
                    <span className="text-base sm:text-lg text-muted-foreground line-through">
                      {currency === 'USD' ? '$' : 'Bs.'}{' '}
                      {(currency === 'BS' ? product.price * exchangeRate : product.price).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">por {product.unit}</p>
                </>
              ) : (
                <>
                  <div className="text-2xl sm:text-3xl font-bold text-primary">
                    {currency === 'USD' ? '$' : 'Bs.'} {finalPrice.toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground">por {product.unit}</p>
                </>
              )}
            </div>

            {/* Description - Compact */}
            <div>
              <p className="text-muted-foreground text-xs leading-relaxed">{product.description}</p>
            </div>

            {/* Product Characteristics - Very Compact */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 text-xs">
              {product.variety && (
                <div>
                  <p className="text-muted-foreground">Variedad</p>
                  <p className="font-medium">{product.variety}</p>
                </div>
              )}
              {product.size && (
                <div>
                  <p className="text-muted-foreground">Tamaño</p>
                  <p className="font-medium capitalize">{product.size}</p>
                </div>
              )}
              {product.harvestDays !== undefined && (
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-muted-foreground">Cosechado</p>
                  <p className="font-medium flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {product.harvestDays}d
                  </p>
                </div>
              )}
            </div>

            {/* Quantity Selector - Compact */}
            <div className="py-2">
              <QuantitySelector
                minQuantity={product.minQuantity}
                maxQuantity={product.stock || 1000}
                currentQuantity={quantity}
                onQuantityChange={setQuantity}
                unit={product.unit}
                pricePerUnit={finalPrice}
                currency={currency}
              />
            </div>

            {/* Add to Cart Button - Prominent */}
            <Button
              size="lg"
              variant="accent"
              className="w-full text-base sm:text-lg py-4 sm:py-6 font-bold"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 sm:h-6 sm:w-6 mr-2" />
              <span className="hidden xs:inline">Agregar al Carrito - {currency === 'USD' ? '$' : 'Bs.'} {totalPrice.toFixed(2)}</span>
              <span className="xs:hidden">Agregar - {currency === 'USD' ? '$' : 'Bs.'} {totalPrice.toFixed(2)}</span>
            </Button>
          </div>
        </div>

        {/* Additional Info - Compact */}
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Quality Badges */}
          {product.quality && (
            <div>
              <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">Control de Calidad</h3>
              <QualityBadges quality={product.quality} />
            </div>
          )}

          {/* Producer Info */}
          {product.producer && (
            <div>
              <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">Información del Productor</h3>
              <ProducerInfo producer={product.producer} />
            </div>
          )}
        </div>

        {/* Packaging Info - Compact */}
        {product.packaging && (
          <Card className="mb-6 sm:mb-8">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-start gap-2 sm:gap-3">
                <Box className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold mb-2 text-sm sm:text-base">Información de Empaque</h4>
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                    <div>
                      <p className="text-muted-foreground">Tipo:</p>
                      <p className="font-medium">{product.packaging.type}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Unidades/paquete:</p>
                      <p className="font-medium">{product.packaging.unitsPerPackage}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Peso/paquete:</p>
                      <p className="font-medium">{product.packaging.weightPerPackage} kg</p>
                    </div>
                    {product.stock && (
                      <div>
                        <p className="text-muted-foreground">Stock disponible:</p>
                        <p className="font-medium">{product.stock} {product.unit}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Productos Relacionados</h3>
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
