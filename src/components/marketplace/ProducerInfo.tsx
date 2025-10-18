import { MapPin, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Rating } from './Rating';

interface ProducerInfoProps {
  producer: {
    id: string;
    name: string;
    rating: number;
    location: string;
    verified: boolean;
  };
  onViewProfile?: (producerId: string) => void;
}

export const ProducerInfo = ({ producer, onViewProfile }: ProducerInfoProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Producer Avatar */}
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-lg font-bold text-primary">
              {producer.name.charAt(0)}
            </span>
          </div>

          {/* Producer Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-foreground truncate">
                {producer.name}
              </h4>
              {producer.verified && (
                <Badge variant="success" className="gap-1">
                  <ShieldCheck className="h-3 w-3" />
                  Verificado
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{producer.location}</span>
            </div>

            <Rating rating={producer.rating} showValue size="sm" />

            {onViewProfile && (
              <button
                onClick={() => onViewProfile(producer.id)}
                className="text-sm text-primary hover:underline mt-2"
              >
                Ver perfil del productor
              </button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
