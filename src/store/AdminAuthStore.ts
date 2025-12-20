import { create } from "zustand";
import axios from "../lib/axios";

interface AdminState {
  isAdmin: boolean;
  loading: boolean;
  checkAdmin: () => Promise<void>;
}

export const useAdminStore = create<AdminState>((set) => ({
  isAdmin: false,
  loading: false,
   
  checkAdmin: async () => {
    set({ loading: true });
  
    try {
      const res = await axios.get("/admin/check");
  
      const isAdmin = Boolean(res.data?.data?.isAdmin);
      set({ isAdmin, loading: false });
  
    } catch (err: any) {
      if (err.response?.status === 401) {
        // Not signed in
        set({ isAdmin: false, loading: false });
        return;
      }
  
      console.error("❌ Check admin failed:", err.response?.data || err.message);
      set({ isAdmin: false, loading: false });
    }
  }
  
}));
