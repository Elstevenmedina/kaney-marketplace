import { Star, StarHalf } from 'lucide-react';

interface RatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
}

export const Rating = ({ 
  rating, 
  maxRating = 5, 
  size = 'md',
  showValue = false 
}: RatingProps) => {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  const iconSize = sizeClasses[size];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star
            key={`full-${i}`}
            className={`${iconSize} fill-secondary text-secondary`}
          />
        ))}
        
        {/* Half star */}
        {hasHalfStar && (
          <StarHalf className={`${iconSize} fill-secondary text-secondary`} />
        )}
        
        {/* Empty stars */}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star
            key={`empty-${i}`}
            className={`${iconSize} text-border`}
          />
        ))}
      </div>
      
      {showValue && (
        <span className="text-sm text-muted-foreground ml-1">
          ({rating.toFixed(1)})
        </span>
      )}
    </div>
  );
};
