import { Check, X, Leaf, Sparkles, Ruler, Bug } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface QualityBadgesProps {
  quality: {
    fresh: boolean;
    clean: boolean;
    correctSize: boolean;
    pestFree: boolean;
  };
  className?: string;
}

const qualityItems = [
  { key: 'fresh', label: 'Fresco', icon: Leaf },
  { key: 'clean', label: 'Limpio', icon: Sparkles },
  { key: 'correctSize', label: 'Tamaño Correcto', icon: Ruler },
  { key: 'pestFree', label: 'Sin Pesticidas', icon: Bug }
] as const;

export const QualityBadges = ({ quality, className }: QualityBadgesProps) => {
  const verifiedCount = Object.values(quality).filter(Boolean).length;
  const allVerified = verifiedCount === 4;

  return (
    <div className={cn("space-y-4", className)}>
      {/* Overall Quality Badge */}
      {allVerified && (
        <Badge variant="success" className="w-full justify-center py-2">
          <Check className="h-4 w-4 mr-1" />
          Calidad Verificada - 100%
        </Badge>
      )}

      {/* Quality Items */}
      <div className="grid grid-cols-2 gap-3">
        {qualityItems.map(({ key, label, icon: Icon }) => {
          const isVerified = quality[key as keyof typeof quality];
          
          return (
            <div
              key={key}
              className={cn(
                "flex items-center gap-2 p-3 rounded-lg border-2 transition-colors",
                isVerified
                  ? "border-secondary/50 bg-secondary/10"
                  : "border-border bg-muted/30"
              )}
            >
              <div className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0",
                isVerified ? "bg-secondary text-secondary-foreground" : "bg-muted"
              )}>
                {isVerified ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <X className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <Icon className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm font-medium truncate">{label}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quality Score */}
      <div className="bg-muted/50 rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Puntuación de Calidad</span>
          <span className="text-sm font-bold">
            {verifiedCount}/4
          </span>
        </div>
        <div className="h-2 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-secondary transition-all duration-300"
            style={{ width: `${(verifiedCount / 4) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
