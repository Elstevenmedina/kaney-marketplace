import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface ModalState {
  loginModal: boolean;
  registerModal: boolean;
  addressModal: boolean;
  productQuickView: boolean;
  filterModal: boolean;
}

interface UIState {
  theme: 'light' | 'dark';
  language: 'es' | 'en';
  currency: 'USD' | 'BS';
  notifications: Notification[];
  modals: ModalState;
  loading: boolean;
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
}

const initialState: UIState = {
  theme: 'light',
  language: 'es',
  currency: 'USD',
  notifications: [],
  modals: {
    loginModal: false,
    registerModal: false,
    addressModal: false,
    productQuickView: false,
    filterModal: false
  },
  loading: false,
  sidebarOpen: true,
  mobileMenuOpen: false
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setLanguage: (state, action: PayloadAction<'es' | 'en'>) => {
      state.language = action.payload;
    },
    setCurrency: (state, action: PayloadAction<'USD' | 'BS'>) => {
      state.currency = action.payload;
    },
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'timestamp' | 'read'>>) => {
      const notification: Notification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        read: false
      };
      state.notifications.unshift(notification);
      
      // Keep only last 50 notifications
      if (state.notifications.length > 50) {
        state.notifications = state.notifications.slice(0, 50);
      }
    },
    markNotificationAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    markAllNotificationsAsRead: (state) => {
      state.notifications.forEach(n => n.read = true);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    openModal: (state, action: PayloadAction<keyof ModalState>) => {
      state.modals[action.payload] = true;
    },
    closeModal: (state, action: PayloadAction<keyof ModalState>) => {
      state.modals[action.payload] = false;
    },
    closeAllModals: (state) => {
      Object.keys(state.modals).forEach(key => {
        state.modals[key as keyof ModalState] = false;
      });
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.mobileMenuOpen = action.payload;
    }
  }
});

export const {
  setTheme,
  toggleTheme,
  setLanguage,
  setCurrency,
  addNotification,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  removeNotification,
  clearNotifications,
  openModal,
  closeModal,
  closeAllModals,
  setLoading,
  toggleSidebar,
  setSidebarOpen,
  toggleMobileMenu,
  setMobileMenuOpen
} = uiSlice.actions;

export default uiSlice.reducer;
