import { create } from "zustand";
import axios from "../lib/axios";

interface Profile {
  clerk_id: string;
  email: string;
  first_name: string;
  last_name: string;
}

interface AuthState {
  profile: Profile | null;
  loading: boolean;
  fetchProfile: () => Promise<void>;
  createProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  profile: null,
  loading: false,
  fetchProfile: async () => {
    console.log("fetchProfile: Starting request...");
    try {
      set({ loading: true });
      const res = await axios.get("/users/user-profile");
      console.log("fetchProfile: Response received", res.data);
      set({
        profile: {
          clerk_id: res.data.clerk_id,
          email: res.data.email,
          first_name: res.data.first_name,
          last_name: res.data.last_name,
        },
        loading: false,
      });
      console.log("fetchProfile: Profile set successfully");
    } catch (error) {
      console.error("fetchProfile: Error occurred", error);
      set({ loading: false });
    }
  },
  createProfile: async () => {
    console.log("createProfile: Starting request...");
    try {
      const res = await axios.post("/users/create-profile");
      console.log("createProfile: Success", res.data);
    } catch (err) {
      console.error("createProfile: Error occurred", err);
    }
  },
}));