import { ShoppingCart, User, Menu, X, Home, Package, Leaf, LogOut } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppSelector } from '@/store/hooks';
import { selectCartItemCount, selectProducts } from '@/store/selectors';
import { SearchBar } from './SearchBar';
import { ExchangeRateDisplay } from './ExchangeRateDisplay';
import { useAppDispatch } from '@/store/hooks';
import { setSearchQuery } from '@/store/slices/marketplaceSlice';
import { LoginForm } from '@/components/auth/LoginForm';
import { UserProfile } from '@/components/auth/UserProfile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from 'react';
import logoDark from '@/assets/logo-dark.png';

// Mock search suggestions - in real app, fetch from API
const searchSuggestions = [
  'Tomates',
  'Lechugas',
  'Zanahorias',
  'Pimientos',
  'Brócoli',
  'Pepinos',
  'Manzanas'
];

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const totalItems = useAppSelector(selectCartItemCount);
  const products = useAppSelector(selectProducts);
  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const kycStatus = useAppSelector((state) => state.auth.kycStatus);
  const currency = useAppSelector((state) => state.cart.currency);
  
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  const handleProductosClick = () => {
    navigate('/products');
    setIsMobileMenuOpen(false);
  };

  const handleSostenibleClick = () => {
    navigate('/sostenible');
    setIsMobileMenuOpen(false);
  };

  const handleHomeClick = () => {
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const handleProfileClick = () => {
    setIsProfileOpen(true);
    setIsMobileMenuOpen(false);
  };

  const handleLoginClick = () => {
    setIsLoginOpen(true);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-14 sm:h-16 items-center justify-between gap-2 sm:gap-4">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-4 sm:gap-8 shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <img src={logoDark} alt="Kaney" className="h-6 sm:h-8 lg:h-10" />
            </Link>
            
            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 mr-4 xl:mr-8">
              <button 
                onClick={handleProductosClick}
                className="text-xs xl:text-sm font-medium text-foreground hover:opacity-70 transition-opacity"
              >
                PRODUCTOS
              </button>
              <Link 
                to="/sostenible" 
                className="text-xs xl:text-sm font-medium text-foreground hover:opacity-70 transition-opacity"
              >
                KANEY SOSTENIBLE
              </Link>
            </nav>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl hidden md:flex">
            <SearchBar
              onSearch={handleSearch}
              suggestions={searchSuggestions}
              onSuggestionClick={handleSearch}
              products={products}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2 ml-auto">
            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden h-8 w-8 sm:h-9 sm:w-9">
                  <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px]">
                <SheetHeader>
                  <SheetTitle className="text-left text-lg sm:text-xl">Menú</SheetTitle>
                </SheetHeader>
                
                <div className="mt-6 space-y-4">
                  {/* Navigation Links */}
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      onClick={handleHomeClick}
                      className="w-full justify-start text-left h-auto p-3"
                    >
                      <Home className="h-4 w-4 mr-3" />
                      <span>Inicio</span>
                    </Button>
                    
                    <Button
                      variant="ghost"
                      onClick={handleProductosClick}
                      className="w-full justify-start text-left h-auto p-3"
                    >
                      <Package className="h-4 w-4 mr-3" />
                      <span>Productos</span>
                    </Button>
                    
                    <Button
                      variant="ghost"
                      onClick={handleSostenibleClick}
                      className="w-full justify-start text-left h-auto p-3"
                    >
                      <Leaf className="h-4 w-4 mr-3" />
                      <span>Kaney Sostenible</span>
                    </Button>
                  </div>

                  <div className="border-t pt-4">
                    {/* User Section */}
                    {isAuthenticated ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                          <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                            {user?.firstName?.[0]}{user?.lastName?.[0]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {user?.firstName} {user?.lastName}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {user?.email}
                            </p>
                          </div>
                        </div>
                        
                        <Button
                          variant="ghost"
                          onClick={handleProfileClick}
                          className="w-full justify-start text-left h-auto p-3"
                        >
                          <User className="h-4 w-4 mr-3" />
                          <span>Mi Perfil</span>
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        onClick={handleLoginClick}
                        className="w-full justify-start text-left h-auto p-3"
                      >
                        <User className="h-4 w-4 mr-3" />
                        <span>Iniciar Sesión</span>
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            
            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative h-8 w-8 sm:h-9 sm:w-9">
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                {totalItems > 0 && (
                  <Badge 
                    variant="accent" 
                    className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center p-0 text-[8px] sm:text-[10px]"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Desktop User Profile */}
            <div className="hidden lg:block">
              {isAuthenticated ? (
                <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9">
                      <User className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
                    <UserProfile onClose={() => setIsProfileOpen(false)} />
                  </DialogContent>
                </Dialog>
              ) : (
                <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9">
                      <User className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md p-4 sm:p-6">
                    <LoginForm onSuccess={() => setIsLoginOpen(false)} />
                  </DialogContent>
                </Dialog>
              )}
            </div>

          </div>
        </div>

        {/* Mobile Search */}
        <div className="pb-3 sm:pb-4 md:hidden">
          <SearchBar
            onSearch={handleSearch}
            suggestions={searchSuggestions}
            onSuggestionClick={handleSearch}
            products={products}
          />
        </div>

        {/* Exchange Rate Display for Mobile */}
        {currency === 'BS' && (
          <div className="pb-3 sm:pb-4 md:hidden">
            <ExchangeRateDisplay compact />
          </div>
        )}
      </div>
    </header>
  );
};
