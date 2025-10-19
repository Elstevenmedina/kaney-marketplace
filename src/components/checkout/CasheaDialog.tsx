import { useState } from 'react';
import { CreditCard, Calendar, DollarSign, Check, ArrowRight, ExternalLink } from 'lucide-react';
import casheaLogo from '@/assets/cashea_logo.png';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

interface CasheaDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToCashea: (installmentData: CasheaInstallmentData) => void;
  orderTotal: number;
  currency: 'USD' | 'BS';
}

interface CasheaInstallmentData {
  installments: number;
  monthlyAmount: number;
  totalAmount: number;
  interestRate: number;
  paymentSchedule: PaymentSchedule[];
}

interface PaymentSchedule {
  installment: number;
  date: string;
  amount: number;
  status: 'pending' | 'paid' | 'overdue';
}

const installmentOptions = [
  {
    value: 3,
    label: '3 cuotas',
    description: 'Pago en 3 meses',
    interestRate: 0,
    popular: false
  },
  {
    value: 6,
    label: '6 cuotas',
    description: 'Pago en 6 meses',
    interestRate: 0,
    popular: true
  },
  {
    value: 12,
    label: '12 cuotas',
    description: 'Pago en 12 meses',
    interestRate: 0,
    popular: false
  }
];

export const CasheaDialog = ({ isOpen, onClose, onProceedToCashea, orderTotal, currency }: CasheaDialogProps) => {
  const [selectedInstallments, setSelectedInstallments] = useState(6);
  const [isProcessing, setIsProcessing] = useState(false);

  // Calcular pago inicial (40%) y cuotas (60% restante)
  const initialPayment = orderTotal * 0.40; // 40% inicial
  const remainingAmount = orderTotal * 0.60; // 60% restante
  const monthlyAmount = remainingAmount / selectedInstallments; // Dividir 60% en cuotas
  const totalAmount = orderTotal; // Sin intereses

  const generatePaymentSchedule = (installments: number): PaymentSchedule[] => {
    const schedule: PaymentSchedule[] = [];
    const today = new Date();
    
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

  const handleProceedToCashea = async () => {
    setIsProcessing(true);
    
    // Simular procesamiento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const installmentData: CasheaInstallmentData = {
      installments: selectedInstallments,
      monthlyAmount,
      totalAmount,
      interestRate: 0,
      paymentSchedule: generatePaymentSchedule(selectedInstallments)
    };
    
    onProceedToCashea(installmentData);
    setIsProcessing(false);
  };

  const paymentSchedule = generatePaymentSchedule(selectedInstallments);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2" style={{ color: '#fdfa3d' }}>
            <img 
              src={casheaLogo} 
              alt="Cashea Logo" 
              className="h-6 w-6 object-contain"
            />
            Pago en Cuotas con Cashea
          </DialogTitle>
          <DialogDescription>
            Paga tu pedido de {currency === 'USD' ? '$' : 'Bs.'} {orderTotal.toFixed(2)} en cuotas sin intereses
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Cashea Benefits */}
          <Card className="border-yellow-300 bg-yellow-50" style={{ backgroundColor: '#fdfa3d', borderColor: '#fdfa3d' }}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-black/20 flex items-center justify-center">
                  <img 
                    src={casheaLogo} 
                    alt="Cashea Logo" 
                    className="h-5 w-5 object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">¿Por qué elegir Cashea?</h3>
                  <p className="text-sm text-muted-foreground">Tu mejor opción para pagos en cuotas</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center space-y-2">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="text-sm font-medium">0% Interés</p>
                  <p className="text-xs text-muted-foreground">Sin cargos adicionales</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                    <Calendar className="h-4 w-4 text-blue-600" />
                  </div>
                  <p className="text-sm font-medium">Flexibilidad</p>
                  <p className="text-xs text-muted-foreground">Hasta 12 cuotas</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mx-auto">
                    <ExternalLink className="h-4 w-4 text-purple-600" />
                  </div>
                  <p className="text-sm font-medium">Proceso Rápido</p>
                  <p className="text-xs text-muted-foreground">Aprobación inmediata</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Installment Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Selecciona el Número de Cuotas
              </CardTitle>
              <CardDescription>
                Elige cuántas cuotas deseas para pagar tu pedido
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedInstallments.toString()} onValueChange={(value) => setSelectedInstallments(Number(value))}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {installmentOptions.map((option) => (
                    <div key={option.value}>
                      <RadioGroupItem
                        value={option.value.toString()}
                        id={`installment-${option.value}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`installment-${option.value}`}
                        className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-accent [&:has([data-state=checked])]:border-accent cursor-pointer relative"
                      >
                        {option.popular && (
                          <Badge variant="accent" className="absolute -top-2 -right-2">
                            Popular
                          </Badge>
                        )}
                        <div className="text-center">
                          <div className="text-2xl font-bold mb-1">{option.value}x</div>
                          <div className="font-semibold text-sm mb-1">{option.label}</div>
                          <div className="text-xs text-muted-foreground mb-2">{option.description}</div>
                          <div className="text-lg font-bold text-accent">
                            {currency === 'USD' ? '$' : 'Bs.'} {(orderTotal / option.value).toFixed(2)}
                          </div>
                          <div className="text-xs text-green-600 font-medium">
                            {option.interestRate}% interés
                          </div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Payment Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Resumen de Pago
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {/* Total del Pedido */}
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">Total del Pedido</p>
                  <p className="text-2xl font-bold">{currency === 'USD' ? '$' : 'Bs.'} {orderTotal.toFixed(2)}</p>
                </div>

                <Separator />

                {/* Plan de Pago */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-center">Plan de Pago Cashea</p>
                  
                  {/* Pago Inicial */}
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="text-sm font-medium">Pago Inicial (40%)</span>
                    <span className="text-lg font-bold text-yellow-800">
                      {currency === 'USD' ? '$' : 'Bs.'} {initialPayment.toFixed(2)}
                    </span>
                  </div>

                  {/* Cuotas */}
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="text-sm font-medium">+ {selectedInstallments} cuotas</span>
                      <p className="text-xs text-muted-foreground">(60% restante ÷ {selectedInstallments})</p>
                    </div>
                    <span className="text-lg font-bold text-gray-800">
                      {currency === 'USD' ? '$' : 'Bs.'} {monthlyAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Tasa de Interés</span>
                    <span className="font-medium text-green-600">0%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total a Pagar</span>
                    <span className="font-medium">{currency === 'USD' ? '$' : 'Bs.'} {totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Schedule */}
          <Card>
            <CardHeader>
              <CardTitle>Cronograma de Pagos</CardTitle>
              <CardDescription>
                Fechas y montos de cada cuota
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {paymentSchedule.map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium">{payment.installment}</span>
                      </div>
                      <div>
                        <p className="font-medium">Cuota {payment.installment}</p>
                        <p className="text-sm text-muted-foreground">{payment.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{currency === 'USD' ? '$' : 'Bs.'} {payment.amount.toFixed(2)}</p>
                      <Badge variant="outline" className="text-xs">
                        {payment.status === 'pending' ? 'Pendiente' : 'Pagado'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Process Information */}
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <ExternalLink className="h-4 w-4 text-blue-600" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">¿Qué sucede después?</h4>
                  <ol className="text-sm space-y-1">
                    <li>1. Serás redirigido a Cashea para completar tu solicitud</li>
                    <li>2. Cashea verificará tu información (proceso rápido)</li>
                    <li>3. Recibirás confirmación de aprobación inmediata</li>
                    <li>4. Tu pedido será procesado y enviado</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isProcessing}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleProceedToCashea}
              disabled={isProcessing}
              className="flex-1 gap-2"
              style={{ backgroundColor: '#000000', color: '#fdfa3d', borderColor: '#000000' }}
            >
              {isProcessing ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Procesando...
                </>
              ) : (
                <>
                  Continuar con Cashea
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>

          {isProcessing && (
            <div className="space-y-2">
              <Progress value={66} className="w-full" />
              <p className="text-sm text-center text-muted-foreground">
                Conectando con Cashea...
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
