import { useState } from 'react';
import { User, ShoppingBag, MapPin, Info, RefreshCw, MessageSquare } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setActiveTab } from '@/store/slices/customerProfileSlice';

interface ProfileLayoutProps {
  children?: React.ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector((state) => state.customer.activeTab);
  const customer = useAppSelector((state) => state.customer.customer);

  const tabs = [
    { id: 'purchases', name: 'Mis Compras', icon: ShoppingBag },
    { id: 'addresses', name: 'Direcciones', icon: MapPin },
    { id: 'information', name: 'Información', icon: Info },
    { id: 'refunds', name: 'Reintegros', icon: RefreshCw },
    { id: 'support', name: 'Soporte', icon: MessageSquare },
  ];

  const handleTabChange = (value: string) => {
    dispatch(setActiveTab(value));
  };

  const getKycBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="success">✓ Verificado</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pendiente</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rechazado</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            {/* Avatar */}
            <Avatar className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 mx-auto sm:mx-0">
              <AvatarImage src={customer?.personalInfo?.profileImage} />
              <AvatarFallback className="text-lg sm:text-xl lg:text-2xl bg-primary text-primary-foreground">
                {customer?.personalInfo?.firstName?.[0]}
                {customer?.personalInfo?.lastName?.[0]}
              </AvatarFallback>
            </Avatar>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-1 sm:mb-2">
                {customer?.personalInfo?.firstName} {customer?.personalInfo?.lastName}
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground mb-2">
                {customer?.personalInfo?.email}
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 flex-wrap">
                {customer?.kycStatus && getKycBadge(customer.kycStatus)}
                {customer?.businessInfo && (
                  <Badge variant="outline" className="text-xs sm:text-sm">
                    {customer.businessInfo.businessName}
                  </Badge>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-center sm:justify-end">
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                Editar Perfil
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4 sm:space-y-6">
          {/* Tabs List */}
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1 sm:gap-2 h-auto p-1 bg-muted">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex items-center gap-1 sm:gap-2 py-2 sm:py-3 data-[state=active]:bg-background text-xs sm:text-sm"
                >
                  <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden xs:inline">{tab.name}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Tab Content */}
          {children}
        </Tabs>
      </div>
    </div>
  );
}
