import { useState } from 'react';
import { CreditCard, Smartphone, DollarSign, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface PaymentFormProps {
  orderSummary: {
    subtotal: number;
    logistics: number;
    tax: number;
    total: number;
    currency: 'USD' | 'BS';
    itemCount: number;
  };
  onComplete: (paymentData: {
    type: 'full' | 'installments';
    method: 'transfer' | 'mobile' | 'cashea';
    installments?: number;
    proof?: string;
    reference?: string;
  }) => void;
  onBack: () => void;
  loading?: boolean;
}

export const PaymentForm = ({ orderSummary, onComplete, onBack, loading }: PaymentFormProps) => {
  const [paymentType, setPaymentType] = useState<'full' | 'installments'>('full');
  const [paymentMethod, setPaymentMethod] = useState<'transfer' | 'mobile' | 'cashea'>('transfer');
  const [installments, setInstallments] = useState(3);
  const [reference, setReference] = useState('');
  const [proofFile, setProofFile] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProofFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    const paymentData = {
      type: paymentType,
      method: paymentMethod,
      ...(paymentType === 'installments' && { installments }),
      ...(reference && { reference }),
      ...(proofFile && { proof: proofFile.name }),
    };
    onComplete(paymentData);
  };

  const installmentAmount = orderSummary.total / installments;

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Payment Options */}
      <div className="lg:col-span-2 space-y-6">
        {/* Payment Type Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Método de Pago</CardTitle>
            <CardDescription>
              Selecciona cómo deseas pagar tu pedido
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup value={paymentType} onValueChange={(v: any) => setPaymentType(v)}>
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
                    className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-transparent p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <CreditCard className="h-8 w-8 mb-3" />
                    <div className="text-center">
                      <div className="font-semibold mb-1">Cuotas con Cashea</div>
                      <div className="text-sm text-muted-foreground">
                        Paga en cuotas sin interés
                      </div>
                    </div>
                    <Badge variant="success" className="mt-2">0% Interés</Badge>
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
              <RadioGroup value={paymentMethod} onValueChange={(v: any) => setPaymentMethod(v)}>
                <div className="space-y-3">
                  {/* Transfer */}
                  <div>
                    <RadioGroupItem
                      value="transfer"
                      id="transfer"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="transfer"
                      className="flex items-center justify-between rounded-lg border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <DollarSign className="h-5 w-5" />
                        <div>
                          <div className="font-semibold">Transferencia Bancaria</div>
                          <div className="text-sm text-muted-foreground">
                            Transferencia directa a nuestra cuenta
                          </div>
                        </div>
                      </div>
                    </Label>
                  </div>

                  {/* Mobile Payment */}
                  <div>
                    <RadioGroupItem
                      value="mobile"
                      id="mobile"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="mobile"
                      className="flex items-center justify-between rounded-lg border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-5 w-5" />
                        <div>
                          <div className="font-semibold">Pago Móvil</div>
                          <div className="text-sm text-muted-foreground">
                            Tigo Money, Simple o billeteras digitales
                          </div>
                        </div>
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>

              {/* Payment Instructions */}
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <p className="font-medium">Datos para transferencia:</p>
                <div className="text-sm space-y-1">
                  <p><strong>Banco:</strong> Banco Nacional</p>
                  <p><strong>Cuenta:</strong> 1234567890</p>
                  <p><strong>Titular:</strong> Kaney Marketplace S.A.</p>
                  <p><strong>NIT:</strong> 1234567890</p>
                </div>
              </div>

              {/* Reference Input */}
              <div>
                <Label htmlFor="reference">Número de Referencia</Label>
                <Input
                  id="reference"
                  placeholder="Ingresa el número de referencia"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  className="mt-2"
                />
              </div>

              {/* Proof Upload */}
              <div>
                <Label htmlFor="proof">Comprobante de Pago</Label>
                <div className="mt-2">
                  <Input
                    id="proof"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="cursor-pointer"
                  />
                  {proofFile && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Archivo: {proofFile.name}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Cashea Integration */}
        {paymentType === 'installments' && (
          <Card className="animate-fade-in border-accent/50">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10">
                  <CreditCard className="h-8 w-8 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Pago con Cashea</h3>
                  <p className="text-sm text-muted-foreground">
                    Serás redirigido a Cashea para completar el pago en cuotas
                  </p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm font-medium mb-2">Resumen de Cuotas:</p>
                  <p className="text-2xl font-bold text-accent">
                    {installments}x {orderSummary.currency === 'USD' ? '$' : 'Bs.'}{' '}
                    {installmentAmount.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Sin intereses • 0% Comisión
                  </p>
                </div>
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
          <Button
            type="button"
            variant="accent"
            onClick={handleSubmit}
            disabled={loading || (paymentType === 'full' && !reference)}
            className="flex-1"
          >
            {paymentType === 'installments' ? 'Ir a Cashea' : 'Confirmar Pago'}
          </Button>
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

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">IVA (13%)</span>
                <span className="font-medium">
                  {orderSummary.currency === 'USD' ? '$' : 'Bs.'}{' '}
                  {orderSummary.tax.toFixed(2)}
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
                  <div className="bg-accent/10 rounded-lg p-3 text-center">
                    <p className="text-sm font-medium mb-1">Pago en Cuotas</p>
                    <p className="text-lg font-bold text-accent">
                      {installments}x {orderSummary.currency === 'USD' ? '$' : 'Bs.'}{' '}
                      {installmentAmount.toFixed(2)}
                    </p>
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
    </div>
  );
};
