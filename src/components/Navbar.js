"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("/api/auth/user");
        const data = await response.json();

        if (data.user) {
          setUser(data.user);

          // Check if user details exist in MongoDB
          const userDetailsResponse = await fetch(`/api/check-user?email=${data.user.email}`);
          const userDetails = await userDetailsResponse.json();

          if (!userDetails.exists) {
            router.push("/pages/basicUserDetails"); // Redirect first-time login
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
            MediScan<span className="text-rose-400">AI</span>
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-neutral-300 hover:text-white hover:underline decoration-rose-400 decoration-2 underline-offset-8 transition">Features</a>
          <a href="#technology" className="text-neutral-300 hover:text-white hover:underline decoration-rose-400 decoration-2 underline-offset-8 transition">Technology</a>
          <a href="#testimonials" className="text-neutral-300 hover:text-white hover:underline decoration-rose-400 decoration-2 underline-offset-8 transition">Testimonials</a>
          <a href="#security" className="text-neutral-300 hover:text-white hover:underline decoration-rose-400 decoration-2 underline-offset-8 transition">Security</a>
        </nav>

        {/* User Authentication Controls */}
        <div className="flex items-center gap-4">
          {loading ? null : user ? (
            <>
              <span className="text-neutral-300">{user.given_name || "User"}</span>
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
              <Button className="bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 shadow-md shadow-rose-900/40">
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
