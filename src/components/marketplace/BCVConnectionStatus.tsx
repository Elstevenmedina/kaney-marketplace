import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, CheckCircle, AlertTriangle, Wifi, WifiOff } from 'lucide-react';
import { useCurrency } from '@/hooks/useCurrency';
import { cn } from '@/lib/utils';

interface BCVConnectionStatusProps {
  className?: string;
}

export const BCVConnectionStatus: React.FC<BCVConnectionStatusProps> = ({ className }) => {
  const { currencyInfo, isLoading, updateExchangeRate, isRateStale } = useCurrency();

  const handleRefresh = () => {
    updateExchangeRate();
  };

  const isBCVSource = currencyInfo.source.includes('BCV');
  const isOfficial = isBCVSource || currencyInfo.source.includes('Oficial') || currencyInfo.source.includes('API');
  const isConnected = isOfficial && !isRateStale;
  const isStale = isRateStale;
  const isOffline = !isOfficial && !currencyInfo.source.includes('Fallback');

  const getStatusIcon = () => {
    if (isLoading) return <RefreshCw className="h-4 w-4 animate-spin" />;
    if (isConnected) return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (isStale) return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    if (isOffline) return <WifiOff className="h-4 w-4 text-red-600" />;
    return <Wifi className="h-4 w-4 text-gray-600" />;
  };

  const getStatusText = () => {
    if (isLoading) return 'Conectando...';
    if (isConnected) return 'Conectado al BCV';
    if (isStale) return 'Conexión desactualizada';
    if (isOffline) return 'Sin conexión al BCV';
    return 'Estado desconocido';
  };

  const getStatusColor = () => {
    if (isConnected) return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200';
    if (isStale) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200';
    if (isOffline) return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200';
    return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200';
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getStatusIcon()}
            <div>
              <div className="font-medium">Estado de Conexión BCV</div>
              <div className="text-sm text-muted-foreground">
                {getStatusText()}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor()}>
              {isOfficial ? 'Oficial' : 'Alternativa'}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
              className="gap-2"
            >
              <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
              Actualizar
            </Button>
          </div>
        </div>

        {/* Connection Details */}
        <div className="mt-3 space-y-2">
          <div className="text-xs text-muted-foreground">
            <strong>Fuente:</strong> {currencyInfo.source}
          </div>
          <div className="text-xs text-muted-foreground">
            <strong>Última actualización:</strong> {new Date(currencyInfo.lastUpdated).toLocaleString('es-VE')}
          </div>
          
          {isBCVSource && (
            <div className="text-xs text-green-600 dark:text-green-400">
              ✓ Esta tasa proviene directamente del Banco Central de Venezuela
            </div>
          )}
          
          {isStale && (
            <div className="text-xs text-yellow-600 dark:text-yellow-400">
              ⚠️ La tasa puede estar desactualizada. El BCV actualiza varias veces al día.
            </div>
          )}
          
          {isOffline && (
            <div className="text-xs text-red-600 dark:text-red-400">
              ❌ No se pudo conectar con el BCV. Se está usando una fuente alternativa.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

