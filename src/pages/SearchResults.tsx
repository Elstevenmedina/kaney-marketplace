import { useEffect, useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, ArrowLeft, X } from 'lucide-react';
import { Header } from '@/components/marketplace/Header';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { Pagination } from '@/components/marketplace/Pagination';
import { SortDropdown } from '@/components/marketplace/SortDropdown';
import { ProductGridSkeleton } from '@/components/marketplace/ProductCardSkeleton';
import { EmptyState } from '@/components/marketplace/EmptyState';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setSearchQuery } from '@/store/slices/marketplaceSlice';
import { mockProducts } from '@/data/mockProducts';
import { useCurrency } from '@/hooks/useCurrency';
import { Product } from '@/store/slices/marketplaceSlice';

type SortOption = 'name' | 'price-low' | 'price-high' | 'rating' | 'newest';

const sortOptions = [
  { value: 'name', label: 'Nombre A-Z' },
  { value: 'price-low', label: 'Precio: Menor a Mayor' },
  { value: 'price-high', label: 'Precio: Mayor a Menor' },
  { value: 'rating', label: 'Mejor Calificados' },
  { value: 'newest', label: 'Más Recientes' }
];

// Función de búsqueda simple y directa
function searchProducts(products: Product[], query: string): Product[] {
  if (!query || !query.trim()) return [];
  
  const searchTerm = query.toLowerCase().trim();
  
  return products.filter(product => {
    // Búsqueda en nombre
    if (product.name.toLowerCase().includes(searchTerm)) return true;
    
    // Búsqueda en descripción
    if (product.description.toLowerCase().includes(searchTerm)) return true;
    
    // Búsqueda en categoría
    if (product.category.toLowerCase().includes(searchTerm)) return true;
    
    // Búsqueda en variedad
    if (product.variety && product.variety.toLowerCase().includes(searchTerm)) return true;
    
    // Búsqueda en productor
    if (product.producer?.name.toLowerCase().includes(searchTerm)) return true;
    
    return false;
  });
}

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const query = searchParams.get('q') || '';
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const { currency, convertPrice, getCurrencySymbol } = useCurrency();

  // Cargar productos al montar el componente
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      // Simular carga asíncrona
      await new Promise(resolve => setTimeout(resolve, 100));
      setProducts(mockProducts);
      setLoading(false);
    };
    
    loadProducts();
  }, []);

  // Filtrar productos basado en la query
  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    return searchProducts(products, query);
  }, [products, query]);

  // Ordenar productos
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return (a.onSale && a.salePrice ? a.salePrice : a.price) - (b.onSale && b.salePrice ? b.salePrice : b.price);
        case 'price-high':
          return (b.onSale && b.salePrice ? b.salePrice : b.price) - (a.onSale && a.salePrice ? a.salePrice : a.price);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'newest':
          return new Date(b.id).getTime() - new Date(a.id).getTime();
        default:
          return 0;
      }
    });
  }, [filteredProducts, sortBy]);

  // Paginación
  const productsPerPage = 12;
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + productsPerPage);

  // Handlers
  const handleSortChange = (value: string) => {
    setSortBy(value as SortOption);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearSearch = () => {
    setSearchParams({});
    dispatch(setSearchQuery(''));
    navigate('/marketplace');
  };

  // Reset page when query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-6">
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/marketplace')}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver atrás
              </Button>
            </div>
            <h1 className="text-2xl font-bold">Cargando resultados...</h1>
          </div>
          <ProductGridSkeleton count={12} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        {/* Search Header */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/marketplace')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver atrás
            </Button>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Search className="h-6 w-6 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">
                  Resultados para "{query}"
                </h1>
                <p className="text-muted-foreground">
                  {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearSearch}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              Limpiar búsqueda
            </Button>
          </div>

          {query && (
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" className="gap-1">
                <Search className="h-3 w-3" />
                {query}
              </Badge>
            </div>
          )}
        </div>

        {/* Sort and View Options */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Mostrando {startIndex + 1}-{Math.min(startIndex + productsPerPage, sortedProducts.length)} de {sortedProducts.length} productos
            </span>
          </div>

          <SortDropdown
            value={sortBy}
            onChange={handleSortChange}
          />
        </div>

        {/* Products Grid */}
        {!query || query.trim().length === 0 ? (
          <EmptyState
            title="Búsqueda requerida"
            description="Por favor, ingresa un término de búsqueda para encontrar productos."
          />
        ) : filteredProducts.length === 0 ? (
          <EmptyState
            title="No se encontraron productos"
            description={`No hay productos que coincidan con "${query}". Intenta con otros términos de búsqueda.`}
          />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
