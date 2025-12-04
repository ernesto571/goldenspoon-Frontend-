import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "../lib/axios";
import toast from "react-hot-toast";

// Cart Item interface
export interface CartItem {
  menu_id: string;
  menu_name: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
  ingredients: string[];
}

// Cart Store State and Actions
interface CartStore {
  cartItems: CartItem[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchCart: () => Promise<void>;
  addToCart: (menu: any, quantity?: number) => Promise<void>;
  updateQuantity: (menu_id: string, new_quantity: number) => Promise<void>;
  removeFromCart: (menu_id: string) => Promise<void>;
  clearCart: () => Promise<void>;
  
  // Helper methods
  getCartTotal: () => number;
  getCartItemCount: () => number;
  isInCart: (menu_id: string) => boolean;
  getCartItem: (menu_id: string) => CartItem | undefined;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // --- Initial State ---
      cartItems: [],
      isLoading: false,
      error: null,

      // --- Fetch Cart ---
      fetchCart: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.get('/cart/');
          
          set({ 
            cartItems: response.data.data || [], 
            isLoading: false 
          });
        } catch (error: any) {
          console.error("Fetch Cart Error:", error);
          const errorMessage = error.response?.data?.message || "Failed to fetch cart.";
          set({ 
            error: errorMessage, 
            isLoading: false 
          });
          toast.error(errorMessage);
        }
      },

      // --- Add to Cart ---
      addToCart: async (menu, quantity = 1) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post('/cart/', {
            menu_id: menu.id,
            menu_name: menu.name,
            quantity: quantity
          });
          console.log(response)

          // Optimistically update local state
          const currentItems = get().cartItems;
          const existingItem = currentItems.find(item => item.menu_id === menu.id);

          if (existingItem) {
            // Update quantity
            set({
              cartItems: currentItems.map(item =>
                item.menu_id === menu.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
              isLoading: false
            });
          } else {
            // Add new item
            set({
              cartItems: [
                ...currentItems,
                {
                  menu_id: menu.id,
                  menu_name: menu.name,
                  name: menu.name,
                  price: menu.price,
                  image: menu.image,
                  quantity: quantity,
                  category: menu.category,
                  ingredients: menu.ingredients
                }
              ],
              isLoading: false
            });
          }

          toast.success(`${menu.name} added to cart!`);
        } catch (error: any) {
          console.error("Add to Cart Error:", error);
          const errorMessage = error.response?.data?.message || "Failed to add item to cart.";
          set({ error: errorMessage, isLoading: false });
          toast.error( "Failed to add item to cart. Please, make sure you are logged in.");
        }
      },

     // --- Update Quantity ---
updateQuantity: async (menu_id, new_quantity) => {
  if (new_quantity <= 0) {
    get().removeFromCart(menu_id);
    return;
  }

  set({ isLoading: true, error: null });
  
  // Create a loading toast and store its ID
  const loadingToast = toast.loading("Updating quantity...");
  
  try {
    await axios.put(`/cart/${menu_id}`, {
      new_quantity: new_quantity
    });

    // Update local state
    set({
      cartItems: get().cartItems.map(item =>
        item.menu_id === menu_id
          ? { ...item, quantity: new_quantity }
          : item
      ),
      isLoading: false
    });

    // Dismiss the loading toast and show success
    toast.success("Quantity updated!", { id: loadingToast });
    
  } catch (error: any) {
    console.error("Update Quantity Error:", error);
    const errorMessage = error.response?.data?.message || "Failed to update quantity.";
    
    set({ error: errorMessage, isLoading: false });
    
    // Dismiss the loading toast and show error
    toast.error(errorMessage, { id: loadingToast });
  }
},

      // --- Remove from Cart ---
      removeFromCart: async (menu_id) => {
        set({ isLoading: true, error: null });
        try {
          await axios.delete(`/cart/${menu_id}`);

          set({
            cartItems: get().cartItems.filter(item => item.menu_id !== menu_id),
            isLoading: false
          });

          toast.success("Item removed from cart!");
        } catch (error: any) {
          console.error("Remove from Cart Error:", error);
          const errorMessage = error.response?.data?.message || "Failed to remove item.";
          set({ error: errorMessage, isLoading: false });
          toast.error(errorMessage);
        }
      },

      // --- Clear Cart ---
      clearCart: async () => {
        set({ isLoading: true, error: null });
        try {
          await axios.delete('/cart/clear');

          set({
            cartItems: [],
            isLoading: false
          });

          toast.success("Cart cleared!");
        } catch (error: any) {
          console.error("Clear Cart Error:", error);
          const errorMessage = error.response?.data?.message || "Failed to clear cart.";
          set({ error: errorMessage, isLoading: false });
          toast.error(errorMessage);
        }
      },

      // --- Helper: Get Cart Total ---
      getCartTotal: () => {
        return get().cartItems.reduce(
          (total, item) => total + (item.price * item.quantity),
          0
        );
      },

      // --- Helper: Get Total Item Count ---
      getCartItemCount: () => {
        return get().cartItems.reduce(
          (count, item) => count + item.quantity,
          0
        );
      },

      // --- Helper: Check if item is in cart ---
      isInCart: (menu_id) => {
        return get().cartItems.some(item => item.menu_id === menu_id);
      },

      // --- Helper: Get specific cart item ---
      getCartItem: (menu_id) => {
        return get().cartItems.find(item => item.menu_id === menu_id);
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ cartItems: state.cartItems })
    }
  )
);