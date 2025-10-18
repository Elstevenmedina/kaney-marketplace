import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout, updateUser } from '@/store/slices/authSlice';
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
  CreditCard,
  HelpCircle,
  CheckCircle,
  Clock,
  X,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface UserProfileProps {
  onClose?: () => void;
}

interface Refund {
  id: string;
  orderId: string;
  amount: number;
  currency: 'USD' | 'BS';
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'processed';
  requestedAt: Date;
  processedAt?: Date;
  description: string;
  evidence?: string[];
  productName: string;
  productImage?: string;
}

export const UserProfile = ({ onClose }: UserProfileProps) => {
  const dispatch = useAppDispatch();
  const { user, kycStatus } = useAppSelector((state) => state.auth);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    businessType: user?.businessType || 'individual'
  });

  // Mock data for refunds
  const [refunds] = useState<Refund[]>([
    {
      id: '1',
      orderId: 'ORD-2024-001',
      amount: 2550000,
      currency: 'BS',
      reason: 'Producto no apto para consumo',
      status: 'processed',
      requestedAt: new Date('2024-01-15'),
      processedAt: new Date('2024-01-16'),
      description: 'Tomates con manchas y golpes visibles',
      evidence: ['evidencia1.jpg', 'evidencia2.jpg'],
      productName: 'Tomates Frescos',
      productImage: '/api/placeholder/100/100'
    },
    {
      id: '2',
      orderId: 'ORD-2024-002',
      amount: 1875000,
      currency: 'BS',
      reason: 'Producto en mal estado',
      status: 'approved',
      requestedAt: new Date('2024-01-20'),
      description: 'Lechugas con hojas marchitas',
      productName: 'Lechuga Romana',
      productImage: '/api/placeholder/100/100'
    },
    {
      id: '3',
      orderId: 'ORD-2024-003',
      amount: 3200000,
      currency: 'BS',
      reason: 'Producto no cumple estándares de calidad',
      status: 'pending',
      requestedAt: new Date('2024-01-25'),
      description: 'Zanahorias con textura blanda',
      productName: 'Zanahorias Orgánicas',
      productImage: '/api/placeholder/100/100'
    }
  ]);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Sesión cerrada');
    onClose?.();
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

  const getRefundStatusBadge = (status: string) => {
    switch (status) {
      case 'processed':
        return <Badge variant="default" className="bg-green-100 text-green-800"><CheckCircle2 className="h-3 w-3 mr-1" />Procesado</Badge>;
      case 'approved':
        return <Badge variant="default" className="bg-blue-100 text-blue-800"><CheckCircle className="h-3 w-3 mr-1" />Aprobado</Badge>;
      case 'pending':
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pendiente</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Rechazado</Badge>;
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
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
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1 sm:gap-2 h-auto p-1">
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
            <TabsTrigger value="refunds" className="text-xs sm:text-sm py-2 sm:py-3">
              <span className="hidden xs:inline">Reintegros</span>
              <span className="xs:hidden">Reintegros</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="text-xs sm:text-sm py-2 sm:py-3">
              <span className="hidden xs:inline">Soporte</span>
              <span className="xs:hidden">Soporte</span>
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
            <div className="text-center py-8">
              <ShoppingBag className="h-12 w-12 mx-auto mb-4" style={{ color: '#6a9c89' }} />
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#16423c' }}>Mis Compras</h3>
              <p className="text-sm" style={{ color: '#6a9c89' }}>Próximamente disponible</p>
            </div>
          </TabsContent>
          
          <TabsContent value="addresses" className="space-y-4">
            <div className="text-center py-8">
              <MapPin className="h-12 w-12 mx-auto mb-4" style={{ color: '#6a9c89' }} />
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#16423c' }}>Mis Direcciones</h3>
              <p className="text-sm" style={{ color: '#6a9c89' }}>Próximamente disponible</p>
            </div>
          </TabsContent>
          
          <TabsContent value="refunds" className="space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-semibold" style={{ color: '#16423c' }}>Mis Reintegros</h3>
            </div>
            
            {refunds.length === 0 ? (
              <div className="text-center py-6 sm:py-8">
                <RefreshCw className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4" style={{ color: '#6a9c89' }} />
                <h3 className="text-base sm:text-lg font-semibold mb-2" style={{ color: '#16423c' }}>No hay reintegros</h3>
                <p className="text-xs sm:text-sm" style={{ color: '#6a9c89' }}>No tienes reintegros pendientes o procesados</p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {refunds.map((refund) => (
                  <Card key={refund.id} className="p-3 sm:p-4" style={{ backgroundColor: '#e9efec' }}>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                      <div className="flex items-start gap-3 sm:gap-4 flex-1">
                        {/* Product Image */}
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                          <img 
                            src={refund.productImage} 
                            alt={refund.productName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNCAyNEg0MFY0MEgyNFYyNFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
                            }}
                          />
                        </div>
                        
                        {/* Refund Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                            <h4 className="font-semibold text-xs sm:text-sm" style={{ color: '#16423c' }}>
                              {refund.productName}
                            </h4>
                            <div className="flex justify-start sm:justify-end">
                              {getRefundStatusBadge(refund.status)}
                            </div>
                          </div>
                          
                          <p className="text-xs sm:text-sm mb-2" style={{ color: '#6a9c89' }}>
                            Orden: {refund.orderId}
                          </p>
                          
                          <p className="text-xs sm:text-sm mb-2" style={{ color: '#16423c' }}>
                            {refund.description}
                          </p>
                          
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs" style={{ color: '#6a9c89' }}>
                            <span>Razón: {refund.reason}</span>
                            <span>Solicitado: {formatDate(refund.requestedAt)}</span>
                            {refund.processedAt && (
                              <span>Procesado: {formatDate(refund.processedAt)}</span>
                            )}
                          </div>
                          
                          {refund.evidence && refund.evidence.length > 0 && (
                            <div className="mt-2">
                              <p className="text-xs mb-1" style={{ color: '#6a9c89' }}>
                                Evidencia adjunta ({refund.evidence.length} archivos)
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Amount */}
                      <div className="text-left sm:text-right flex-shrink-0">
                        <div className="text-base sm:text-lg font-bold" style={{ color: '#16423c' }}>
                          {refund.currency === 'USD' ? '$' : 'Bs'} {refund.currency === 'USD' ? refund.amount.toFixed(2) : refund.amount.toLocaleString('es-VE')}
                        </div>
                        <div className="text-xs" style={{ color: '#6a9c89' }}>
                          {refund.currency === 'USD' ? 'USD' : 'Bolívares'}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
            
            {/* Refund Info */}
            <div className="p-3 sm:p-4 rounded-lg" style={{ backgroundColor: '#c4dad2' }}>
              <div className="flex items-start gap-2 sm:gap-3">
                <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5" style={{ color: '#6a9c89' }} />
                <div>
                  <h4 className="font-semibold text-xs sm:text-sm mb-1" style={{ color: '#16423c' }}>
                    Información sobre Reintegros
                  </h4>
                  <p className="text-xs" style={{ color: '#6a9c89' }}>
                    Los reintegros se procesan cuando los productos no pasan el control de calidad. 
                    El tiempo de procesamiento es de 3-5 días hábiles. Te notificaremos cuando 
                    tu reintegro sea aprobado y procesado.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="support" className="space-y-4">
            <div className="text-center py-6 sm:py-8">
              <HelpCircle className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4" style={{ color: '#6a9c89' }} />
              <h3 className="text-base sm:text-lg font-semibold mb-2" style={{ color: '#16423c' }}>Soporte</h3>
              <p className="text-xs sm:text-sm" style={{ color: '#6a9c89' }}>Próximamente disponible</p>
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
