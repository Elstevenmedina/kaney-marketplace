import { useState } from 'react';
import { Filter, X, DollarSign, Package, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export interface FilterOptions {
  priceRange: [number, number];
  categories: string[];
  quality: string;
  availability: string;
}

interface FilterSidebarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  isMobile?: boolean;
}

const categories = [
  { id: 'hortalizas', name: 'Hortalizas' },
  { id: 'frutas', name: 'Frutas' },
  { id: 'granos-semillas', name: 'Granos y Semillas' },
  { id: 'hojas-aromaticas', name: 'Hojas o Aromáticas' },
  { id: 'tuberculos', name: 'Tubérculos' },
];

const qualityOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'premium', label: 'Premium' },
  { value: 'standard', label: 'Estándar' },
];

const availabilityOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'in-stock', label: 'En Stock' },
  { value: 'low-stock', label: 'Stock Bajo' },
];

const FilterContent = ({ filters, onFiltersChange }: Omit<FilterSidebarProps, 'isMobile'>) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handlePriceChange = (value: number[]) => {
    const newFilters = { ...localFilters, priceRange: value as [number, number] };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = localFilters.categories.includes(categoryId)
      ? localFilters.categories.filter(c => c !== categoryId)
      : [...localFilters.categories, categoryId];
    
    const newFilters = { ...localFilters, categories: newCategories };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleQualityChange = (value: string) => {
    const newFilters = { ...localFilters, quality: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleAvailabilityChange = (value: string) => {
    const newFilters = { ...localFilters, availability: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters: FilterOptions = {
      priceRange: [0, 1000],
      categories: [],
      quality: 'all',
      availability: 'all'
    };
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Price Range */}
      <div>
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
          <Label className="text-sm sm:text-base font-semibold">Rango de Precio</Label>
        </div>
        <Slider
          value={localFilters.priceRange}
          onValueChange={handlePriceChange}
          max={1000}
          step={10}
          className="mb-2"
        />
        <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
          <span>${localFilters.priceRange[0]}</span>
          <span>${localFilters.priceRange[1]}</span>
        </div>
      </div>

      {/* Categories */}
      <div>
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <Package className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
          <Label className="text-sm sm:text-base font-semibold">Categorías</Label>
        </div>
        <div className="space-y-2 sm:space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center gap-2">
              <Checkbox
                id={category.id}
                checked={localFilters.categories.includes(category.id)}
                onCheckedChange={() => handleCategoryToggle(category.id)}
                className="h-3 w-3 sm:h-4 sm:w-4"
              />
              <Label htmlFor={category.id} className="cursor-pointer text-xs sm:text-sm">
                {category.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Quality */}
      <div>
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <Award className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
          <Label className="text-sm sm:text-base font-semibold">Calidad</Label>
        </div>
        <RadioGroup value={localFilters.quality} onValueChange={handleQualityChange}>
          {qualityOptions.map((option) => (
            <div key={option.value} className="flex items-center gap-2">
              <RadioGroupItem value={option.value} id={`quality-${option.value}`} className="h-3 w-3 sm:h-4 sm:w-4" />
              <Label htmlFor={`quality-${option.value}`} className="cursor-pointer text-xs sm:text-sm">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Availability */}
      <div>
        <Label className="text-sm sm:text-base font-semibold mb-3 sm:mb-4 block">Disponibilidad</Label>
        <RadioGroup value={localFilters.availability} onValueChange={handleAvailabilityChange}>
          {availabilityOptions.map((option) => (
            <div key={option.value} className="flex items-center gap-2">
              <RadioGroupItem value={option.value} id={`availability-${option.value}`} className="h-3 w-3 sm:h-4 sm:w-4" />
              <Label htmlFor={`availability-${option.value}`} className="cursor-pointer text-xs sm:text-sm">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Reset Button */}
      <Button variant="outline" className="w-full text-xs sm:text-sm" onClick={handleReset}>
        <X className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
        Limpiar Filtros
      </Button>
    </div>
  );
};

export const FilterSidebar = ({ filters, onFiltersChange, isMobile = false }: FilterSidebarProps) => {
  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="gap-2 text-xs sm:text-sm">
            <Filter className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline">Filtros</span>
            <span className="xs:hidden">Filtros</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] sm:w-[320px] md:w-[400px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-base sm:text-lg">Filtros</SheetTitle>
          </SheetHeader>
          <div className="mt-4 sm:mt-6">
            <FilterContent filters={filters} onFiltersChange={onFiltersChange} />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Card className="sticky top-20 sm:top-24">
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
          <Filter className="h-4 w-4 sm:h-5 sm:w-5" />
          Filtros
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <FilterContent filters={filters} onFiltersChange={onFiltersChange} />
      </CardContent>
    </Card>
  );
};
