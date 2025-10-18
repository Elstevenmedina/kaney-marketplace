import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, Banknote, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { useCurrency } from '@/hooks/useCurrency';
import { cn } from '@/lib/utils';

interface BCVRateInfoProps {
  className?: string;
}

export const BCVRateInfo: React.FC<BCVRateInfoProps> = ({ className }) => {
  const { currencyInfo, isLoading, updateExchangeRate, isRateStale } = useCurrency();

  const handleRefresh = () => {
    updateExchangeRate();
  };

  const isBCVSource = currencyInfo.source.includes('BCV');
  const isOfficial = isBCVSource || currencyInfo.source.includes('Oficial') || currencyInfo.source.includes('API');

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Banknote className="h-5 w-5 text-primary" />
            Tasa del Banco Central de Venezuela
          </CardTitle>
          <div className="flex items-center gap-2">
            {isOfficial && (
              <Badge variant="default" className="bg-green-600 text-white">
                <CheckCircle className="h-3 w-3 mr-1" />
                Oficial
              </Badge>
            )}
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
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Main Rate Display */}
        <div className="text-center space-y-2">
          <div className="text-4xl font-bold text-primary">
            {currencyInfo.formattedRate}
          </div>
            <div className="text-sm text-muted-foreground">
              {isOfficial ? 'Tasa oficial del BCV' : `Fuente: ${currencyInfo.source}`}
              {isBCVSource && (
                <span className="ml-2 text-green-600 dark:text-green-400 font-medium">
                  ✓ Verificada
                </span>
              )}
            </div>
        </div>

        {/* Rate Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="font-medium">Última actualización</div>
              <div className="text-muted-foreground">
                {new Date(currencyInfo.lastUpdated).toLocaleString('es-VE')}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="font-medium">Estado</div>
              <div className={cn(
                "text-sm",
                isRateStale ? "text-yellow-600 dark:text-yellow-400" : "text-green-600 dark:text-green-400"
              )}>
                {isRateStale ? 'Puede estar desactualizada' : 'Actualizada'}
              </div>
            </div>
          </div>
        </div>

        {/* BCV Information */}
        {isOfficial && (
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
            <div className="text-sm text-green-800 dark:text-green-200">
              <strong>✓ Tasa oficial del Banco Central de Venezuela</strong>
              <p className="mt-1 text-xs">
                Esta es la tasa de cambio oficial publicada por el BCV. 
                Se actualiza varias veces durante el día según las operaciones del banco.
              </p>
            </div>
          </div>
        )}

        {/* Warning for stale rates */}
        {isRateStale && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
            <div className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>⚠️ Tasa posiblemente desactualizada</strong>
              <p className="mt-1 text-xs">
                La última actualización fue hace más de 6 horas. 
                El BCV actualiza su tasa varias veces al día. 
                Considera actualizar para obtener la tasa más reciente.
              </p>
            </div>
          </div>
        )}

        {/* Non-BCV source warning */}
        {!isOfficial && (
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
            <div className="text-sm text-blue-800 dark:text-blue-200">
              <strong>ℹ️ Fuente alternativa</strong>
              <p className="mt-1 text-xs">
                No se pudo obtener la tasa oficial del BCV. 
                Se está usando una fuente alternativa: {currencyInfo.source}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
