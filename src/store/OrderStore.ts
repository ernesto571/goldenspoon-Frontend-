import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

interface OrderProduct {
  menu_id?: number;
  id: number;
  name: string;
  price: number | string;
  quantity: number;
  image: string;
}

interface Order {
  id: number;
  user_id: number;
  menu_id: number;
  menu_name: string;
  unit_price:number;
  quantity: number;
  total_amount: number;
  stripe_session_id: string;
  image:string,
  created_at: number;
  updated_at: string;
}

interface OrderStore {
  orders: Order[];
  currentOrder: Order | null;
  isLoading: boolean;
  error: string | null;
  createCheckoutSession: (products: OrderProduct[]) => Promise<void>;
  verifyPayment: (sessionId: string) => Promise<boolean>;
  fetchAllOrders: () => Promise<void>;
  fetchUserOrders: () => Promise<void>;
  clearError: () => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],
  currentOrder: null,
  isLoading: false,
  error: null,

  createCheckoutSession: async (products) => {
    set({ isLoading: true, error: null });
    
    try {
      if (!products || products.length === 0) {
        throw new Error("Cart is empty");
      }

      // Clean products
      const cleanedProducts = products.map(p => ({
        id: p.id,
        menu_id: p.menu_id || p.id,
        name: p.name || 'Unknown Item',
        price: typeof p.price === 'string' ? parseFloat(p.price) : p.price,
        quantity: Number(p.quantity) || 1,
        image: p.image || ''
      }));

      // Call backend
      const response = await axios.post('/payment/create-checkout-session', {
        products: cleanedProducts
      });

      const checkoutUrl = response?.data?.url;

      if (!checkoutUrl) {
        throw new Error("No checkout URL received");
      }

      // Direct redirect - most reliable method
      window.location.href = checkoutUrl;
      
    } catch (error: any) {
      console.error("Checkout error:", error);
      const msg = error.response?.data?.message || error.message || "Payment error";
      set({ error: msg, isLoading: false });
      toast.error(msg);
    }
  },

  verifyPayment: async (sessionId: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await axios.post('/payment/checkout-success', { 
        sessionId 
      });

      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Payment verification failed");
      }

      set({ isLoading: false });
      toast.success("Payment successful! Order created.");
      return true;
    } catch (error: any) {
      console.error("Payment verification error:", error);
      const msg = error.response?.data?.message || error.message || "Failed to verify payment";
      set({ error: msg, isLoading: false });
      toast.error(msg);
      return false;
    }
  },

  fetchAllOrders: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await axios.get('/orders/');
      set({
        orders: response.data?.data || [],
        isLoading: false
      });
    } catch (error: any) {
      const msg = error.response?.data?.message || "Failed to fetch orders";
      set({ error: msg, isLoading: false, orders: [] });
      
      if (error.response?.status !== 404) {
        toast.error(msg);
      }
    }
  },

  fetchUserOrders: async()=>{
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(`/orders/user-orders`);
      set({
        orders: response.data?.data || [],
        isLoading: false
      });
    } catch (error: any) {
      const msg = error.response?.data?.message || "Failed to fetch user orders";
      set({ error: msg, isLoading: false, orders: [] });
      
      if (error.response?.status !== 404) {
        toast.error(msg);
      }
    }


  },

  clearError: () => set({ error: null })
}));