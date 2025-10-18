import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Customer {
  id: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    profileImage?: string;
  };
  businessInfo?: {
    businessName: string;
    businessType: 'individual' | 'company';
    taxId: string;
  };
  kycStatus: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  currency: 'USD' | 'BS';
  items: OrderItem[];
  deliveryAddress: string;
  trackingNumber?: string;
}

interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  price: number;
  image: string;
}

interface Address {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  isDefault: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

interface Refund {
  id: string;
  orderId: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected' | 'processed';
  amount: number;
  currency: 'USD' | 'BS';
  reason: string;
  productName: string;
}

interface SupportTicket {
  id: string;
  subject: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  messages: TicketMessage[];
}

interface TicketMessage {
  id: string;
  author: 'customer' | 'support';
  message: string;
  timestamp: string;
  attachments?: string[];
}

interface OrderFilters {
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
}

interface CustomerProfileState {
  customer: Customer | null;
  orders: Order[];
  addresses: Address[];
  refunds: Refund[];
  supportTickets: SupportTicket[];
  activeTab: string;
  loading: boolean;
  error: string | null;
  editingAddress: Address | null;
  editingProfile: boolean;
}

// Async thunks
export const fetchCustomerProfile = createAsyncThunk(
  'customer/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock data
      return {
        customer: {
          id: '1',
          personalInfo: {
            firstName: 'Juan',
            lastName: 'Pérez',
            email: 'juan.perez@example.com',
            phone: '+591 70123456',
          },
          businessInfo: {
            businessName: 'Distribuidora El Campo',
            businessType: 'company' as const,
            taxId: 'NIT-12345678',
          },
          kycStatus: 'approved' as const,
          createdAt: '2024-01-15'
        },
        addresses: [
          {
            id: '1',
            name: 'Oficina Principal',
            address: 'Av. Principal, Centro Comercial Los Palos Grandes',
            city: 'Caracas',
            state: 'Distrito Capital',
            postalCode: '1060',
            phone: '+58 212 1234567',
            isDefault: true
          }
        ]
      };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al cargar perfil');
    }
  }
);

export const updateCustomerProfile = createAsyncThunk(
  'customer/updateProfile',
  async (profileData: Partial<Customer>, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return profileData;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al actualizar perfil');
    }
  }
);

export const fetchOrders = createAsyncThunk(
  'customer/fetchOrders',
  async (params: OrderFilters = {}, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock orders data
      return [];
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al cargar órdenes');
    }
  }
);

export const createAddress = createAsyncThunk(
  'customer/createAddress',
  async (addressData: Omit<Address, 'id'>, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        ...addressData,
        id: Date.now().toString()
      };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al crear dirección');
    }
  }
);

export const updateAddressAsync = createAsyncThunk(
  'customer/updateAddress',
  async (addressData: Address, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return addressData;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al actualizar dirección');
    }
  }
);

export const deleteAddressAsync = createAsyncThunk(
  'customer/deleteAddress',
  async (addressId: string, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return addressId;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al eliminar dirección');
    }
  }
);

const initialState: CustomerProfileState = {
  customer: null,
  orders: [],
  addresses: [],
  refunds: [],
  supportTickets: [],
  activeTab: 'purchases',
  loading: false,
  error: null,
  editingAddress: null,
  editingProfile: false
};

const customerProfileSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    setEditingAddress: (state, action: PayloadAction<Address | null>) => {
      state.editingAddress = action.payload;
    },
    setEditingProfile: (state, action: PayloadAction<boolean>) => {
      state.editingProfile = action.payload;
    },
    addAddress: (state, action: PayloadAction<Address>) => {
      state.addresses.push(action.payload);
    },
    updateAddress: (state, action: PayloadAction<Address>) => {
      const index = state.addresses.findIndex(addr => addr.id === action.payload.id);
      if (index !== -1) {
        state.addresses[index] = action.payload;
      }
    },
    deleteAddress: (state, action: PayloadAction<string>) => {
      state.addresses = state.addresses.filter(addr => addr.id !== action.payload);
    },
    setDefaultAddress: (state, action: PayloadAction<string>) => {
      state.addresses = state.addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === action.payload
      }));
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch profile
      .addCase(fetchCustomerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload.customer;
        state.addresses = action.payload.addresses;
      })
      .addCase(fetchCustomerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update profile
      .addCase(updateCustomerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCustomerProfile.fulfilled, (state, action) => {
        state.loading = false;
        if (state.customer) {
          state.customer = { ...state.customer, ...action.payload };
        }
        state.editingProfile = false;
      })
      .addCase(updateCustomerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create address
      .addCase(createAddress.fulfilled, (state, action) => {
        state.addresses.push(action.payload);
        state.editingAddress = null;
      })
      // Update address
      .addCase(updateAddressAsync.fulfilled, (state, action) => {
        const index = state.addresses.findIndex(addr => addr.id === action.payload.id);
        if (index !== -1) {
          state.addresses[index] = action.payload;
        }
        state.editingAddress = null;
      })
      // Delete address
      .addCase(deleteAddressAsync.fulfilled, (state, action) => {
        state.addresses = state.addresses.filter(addr => addr.id !== action.payload);
      });
  }
});

export const {
  setActiveTab,
  setEditingAddress,
  setEditingProfile,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress
} = customerProfileSlice.actions;

export default customerProfileSlice.reducer;
