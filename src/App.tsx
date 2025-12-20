import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useUser } from "@clerk/clerk-react";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthListener from "./hooks/AuthListener";

import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import Dashboard from "./pages/Dashboard";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";

import AdminHomePage from "./pages/AdminHomePage";

import BreakfastPage from "./pages/BreakfastPage";
import LunchPage from "./pages/LunchPage";
import DinnerPage from "./pages/DinnerPage";
import AppetizersPage from "./pages/AppetizersPage";
import DessertsPage from "./pages/DessertsPage";
import BeveragesPage from "./pages/BeveragesPage";

import { useAdminStore } from "./store/AdminAuthStore";

function App() {
  const { isSignedIn, isLoaded } = useUser();
  const { isAdmin, loading: adminLoading, checkAdmin } = useAdminStore();

  // Check admin only AFTER Clerk is ready and user is signed in
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      checkAdmin();
    }
  }, [isLoaded, isSignedIn, checkAdmin]);

  // Wait for Clerk
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader className="size-10 animate-spin text-[#157c6e]" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <AuthListener />

      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <Routes>
          {/* ---------- PUBLIC ROUTES ---------- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-in/*" element={<SignInPage />} />
          <Route path="/sign-up/*" element={<SignUpPage />} />

          <Route path="/breakfast" element={<BreakfastPage />} />
          <Route path="/lunch" element={<LunchPage />} />
          <Route path="/dinner" element={<DinnerPage />} />
          <Route path="/appetizers" element={<AppetizersPage />} />
          <Route path="/desserts" element={<DessertsPage />} />
          <Route path="/beverages" element={<BeveragesPage />} />

          {/* ---------- AUTHENTICATED ROUTES ---------- */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-orders"
            element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/purchase-success"
            element={
              <ProtectedRoute>
                <PurchaseSuccessPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/purchase-cancel"
            element={
              <ProtectedRoute>
                <PurchaseCancelPage />
              </ProtectedRoute>
            }
          />

          {/* ---------- ADMIN ROUTE ---------- */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                {adminLoading ? (
                  <div className="flex items-center justify-center h-screen">
                    <Loader className="size-10 animate-spin text-[#157c6e]" />
                  </div>
                ) : isAdmin ? (
                  <AdminHomePage />
                ) : (
                  <Navigate to="/" replace />
                )}
              </ProtectedRoute>
            }
          />

          {/* ---------- FALLBACK ---------- */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
