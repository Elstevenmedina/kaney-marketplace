import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/marketplace/Header';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { Pagination } from '@/components/marketplace/Pagination';
import { SortDropdown } from '@/components/marketplace/SortDropdown';
import { ProductGridSkeleton } from '@/components/marketplace/ProductCardSkeleton';
import { EmptyState } from '@/components/marketplace/EmptyState';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setProducts } from '@/store/slices/marketplaceSlice';
import { toggleCurrency } from '@/store/slices/cartSlice';
import { mockProducts } from '@/data/mockProducts';
import { DollarSign, ArrowLeft } from 'lucide-react';
import { ExchangeRateDisplay } from '@/components/marketplace/ExchangeRateDisplay';

const PRODUCTS_PER_PAGE = 12;

// Mapeo de categorías
const categoryMap = {
  'hortalizas': { name: 'Hortalizas', description: 'Verduras frescas y nutritivas' },
  'frutas': { name: 'Frutas', description: 'Frutas frescas de temporada' },
  'granos-semillas': { name: 'Granos y Semillas', description: 'Cereales y semillas nutritivas' },
  'hojas-aromaticas': { name: 'Hojas o Aromáticas', description: 'Hierbas y hojas aromáticas' },
  'tuberculos': { name: 'Tubérculos', description: 'Raíces y tubérculos nutritivos' }
};

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPageLocal] = useState(1);
  
  const currency = useAppSelector((state) => state.cart.currency);
  const loading = useAppSelector((state) => state.marketplace.loading);

  // Obtener información de la categoría
  const categoryInfo = categoryId ? categoryMap[categoryId as keyof typeof categoryMap] : null;

  // Filtrar productos por categoría
  const categoryProducts = useMemo(() => {
    if (!categoryId) return [];
    return mockProducts.filter(product => product.category === categoryId);
  }, [categoryId]);

  // Load products on mount
  useEffect(() => {
    dispatch(setProducts(mockProducts));
  }, [dispatch]);

  // Process products with sorting
  const processedProducts = useMemo(() => {
    let sorted = [...categoryProducts];
    
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
        sorted.sort((a, b) => new Date(b.id).getTime() - new Date(a.id).getTime());
        break;
      default:
        break;
    }
    
    return sorted;
  }, [categoryProducts, sortBy]);

  // Pagination
  const totalPages = Math.ceil(processedProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return processedProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [processedProducts, currentPage]);

  // Reset to page 1 when sort changes
  useEffect(() => {
    setCurrentPageLocal(1);
  }, [sortBy]);

  const handlePageChange = (page: number) => {
    setCurrentPageLocal(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const handleBackClick = () => {
    navigate(-1); // Volver a la página anterior
  };

  // Si la categoría no existe, mostrar error
  if (!categoryInfo) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Categoría no encontrada</h1>
          <p className="text-muted-foreground mb-6">La categoría que buscas no existe.</p>
          <Button onClick={handleBackClick} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver atrás
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackClick}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-primary mb-2">
                  {categoryInfo.name}
                </h1>
                <p className="text-muted-foreground">
                  {processedProducts.length} productos disponibles
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Exchange Rate Display for Desktop */}
              {currency === 'BS' && (
                <div className="hidden md:block">
                  <ExchangeRateDisplay compact />
                </div>
              )}
              
              {/* Currency Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => dispatch(toggleCurrency())}
                className="gap-2"
              >
                <DollarSign className="h-4 w-4" />
                {currency === 'USD' ? 'USD' : 'BS'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Sort and Results */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <SortDropdown value={sortBy} onChange={handleSortChange} />
            <span className="text-sm text-muted-foreground">
              Mostrando {paginatedProducts.length} de {processedProducts.length} productos
            </span>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <ProductGridSkeleton count={PRODUCTS_PER_PAGE} />
        ) : paginatedProducts.length === 0 ? (
          <EmptyState
            title={`No hay productos en ${categoryInfo.name.toLowerCase()}`}
            description="Próximamente tendremos productos disponibles en esta categoría"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

      {/* Exchange Rate Display for Mobile */}
      {currency === 'BS' && (
        <div className="md:hidden fixed bottom-4 right-4">
          <ExchangeRateDisplay compact />
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
