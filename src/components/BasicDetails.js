"use client";
import { useEffect, useState } from "react";
import { Loader2, Mail, User, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UserDetails(email) {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(`/api/user?email=${email}`);
        const data = await response.json();

        if (data.exists) {
          setUserDetails(data.user);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [email]);

  return (
    <div className="max-w-lg w-full bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg p-6">
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="w-10 h-10 text-green-500 animate-spin" />
        </div>
      ) : userDetails ? (
        <>
          <div className="text-center">
            <User className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white">{userDetails.fullName}</h2>
            <p className="text-sm text-neutral-400">{userDetails.role || "No Role Assigned"}</p>
          </div>

          <div className="space-y-4 mt-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-green-400" />
              <p className="text-neutral-300">{userDetails.email}</p>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-green-400" />
              <p className="text-neutral-300">{userDetails.dob || "Not Provided"}</p>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-green-400" />
              <p className="text-neutral-300">{userDetails.phoneNumber || "Not Provided"}</p>
            </div>
          </div>

          {/* Edit Profile Button */}
          <div className="mt-6 flex justify-center">
            <Button
              className="bg-green-500 hover:bg-green-600 text-white w-full"
              onClick={() => alert("Edit Profile Clicked")} // Replace with navigation logic
            >
              Edit Profile
            </Button>
          </div>
        </>
      ) : (
        <p className="text-neutral-300">User details not found.</p>
      )}
    </div>
  );
}
