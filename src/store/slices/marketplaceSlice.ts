import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  name: string;
  description: string;
  images?: string[];
  image: string;
  price: number;
  category: 'hortalizas' | 'frutas' | 'granos-semillas' | 'hojas-aromaticas' | 'tuberculos';
  featured: boolean;
  onSale?: boolean;
  salePrice?: number;
  unit: string;
  minQuantity: number;
  variety?: string;
  size?: 'pequeño' | 'mediano' | 'grande';
  harvestDays?: number;
  maturityState?: 'verde' | 'maduro' | 'muy-maduro';
  packaging?: {
    type: string;
    unitsPerPackage: number;
    weightPerPackage: number;
  };
  stock?: number;
  lowStockThreshold?: number;
  producer?: {
    id: string;
    name: string;
    rating: number;
    location: string;
    verified: boolean;
  };
  quality?: {
    fresh: boolean;
    clean: boolean;
    correctSize: boolean;
    pestFree: boolean;
  };
  rating?: number;
  liquidationEndTime?: Date;
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface FilterOptions {
  priceRange: [number, number];
  categories: string[];
  producers: string[];
  quality: string;
  availability: string;
}

interface ProductFilters {
  category?: string;
  search?: string;
  priceMin?: number;
  priceMax?: number;
  page?: number;
}

interface MarketplaceState {
  products: Product[];
  categories: Category[];
  filters: FilterOptions;
  searchQuery: string;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  liquidationProducts: Product[];
  featuredProducts: Product[];
  selectedProduct: Product | null;
  relatedProducts: Product[];
  selectedCategory: string | null;
}

// Async thunks
export const fetchProducts = createAsyncThunk(
  'marketplace/fetchProducts',
  async (params: ProductFilters = {}, { rejectWithValue }) => {
    try {
      // Mock API call - would be replaced with real API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // This would normally fetch from an API
      return {
        products: [],
        totalPages: 1,
        featured: [],
        liquidation: []
      };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al cargar productos');
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'marketplace/fetchProductById',
  async (productId: string, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Would fetch product from API
      return {
        product: null,
        related: []
      };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al cargar producto');
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'marketplace/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return [
        { id: 'hortalizas', name: 'Hortalizas', icon: 'Carrot' },
        { id: 'frutas', name: 'Frutas', icon: 'Apple' },
        { id: 'granos-semillas', name: 'Granos y Semillas', icon: 'Wheat' },
        { id: 'hojas-aromaticas', name: 'Hojas o Aromáticas', icon: 'Leaf' },
        { id: 'tuberculos', name: 'Tubérculos', icon: 'Potato' }
      ];
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al cargar categorías');
    }
  }
);

const initialState: MarketplaceState = {
  products: [],
  categories: [],
  filters: {
    priceRange: [0, 1000],
    categories: [],
    producers: [],
    quality: 'all',
    availability: 'all'
  },
  searchQuery: '',
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null,
  liquidationProducts: [],
  featuredProducts: [],
  selectedProduct: null,
  relatedProducts: [],
  selectedCategory: null
};

const marketplaceSlice = createSlice({
  name: 'marketplace',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.featuredProducts = action.payload.filter(p => p.featured);
      state.liquidationProducts = action.payload.filter(p => p.onSale);
    },
    setFilters: (state, action: PayloadAction<Partial<FilterOptions>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
      state.relatedProducts = [];
    },
    filterByCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalPages = action.payload.totalPages;
        state.featuredProducts = action.payload.featured;
        state.liquidationProducts = action.payload.liquidation;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload.product;
        state.relatedProducts = action.payload.related;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch categories
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  }
});

export const { 
  setProducts, 
  setFilters, 
  setSearchQuery, 
  setCurrentPage, 
  clearSelectedProduct,
  filterByCategory
} = marketplaceSlice.actions;

export default marketplaceSlice.reducer;
