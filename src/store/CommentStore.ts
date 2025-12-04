import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

interface Comment {
  id:string;
  customer_name: string;
  customer_email: string;
  customer_image: string;
  comment: string;
}

interface CommentStore {
  allComments:Comment[];
  isLoading: boolean;
  error: string | null;
  fetchComments: () => Promise<void>;
}

export const useCommentStore = create<CommentStore>((set) => ({
    // --- Initial State ---
    allComments:[],
    isLoading: false,
    error: null,

    fetchComments: async () => {
        // Start loading state
        set({ isLoading: true, error: null });

        try {
        // Use the imported axios instance to call your backend API
        const response = await axios.get('/comments');

        // Update state with fetched data
        set({ allComments: response.data.data, isLoading: false });
        // toast.success("🍽️ Comments fetched successfully!");
        
        } catch (error: any) {
        console.error("Fetch Menus Error:", error);
        
        // Determine error message from the response or use a default
        const errorMessage = error.response?.data?.message || "Failed to fetch comments. Check server status.";
        
        // Update state with error and reset menus/loading
        set({ 
            error: errorMessage, 
            isLoading: false, 
            allComments: [] 
        });
        toast.error(errorMessage);
        }
    },
}))