import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, CheckCircle, ArrowLeft } from 'lucide-react';
import { CheckoutStepper } from '@/components/checkout/CheckoutStepper';
import { AuthCheck } from '@/components/checkout/AuthCheck';
import { FiscalDataForm } from '@/components/checkout/FiscalDataForm';
import { DeliveryForm } from '@/components/checkout/DeliveryForm';
import { PaymentForm } from '@/components/checkout/PaymentForm';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setCurrentStep,
  setFiscalData,
  setDeliveryInfo,
  setPaymentMethod,
  resetCheckout
} from '@/store/slices/checkoutSlice';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const steps = [
  { id: 0, name: 'Autenticación' },
  { id: 1, name: 'Datos Fiscales' },
  { id: 2, name: 'Entrega' },
  { id: 3, name: 'Pago' },
];

export default function Checkout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const currentStep = useAppSelector((state) => state.checkout.currentStep);
  const fiscalData = useAppSelector((state) => state.checkout.fiscalData);
  const deliveryInfo = useAppSelector((state) => state.checkout.deliveryInfo);
  const cartItems = useAppSelector((state) => state.cart.items);
  const currency = useAppSelector((state) => state.cart.currency);
  const exchangeRate = useAppSelector((state) => state.cart.exchangeRate);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  // Check if cart is empty
  useEffect(() => {
    if (cartItems.length === 0 && !orderCompleted) {
      toast.error('Tu carrito está vacío');
      navigate('/marketplace');
    }
  }, [cartItems, navigate, orderCompleted]);

  // Calculate order summary
  const orderSummary = {
    subtotal: cartItems.reduce((sum, item) => {
      const price = currency === 'BS' ? item.price * exchangeRate : item.price;
      return sum + (price * item.quantity);
    }, 0),
    get logistics() {
      const totalWeight = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      const baseLogistics = 2.5;
      const weightCost = totalWeight * 0.5;
      const volumeDiscount = totalWeight > 50 ? 0.8 : 1.0;
      const logistics = (baseLogistics + weightCost) * volumeDiscount;
      const freeShippingThreshold = currency === 'USD' ? 100 : 3600;
      return this.subtotal >= freeShippingThreshold ? 0 : logistics;
    },
    get tax() {
      return (this.subtotal + this.logistics) * 0.13;
    },
    get total() {
      return this.subtotal + this.logistics + this.tax;
    },
    currency,
    itemCount: cartItems.length,
  };

  // Convert to display currency
  const displaySummary = {
    ...orderSummary,
    subtotal: currency === 'BS' ? orderSummary.subtotal : orderSummary.subtotal,
    logistics: currency === 'BS' ? orderSummary.logistics : orderSummary.logistics,
    tax: currency === 'BS' ? orderSummary.tax : orderSummary.tax,
    total: currency === 'BS' ? orderSummary.total : orderSummary.total,
  };

  const handleAuthContinue = () => {
    setIsAuthenticated(true);
    dispatch(setCurrentStep(1));
    toast.success('Sesión verificada correctamente');
  };

  const handleFiscalDataNext = (data: any) => {
    dispatch(setFiscalData(data));
    dispatch(setCurrentStep(2));
    toast.success('Datos fiscales guardados');
  };

  const handleDeliveryNext = (data: any) => {
    dispatch(setDeliveryInfo(data));
    dispatch(setCurrentStep(3));
    toast.success('Información de entrega guardada');
  };

  const handlePaymentComplete = (data: any) => {
    dispatch(setPaymentMethod(data));
    
    // Simulate order creation
    setTimeout(() => {
      setOrderCompleted(true);
      toast.success('¡Pedido creado exitosamente!');
    }, 1500);
  };

  const handleStepClick = (step: number) => {
    if (step < currentStep) {
      dispatch(setCurrentStep(step));
    }
  };

  const handleBackToMarketplace = () => {
    dispatch(resetCheckout());
    navigate('/marketplace');
  };

  const handleGoBack = () => {
    if (currentStep > 0) {
      dispatch(setCurrentStep(currentStep - 1));
    } else {
      navigate('/cart');
    }
  };

  // Order Confirmation View
  if (orderCompleted) {
    return (
      <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="py-12 sm:py-16">
            <div className="text-center space-y-4 sm:space-y-6">
              <div className="flex justify-center">
                <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-secondary/20 flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-secondary" />
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold">¡Pedido Confirmado!</h2>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Tu pedido ha sido creado exitosamente
                </p>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 sm:p-6 space-y-2">
                <p className="text-xs sm:text-sm text-muted-foreground">Número de Orden</p>
                <p className="text-xl sm:text-2xl font-bold text-primary">
                  #KNY-{Math.floor(Math.random() * 100000).toString().padStart(5, '0')}
                </p>
              </div>

              <div className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                <p>✓ Recibirás un email de confirmación</p>
                <p>✓ Te notificaremos cuando tu pedido esté en camino</p>
                <p>✓ Entrega estimada: 24-48 horas</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleBackToMarketplace}
                >
                  Volver al Marketplace
                </Button>
                <Button
                  variant="accent"
                  className="flex-1"
                  onClick={() => navigate('/profile/orders')}
                >
                  Ver Mis Pedidos
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <h1 className="text-lg sm:text-xl font-bold">Proceso de Checkout</h1>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleGoBack}
              className="gap-2 text-xs sm:text-sm"
            >
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Volver Atrás</span>
              <span className="xs:hidden">Atrás</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Stepper */}
        <CheckoutStepper
          currentStep={currentStep}
          steps={steps}
          onStepClick={handleStepClick}
        />

        {/* Step Content */}
        <div className="mt-6 sm:mt-8">
          {currentStep === 0 && (
            <AuthCheck
              isAuthenticated={isAuthenticated}
              onNext={handleAuthContinue}
            />
          )}

          {currentStep === 1 && (
            <FiscalDataForm
              onNext={handleFiscalDataNext}
              onBack={() => dispatch(setCurrentStep(0))}
              initialData={fiscalData || undefined}
            />
          )}

          {currentStep === 2 && (
            <DeliveryForm
              onNext={handleDeliveryNext}
              onBack={() => dispatch(setCurrentStep(1))}
              initialData={deliveryInfo || undefined}
            />
          )}

          {currentStep === 3 && (
            <PaymentForm
              orderSummary={displaySummary}
              onComplete={handlePaymentComplete}
              onBack={() => dispatch(setCurrentStep(2))}
            />
          )}
        </div>
      </div>
    </div>
  );
}
