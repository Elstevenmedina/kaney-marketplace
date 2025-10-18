import { useState } from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { AddressCard } from './AddressCard';
import { Plus, MapPin } from 'lucide-react';
import { toast } from 'sonner';

// Mock data
const mockAddresses = [
  {
    id: '1',
    name: 'Casa',
    address: 'Av. Principal #123, Zona Central, La Paz',
    recipientName: 'Juan Pérez',
    phone: '+591 70123456',
    isDefault: true,
    instructions: 'Tocar el timbre dos veces',
  },
  {
    id: '2',
    name: 'Oficina',
    address: 'Calle Comercio #456, Edificio Torre, Piso 5',
    recipientName: 'Juan Pérez',
    phone: '+591 70123456',
    isDefault: false,
    instructions: 'Dejar en recepción',
  },
];

export const AddressManagement = () => {
  const [addresses, setAddresses] = useState(mockAddresses);

  const handleEdit = (addressId: string) => {
    toast.info('Edición de dirección próximamente');
  };

  const handleDelete = (addressId: string) => {
    setAddresses(addresses.filter((a) => a.id !== addressId));
    toast.success('Dirección eliminada');
  };

  const handleSetDefault = (addressId: string) => {
    setAddresses(
      addresses.map((a) => ({
        ...a,
        isDefault: a.id === addressId,
      }))
    );
    toast.success('Dirección predeterminada actualizada');
  };

  const handleAddNew = () => {
    toast.info('Formulario de nueva dirección próximamente');
  };

  return (
    <TabsContent value="addresses" className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Mis Direcciones</h2>
          <p className="text-muted-foreground">
            Gestiona tus direcciones de entrega
          </p>
        </div>
        <Button onClick={handleAddNew} variant="accent">
          <Plus className="h-4 w-4 mr-2" />
          Nueva Dirección
        </Button>
      </div>

      {/* Addresses Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {addresses.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            onEdit={() => handleEdit(address.id)}
            onDelete={() => handleDelete(address.id)}
            onSetDefault={() => handleSetDefault(address.id)}
          />
        ))}
      </div>

      {/* Empty State */}
      {addresses.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No hay direcciones guardadas</h3>
          <p className="text-muted-foreground mb-4">
            Agrega una dirección para facilitar tus compras
          </p>
          <Button onClick={handleAddNew} variant="accent">
            <Plus className="h-4 w-4 mr-2" />
            Agregar Primera Dirección
          </Button>
        </div>
      )}
    </TabsContent>
  );
};
