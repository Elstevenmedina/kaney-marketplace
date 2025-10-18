import { Package } from 'lucide-react';
import { TabsContent } from '@/components/ui/tabs';
import { OrderCard } from './OrderCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';
import { toast } from 'sonner';

// Mock data - would come from Redux/API
const mockOrders = [
  {
    id: '1',
    orderNumber: 'KNY-12345',
    date: new Date('2024-01-15'),
    status: 'delivered' as const,
    total: 125.50,
    currency: 'USD' as const,
    items: [
      { id: '1', name: 'Tomates Cherry Orgánicos', quantity: 10, image: '/placeholder.svg' },
      { id: '2', name: 'Lechuga Hidropónica', quantity: 5, image: '/placeholder.svg' },
    ],
    canReorder: true,
    canRate: true,
  },
  {
    id: '2',
    orderNumber: 'KNY-12344',
    date: new Date('2024-01-10'),
    status: 'shipped' as const,
    total: 89.99,
    currency: 'USD' as const,
    items: [
      { id: '3', name: 'Pimientos Mixtos', quantity: 8, image: '/placeholder.svg' },
    ],
    canReorder: true,
    canRate: false,
  },
];

export const MyPurchases = () => {
  const handleViewDetails = (orderId: string) => {
    toast.info('Vista de detalles próximamente');
  };

  const handleReorder = (orderId: string) => {
    toast.success('Productos agregados al carrito');
  };

  const handleRate = (orderId: string, rating: number) => {
    toast.success(`Calificación de ${rating} estrellas enviada`);
  };

  return (
    <TabsContent value="purchases" className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por número de orden..."
            className="pl-10"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[200px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="pending">Pendiente</SelectItem>
            <SelectItem value="processing">Procesando</SelectItem>
            <SelectItem value="shipped">Enviado</SelectItem>
            <SelectItem value="delivered">Entregado</SelectItem>
            <SelectItem value="cancelled">Cancelado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockOrders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onViewDetails={() => handleViewDetails(order.id)}
            onReorder={() => handleReorder(order.id)}
            onRate={(rating) => handleRate(order.id, rating)}
          />
        ))}
      </div>

      {/* Empty State */}
      {mockOrders.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No hay órdenes</h3>
          <p className="text-muted-foreground">
            Aún no has realizado ninguna compra
          </p>
        </div>
      )}
    </TabsContent>
  );
};
