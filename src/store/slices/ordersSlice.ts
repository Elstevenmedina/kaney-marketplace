import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  category?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  logistics: number;
  tax: number;
  total: number;
  currency: 'USD' | 'BS';
  paymentMethod: string;
  paymentDetails: Record<string, string>;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
  deliveryInfo?: {
    address: string;
    coordinates: { lat: number; lng: number };
    deliveryTime: string;
  };
}

interface OrdersState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      console.log('Agregando orden al store:', action.payload);
      state.orders.unshift(action.payload); // Add to beginning of array
    },
    updateOrderStatus: (state, action: PayloadAction<{ orderId: string; status: Order['status'] }>) => {
      const order = state.orders.find(order => order.id === action.payload.orderId);
      if (order) {
        order.status = action.payload.status;
        order.updatedAt = new Date();
      }
    },
    loadOrdersFromStorage: (state) => {
      try {
        const saved = localStorage.getItem('kaney_orders');
        if (saved) {
          const ordersData = JSON.parse(saved);
          state.orders = ordersData.map((order: Record<string, unknown>) => {
            // Función helper para crear fecha válida
            const createValidDate = (dateValue: unknown): Date => {
              if (!dateValue) return new Date();
              
              const date = new Date(dateValue as string);
              // Si la fecha es inválida, usar fecha actual
              if (isNaN(date.getTime())) {
                console.warn('Fecha inválida encontrada, usando fecha actual:', dateValue);
                return new Date();
              }
              return date;
            };
            
            return {
              ...order,
              createdAt: createValidDate(order.createdAt),
              updatedAt: createValidDate(order.updatedAt)
            };
          });
        }
      } catch (error) {
        console.error('Error loading orders from storage:', error);
        state.error = 'Error loading orders';
      }
    },
    saveOrdersToStorage: (state) => {
      try {
        console.log('Guardando órdenes en localStorage:', state.orders);
        localStorage.setItem('kaney_orders', JSON.stringify(state.orders));
        console.log('Órdenes guardadas exitosamente');
      } catch (error) {
        console.error('Error saving orders to storage:', error);
        state.error = 'Error saving orders';
      }
    },
    clearOrders: (state) => {
      state.orders = [];
    },
    clearCorruptedOrders: (state) => {
      // Limpiar órdenes corruptas del localStorage
      try {
        localStorage.removeItem('kaney_orders');
        state.orders = [];
        state.error = null;
        console.log('Órdenes corruptas limpiadas del localStorage');
      } catch (error) {
        console.error('Error clearing corrupted orders:', error);
      }
    }
  }
});

export const {
  addOrder,
  updateOrderStatus,
  loadOrdersFromStorage,
  saveOrdersToStorage,
  clearOrders,
  clearCorruptedOrders
} = ordersSlice.actions;

export default ordersSlice.reducer;
