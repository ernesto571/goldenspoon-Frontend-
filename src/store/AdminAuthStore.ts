import { create } from "zustand";
import axios from "../lib/axios";

interface AdminState {
  isAdmin: boolean;
  loading: boolean;
  checkAdmin: () => Promise<void>;
}

export const useAdminStore = create<AdminState>((set) => ({
  isAdmin: false,
  loading: true,
  
  checkAdmin: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/admin/check");
      
      // Fixed: Access the correct path in the response
      // Backend returns: { success: true, data: { isAdmin: true } }
      const isAdmin = res.data?.data?.isAdmin || false;
      
      console.log("✅ Admin check response:", res.data);
      set({ isAdmin, loading: false });
      
    } catch (err: any) {
      console.error("❌ Check admin failed:", err.response?.data || err.message);
      
      // User is either not authenticated or not an admin
      set({ isAdmin: false, loading: false });
    }
  },
}));