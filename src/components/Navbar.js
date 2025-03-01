"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("/api/auth/user");
        const data = await response.json();

        if (data.user) {
          setUser(data.user);

          // Fetch user role from MongoDB
          const userDetailsResponse = await fetch(`/api/user?email=${data.user.email}`);
          const userDetails = await userDetailsResponse.json();

          if (userDetails.exists) {
            setUserRole(userDetails.user.role);
          } else {
            setUserRole(null);
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  // Function to handle profile redirection based on user role
  const handleProfileRedirect = () => {
    if (!userRole) {
      router.push("/pages/basicUserDetails"); // Redirect if no role is set
    } else if (userRole === "Doctor") {
      router.push("/pages/doctor-profile");
    } else {
      router.push("/pages/patient-profile");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-150/80 backdrop-blur-md border-b border-neutral-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center shadow-lg shadow-green-800/30">
            <Brain className="w-6 h-6 text-green-900" />
          </div>
          <span className="text-xl font-bold text-green-900">
            <a href="/">MediVision<span className="text-green-400">AI</span></a>
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {!userRole ? (
            <>
              <a href="#features" className="text-neutral-900 hover:text-green-900 hover:underline decoration-green-400 decoration-2 underline-offset-8 transition">
                Features
              </a>
              <a href="#technology" className="text-neutral-900 hover:text-green-900 hover:underline decoration-green-400 decoration-2 underline-offset-8 transition">
                Technology
              </a>
              <a href="#testimonials" className="text-neutral-900 hover:text-green-900 hover:underline decoration-green-400 decoration-2 underline-offset-8 transition">
                Testimonials
              </a>
              <a href="#security" className="text-neutral-900 hover:text-green-900 hover:underline decoration-green-400 decoration-2 underline-offset-8 transition">
                Security
              </a>
            </>
          ) : userRole === "Patient" ? (
            <>
              <a href="/pages/find-doctor" className="text-neutral-900 hover:text-green-900">Find a Doctor</a>
              <a href="/pages/symptom-checker" className="text-neutral-900 hover:text-green-900">AI Diagnosis</a>
              <a href="/pages/diagnosis" className="text-neutral-900 hover:text-green-900">AI Report/Scan</a>
              <a href="/pages/health-history" className="text-neutral-900 hover:text-green-900">Health History</a>
            </>
          ) : (
            <>
              <a href="/pages/appointment" className="text-neutral-900 hover:text-green-900">My Appointments</a>
              <a href="/pages/meditron" className="text-neutral-900 hover:text-green-900">MeditronAI</a>
              <a href="/pages/doc-dashboard" className="text-neutral-900 hover:text-green-900">Update Availability</a>
              <a href="/pages/patients" className="text-neutral-900 hover:text-green-900">Patients</a>
            </>
          )}
        </nav>

        {/* User Authentication Controls */}
        <div className="flex items-center gap-4">
          {loading ? null : user ? (
            <>
              <button 
                onClick={handleProfileRedirect} 
                className="text-neutral-900 hover:text-green-900 transition"
              >
                {user.given_name || "Profile"}
              </button>
              <LogoutLink>
                <Button variant="outline" className="border-green-500 text-green-400 hover:bg-green-950">
                  Logout
                </Button>
              </LogoutLink>
            </>
          ) : (
            <>
              <LoginLink>
                <Button variant="outline" className="border-green-500 text-green-400 hover:bg-green-950">
                  Login
                </Button>
              </LoginLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
