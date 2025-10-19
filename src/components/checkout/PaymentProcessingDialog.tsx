import { useState, useEffect } from 'react';
import { CheckCircle, Loader2, CreditCard } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCart } from '@/store/slices/cartSlice';
import { addOrder } from '@/store/slices/ordersSlice';
import { Order, OrderItem } from '@/store/slices/ordersSlice';

interface PaymentProcessingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  orderTotal: number;
  currency: 'USD' | 'BS';
  paymentMethod: string;
  paymentDetails?: Record<string, string>;
}

export const PaymentProcessingDialog = ({ 
  isOpen, 
  onClose, 
  orderTotal, 
  currency, 
  paymentMethod,
  paymentDetails
}: PaymentProcessingDialogProps) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartSubtotal = useAppSelector((state) => state.cart.subtotal);
  const cartLogistics = useAppSelector((state) => state.cart.logisticsEstimate);
  const cartTax = useAppSelector((state) => state.cart.tax);
  const checkoutData = useAppSelector((state) => state.checkout);
  
  const [isProcessing, setIsProcessing] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    if (isOpen) {
      // Simular procesamiento de pago
      const processingTimer = setTimeout(() => {
        setIsProcessing(false);
        setIsCompleted(true);
        
        // Generar número de orden aleatorio
        const newOrderNumber = `ORD-${Date.now().toString().slice(-8)}`;
        setOrderNumber(newOrderNumber);
        
        // Crear la orden
        const orderItems: OrderItem[] = cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          category: item.category || 'Sin categoría'
        }));
        
        const newOrder: Order = {
          id: `order-${Date.now()}`,
          orderNumber: newOrderNumber,
          items: orderItems,
          subtotal: cartSubtotal,
          logistics: cartLogistics,
          tax: cartTax,
          total: orderTotal,
          currency: currency,
          paymentMethod: paymentMethod,
          paymentDetails: paymentDetails,
          status: 'confirmed',
          createdAt: new Date(),
          updatedAt: new Date(),
          deliveryInfo: checkoutData.deliveryInfo ? {
            address: checkoutData.deliveryInfo.address,
            coordinates: checkoutData.deliveryInfo.coordinates || { lat: 0, lng: 0 },
            deliveryTime: checkoutData.deliveryInfo.deliveryTime || '24-48 horas'
          } : undefined
        };
        
        // Guardar la orden en el store (el middleware se encarga del localStorage)
        console.log('Guardando orden:', newOrder);
        dispatch(addOrder(newOrder));
        
        // Limpiar el carrito
        console.log('Limpiando carrito...');
        dispatch(clearCart());
        
        // Limpiar localStorage del carrito
        console.log('Limpiando localStorage del carrito...');
        localStorage.removeItem('kaney_cart');
        
        // Verificar que se guardó la orden
        setTimeout(() => {
          const savedOrders = localStorage.getItem('kaney_orders');
          console.log('Órdenes guardadas en localStorage:', savedOrders);
        }, 100);
        
      }, 3000);

      return () => clearTimeout(processingTimer);
    } else {
      // Resetear estado cuando se cierra
      setIsProcessing(true);
      setIsCompleted(false);
      setOrderNumber('');
    }
  }, [isOpen, dispatch, cartItems, cartSubtotal, cartLogistics, cartTax, orderTotal, currency, paymentMethod, paymentDetails, checkoutData.deliveryInfo]);

  const handleClose = () => {
    setIsProcessing(true);
    setIsCompleted(false);
    setOrderNumber('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {isProcessing ? 'Procesando Pago' : 'Pago Confirmado'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-6">
          {isProcessing ? (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-medium">Procesando tu pago...</p>
                <p className="text-sm text-muted-foreground">
                  Por favor espera mientras verificamos tu {paymentMethod.toLowerCase()}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-green-100 animate-ping"></div>
                  <div className="relative p-3 rounded-full bg-green-100">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-lg font-medium text-green-600">¡Pago Exitoso!</p>
                <p className="text-sm text-muted-foreground">
                  Tu pago ha sido procesado correctamente
                </p>
              </div>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <CreditCard className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-800">Detalles del Pago</span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monto:</span>
                      <span className="font-medium">
                        {currency === 'USD' ? '$' : 'Bs.'} {orderTotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Método:</span>
                      <span className="font-medium">{paymentMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Número de Orden:</span>
                      <span className="font-medium text-green-600">{orderNumber}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-2">
                <p className="text-sm font-medium">¿Qué sigue?</p>
                <p className="text-xs text-muted-foreground">
                  Recibirás un email de confirmación con los detalles de tu pedido. 
                  Nuestro equipo se pondrá en contacto contigo para coordinar la entrega.
                </p>
              </div>
            </div>
          )}
        </div>

      </DialogContent>
    </Dialog>
  );
};
