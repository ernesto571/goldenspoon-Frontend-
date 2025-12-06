import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useAuthStore } from "../store/AuthStore";

function AuthListener() {
  const { isSignedIn, isLoaded } = useUser();
  const { createProfile, fetchProfile } = useAuthStore();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      // Attempt to create profile in backend (if not exists)
      createProfile().then(() => {
        fetchProfile(); // Then fetch and populate local state
      });
    }
  }, [isLoaded, isSignedIn, createProfile, fetchProfile]);

  return null;
}

export default AuthListener;
