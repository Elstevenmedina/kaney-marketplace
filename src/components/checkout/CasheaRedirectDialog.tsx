import { useState, useEffect } from 'react';
import { CheckCircle, ExternalLink, Loader2 } from 'lucide-react';
import casheaLogo from '@/assets/cashea_logo.png';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';

interface CasheaRedirectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (installmentData: any) => void;
  orderTotal: number;
  currency: 'USD' | 'BS';
  installments: number;
}

export const CasheaRedirectDialog = ({ 
  isOpen, 
  onClose, 
  onPaymentSuccess, 
  orderTotal, 
  currency, 
  installments 
}: CasheaRedirectDialogProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const steps = [
    { 
      title: 'Redirigiendo a Cashea...', 
      description: 'Conectando con el sistema de pagos',
      progress: 25 
    },
    { 
      title: 'Procesando solicitud...', 
      description: 'Verificando información de pago',
      progress: 50 
    },
    { 
      title: 'Validando datos...', 
      description: 'Confirmando detalles de la transacción',
      progress: 75 
    },
    { 
      title: '¡Pago aprobado!', 
      description: 'Tu solicitud ha sido procesada exitosamente',
      progress: 100 
    }
  ];

  useEffect(() => {
    if (isOpen) {
      setIsProcessing(true);
      setCurrentStep(0);
      
      // Simular el proceso de redirección y pago
      const stepInterval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < steps.length - 1) {
            return prev + 1;
            } else {
              clearInterval(stepInterval);
              // Después del último paso, simular éxito del pago y redirigir automáticamente
              setTimeout(() => {
                const installmentData = {
                  installments,
                  monthlyAmount: (orderTotal * 0.60) / installments,
                  totalAmount: orderTotal,
                  interestRate: 0,
                  paymentSchedule: generatePaymentSchedule(installments)
                };
                onPaymentSuccess(installmentData);
                setIsProcessing(false);
                
                // Cerrar el diálogo después de 3 segundos para dar tiempo a que se procese el pago
                setTimeout(() => {
                  onClose();
                }, 3000);
              }, 1500);
              return prev;
            }
        });
      }, 2000);

      return () => clearInterval(stepInterval);
    }
  }, [isOpen, installments, orderTotal, onPaymentSuccess]);

  const generatePaymentSchedule = (installments: number) => {
    const schedule = [];
    const today = new Date();
    const monthlyAmount = (orderTotal * 0.60) / installments;
    
    for (let i = 1; i <= installments; i++) {
      const paymentDate = new Date(today);
      paymentDate.setMonth(paymentDate.getMonth() + i);
      
      schedule.push({
        installment: i,
        date: paymentDate.toLocaleDateString('es-VE', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        amount: monthlyAmount,
        status: 'pending'
      });
    }
    
    return schedule;
  };

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2" style={{ color: '#000000' }}>
            <img 
              src={casheaLogo} 
              alt="Cashea Logo" 
              className="h-6 w-6 object-contain"
            />
            {isLastStep ? 'Pago Exitoso' : 'Procesando con Cashea'}
          </DialogTitle>
          <DialogDescription>
            {isLastStep 
              ? `Tu pedido de ${currency === 'USD' ? '$' : 'Bs.'} ${orderTotal.toFixed(2)} ha sido procesado`
              : 'Por favor espera mientras procesamos tu solicitud'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Indicator */}
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              {isLastStep ? (
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              ) : (
                <div className="h-16 w-16 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 text-yellow-600 animate-spin" />
                </div>
              )}
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-lg">{currentStepData.title}</h3>
              <p className="text-sm text-muted-foreground">{currentStepData.description}</p>
            </div>

            <Progress value={currentStepData.progress} className="w-full" />
          </div>

          {/* Payment Summary */}
          {isLastStep && (
            <div className="bg-green-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">Resumen del Pago</span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Pago inicial (40%):</span>
                  <span className="font-medium">
                    {currency === 'USD' ? '$' : 'Bs.'} {(orderTotal * 0.40).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>+ {installments} cuotas:</span>
                  <span className="font-medium">
                    {currency === 'USD' ? '$' : 'Bs.'} {((orderTotal * 0.60) / installments).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between font-semibold pt-2 border-t">
                  <span>Total:</span>
                  <span>{currency === 'USD' ? '$' : 'Bs.'} {orderTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Actions - Solo mostrar botón cancelar durante el proceso */}
          {!isLastStep && (
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isProcessing}
              >
                Cancelar
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
