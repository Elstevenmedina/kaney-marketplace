import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { Product } from './marketplaceSlice';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  unit: string;
}

interface CartState {
  items: CartItem[];
  currency: 'USD' | 'BS';
  exchangeRate: number;
  subtotal: number;
  logisticsEstimate: number;
  tax: number;
  total: number;
  loading: boolean;
  error: string | null;
  recommendedProducts: Product[];
}

interface AddToCartParams {
  product: Product;
  quantity: number;
}

interface UpdateCartItemParams {
  itemId: string;
  quantity: number;
}

// Async thunks
export const addToCartAsync = createAsyncThunk(
  'cart/addToCartAsync',
  async (params: AddToCartParams, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const item: CartItem = {
        id: params.product.id,
        name: params.product.name,
        price: params.product.onSale && params.product.salePrice 
          ? params.product.salePrice 
          : params.product.price,
        quantity: params.quantity,
        image: params.product.image,
        unit: params.product.unit
      };

      return {
        item,
        recommended: []
      };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al agregar al carrito');
    }
  }
);

export const calculateTotals = createAsyncThunk(
  'cart/calculateTotals',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as any;
      const items = state.cart.items;
      
      const subtotal = items.reduce((sum: number, item: CartItem) => 
        sum + (item.price * item.quantity), 0
      );
      
      const logisticsEstimate = subtotal * 0.10; // 10%
      const tax = 0; // IVA eliminado
      const total = subtotal + logisticsEstimate; // Sin IVA

      return {
        subtotal,
        logisticsEstimate,
        tax,
        total
      };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al calcular totales');
    }
  }
);

const initialState: CartState = {
  items: [],
  currency: 'USD',
  exchangeRate: 36.50,
  subtotal: 0,
  logisticsEstimate: 0,
  tax: 0,
  total: 0,
  loading: false,
  error: null,
  recommendedProducts: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      
      // Recalculate totals
      const subtotal = state.items.reduce((sum, item) => 
        sum + (item.price * item.quantity), 0
      );
      state.subtotal = subtotal;
      state.logisticsEstimate = subtotal * 0.10;
      state.tax = (subtotal + state.logisticsEstimate) * 0.16;
      state.total = subtotal + state.logisticsEstimate + state.tax;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      
      // Recalculate totals
      const subtotal = state.items.reduce((sum, item) => 
        sum + (item.price * item.quantity), 0
      );
      state.subtotal = subtotal;
      state.logisticsEstimate = subtotal * 0.10;
      state.tax = (subtotal + state.logisticsEstimate) * 0.16;
      state.total = subtotal + state.logisticsEstimate + state.tax;
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      
      if (item) {
        item.quantity = Math.max(5, action.payload.quantity);
      }
      
      // Recalculate totals
      const subtotal = state.items.reduce((sum, item) => 
        sum + (item.price * item.quantity), 0
      );
      state.subtotal = subtotal;
      state.logisticsEstimate = subtotal * 0.10;
      state.tax = (subtotal + state.logisticsEstimate) * 0.16;
      state.total = subtotal + state.logisticsEstimate + state.tax;
    },
    toggleCurrency: (state) => {
      state.currency = state.currency === 'USD' ? 'BS' : 'USD';
      // Usar tasa fija de 205.68 cuando se cambie a BS
      if (state.currency === 'BS') {
        state.exchangeRate = 205.68;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.subtotal = 0;
      state.logisticsEstimate = 0;
      state.tax = 0;
      state.total = 0;
      state.recommendedProducts = [];
    },
    loadCartFromStorage: (state) => {
      const saved = localStorage.getItem('kaney_cart');
      if (saved) {
        try {
          const cartData = JSON.parse(saved);
          state.items = cartData.items || [];
          state.currency = cartData.currency || 'USD';
          
          // Recalculate totals
          const subtotal = state.items.reduce((sum, item) => 
            sum + (item.price * item.quantity), 0
          );
          state.subtotal = subtotal;
          state.logisticsEstimate = subtotal * 0.10;
          state.tax = (subtotal + state.logisticsEstimate) * 0.16;
          state.total = subtotal + state.logisticsEstimate + state.tax;
        } catch (e) {
          console.error('Error loading cart from storage:', e);
        }
      }
    },
    saveCartToStorage: (state) => {
      try {
        localStorage.setItem('kaney_cart', JSON.stringify({
          items: state.items,
          currency: state.currency
        }));
      } catch (e) {
        console.error('Error saving cart to storage:', e);
      }
    },
    updateExchangeRate: (state, action: PayloadAction<number>) => {
      state.exchangeRate = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        
        const existingItem = state.items.find(item => item.id === action.payload.item.id);
        if (existingItem) {
          existingItem.quantity += action.payload.item.quantity;
        } else {
          state.items.push(action.payload.item);
        }
        
        state.recommendedProducts = action.payload.recommended;
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(calculateTotals.fulfilled, (state, action) => {
        state.subtotal = action.payload.subtotal;
        state.logisticsEstimate = action.payload.logisticsEstimate;
        state.tax = action.payload.tax;
        state.total = action.payload.total;
      });
  }
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  toggleCurrency, 
  clearCart,
  loadCartFromStorage,
  saveCartToStorage,
  updateExchangeRate
} = cartSlice.actions;

export default cartSlice.reducer;
