import { MapPin, Edit, Trash2, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface Address {
  id: string;
  name: string;
  address: string;
  recipientName: string;
  phone: string;
  isDefault: boolean;
  instructions?: string;
}

interface AddressCardProps {
  address: Address;
  onEdit: () => void;
  onDelete: () => void;
  onSetDefault: () => void;
}

export const AddressCard = ({ address, onEdit, onDelete, onSetDefault }: AddressCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">{address.name}</h3>
              {address.isDefault && (
                <Badge variant="success" className="mt-1">
                  <Check className="h-3 w-3 mr-1" />
                  Predeterminada
                </Badge>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onEdit}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Eliminar dirección?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción no se puede deshacer. La dirección será eliminada permanentemente.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={onDelete}
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    Eliminar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Address Details */}
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <p className="text-muted-foreground">{address.address}</p>
          </div>

          <div className="pl-6 space-y-1">
            <p className="font-medium">{address.recipientName}</p>
            <p className="text-muted-foreground">{address.phone}</p>
          </div>

          {address.instructions && (
            <div className="pl-6">
              <p className="text-xs text-muted-foreground italic">
                "{address.instructions}"
              </p>
            </div>
          )}
        </div>

        {/* Set as Default Button */}
        {!address.isDefault && (
          <Button
            variant="outline"
            className="w-full"
            onClick={onSetDefault}
          >
            Establecer como predeterminada
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
