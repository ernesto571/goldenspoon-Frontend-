import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useUser } from "@clerk/clerk-react";
import Navbar from "./components/Navbar";
import SignInPage from "./pages/SignInPage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import CartPage from "./pages/CartPage";
import AdminHomePage from "./pages/AdminHomePage";
import { useAdminStore } from "./store/AdminAuthStore";
import LunchPage from "./pages/LunchPage";
import BreakfastPage from "./pages/BreakfastPage";
import DinnerPage from "./pages/DinnerPage";
import BeveragesPage from "./pages/BeveragesPage";
import DessertsPage from "./pages/DessertsPage";
import AppetizersPage from "./pages/AppetizersPage";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";
import OrdersPage from "./pages/OrdersPage";
import AuthListener from "./hooks/AuthListener";



function App() {
  const { isSignedIn, isLoaded: clerkLoaded } = useUser();
  const { isAdmin, loading: adminLoading, checkAdmin } = useAdminStore();

  useEffect(() => {
    // Only check admin status if user is signed in
    if (clerkLoaded && isSignedIn) {
      checkAdmin();
    }
  }, [clerkLoaded, isSignedIn, checkAdmin]);

  // Wait for Clerk to load
  if (!clerkLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader className="size-10 animate-spin text-[#157c6e]" />
      </div>
    );
  }

  // Wait for admin check only if user is signed in
  if (isSignedIn && adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader className="size-10 animate-spin text-[#157c6e]" />
      </div>
    );
  }

  if(!isSignedIn){
    <Navigate to="/sign-in"/>
  }

  return (
    <BrowserRouter>
      <AuthListener/>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-in/*" element={<SignInPage />} />
          <Route path="/sign-up/*" element={<SignUpPage />} />
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/breakfast" element={  <BreakfastPage /> } />
          <Route path="/lunch" element={  <LunchPage /> }/>
          <Route path="/dinner" element={  <DinnerPage /> }/>
          <Route path="/appetizers" element={  <AppetizersPage /> }/>
          <Route path="/desserts" element={  <DessertsPage /> }/>
          <Route path="/beverages" element={  <BeveragesPage /> }/>

          
          
          <Route path="/cart" element={ <ProtectedRoute> <CartPage /> </ProtectedRoute>}/>
          <Route path="/purchase-success" element={ <ProtectedRoute> <PurchaseSuccessPage /> </ProtectedRoute>}/>
          <Route path="/purchase-cancel" element={ <ProtectedRoute> <PurchaseCancelPage /> </ProtectedRoute>}/>
          <Route path="/my-orders" element={ <ProtectedRoute> <OrdersPage /> </ProtectedRoute>}/>
          
          {/* Admin route - requires both authentication AND admin role */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                {isAdmin ? <AdminHomePage /> : <Navigate to="/" replace />}
              </ProtectedRoute>
            }
          />
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
