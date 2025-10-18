import { Card, CardContent } from '@/components/ui/card';

export const ProductCardSkeleton = () => {
  return (
    <Card className="overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-muted" />
      
      <CardContent className="p-4 space-y-3">
        <div className="h-5 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-full" />
        <div className="h-4 bg-muted rounded w-2/3" />
        
        <div className="flex items-center justify-between pt-2">
          <div className="h-6 bg-muted rounded w-20" />
          <div className="h-9 bg-muted rounded w-9" />
        </div>
      </CardContent>
    </Card>
  );
};

export const ProductGridSkeleton = ({ count = 8 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
};
