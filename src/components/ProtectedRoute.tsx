import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { Loader} from "lucide-react"

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useUser();
  
  console.log("🔒 ProtectedRoute check:", { isSignedIn, isLoaded });
  
  // Wait for Clerk to load
  if (!isLoaded) {
    console.log("⏳ Clerk still loading...");
    return <div>
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    </div>;
  }
  
  // If not signed in, redirect to home
  if (!isSignedIn) {
    console.log("❌ Not signed in, redirecting to home");
    return <Navigate to="/sign-in" />;
  }
  
  // If signed in, show the protected content
  console.log("✅ Signed in, showing protected content");
  return <>{children}</>;
}

export default ProtectedRoute;