import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CartItem } from '@/components/marketplace/CartItem';
import { OrderSummary } from '@/components/marketplace/OrderSummary';
import { EmptyCart } from '@/components/marketplace/EmptyCart';
import { RecommendedProducts } from '@/components/marketplace/RecommendedProducts';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { removeFromCart, updateQuantity, toggleCurrency } from '@/store/slices/cartSlice';
import { mockProducts } from '@/data/mockProducts';
import { toast } from 'sonner';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const currency = useAppSelector((state) => state.cart.currency);
  const exchangeRate = useAppSelector((state) => state.cart.exchangeRate);

  // Calculate totals
  const calculations = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    // Calculate total weight for logistics
    const totalWeight = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    
    // Logistics calculation: base rate + weight-based cost
    const baseLogistics = 2.5; // Base USD
    const weightCost = totalWeight * 0.5; // $0.50 per kg
    const volumeDiscount = totalWeight > 50 ? 0.8 : 1.0; // 20% discount for bulk
    const logistics = (baseLogistics + weightCost) * volumeDiscount;
    
    // Free shipping threshold
    const freeShippingThreshold = currency === 'USD' ? 100 : 3600;
    const finalLogistics = subtotal >= freeShippingThreshold ? 0 : logistics;
    
    // Total (no tax calculation)
    const total = subtotal + finalLogistics;

    // Convert to selected currency
    const displaySubtotal = currency === 'BS' ? subtotal * exchangeRate : subtotal;
    const displayLogistics = currency === 'BS' ? finalLogistics * exchangeRate : finalLogistics;
    const displayTotal = currency === 'BS' ? total * exchangeRate : total;

    return {
      subtotal: displaySubtotal,
      logistics: displayLogistics,
      total: displayTotal,
    };
  }, [cartItems, currency, exchangeRate]);

  // Get recommended products (featured products not in cart)
  const recommendedProducts = useMemo(() => {
    const cartProductIds = new Set(cartItems.map(item => item.id));
    return mockProducts
      .filter(product => product.featured && !cartProductIds.has(product.id))
      .slice(0, 4);
  }, [cartItems]);

  const handleRemoveItem = (id: string) => {
    const item = cartItems.find(i => i.id === id);
    dispatch(removeFromCart(id));
    if (item) {
      toast.success(`${item.name} eliminado del carrito`);
    }
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    const item = cartItems.find(i => i.id === id);
    if (item && newQuantity >= 5) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
      toast.success('Cantidad actualizada');
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleCurrencyToggle = () => {
    dispatch(toggleCurrency());
  };

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b bg-card">
          <div className="container mx-auto px-4 py-4">
            <Button variant="ghost" asChild>
              <Link to="/marketplace">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al Marketplace
              </Link>
            </Button>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <EmptyCart />
          
          {/* Featured Products */}
          {mockProducts.filter(p => p.featured).length > 0 && (
            <div className="mt-12 sm:mt-16">
              <RecommendedProducts
                products={mockProducts.filter(p => p.featured).slice(0, 4)}
                title="Productos Destacados"
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" asChild>
              <Link to="/marketplace">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continuar Comprando
              </Link>
            </Button>
            
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Page Title */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
            Mi Carrito
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Revisa tus productos y procede al checkout
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                currency={currency}
                exchangeRate={exchangeRate}
                onQuantityChange={(quantity) => handleUpdateQuantity(item.id, quantity)}
                onRemove={() => handleRemoveItem(item.id)}
              />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              subtotal={calculations.subtotal}
              logisticsEstimate={calculations.logistics}
              tax={0}
              total={calculations.total}
              currency={currency}
              onCheckout={handleCheckout}
              onCurrencyToggle={handleCurrencyToggle}
              itemCount={cartItems.length}
            />
          </div>
        </div>

        {/* Recommended Products */}
        {recommendedProducts.length > 0 && (
          <>
            <Separator className="my-8 sm:my-12" />
            <RecommendedProducts
              products={recommendedProducts}
              title="También te puede interesar"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
