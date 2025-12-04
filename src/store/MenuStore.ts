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

interface MenuStore {
  allMenus: Menu[];
  breakfastMenus: Menu[];
  lunchMenus: Menu[];
  dinnerMenus: Menu[];
  appetizerMenus: Menu[];
  dessertMenus: Menu[];
  beverageMenus: Menu[];
  recommendedMeals: Menu[];
  isLoading: boolean;
  error: string | null;
  fetchMenus: () => Promise<void>;
  fetchRecommendedMeals: () => Promise<void>;
  fetchMenusByCategory: (category: string) => Promise<Menu[]>; // Fixed return type
}

export const useMenuStore = create<MenuStore>((set) => ({
  allMenus: [],
  breakfastMenus: [],
  lunchMenus: [],
  dinnerMenus: [],
  appetizerMenus: [],
  dessertMenus: [],
  beverageMenus: [],
  recommendedMeals: [],
  isLoading: false,
  error: null,

  // Fetch all menus
  fetchMenus: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get("/menus/");
      set({ allMenus: response.data.data, isLoading: false });
    } catch (error: any) {
      console.error("Fetch Menus Error:", error);
      const errorMessage = error.response?.data?.error || "Failed to fetch menus";
      set({
        error: errorMessage,
        isLoading: false,
        allMenus: [],
      });
      toast.error(errorMessage);
    }
  },

  // Fetch menus by category - now returns Promise<Menu[]>
  fetchMenusByCategory: async (category: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`/menus/${category}`);
      const menus = response.data.data || [];

      // Update the appropriate state based on category
      switch (category.toLowerCase()) {
        case "breakfast":
          set({ breakfastMenus: menus, isLoading: false });
          break;
        case "lunch":
          set({ lunchMenus: menus, isLoading: false });
          break;
        case "dinner":
          set({ dinnerMenus: menus, isLoading: false });
          break;
        case "appetizers":
          set({ appetizerMenus: menus, isLoading: false });
          break;
        case "desserts":
            set({ dessertMenus: menus, isLoading: false });
            break; 
        case "beverages":
            set({ beverageMenus: menus, isLoading: false });
            break;    

        default:
          set({ isLoading: false });
      }

      // Return the menus
      return menus;
    } catch (error: any) {
      console.error("Fetch Category Menus Error:", error);
      const errorMessage = error.response?.data?.error || `Failed to fetch ${category} menus`;
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      
      // Return empty array on error
      return [];
    }
  },

  // fetch recommended meals
  fetchRecommendedMeals: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get("/menus/recommended");
      set({ recommendedMeals: response.data.data, isLoading: false });
    } catch (error: any) {
      console.error("Fetch recommended meals Error:", error);
      const errorMessage = error.response?.data?.error || "Failed to fetch recommended meals";
      set({
        error: errorMessage,
        isLoading: false,
        recommendedMeals: [],
      });
      toast.error(errorMessage);
    }
  },
}));