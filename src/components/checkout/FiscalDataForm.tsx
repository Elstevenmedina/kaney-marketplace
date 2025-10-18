import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Building, Mail, MapPin, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const fiscalDataSchema = z.object({
  invoiceName: z.string().min(3, 'El nombre debe tener al menos 3 caracteres').max(100),
  taxId: z.string().min(5, 'Cédula/RUC debe tener al menos 5 caracteres').max(20),
  address: z.string().min(10, 'La dirección debe tener al menos 10 caracteres').max(200),
  email: z.string().email('Email inválido'),
  businessName: z.string().optional(),
});

type FiscalDataFormData = z.infer<typeof fiscalDataSchema>;

interface FiscalDataFormProps {
  onNext: (data: FiscalDataFormData) => void;
  onBack: () => void;
  initialData?: Partial<FiscalDataFormData>;
  loading?: boolean;
}

export const FiscalDataForm = ({ onNext, onBack, initialData, loading }: FiscalDataFormProps) => {
  const [isCompany, setIsCompany] = useState(!!initialData?.businessName);

  const form = useForm<FiscalDataFormData>({
    resolver: zodResolver(fiscalDataSchema),
    defaultValues: {
      invoiceName: initialData?.invoiceName || '',
      taxId: initialData?.taxId || '',
      address: initialData?.address || '',
      email: initialData?.email || '',
      businessName: initialData?.businessName || '',
    },
  });

  const onSubmit = (data: FiscalDataFormData) => {
    onNext(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Datos Fiscales
        </CardTitle>
        <CardDescription>
          Información para la emisión de tu factura
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Type Toggle */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant={!isCompany ? 'default' : 'outline'}
                className="flex-1"
                onClick={() => setIsCompany(false)}
              >
                Persona Natural
              </Button>
              <Button
                type="button"
                variant={isCompany ? 'default' : 'outline'}
                className="flex-1"
                onClick={() => setIsCompany(true)}
              >
                <Building className="h-4 w-4 mr-2" />
                Empresa
              </Button>
            </div>

            {/* Invoice Name */}
            <FormField
              control={form.control}
              name="invoiceName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre para la Factura *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Juan Pérez"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tax ID */}
            <FormField
              control={form.control}
              name="taxId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isCompany ? 'RUC/NIT' : 'Cédula'} *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={isCompany ? '1234567890001' : '1234567890'}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Business Name (if company) */}
            {isCompany && (
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Razón Social</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Mi Empresa S.A."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Dirección Fiscal *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Calle Principal #123, Ciudad"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email para Factura *
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="factura@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Actions */}
            <div className="flex gap-4 pt-4">
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
                type="submit"
                variant="accent"
                disabled={loading}
                className="flex-1"
              >
                Continuar
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
