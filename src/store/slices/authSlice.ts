import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessType: 'individual' | 'company';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  kycStatus: 'pending' | 'approved' | 'rejected';
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  businessType: 'individual' | 'company';
}

interface KYCData {
  businessName?: string;
  taxId: string;
  businessAddress: string;
  documentType: string;
  documentNumber: string;
}

// Async thunks (mock implementations - replace with real API calls)
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful login
      return {
        user: {
          id: '1',
          firstName: 'Juan',
          lastName: 'Pérez',
          email: credentials.email,
          phone: '+58 412 1234567',
          businessType: 'company' as const
        },
        kycStatus: 'approved' as const
      };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al iniciar sesión');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterData, { rejectWithValue }) => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        user: {
          id: Date.now().toString(),
          ...userData
        },
        kycStatus: 'pending' as const
      };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al registrarse');
    }
  }
);

export const verifyKYC = createAsyncThunk(
  'auth/verifyKYC',
  async (kycData: KYCData, { rejectWithValue }) => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return {
        kycStatus: 'approved' as const
      };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al verificar KYC');
    }
  }
);

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  kycStatus: 'pending'
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.kycStatus = 'pending';
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.kycStatus = action.payload.kycStatus;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.kycStatus = action.payload.kycStatus;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // KYC
      .addCase(verifyKYC.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyKYC.fulfilled, (state, action) => {
        state.loading = false;
        state.kycStatus = action.payload.kycStatus;
      })
      .addCase(verifyKYC.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { logout, clearError, updateUser } = authSlice.actions;
export default authSlice.reducer;
