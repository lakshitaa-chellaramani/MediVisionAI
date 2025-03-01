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
            router.push("/pages/basicUserDetails"); // Redirect if first-time login
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [router]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-rose-600 flex items-center justify-center shadow-lg shadow-rose-800/30">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-white">
            <a href="/">MediVision<span className="text-rose-400">AI</span></a>
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {!userRole ? (
            <>
              <a href="#features" className="text-neutral-300 hover:text-white hover:underline decoration-rose-400 decoration-2 underline-offset-8 transition">
                Features
              </a>
              <a href="#technology" className="text-neutral-300 hover:text-white hover:underline decoration-rose-400 decoration-2 underline-offset-8 transition">
                Technology
              </a>
              <a href="#testimonials" className="text-neutral-300 hover:text-white hover:underline decoration-rose-400 decoration-2 underline-offset-8 transition">
                Testimonials
              </a>
              <a href="#security" className="text-neutral-300 hover:text-white hover:underline decoration-rose-400 decoration-2 underline-offset-8 transition">
                Security
              </a>
            </>
          ) : userRole === "Patient" ? (
            <>
              <a href="/find-doctor" className="text-neutral-300 hover:text-white">Find a Doctor</a>
              <a href="/ai-diagnosis" className="text-neutral-300 hover:text-white">AI Diagnosis</a>
              <a href="/ai-reports" className="text-neutral-300 hover:text-white">AI Report/Scan</a>
              <a href="/health-history" className="text-neutral-300 hover:text-white">Health History</a>
            </>
          ) : (
            <>
              <a href="/appointments" className="text-neutral-300 hover:text-white">My Appointments</a>
              <a href="/meditron-ai" className="text-neutral-300 hover:text-white">MeditronAI</a>
              <a href="/update-availability" className="text-neutral-300 hover:text-white">Update Availability</a>
              <a href="/patients" className="text-neutral-300 hover:text-white">Patients</a>
            </>
          )}
        </nav>

        {/* User Authentication Controls */}
        <div className="flex items-center gap-4">
          {loading ? null : user ? (
            <>

              <a href='/pages/profile'><span className="text-neutral-300">{user.given_name || "User"}</span></a>
              <LogoutLink>
                <Button variant="outline" className="border-rose-500 text-rose-400 hover:bg-rose-950">
                  Logout
                </Button>
              </LogoutLink>
            </>
          ) : (
            <>
              <LoginLink>
                <Button variant="outline" className="border-rose-500 text-rose-400 hover:bg-rose-950">
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
