import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout, updateUser } from '@/store/slices/authSlice';
import { loadOrdersFromStorage, clearCorruptedOrders } from '@/store/slices/ordersSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  Edit, 
  LogOut, 
  ShoppingBag, 
  MapPin, 
  CheckCircle,
  Clock,
  X,
  CheckCircle2,
  XCircle,
  Package,
  Truck,
  Calendar
} from 'lucide-react';
import { toast } from 'sonner';

interface UserProfileProps {
  onClose?: () => void;
}

export const UserProfile = ({ onClose }: UserProfileProps) => {
  const dispatch = useAppDispatch();
  const { user, kycStatus } = useAppSelector((state) => state.auth);
  const orders = useAppSelector((state) => state.orders.orders);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    businessType: user?.businessType || 'individual'
  });

  // Cargar órdenes desde localStorage al montar el componente
  useEffect(() => {
    console.log('Cargando órdenes desde localStorage...');
    dispatch(loadOrdersFromStorage());
  }, [dispatch]);

  // Debug: mostrar órdenes cuando cambien
  useEffect(() => {
    console.log('Órdenes en el store:', orders);
  }, [orders]);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Sesión cerrada');
    onClose?.();
  };

  const handleClearCorruptedData = () => {
    if (confirm('¿Estás seguro de que quieres limpiar todos los datos de órdenes? Esta acción no se puede deshacer.')) {
      dispatch(clearCorruptedOrders());
      alert('Datos corruptos limpiados exitosamente');
    }
  };

  const handleSave = () => {
    dispatch(updateUser(editData));
    setIsEditing(false);
    toast.success('Perfil actualizado');
  };

  const handleCancel = () => {
    setEditData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      businessType: user?.businessType || 'individual'
    });
    setIsEditing(false);
  };

  const getKycBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="default" className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Verificado</Badge>;
      case 'pending':
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pendiente</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><X className="h-3 w-3 mr-1" />Rechazado</Badge>;
      default:
        return <Badge variant="outline">No verificado</Badge>;
    }
  };

  const formatDate = (date: Date | string) => {
    try {
      // Si es string, convertir a Date
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      
      // Verificar si la fecha es válida
      if (isNaN(dateObj.getTime())) {
        return 'Fecha inválida';
      }
      
      return new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }).format(dateObj);
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Fecha inválida';
    }
  };

  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge variant="default" className="bg-green-100 text-green-800"><CheckCircle2 className="h-3 w-3 mr-1" />Confirmado</Badge>;
      case 'processing':
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Procesando</Badge>;
      case 'shipped':
        return <Badge variant="default" className="bg-blue-100 text-blue-800"><Truck className="h-3 w-3 mr-1" />Enviado</Badge>;
      case 'delivered':
        return <Badge variant="default" className="bg-green-100 text-green-800"><Package className="h-3 w-3 mr-1" />Entregado</Badge>;
      case 'cancelled':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Cancelado</Badge>;
      default:
        return <Badge variant="outline">Pendiente</Badge>;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-0 shadow-none">
      <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <CardTitle className="text-xl sm:text-2xl" style={{ color: '#16423c' }}>
              Mi Perfil
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Gestiona tu información personal y preferencias
            </CardDescription>
          </div>
          {!isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="w-full sm:w-auto text-xs sm:text-sm"
            >
              <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              Editar
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0 px-4 sm:px-6">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 gap-1 sm:gap-2 h-auto p-1">
            <TabsTrigger value="profile" className="text-xs sm:text-sm py-2 sm:py-3">
              <span className="hidden xs:inline">Perfil</span>
              <span className="xs:hidden">Perfil</span>
            </TabsTrigger>
            <TabsTrigger value="purchases" className="text-xs sm:text-sm py-2 sm:py-3">
              <span className="hidden xs:inline">Compras</span>
              <span className="xs:hidden">Compras</span>
            </TabsTrigger>
            <TabsTrigger value="addresses" className="text-xs sm:text-sm py-2 sm:py-3">
              <span className="hidden xs:inline">Direcciones</span>
              <span className="xs:hidden">Direcciones</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4 sm:space-y-6">
            {/* KYC Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-lg gap-3 sm:gap-4" style={{ backgroundColor: '#e9efec' }}>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 rounded-full" style={{ backgroundColor: '#6a9c89' }}>
                  <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-sm sm:text-base" style={{ color: '#16423c' }}>Estado de Verificación</p>
                  <p className="text-xs sm:text-sm" style={{ color: '#6a9c89' }}>
                    {kycStatus === 'approved' ? 'Tu cuenta está verificada' : 
                     kycStatus === 'pending' ? 'Verificación en proceso' : 
                     'Verificación requerida'}
                  </p>
                </div>
              </div>
              <div className="flex justify-center sm:justify-end">
                {getKycBadge(kycStatus)}
              </div>
            </div>

            {/* Profile Information */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-semibold" style={{ color: '#16423c' }}>Información Personal</h3>
              
              {isEditing ? (
                <div className="space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-xs sm:text-sm">Nombre</Label>
                      <Input
                        id="firstName"
                        value={editData.firstName}
                        onChange={(e) => setEditData(prev => ({ ...prev, firstName: e.target.value }))}
                        className="text-sm sm:text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-xs sm:text-sm">Apellido</Label>
                      <Input
                        id="lastName"
                        value={editData.lastName}
                        onChange={(e) => setEditData(prev => ({ ...prev, lastName: e.target.value }))}
                        className="text-sm sm:text-base"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs sm:text-sm">Correo Electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                      className="text-sm sm:text-base"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs sm:text-sm">Teléfono</Label>
                    <Input
                      id="phone"
                      value={editData.phone}
                      onChange={(e) => setEditData(prev => ({ ...prev, phone: e.target.value }))}
                      className="text-sm sm:text-base"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="businessType" className="text-xs sm:text-sm">Tipo de Negocio</Label>
                    <Select 
                      value={editData.businessType} 
                      onValueChange={(value) => setEditData(prev => ({ ...prev, businessType: value as 'individual' | 'company' }))}
                    >
                      <SelectTrigger className="text-sm sm:text-base">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Persona Natural</SelectItem>
                        <SelectItem value="company">Empresa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <Button onClick={handleSave} style={{ backgroundColor: '#ff751f' }} className="w-full sm:w-auto text-sm sm:text-base">
                      Guardar
                    </Button>
                    <Button variant="outline" onClick={handleCancel} className="w-full sm:w-auto text-sm sm:text-base">
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg" style={{ backgroundColor: '#e9efec' }}>
                      <User className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: '#6a9c89' }} />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-medium" style={{ color: '#16423c' }}>Nombre</p>
                        <p className="text-xs sm:text-sm truncate" style={{ color: '#6a9c89' }}>{user?.firstName} {user?.lastName}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg" style={{ backgroundColor: '#e9efec' }}>
                      <Mail className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: '#6a9c89' }} />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-medium" style={{ color: '#16423c' }}>Email</p>
                        <p className="text-xs sm:text-sm truncate" style={{ color: '#6a9c89' }}>{user?.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg" style={{ backgroundColor: '#e9efec' }}>
                      <Phone className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: '#6a9c89' }} />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-medium" style={{ color: '#16423c' }}>Teléfono</p>
                        <p className="text-xs sm:text-sm truncate" style={{ color: '#6a9c89' }}>{user?.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg" style={{ backgroundColor: '#e9efec' }}>
                      <Building className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: '#6a9c89' }} />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-medium" style={{ color: '#16423c' }}>Tipo de Negocio</p>
                        <p className="text-xs sm:text-sm truncate" style={{ color: '#6a9c89' }}>
                          {user?.businessType === 'individual' ? 'Persona Natural' : 'Empresa'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="purchases" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-semibold" style={{ color: '#16423c' }}>Mis Compras</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm" style={{ color: '#6a9c89' }}>
                  {orders.length} {orders.length === 1 ? 'orden' : 'órdenes'}
                </span>
                {orders.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClearCorruptedData}
                    className="text-xs"
                  >
                    Limpiar datos
                  </Button>
                )}
              </div>
            </div>
            
            {orders.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingBag className="h-12 w-12 mx-auto mb-4" style={{ color: '#6a9c89' }} />
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#16423c' }}>No hay órdenes</h3>
                <p className="text-sm" style={{ color: '#6a9c89' }}>Aún no has realizado ninguna compra</p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {orders.map((order) => (
                  <Card key={order.id} className="p-3 sm:p-4" style={{ backgroundColor: '#e9efec' }}>
                    <div className="space-y-3">
                      {/* Order Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" style={{ color: '#6a9c89' }} />
                          <span className="font-semibold text-sm sm:text-base" style={{ color: '#16423c' }}>
                            {order.orderNumber}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {getOrderStatusBadge(order.status)}
                        </div>
                      </div>
                      
                      {/* Order Items */}
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center gap-3 p-2 rounded-lg bg-white">
                            <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                              <img 
                                src={item.image || '/api/placeholder/100/100'} 
                                alt={item.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNCAyNEg0MFY0MEgyNFYyNFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
                                }}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-xs sm:text-sm truncate" style={{ color: '#16423c' }}>
                                {item.name}
                              </p>
                              <p className="text-xs" style={{ color: '#6a9c89' }}>
                                Cantidad: {item.quantity} • {order.currency === 'USD' ? '$' : 'Bs.'} {item.price.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Order Summary */}
                      <div className="border-t pt-3">
                        <div className="flex justify-between items-center text-sm">
                          <span style={{ color: '#6a9c89' }}>Subtotal:</span>
                          <span style={{ color: '#16423c' }}>
                            {order.currency === 'USD' ? '$' : 'Bs.'} {order.subtotal.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span style={{ color: '#6a9c89' }}>Logística:</span>
                          <span style={{ color: '#16423c' }}>
                            {order.currency === 'USD' ? '$' : 'Bs.'} {order.logistics.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center font-semibold text-sm sm:text-base border-t pt-2 mt-2">
                          <span style={{ color: '#16423c' }}>Total:</span>
                          <span style={{ color: '#16423c' }}>
                            {order.currency === 'USD' ? '$' : 'Bs.'} {order.total.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      
                      {/* Order Details */}
                      <div className="text-xs" style={{ color: '#6a9c89' }}>
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                          <span>Método de pago: {order.paymentMethod}</span>
                          <span>Fecha: {formatDate(order.createdAt)}</span>
                        </div>
                        {order.deliveryInfo && (
                          <div className="mt-1">
                            <span>Dirección: {order.deliveryInfo.address}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="addresses" className="space-y-4">
            <div className="text-center py-8">
              <MapPin className="h-12 w-12 mx-auto mb-4" style={{ color: '#6a9c89' }} />
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#16423c' }}>Mis Direcciones</h3>
              <p className="text-sm" style={{ color: '#6a9c89' }}>Próximamente disponible</p>
            </div>
          </TabsContent>
        </Tabs>
        
        <Separator className="my-4 sm:my-6" />
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <div className="text-xs sm:text-sm" style={{ color: '#6a9c89' }}>
            Última sesión: Hoy
          </div>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="text-red-600 hover:text-red-700 w-full sm:w-auto text-xs sm:text-sm"
          >
            <LogOut className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
