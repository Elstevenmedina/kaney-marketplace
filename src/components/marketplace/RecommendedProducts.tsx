import { ProductCard } from './ProductCard';
import { Product } from '@/store/slices/marketplaceSlice';

interface RecommendedProductsProps {
  products: Product[];
  title?: string;
}

export const RecommendedProducts = ({ 
  products, 
  title = "Productos Recomendados" 
}: RecommendedProductsProps) => {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
