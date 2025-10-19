import { useState } from 'react';
import { CreditCard, Smartphone, DollarSign, Upload } from 'lucide-react';
import casheaLogoSimple from '@/assets/cashea_logo_simple.png';
import casheaLogo from '@/assets/cashea_logo.png';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { PaymentMethodModal } from './PaymentMethodModal';
import { CasheaRedirectDialog } from './CasheaRedirectDialog';
import { ShippingInfo } from './ShippingInfo';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCart } from '@/store/slices/cartSlice';
import { addOrder } from '@/store/slices/ordersSlice';
import { Order, OrderItem } from '@/store/slices/ordersSlice';

interface PaymentFormProps {
  orderSummary: {
    subtotal: number;
    logistics: number;
    tax: number;
    total: number;
    currency: 'USD' | 'BS';
    itemCount: number;
  };
  deliveryInfo?: {
    coordinates: { lat: number; lng: number };
    address: string;
    deliveryTime: string;
  };
  onComplete: (paymentData: any) => void;
  onBack: () => void;
  loading?: boolean;
}

export const PaymentForm = ({ orderSummary, deliveryInfo, onComplete, onBack, loading }: PaymentFormProps) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartSubtotal = useAppSelector((state) => state.cart.subtotal);
  const cartLogistics = useAppSelector((state) => state.cart.logisticsEstimate);
  const cartTax = useAppSelector((state) => state.cart.tax);
  
  const [paymentType, setPaymentType] = useState<'full' | 'installments'>('full');
  const [installments, setInstallments] = useState(6);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showCasheaDialog, setShowCasheaDialog] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<any>(null);

  const processPaymentAndCreateOrder = (paymentData: any) => {
    console.log('Procesando pago y creando orden...', paymentData);
    
    // Crear la orden
    const orderItems: OrderItem[] = cartItems.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
      category: 'Sin categoría' // Valor por defecto ya que CartItem no tiene category
    }));
    
    const newOrder: Order = {
      id: `order-${Date.now()}`,
      orderNumber: `ORD-${Date.now().toString().slice(-8)}`,
      items: orderItems,
      subtotal: cartSubtotal,
      logistics: cartLogistics,
      tax: cartTax,
      total: orderSummary.total,
      currency: orderSummary.currency,
      paymentMethod: paymentData.method || paymentData.type,
      paymentDetails: paymentData,
      status: 'confirmed',
      createdAt: new Date(),
      updatedAt: new Date(),
      deliveryInfo: deliveryInfo ? {
        address: deliveryInfo.address,
        coordinates: { lat: 0, lng: 0 },
        deliveryTime: deliveryInfo.deliveryTime || '24-48 horas'
      } : undefined
    };
    
    // Guardar la orden en el store (el middleware se encarga del localStorage)
    dispatch(addOrder(newOrder));
    
    // Limpiar el carrito
    dispatch(clearCart());
    
    // Limpiar localStorage del carrito
    localStorage.removeItem('kaney_cart');
    
    console.log('Orden creada y carrito limpiado:', newOrder);
    
    // Llamar a la función onComplete original
    onComplete(paymentData);
  };

  const handlePaymentMethodSelect = (method: any) => {
    setSelectedPaymentMethod(method);
    const paymentData = {
      type: 'full',
      method: method,
      orderTotal: orderSummary.total,
      currency: orderSummary.currency
    };
    processPaymentAndCreateOrder(paymentData);
  };

  const handleCasheaProceed = (installmentData: any) => {
    const paymentData = {
      type: 'installments',
      method: 'cashea',
      installmentData,
      orderTotal: orderSummary.total,
      currency: orderSummary.currency
    };
    processPaymentAndCreateOrder(paymentData);
  };

  const scrollToBottom = () => {
    console.log('Ejecutando scrollToBottom...');
    
    // Método más directo y confiable
    const scrollToEnd = () => {
      window.scrollTo({
        top: document.documentElement.scrollHeight - window.innerHeight,
        behavior: 'smooth'
      });
    };
    
    // Ejecutar inmediatamente
    scrollToEnd();
    
    // Ejecutar después de un pequeño delay para asegurar que funcione
    setTimeout(scrollToEnd, 100);
    
    // Fallback adicional
    setTimeout(() => {
      console.log('Ejecutando fallback final...');
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }, 300);
  };

  const handleContinuePayment = () => {
    console.log('handleContinuePayment ejecutado, paymentType:', paymentType);
    if (paymentType === 'full') {
      setShowPaymentModal(true);
      console.log('Abriendo PaymentMethodModal...');
      // Scroll hacia el final de la página después de que se abra el diálogo
      setTimeout(scrollToBottom, 300);
    } else {
      setShowCasheaDialog(true);
      console.log('Abriendo CasheaRedirectDialog...');
      // Scroll hacia el final de la página después de que se abra el diálogo
      setTimeout(scrollToBottom, 300);
    }
  };

  // Calcular pago inicial (40%) y cuotas (60% restante)
  const initialPayment = orderSummary.total * 0.40; // 40% inicial
  const remainingAmount = orderSummary.total * 0.60; // 60% restante
  const installmentAmount = remainingAmount / installments; // Dividir 60% en cuotas

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Payment Options */}
      <div className="lg:col-span-2 space-y-6">
        {/* Shipping Information */}
        <ShippingInfo
          deliveryInfo={deliveryInfo}
          shippingCost={orderSummary.logistics}
          currency={orderSummary.currency}
          estimatedDelivery="24-48 horas"
        />
        {/* Payment Type Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Método de Pago</CardTitle>
            <CardDescription>
              Selecciona cómo deseas pagar tu pedido
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup 
              value={paymentType} 
              onValueChange={(v: any) => {
                console.log('Método de pago seleccionado:', v);
                setPaymentType(v);
                // Scroll hacia el final de la página cuando se seleccione un método
                setTimeout(scrollToBottom, 100);
              }}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Full Payment */}
                <div>
                  <RadioGroupItem
                    value="full"
                    id="full"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="full"
                    className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-transparent p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <DollarSign className="h-8 w-8 mb-3" />
                    <div className="text-center">
                      <div className="font-semibold mb-1">Pago Completo</div>
                      <div className="text-sm text-muted-foreground">
                        Paga el total ahora
                      </div>
                    </div>
                  </Label>
                </div>

                {/* Installments */}
                <div>
                  <RadioGroupItem
                    value="installments"
                    id="installments"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="installments"
                    className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-transparent p-6 cursor-pointer transition-all duration-200 hover:border-yellow-400 hover:bg-yellow-50 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    style={{
                      backgroundColor: paymentType === 'installments' ? '#fdfa3d' : 'transparent',
                      borderColor: paymentType === 'installments' ? '#fdfa3d' : undefined,
                      color: paymentType === 'installments' ? '#000000' : undefined
                    }}
                    onMouseEnter={(e) => {
                      if (paymentType !== 'installments') {
                        e.currentTarget.style.backgroundColor = '#fdfa3d';
                        e.currentTarget.style.borderColor = '#fdfa3d';
                        e.currentTarget.style.color = '#000000';
                        
                        // Cambiar color del icono
                        const icon = e.currentTarget.querySelector('svg');
                        if (icon) icon.style.color = '#000000';
                        
                        // Cambiar color del texto
                        const title = e.currentTarget.querySelector('.font-semibold');
                        if (title) title.style.color = '#000000';
                        
                        const subtitle = e.currentTarget.querySelector('.text-sm');
                        if (subtitle) subtitle.style.color = '#374151';
                        
                        // Cambiar color del badge
                        const badge = e.currentTarget.querySelector('.badge');
                        if (badge) {
                          badge.style.backgroundColor = '#000000';
                          badge.style.color = '#fdfa3d';
                        }
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (paymentType !== 'installments') {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.borderColor = '';
                        e.currentTarget.style.color = '';
                        
                        // Restaurar color del icono
                        const icon = e.currentTarget.querySelector('svg');
                        if (icon) icon.style.color = '';
                        
                        // Restaurar color del texto
                        const title = e.currentTarget.querySelector('.font-semibold');
                        if (title) title.style.color = '';
                        
                        const subtitle = e.currentTarget.querySelector('.text-sm');
                        if (subtitle) subtitle.style.color = '';
                        
                        // Restaurar color del badge
                        const badge = e.currentTarget.querySelector('.badge');
                        if (badge) {
                          badge.style.backgroundColor = '';
                          badge.style.color = '';
                        }
                      }
                    }}
                  >
                  <div className="inline-flex items-center justify-center " style={{ width: '20px', }}>
                    <img 
                      src={casheaLogoSimple} 
                      alt="Cashea Logo" 
                      className=""
                    />
                  </div>
                    <div className="text-center">
                      <div className="font-semibold mb-1 transition-colors duration-200" style={{ color: paymentType === 'installments' ? '#000000' : undefined }}>
                        Cuotas con Cashea
                      </div>
                      <div className="text-sm transition-colors duration-200" style={{ color: paymentType === 'installments' ? '#374151' : undefined }}>
                        Paga en cuotas sin interés
                      </div>
                    </div>
                    <Badge 
                      variant="success" 
                      className="mt-2 transition-colors duration-200"
                      style={{ 
                        backgroundColor: paymentType === 'installments' ? '#000000' : undefined,
                        color: paymentType === 'installments' ? '#fdfa3d' : undefined
                      }}
                    >
                      0% Interés
                    </Badge>
                  </Label>
                </div>
              </div>
            </RadioGroup>

            {/* Installments Options */}
            {paymentType === 'installments' && (
              <div className="space-y-4 animate-fade-in">
                <Separator />
                <div>
                  <Label className="mb-3 block">Número de Cuotas</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {[3, 6, 12].map((num) => (
                      <Button
                        key={num}
                        type="button"
                        variant={installments === num ? 'default' : 'outline'}
                        onClick={() => setInstallments(num)}
                        className="h-auto py-4"
                      >
                        <div className="text-center">
                          <div className="text-lg font-bold">{num}x</div>
                          <div className="text-xs opacity-80">
                            {orderSummary.currency === 'USD' ? '$' : 'Bs.'}{' '}
                            {(orderSummary.total / num).toFixed(2)}
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment Method Selection */}
        {paymentType === 'full' && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Forma de Pago</CardTitle>
              <CardDescription>
                Selecciona tu método de pago preferido
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="bg-muted/50 rounded-lg p-6">
                  <CreditCard className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-semibold mb-2">Múltiples Opciones de Pago</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Elige entre transferencia bancaria, pago móvil, criptomonedas y más
                  </p>
                  <Button 
                    onClick={() => setShowPaymentModal(true)}
                    variant="accent"
                    className="w-full"
                  >
                    Seleccionar Método de Pago
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Cashea Integration */}
        {paymentType === 'installments' && (
          <Card className="animate-fade-in" style={{ borderColor: '#fdfa3d' }}>
            <CardContent className="pt-6" style={{ backgroundColor: '#fdfa3d' }}>
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center " style={{ width: '200px', }}>
                  <img 
                    src={casheaLogo} 
                    alt="Cashea Logo" 
                    className=""
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-700">
                    Paga en cuotas sin intereses con Cashea
                  </p>
                </div>
                <div className="bg-white/80 rounded-lg p-4">
                  <p className="text-sm font-medium mb-3" style={{ color: '#000000' }}>Plan de Pago:</p>
                  
                  {/* Pago Inicial */}
                  <div className="mb-3 pb-3 border-b border-gray-200">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Pago Inicial (40%):</span>
                      <span className="text-lg font-bold" style={{ color: '#000000' }}>
                        {orderSummary.currency === 'USD' ? '$' : 'Bs.'} {initialPayment.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Cuotas */}
                  <div className="text-center">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Más {installments} cuotas de:</span>
                      <span className="text-xl font-bold" style={{ color: '#000000' }}>
                        {orderSummary.currency === 'USD' ? '$' : 'Bs.'} {installmentAmount.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">
                      (60% restante ÷ {installments}) • Sin intereses • 0% Comisión
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={() => {
                    console.log('Botón Cashea clickeado...');
                    setShowCasheaDialog(true);
                    console.log('Abriendo CasheaRedirectDialog...');
                    // Scroll hacia el final de la página después de que se abra el diálogo
                    setTimeout(scrollToBottom, 300);
                  }}
                  className="w-full"
                  style={{ backgroundColor: '#000000', color: '#fdfa3d', borderColor: '#000000' }}
                >
                  Continuar con Cashea
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={loading}
            className="flex-1"
          >
            Atrás
          </Button>
          {paymentType === 'full' && (
            <Button
              type="button"
              variant="accent"
              onClick={handleContinuePayment}
              disabled={loading}
              className="flex-1"
            >
              Continuar al Pago
            </Button>
          )}
        </div>
      </div>

      {/* Order Summary Sidebar */}
      <div className="lg:col-span-1">
        <Card className="sticky top-4">
          <CardHeader>
            <CardTitle>Resumen del Pedido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Subtotal ({orderSummary.itemCount} items)
                </span>
                <span className="font-medium">
                  {orderSummary.currency === 'USD' ? '$' : 'Bs.'}{' '}
                  {orderSummary.subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Logística</span>
                <span className="font-medium">
                  {orderSummary.currency === 'USD' ? '$' : 'Bs.'}{' '}
                  {orderSummary.logistics.toFixed(2)}
                </span>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-2xl font-bold text-primary">
                  {orderSummary.currency === 'USD' ? '$' : 'Bs.'}{' '}
                  {orderSummary.total.toFixed(2)}
                </span>
              </div>

              {paymentType === 'installments' && (
                <>
                  <Separator />
                  <div className="bg-accent/10 rounded-lg p-4 space-y-3">
                    <p className="text-sm font-medium text-center">Plan de Pago Cashea</p>
                    
                    {/* Pago Inicial */}
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Inicial (40%):</span>
                      <span className="font-bold text-accent">
                        {orderSummary.currency === 'USD' ? '$' : 'Bs.'} {initialPayment.toFixed(2)}
                      </span>
                    </div>
                    
                    {/* Cuotas */}
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">+ {installments} cuotas:</span>
                      <span className="font-bold text-accent">
                        {orderSummary.currency === 'USD' ? '$' : 'Bs.'} {installmentAmount.toFixed(2)}
                      </span>
                    </div>
                    
                    <div className="text-xs text-center text-muted-foreground pt-2 border-t">
                      (60% restante ÷ {installments})
                    </div>
                  </div>
                </>
              )}
            </div>

            <Separator />

            <div className="space-y-2 text-xs text-muted-foreground">
              <p>✓ Compra segura y protegida</p>
              <p>✓ Garantía de satisfacción</p>
              <p>✓ Devoluciones sin costo</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Method Modal */}
      <PaymentMethodModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSelectMethod={handlePaymentMethodSelect}
        orderTotal={orderSummary.total}
        currency={orderSummary.currency}
      />

      {/* Cashea Redirect Dialog */}
      <CasheaRedirectDialog
        isOpen={showCasheaDialog}
        onClose={() => setShowCasheaDialog(false)}
        onPaymentSuccess={handleCasheaProceed}
        orderTotal={orderSummary.total}
        currency={orderSummary.currency}
        installments={installments}
      />
    </div>
  );
};
