import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

interface Menu {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  ingredients: string[];
  recommended: boolean;
}

interface FormData {
  name: string;
  price: number;
  image: string;
  category: string;
  ingredients: string[];
  recommended: boolean;
}

interface MenuStore {
  allMenus: Menu[];
  formData: FormData;
  isLoading: boolean;
  error: string | null;
  fetchMenus: () => Promise<void>;
  addToMenu: (data: FormData) => Promise<boolean>;
  updateMenu: (id: string, data: Partial<FormData>) => Promise<boolean>;
  deleteMenu: (id: string) => Promise<boolean>;
  toggleRecommended: (id: string, recommended: boolean) => Promise<boolean>;
  setFormData: (data: Partial<FormData>) => void;
  resetFormData: () => void;
}

const initialFormData: FormData = {
  name: "",
  price: 0,
  image: "",
  category: "",
  ingredients: [],
  recommended: false,
};

export const useAdminMenuStore = create<MenuStore>((set, get) => ({
  allMenus: [],
  formData: initialFormData,
  isLoading: false,
  error: null,

  // Fetch all menus
  fetchMenus: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get("/admin");
      set({ allMenus: response.data.data, isLoading: false });
    } catch (error: any) {
      console.error("Fetch Menus Error:", error);
      const errorMessage =
        error.response?.data?.error || "Failed to fetch menus";
      set({
        error: errorMessage,
        isLoading: false,
        allMenus: [],
      });
      toast.error(errorMessage);
    }
  },

  // Add new menu item
  addToMenu: async (data: FormData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post("/admin", data);
      
      // Add the new menu to the list
      set((state) => ({
        allMenus: [...state.allMenus, response.data.data],
        isLoading: false,
      }));
      
      toast.success("✅ Menu item added successfully!");
      get().resetFormData();
      return true;
    } catch (error: any) {
      console.error("Add Menu Error:", error);
      const errorMessage =
        error.response?.data?.error || "Failed to add menu item";
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      return false;
    }
  },

  // Update existing menu item
  updateMenu: async (id: string, data: Partial<FormData>) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`/admin/${id}`, data);
      
      // Update the menu in the list
      set((state) => ({
        allMenus: state.allMenus.map((menu) =>
          menu.id === id ? response.data.data : menu
        ),
        isLoading: false,
      }));
      
      toast.success("✅ Menu item updated successfully!");
      return true;
    } catch (error: any) {
      console.error("Update Menu Error:", error);
      const errorMessage =
        error.response?.data?.error || "Failed to update menu item";
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      return false;
    }
  },

  // Delete menu item
  deleteMenu: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`/admin/${id}`);
      
      // Remove the menu from the list
      set((state) => ({
        allMenus: state.allMenus.filter((menu) => menu.id !== id),
        isLoading: false,
      }));
      
      toast.success("🗑️ Menu item deleted successfully!");
      return true;
    } catch (error: any) {
      console.error("Delete Menu Error:", error);
      const errorMessage =
        error.response?.data?.error || "Failed to delete menu item";
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      return false;
    }
  },

  // Toggle recommended status
  toggleRecommended: async (id: string, recommended: boolean) => {
    set({ isLoading: true, error: null });
    try {
      const endpoint = recommended ? "recommend" : "unrecommend";
      await axios.put(`/admin/${id}/${endpoint}`);
      
      // Update the menu in the list
      set((state) => ({
        allMenus: state.allMenus.map((menu) =>
          menu.id === id ? { ...menu, recommended } : menu
        ),
        isLoading: false,
      }));
      
      toast.success(
        recommended
          ? "⭐ Added to recommended!"
          : "Removed from recommended"
      );
      return true;
    } catch (error: any) {
      console.error("Toggle Recommended Error:", error);
      const errorMessage =
        error.response?.data?.error || "Failed to update recommendation";
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      return false;
    }
  },

  // Set form data
  setFormData: (data: Partial<FormData>) => {
    set((state) => ({
      formData: { ...state.formData, ...data },
    }));
  },

  // Reset form data
  resetFormData: () => {
    set({ formData: initialFormData });
  },
}));