"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser, useAuth } from "@clerk/nextjs";

const LogoutPage = () => {
  const { user, isLoaded } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();

  const [showConfirmation, setShowConfirmation] = useState(false);  // Track if confirmation is shown
  const [isLoggingOut, setIsLoggingOut] = useState(false);  // Track the logout process

  // Handle the logout confirmation
  const handleLogoutConfirmation = () => {
    setIsLoggingOut(true);  // Set loading state
    signOut({ redirectUrl: '/' });  // Pass the custom login page URL
  };

  // Show the confirmation dialog when the user is loaded and logged in
  useEffect(() => {
    if (isLoaded && user) {
      setShowConfirmation(true);  // Show the confirmation form
    } else if (isLoaded && !user) {
      router.push("/login");  // Redirect to login if no user is found
    }
  }, [isLoaded, user, router]);

  if (!showConfirmation) {
    return <div>Redirecting...</div>;  // Show loading screen or message
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
        <h2 className="text-xl font-semibold text-center mb-4">Are you sure you want to log out?</h2>
        <div className="flex justify-between">
          <button
            onClick={() => router.push("/")}  // Redirect to home page if user cancels
            className="w-1/2 bg-gray-300 hover:bg-gray-400 text-white py-2 rounded-lg mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleLogoutConfirmation}
            className={`w-1/2 ${isLoggingOut ? 'bg-gray-500' : 'bg-red-500'} hover:bg-red-600 text-white py-2 rounded-lg`}
            disabled={isLoggingOut}  // Disable the button if already logging out
          >
            {isLoggingOut ? "Logging out..." : "Log Out"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
