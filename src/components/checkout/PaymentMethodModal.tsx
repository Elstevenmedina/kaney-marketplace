import React, { useState } from 'react';
import { CreditCard, Smartphone, DollarSign, Building2, CreditCard as CardIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { PaymentProcessingDialog } from './PaymentProcessingDialog';

interface PaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMethod: (method: PaymentMethodData) => void;
  orderTotal: number;
  currency: 'USD' | 'BS';
}

interface PaymentMethodData {
  type: 'bank_transfer' | 'mobile_payment' | 'card_national' | 'card_international';
  details: {
    bankName?: string;
    accountNumber?: string;
    reference?: string;
    phoneNumber?: string;
    cardNumber?: string;
    cardHolder?: string;
    expiryDate?: string;
    cvv?: string;
    paymentDate?: string;
  };
  proof?: File;
}

const paymentMethods = [
  {
    id: 'bank_transfer',
    name: 'Transferencia Bancaria',
    icon: Building2,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  {
    id: 'mobile_payment',
    name: 'Pago Móvil',
    icon: Smartphone,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  {
    id: 'card_national',
    name: 'Tarjeta Débito/Crédito Nacional',
    icon: CardIcon,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  {
    id: 'card_international',
    name: 'Tarjeta Débito/Crédito Internacional',
    icon: CreditCard,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  }
];

export const PaymentMethodModal = ({ isOpen, onClose, onSelectMethod, orderTotal, currency }: PaymentMethodModalProps) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [paymentDetails, setPaymentDetails] = useState<Record<string, string>>({});
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProofFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!selectedMethod) return;

    // Validar campos requeridos según el método
    const method = paymentMethods.find(m => m.id === selectedMethod);
    if (!method) return;

    // Validaciones básicas
    if (selectedMethod === 'card_national' || selectedMethod === 'card_international') {
      if (!paymentDetails.cardNumber || !paymentDetails.cardHolder || !paymentDetails.expiryDate || !paymentDetails.cvv) {
        alert('Por favor completa todos los campos requeridos');
        return;
      }
    } else if (selectedMethod === 'bank_transfer') {
      if (!paymentDetails.reference || !proofFile) {
        alert('Por favor completa todos los campos requeridos');
        return;
      }
    } else if (selectedMethod === 'mobile_payment') {
      if (!paymentDetails.phoneNumber || !paymentDetails.reference || !paymentDetails.bankName || !paymentDetails.paymentDate) {
        alert('Por favor completa todos los campos requeridos');
        return;
      }
    }

    // Iniciar procesamiento de pago
    setIsProcessingPayment(true);
    
    const methodData: PaymentMethodData = {
      type: selectedMethod as 'bank_transfer' | 'mobile_payment' | 'card_national' | 'card_international',
      details: paymentDetails,
      proof: proofFile || undefined
    };

    onSelectMethod(methodData);
  };

  const handleProcessingClose = () => {
    setIsProcessingPayment(false);
    onClose();
  };

  const renderPaymentForm = () => {
    switch (selectedMethod) {
      case 'bank_transfer':
        return (
          <div className="space-y-3">
            {/* Monto a pagar */}
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium">Monto a pagar:</span>
                <div className="text-right">
                  <div className="font-semibold">${orderTotal.toFixed(2)} USD</div>
                  <div className="text-muted-foreground">Bs. {(orderTotal * 205.67).toFixed(2)}</div>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-3 space-y-2">
              <p className="font-medium text-sm">Datos para transferencia:</p>
              <div className="text-xs space-y-1">
                <p><strong>Banco:</strong> Banco Nacional de Venezuela</p>
                <p><strong>Cuenta Corriente:</strong> 0102-1234-5678-9012</p>
                <p><strong>Titular:</strong> Kaney Marketplace S.A.</p>
                <p><strong>RIF:</strong> J-12345678-9</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reference">Número de Referencia *</Label>
              <Input
                id="reference"
                placeholder="Ingresa el número de referencia de la transferencia"
                value={paymentDetails.reference || ''}
                onChange={(e) => setPaymentDetails({ ...paymentDetails, reference: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="proof">Comprobante de Transferencia *</Label>
              <Input
                id="proof"
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileUpload}
                className="cursor-pointer"
              />
              {proofFile && (
                <p className="text-xs text-muted-foreground">
                  Archivo: {proofFile.name}
                </p>
              )}
            </div>
          </div>
        );

      case 'mobile_payment':
        return (
          <div className="space-y-3">
            {/* Monto a pagar */}
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium">Monto a pagar:</span>
                <div className="text-right">
                  <div className="font-semibold">${orderTotal.toFixed(2)} USD</div>
                  <div className="text-muted-foreground">Bs. {(orderTotal * 205.67).toFixed(2)}</div>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-3 space-y-2">
              <p className="font-medium text-sm">Datos para Pago Móvil:</p>
              <div className="text-xs space-y-1">
                <p><strong>Teléfono:</strong> +58 412 123 4567</p>
                <p><strong>Cédula:</strong> 12345678</p>
                <p><strong>Banco:</strong> Banco Nacional</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Tu Teléfono *</Label>
                <Input
                  id="phoneNumber"
                  placeholder="+58 412 123 4567"
                  value={paymentDetails.phoneNumber || ''}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, phoneNumber: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="referenceMobile">Número de Referencia *</Label>
                <Input
                  id="referenceMobile"
                  placeholder="Número de referencia del pago móvil"
                  value={paymentDetails.reference || ''}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, reference: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="bankMobile">Banco de Origen *</Label>
                <select
                  id="bankMobile"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={paymentDetails.bankName || ''}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, bankName: e.target.value })}
                  aria-label="Banco de origen del pago móvil"
                >
                  <option value="">Seleccionar banco</option>
                  <option value="banco_nacional">Banco Nacional de Venezuela</option>
                  <option value="banco_venezuela">Banco de Venezuela</option>
                  <option value="banco_provincial">Banco Provincial</option>
                  <option value="banco_mercantil">Banco Mercantil</option>
                  <option value="banco_bicentenario">Banco Bicentenario</option>
                  <option value="banco_venezolano">Banco Venezolano de Crédito</option>
                  <option value="banco_exterior">Banco del Tesoro</option>
                  <option value="banco_otro">Otro</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentDate">Fecha del Pago *</Label>
                <Input
                  id="paymentDate"
                  type="date"
                  value={paymentDetails.paymentDate || ''}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, paymentDate: e.target.value })}
                />
              </div>
            </div>
          </div>
        );


      case 'card_national':
        return (
          <div className="space-y-3">
            {/* Monto a pagar */}
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium">Monto a pagar:</span>
                <div className="text-right">
                  <div className="font-semibold">${orderTotal.toFixed(2)} USD</div>
                  <div className="text-muted-foreground">Bs. {(orderTotal * 205.67).toFixed(2)}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Número de Tarjeta *</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={paymentDetails.cardNumber || ''}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardHolder">Titular de la Tarjeta *</Label>
                <Input
                  id="cardHolder"
                  placeholder="Juan Pérez"
                  value={paymentDetails.cardHolder || ''}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, cardHolder: e.target.value })}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Fecha de Vencimiento *</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/AA"
                  value={paymentDetails.expiryDate || ''}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV *</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={paymentDetails.cvv || ''}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
                />
              </div>
            </div>
          </div>
        );

      case 'card_international':
        return (
          <div className="space-y-3">
            {/* Monto a pagar */}
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium">Monto a pagar:</span>
                <div className="text-right">
                  <div className="font-semibold">${orderTotal.toFixed(2)} USD</div>
                  <div className="text-muted-foreground">Bs. {(orderTotal * 205.67).toFixed(2)}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="cardNumberInt">Número de Tarjeta *</Label>
                <Input
                  id="cardNumberInt"
                  placeholder="1234 5678 9012 3456"
                  value={paymentDetails.cardNumber || ''}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardHolderInt">Titular de la Tarjeta *</Label>
                <Input
                  id="cardHolderInt"
                  placeholder="Juan Pérez"
                  value={paymentDetails.cardHolder || ''}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, cardHolder: e.target.value })}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="expiryDateInt">Fecha de Vencimiento *</Label>
                <Input
                  id="expiryDateInt"
                  placeholder="MM/AA"
                  value={paymentDetails.expiryDate || ''}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvvInt">CVV *</Label>
                <Input
                  id="cvvInt"
                  placeholder="123"
                  value={paymentDetails.cvv || ''}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Selecciona tu Método de Pago</DialogTitle>
          <DialogDescription>
            Elige cómo deseas pagar tu pedido de {currency === 'USD' ? '$' : 'Bs.'} {orderTotal.toFixed(2)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Payment Method Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              const isSelected = selectedMethod === method.id;
              
              return (
                <Card
                  key={method.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    isSelected ? `${method.borderColor} border-2` : 'border-2 border-transparent'
                  }`}
                  onClick={() => setSelectedMethod(method.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${method.bgColor}`}>
                        <Icon className={`h-5 w-5 ${method.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{method.name}</h3>
                      </div>
                      {isSelected && (
                        <div className="flex-shrink-0">
                          <Badge variant="default">Seleccionado</Badge>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Payment Form */}
          {selectedMethod && (
            <div className="space-y-4 animate-fade-in">
              <Separator />
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {React.createElement(paymentMethods.find(m => m.id === selectedMethod)?.icon || CreditCard, { className: "h-5 w-5" })}
                    {paymentMethods.find(m => m.id === selectedMethod)?.name}
                  </CardTitle>
                  <CardDescription>
                    Completa los datos para procesar tu pago
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {renderPaymentForm()}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              variant="accent"
              onClick={handleSubmit}
              disabled={!selectedMethod}
              className="flex-1"
            >
              Confirmar Pago
            </Button>
          </div>
        </div>
      </DialogContent>
      
      {/* Payment Processing Dialog */}
      <PaymentProcessingDialog
        isOpen={isProcessingPayment}
        onClose={handleProcessingClose}
        orderTotal={orderTotal}
        currency={currency}
        paymentMethod={paymentMethods.find(m => m.id === selectedMethod)?.name || ''}
        paymentDetails={paymentDetails}
      />
    </Dialog>
  );
};
