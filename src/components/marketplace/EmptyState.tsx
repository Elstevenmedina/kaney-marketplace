import { Package2 } from 'lucide-react';

export const EmptyState = ({ 
  title = 'No hay productos disponibles',
  description = 'Intenta ajustar los filtros de búsqueda'
}: { 
  title?: string; 
  description?: string; 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-6 p-6 rounded-full bg-muted">
        <Package2 className="h-16 w-16 text-muted-foreground" />
      </div>
      <h3 className="text-2xl font-bold text-primary mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-md">{description}</p>
    </div>
  );
};
