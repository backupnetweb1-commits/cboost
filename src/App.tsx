import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Investment from "./pages/Investment";
import Shop from "./pages/Shop";
import Referring from "./pages/Referring";
import BuyCrypto from "./pages/BuyCrypto";
import Feedback from "./pages/Feedback";
import Blog from "./pages/Blog";
import Support from "./pages/Support";
import Employment from "./pages/Employment";
import NotFound from "./pages/NotFound";
import Authentication from "./pages/Authentication";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Settings from "./pages/Settings";
import AdminPortal from "./pages/AdminPortal";
import WalletPage from './pages/Transaction'

const queryClient = new QueryClient();


import { useTranslation } from "react-i18next";
import LoanPage from "./pages/Loan";
import ReferralMarket from "./pages/ReferralMarket";
import FloatingActionButton from "./components/ui/floatingactionbutton";
import UserDashboard from "./pages/UserDashboard";
import CookieConsentBanner from "./components/ui/cookies_concent";
import Uploard from "./pages/Uploard";
import { AuthProvider } from "./AuthProder";

const App = () => {
  useTranslation(); // Ensures translations are loaded
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
        <BrowserRouter >
          <Routes>
            {/* Public Routes */}
            <Route path="/auth/:ref" element={<Authentication />} />
            <Route path="/auth" element={<Authentication />} />
            {/* Protected Routes - All wrapped inside a single ProtectedRoute component */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/investment" element={<Investment />} />
              <Route path="/transaction" element={<WalletPage />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/referring" element={<Referring />} />
              <Route path="/buy-crypto" element={<BuyCrypto />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/support" element={<Support />} />
              <Route path="/employment" element={<Employment />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/loans" element={<LoanPage />} />
              <Route path="/market" element={<ReferralMarket />} />
              <Route path="/admin-dashboard" element={<AdminPortal />} />
              <Route path="/user-dashboard" element={<UserDashboard />} />
              <Route path="/uploaddoc" element={<Uploard />} />
            </Route>
            {/* Catch-all route for 404 Not Found pages */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <FloatingActionButton />

        </BrowserRouter>
        </AuthProvider>
        <CookieConsentBanner />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
