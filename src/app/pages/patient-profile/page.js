"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    gender: "",
    dob: "",
    phoneNumber: "",
    allergies: "",
    avgSleep: "",
    diet: "",
    waterIntake: "",
    exercise: "",
    healthGoals: "",
    bloodGroup: "",
    height: "",
    weight: "",
  });

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch("/api/auth/user");
        const data = await response.json();
        if (data.user) {
          setFormData((prev) => ({
            ...prev,
            fullName: data.user.given_name || "",
            email: data.user.email || "",
          }));
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
    fetchUserData();
  }, []);

  const handleEdit = () => setIsEditing(true);
  const handleSave = async () => {
    setIsEditing(false);
    try {
      await fetch("/api/save-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-200 flex flex-col items-center pt-24 px-10">
      <h2 className="text-3xl font-semibold text-rose-400 mb-6">
        {isEditing ? "Edit Your Profile" : "Your Profile"}
      </h2>

      <div className="w-full max-w-4xl">
        {/* Personal Details */}
        <h3 className="text-xl font-medium text-rose-300 mb-2">Personal Details</h3>
        <div className="grid grid-cols-2 gap-6 mb-6">
          {["fullName", "email", "gender", "dob", "phoneNumber"].map((key) => (
            <div key={key}>
              <label className="text-neutral-400 capitalize">{key.replace(/([A-Z])/g, " $1")}</label>
              {isEditing ? (
                <input
                  type="text"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-md p-2"
                  value={formData[key]}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                />
              ) : (
                <p className="bg-neutral-800 p-2 rounded-md">{formData[key] || "Not provided"}</p>
              )}
            </div>
          ))}
        </div>

        {/* Health Information */}
        <h3 className="text-xl font-medium text-rose-300 mb-2">Health & Lifestyle</h3>
        <div className="grid grid-cols-2 gap-6 mb-6">
          {["allergies", "avgSleep", "diet", "waterIntake", "exercise", "healthGoals"].map((key) => (
            <div key={key}>
              <label className="text-neutral-400 capitalize">{key.replace(/([A-Z])/g, " $1")}</label>
              {isEditing ? (
                <input
                  type="text"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-md p-2"
                  value={formData[key]}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                />
              ) : (
                <p className="bg-neutral-800 p-2 rounded-md">{formData[key] || "Not provided"}</p>
              )}
            </div>
          ))}
        </div>

        {/* Medical Info */}
        <h3 className="text-xl font-medium text-rose-300 mb-2">Medical Information</h3>
        <div className="grid grid-cols-3 gap-6">
          {["bloodGroup", "height", "weight"].map((key) => (
            <div key={key}>
              <label className="text-neutral-400 capitalize">{key.replace(/([A-Z])/g, " $1")}</label>
              {isEditing ? (
                <input
                  type="text"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-md p-2"
                  value={formData[key]}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                />
              ) : (
                <p className="bg-neutral-800 p-2 rounded-md">{formData[key] || "Not provided"}</p>
              )}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-center">
          {isEditing ? (
            <Button
              onClick={handleSave}
              className="bg-rose-500 hover:bg-rose-400 text-white px-6 py-2 rounded-lg"
            >
              Save Changes
            </Button>
          ) : (
            <Button
              onClick={handleEdit}
              className="bg-rose-400 hover:bg-rose-300 text-white px-6 py-2 rounded-lg"
            >
              Edit Profile
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}