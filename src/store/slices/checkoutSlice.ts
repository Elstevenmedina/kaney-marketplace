import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface FiscalData {
  businessName: string;
  taxId: string;
  address: string;
  email: string;
}

interface DeliveryInfo {
  address: string;
  city: string;
  state: string;
  postalCode: string;
  recipientName: string;
  recipientPhone: string;
  deliveryNotes?: string;
  preferredTime: 'morning' | 'afternoon' | 'evening';
  coordinates?: {
    lat: number;
    lng: number;
  };
}

interface PaymentMethod {
  type: 'full' | 'cashea';
  casheaInstallments?: number;
}

interface OrderSummary {
  items: any[];
  subtotal: number;
  logistics: number;
  tax: number;
  total: number;
  currency: 'USD' | 'BS';
}

interface OrderData {
  customerInfo: CustomerInfo;
  fiscalData: FiscalData;
  deliveryInfo: DeliveryInfo;
  paymentMethod: PaymentMethod;
  items: any[];
}

interface PaymentData {
  orderId: string;
  paymentMethod: PaymentMethod;
  amount: number;
  currency: string;
}

interface CheckoutState {
  currentStep: number;
  totalSteps: number;
  isAuthenticated: boolean;
  kycCompleted: boolean;
  customerInfo: CustomerInfo | null;
  fiscalData: FiscalData | null;
  deliveryInfo: DeliveryInfo | null;
  paymentMethod: PaymentMethod | null;
  orderSummary: OrderSummary;
  loading: boolean;
  error: string | null;
  validationErrors: Record<string, string>;
  orderId: string | null;
}

// Async thunks
export const createOrder = createAsyncThunk(
  'checkout/createOrder',
  async (orderData: OrderData, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock order creation
      return {
        orderId: `ORD-${Date.now()}`,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al crear orden');
    }
  }
);

export const processPayment = createAsyncThunk(
  'checkout/processPayment',
  async (paymentData: PaymentData, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock payment processing
      return {
        transactionId: `TXN-${Date.now()}`,
        status: 'approved',
        processedAt: new Date().toISOString()
      };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al procesar pago');
    }
  }
);

const initialState: CheckoutState = {
  currentStep: 0,
  totalSteps: 4,
  isAuthenticated: false,
  kycCompleted: false,
  customerInfo: null,
  fiscalData: null,
  deliveryInfo: null,
  paymentMethod: null,
  orderSummary: {
    items: [],
    subtotal: 0,
    logistics: 0,
    tax: 0,
    total: 0,
    currency: 'USD'
  },
  loading: false,
  error: null,
  validationErrors: {},
  orderId: null
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    nextStep: (state) => {
      if (state.currentStep < state.totalSteps - 1) {
        state.currentStep += 1;
      }
    },
    previousStep: (state) => {
      if (state.currentStep > 0) {
        state.currentStep -= 1;
      }
    },
    setCustomerInfo: (state, action: PayloadAction<CustomerInfo>) => {
      state.customerInfo = action.payload;
    },
    setFiscalData: (state, action: PayloadAction<FiscalData>) => {
      state.fiscalData = action.payload;
    },
    setDeliveryInfo: (state, action: PayloadAction<DeliveryInfo>) => {
      state.deliveryInfo = action.payload;
    },
    setPaymentMethod: (state, action: PayloadAction<PaymentMethod>) => {
      state.paymentMethod = action.payload;
    },
    setValidationError: (state, action: PayloadAction<Record<string, string>>) => {
      state.validationErrors = {
        ...state.validationErrors,
        ...action.payload
      };
    },
    clearValidationErrors: (state) => {
      state.validationErrors = {};
    },
    clearValidationError: (state, action: PayloadAction<string>) => {
      delete state.validationErrors[action.payload];
    },
    setOrderSummary: (state, action: PayloadAction<OrderSummary>) => {
      state.orderSummary = action.payload;
    },
    resetCheckout: (state) => {
      state.currentStep = 0;
      state.customerInfo = null;
      state.fiscalData = null;
      state.deliveryInfo = null;
      state.paymentMethod = null;
      state.validationErrors = {};
      state.orderId = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderId = action.payload.orderId;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Process payment
      .addCase(processPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(processPayment.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(processPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const {
  setCurrentStep,
  nextStep,
  previousStep,
  setCustomerInfo,
  setFiscalData,
  setDeliveryInfo,
  setPaymentMethod,
  setValidationError,
  clearValidationErrors,
  clearValidationError,
  setOrderSummary,
  resetCheckout
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
