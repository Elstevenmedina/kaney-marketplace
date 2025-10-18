import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, TrendingUp, Info } from 'lucide-react';
import { useCurrency } from '@/hooks/useCurrency';
import { cn } from '@/lib/utils';

interface ExchangeRateDisplayProps {
  className?: string;
  showRefreshButton?: boolean;
  compact?: boolean;
}

export const ExchangeRateDisplay: React.FC<ExchangeRateDisplayProps> = ({
  className,
  showRefreshButton = true,
  compact = false
}) => {
  const { currencyInfo, isLoading, updateExchangeRate, isRateStale } = useCurrency();

  const handleRefresh = () => {
    updateExchangeRate();
  };

  if (compact) {
    return (
      <div className={cn("flex items-center gap-2 text-sm", className)}>
        <span className="text-muted-foreground">
          {currencyInfo.formattedRate}
        </span>
        {isRateStale && (
          <Badge variant="outline" className="text-xs">
            Actualizar
          </Badge>
        )}
        {showRefreshButton && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            disabled={isLoading}
            className="h-6 w-6 p-0"
          >
            <RefreshCw className={cn("h-3 w-3", isLoading && "animate-spin")} />
          </Button>
        )}
      </div>
    );
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="font-medium">Tasa de Cambio</span>
            </div>
            <div className="text-2xl font-bold text-primary">
              {currencyInfo.formattedRate}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Info className="h-3 w-3" />
              <span>Actualizado: {new Date(currencyInfo.lastUpdated).toLocaleString()}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Fuente: {currencyInfo.source}
              {currencyInfo.source.includes('BCV') && (
                <span className="ml-1 text-green-600 dark:text-green-400 font-medium">
                  ✓ Oficial
                </span>
              )}
            </div>
          </div>
          
          {showRefreshButton && (
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
          )}
        </div>
        
        {isRateStale && (
          <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-md">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              La tasa del BCV puede estar desactualizada. El BCV actualiza varias veces al día.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
