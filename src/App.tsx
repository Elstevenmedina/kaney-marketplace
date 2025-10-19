import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import Marketplace from "./pages/Marketplace";
import ProductsPage from "./pages/ProductsPage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CustomerProfile from "./pages/CustomerProfile";
import SearchResults from "./pages/SearchResults";
import KaneySostenible from "./pages/KaneySostenible";
import TransportistasCertificados from "./pages/TransportistasCertificados";
import PitchDeck from "./pages/PitchDeck";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Marketplace />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/category/:categoryId" element={<CategoryPage />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/profile" element={<CustomerProfile />} />
              <Route path="/sostenible" element={<KaneySostenible />} />
              <Route path="/transportistas-certificados" element={<TransportistasCertificados />} />
              <Route path="/pitch-deck" element={<PitchDeck />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </PersistGate>
    </Provider>
  </QueryClientProvider>
);

export default App;
