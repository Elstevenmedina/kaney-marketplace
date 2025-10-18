import { useEffect, useState, useMemo } from 'react';
import { Header } from '@/components/marketplace/Header';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { FilterSidebar, FilterOptions } from '@/components/marketplace/FilterSidebar';
import { Pagination } from '@/components/marketplace/Pagination';
import { SortDropdown } from '@/components/marketplace/SortDropdown';
import { ProductGridSkeleton } from '@/components/marketplace/ProductCardSkeleton';
import { EmptyState } from '@/components/marketplace/EmptyState';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setProducts, setFilters, setCurrentPage } from '@/store/slices/marketplaceSlice';
import { toggleCurrency } from '@/store/slices/cartSlice';
import { selectFilteredProducts } from '@/store/selectors';
import { mockProducts } from '@/data/mockProducts';
import { DollarSign, Filter } from 'lucide-react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ExchangeRateDisplay } from '@/components/marketplace/ExchangeRateDisplay';

const PRODUCTS_PER_PAGE = 12;

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPageLocal] = useState(1);
  
  const products = useAppSelector(selectFilteredProducts);
  const filters = useAppSelector((state) => state.marketplace.filters);
  const currency = useAppSelector((state) => state.cart.currency);
  const loading = useAppSelector((state) => state.marketplace.loading);

  // Load products on mount
  useEffect(() => {
    dispatch(setProducts(mockProducts));
  }, [dispatch]);

  // Process products with sorting
  const processedProducts = useMemo(() => {
    let sorted = [...products];
    
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
  }, [products, sortBy]);

  // Pagination
  const totalPages = Math.ceil(processedProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return processedProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [processedProducts, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPageLocal(1);
  }, [filters, sortBy]);

  const handleFiltersChange = (newFilters: FilterOptions) => {
    dispatch(setFilters(newFilters));
  };

  const handlePageChange = (page: number) => {
    setCurrentPageLocal(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">Todos los Productos</h1>
              <p className="text-muted-foreground">
                {processedProducts.length} productos disponibles
              </p>
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
              
              {/* Mobile Filter Toggle */}
              {isMobile && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filtros
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop Filters */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onFiltersChange={handleFiltersChange}
            />
          </div>

          {/* Mobile Filters */}
          {isMobile && showMobileFilters && (
            <div className="fixed inset-0 z-50 bg-background">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Filtros</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowMobileFilters(false)}
                  >
                    ✕
                  </Button>
                </div>
                <FilterSidebar
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  isMobile={true}
                />
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
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
                title="No se encontraron productos"
                description="Intenta ajustar los filtros para ver más resultados"
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
        </div>
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

export default ProductsPage;
