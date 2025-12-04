import { useAuthStore } from "../store/AuthStore";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

function Dashboard() {
  const { profile, fetchProfile, createProfile, loading } = useAuthStore();
  const { user } = useUser();
  const [error, setError] = useState<string | null>(null);
  
  console.log("📊 Dashboard rendered:", { profile, loading, clerkUser: user?.id });

  useEffect(() => {
    const initProfile = async () => {
      if (!user) return;
      
      console.log("🔄 Dashboard: Initializing profile...");
      
      try {
        // Try to fetch existing profile
        await fetchProfile();
        
        // Check if profile was found
        const state = useAuthStore.getState();
        if (!state.profile) {
          console.log("📝 No profile found, creating new profile...");
          await createProfile();
          // Fetch the newly created profile
          await fetchProfile();
        }
      } catch (err) {
        console.error("❌ Error initializing profile:", err);
        setError("Failed to load profile. Please refresh the page.");
      }
    };

    initProfile();
  }, [user, fetchProfile, createProfile]);

  if (loading) {
    return <div className="text-white text-2xl mt-10">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-2xl mt-10">{error}</div>;
  }

  return (
    <div className="text-[2rem] mt-[10rem] text-white">
      <h1>Dashboard</h1>
      {profile ? (
        <div>
          <p>Welcome, {profile.first_name} {profile.last_name}!</p>
          <p>Email: {profile.email}</p>
          <p className="text-sm">Clerk ID: {profile.clerk_id}</p>
        </div>
      ) : (
        <p>Setting up your profile...</p>
      )}
    </div>
  );
}

export default Dashboard;