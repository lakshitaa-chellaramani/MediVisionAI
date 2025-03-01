"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function PatientDetailsForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
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

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch User Info (Name & Email)
  useEffect(() => {
    async function fetchUserInfo() {
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
      } finally {
        setLoading(false);
      }
    }
    fetchUserInfo();
  }, []);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("/api/patient-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Patient details saved successfully!");
        router.push("/"); // ✅ Redirect to home page after submission
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error saving patient details:", error);
    }
  };

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-neutral-900">
      <div className="max-w-lg w-full bg-neutral-800 p-8 rounded-lg shadow-lg border border-neutral-700">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Complete Your Health Profile
        </h2>

        {loading ? (
          <p className="text-rose-400 text-lg text-center">Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="text-neutral-300 block mb-1">Full Name</label>
              <input
                type="text"
                className="w-full bg-neutral-700 border border-neutral-600 rounded-md p-2 text-neutral-400"
                value={formData.fullName}
                disabled
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-neutral-300 block mb-1">Email</label>
              <input
                type="email"
                className="w-full bg-neutral-700 border border-neutral-600 rounded-md p-2 text-neutral-400"
                value={formData.email}
                disabled
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            {/* Health & Lifestyle Inputs */}
            {["allergies", "avgSleep", "diet", "waterIntake", "exercise", "healthGoals"].map((key) => (
              <div key={key}>
                <label className="text-neutral-300 block mb-1 capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type="text"
                  className="w-full bg-neutral-700 border border-neutral-600 rounded-md p-2 text-neutral-200"
                  value={formData[key]}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                />
              </div>
            ))}

            {/* Medical Information */}
            <div>
              <label className="text-neutral-300 block mb-1">Blood Group</label>
              <select
                className="w-full bg-neutral-700 border border-neutral-600 rounded-md p-2 text-neutral-200"
                value={formData.bloodGroup}
                onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
              >
                <option value="">Select</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            {["height", "weight"].map((key) => (
              <div key={key}>
                <label className="text-neutral-300 block mb-1 capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type="text"
                  className="w-full bg-neutral-700 border border-neutral-600 rounded-md p-2 text-neutral-200"
                  value={formData[key]}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                />
              </div>
            ))}

            {/* Submit Button */}
            <Button type="submit" className="w-full bg-rose-600 text-white">
              Save Details
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
