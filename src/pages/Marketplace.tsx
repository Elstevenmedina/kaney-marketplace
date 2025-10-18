import { useEffect, useState, useMemo } from 'react';
import { Header } from '@/components/marketplace/Header';
import { CategoryNav } from '@/components/marketplace/CategoryNav';
import { HeroSection } from '@/components/marketplace/HeroSection';
import { LiquidationCarousel } from '@/components/marketplace/LiquidationCarousel';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { FilterSidebar, FilterOptions } from '@/components/marketplace/FilterSidebar';
import { Pagination } from '@/components/marketplace/Pagination';
import { SortDropdown } from '@/components/marketplace/SortDropdown';
import { ProductGridSkeleton } from '@/components/marketplace/ProductCardSkeleton';
import { EmptyState } from '@/components/marketplace/EmptyState';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setProducts, setFilters } from '@/store/slices/marketplaceSlice';
import { toggleCurrency } from '@/store/slices/cartSlice';
import { selectFilteredProducts } from '@/store/selectors';
import { mockProducts } from '@/data/mockProducts';
import { DollarSign, Filter } from 'lucide-react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ExchangeRateDisplay } from '@/components/marketplace/ExchangeRateDisplay';
import logoLight from '@/assets/logo-light.png';

const PRODUCTS_PER_PAGE = 12;

const Marketplace = () => {
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector(selectFilteredProducts);
  const currency = useAppSelector((state) => state.cart.currency);
  const loading = useAppSelector((state) => state.marketplace.loading);
  const marketplaceFilters = useAppSelector((state) => state.marketplace.filters);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('popular');
  const [localFilters, setLocalFilters] = useState<FilterOptions>(marketplaceFilters);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Load products on mount
  useEffect(() => {
    dispatch(setProducts(mockProducts));
  }, [dispatch]);

  // Apply filters and sorting
  const processedProducts = useMemo(() => {
    let filtered = [...allProducts];

    // Apply price range filter
    filtered = filtered.filter(
      p => p.price >= localFilters.priceRange[0] && p.price <= localFilters.priceRange[1]
    );

    // Apply category filter
    if (localFilters.categories.length > 0) {
      filtered = filtered.filter(p => localFilters.categories.includes(p.category));
    }

    // Apply quality filter
    if (localFilters.quality !== 'all') {
      if (localFilters.quality === 'premium') {
        filtered = filtered.filter(p => p.featured);
      } else if (localFilters.quality === 'standard') {
        filtered = filtered.filter(p => !p.featured);
      }
    }

    // Apply availability filter
    if (localFilters.availability !== 'all') {
      if (localFilters.availability === 'in-stock') {
        filtered = filtered.filter((p: any) => (p.stock || 100) > 20);
      } else if (localFilters.availability === 'low-stock') {
        filtered = filtered.filter((p: any) => (p.stock || 100) <= 20);
      }
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
        filtered.reverse();
        break;
      default: // popular
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return filtered;
  }, [allProducts, localFilters, sortBy]);

  // Get liquidation products
  const liquidationProducts = useMemo(() => 
    allProducts.filter(p => p.onSale).slice(0, 3)
  , [allProducts]);

  // Get featured products
  const featuredProducts = useMemo(() =>
    processedProducts.filter(p => p.featured).slice(0, 4)
  , [processedProducts]);

  // Pagination
  const totalPages = Math.ceil(processedProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return processedProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [processedProducts, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [localFilters, sortBy]);

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setLocalFilters(newFilters);
    dispatch(setFilters(newFilters));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <CategoryNav />

      {/* Liquidation Carousel */}
      {liquidationProducts.length > 0 && (
        <div className="py-4">
          <LiquidationCarousel products={liquidationProducts} />
        </div>
      )}

      {/* Currency Toggle */}
      <div id="todos-los-productos" className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl sm:text-2xl font-bold text-primary">
            Todos los Productos
          </h2>
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Exchange Rate Display for Desktop */}
            {currency === 'BS' && (
              <div className="hidden md:block">
                <ExchangeRateDisplay compact />
              </div>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => dispatch(toggleCurrency())}
              className="gap-2 text-xs sm:text-sm"
            >
              <DollarSign className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">
                {currency === 'USD' ? 'Cambiar a BS' : 'Cambiar a USD'}
              </span>
              <span className="xs:hidden">
                {currency === 'USD' ? 'BS' : 'USD'}
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pb-8 sm:pb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 sm:mb-6">Productos Destacados</h2>
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Main Products Grid with Filters */}
      <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pb-8 sm:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Sidebar Filters - Desktop */}
          {!isMobile && (
            <div className="lg:col-span-1">
              <FilterSidebar 
                filters={localFilters} 
                onFiltersChange={handleFiltersChange}
                isMobile={false}
              />
            </div>
          )}

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-4">
                {/* Mobile Filter Button */}
                {isMobile && (
                  <FilterSidebar 
                    filters={localFilters} 
                    onFiltersChange={handleFiltersChange}
                    isMobile={true}
                  />
                )}
                
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {processedProducts.length} productos encontrados
                </p>
              </div>

              <div className="w-full sm:w-auto">
                <SortDropdown value={sortBy} onChange={setSortBy} />
              </div>
            </div>

            {/* Loading State */}
            {loading && <ProductGridSkeleton count={PRODUCTS_PER_PAGE} />}

            {/* Products Grid */}
            {!loading && paginatedProducts.length > 0 && (
              <>
                <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                <div className="mt-6 sm:mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              </>
            )}

            {/* Empty State */}
            {!loading && paginatedProducts.length === 0 && (
              <EmptyState 
                title="No se encontraron productos"
                description="Intenta ajustar los filtros de búsqueda o explora otras categorías"
              />
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground mt-12 sm:mt-20">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="sm:col-span-2 md:col-span-1">
              <img src={logoLight} alt="Kaney" className="h-8 sm:h-10 mb-3 sm:mb-4" />
              <p className="text-sm sm:text-base text-primary-foreground/80">
                Conectando productores agrícolas con tu negocio
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Enlaces</h4>
              <ul className="space-y-2 text-sm sm:text-base text-primary-foreground/80">
                <li className="hover:text-primary-foreground transition-colors cursor-pointer">
                  Sobre Nosotros
                </li>
                <li className="hover:text-primary-foreground transition-colors cursor-pointer">
                  Cómo Funciona
                </li>
                <li className="hover:text-primary-foreground transition-colors cursor-pointer">
                  Términos y Condiciones
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Contacto</h4>
              <ul className="space-y-2 text-sm sm:text-base text-primary-foreground/80">
                <li>contacto@kaney.com</li>
                <li>+58 412 1234567</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-primary-foreground/60">
            <p>&copy; 2025 Kaney Marketplace. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Marketplace;
