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
      <div className="max-w-5xl w-full bg-neutral-800 p-8 rounded-lg shadow-lg border border-neutral-700">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Complete Your Health Profile
        </h2>

        {loading ? (
          <p className="text-rose-400 text-lg text-center">Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Section */}
            <div className="bg-neutral-750 rounded-md p-4 border border-neutral-700">
              <h3 className="text-rose-500 text-lg mb-4 font-medium">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="text-neutral-300 block mb-1">Full Name</label>
                  <input
                    type="text"
                    className="w-full bg-neutral-700 border border-neutral-600 rounded-md p-2 text-neutral-400"
                    value={formData.fullName}
                    disabled
                  ></input>
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
              </div>
            </div>

            {/* Health Metrics Section */}
            <div className="bg-neutral-750 rounded-md p-4 border border-neutral-700">
              <h3 className="text-rose-500 text-lg mb-4 font-medium">Health Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

                <div>
                  <label className="text-neutral-300 block mb-1">Height</label>
                  <input
                    type="text"
                    className="w-full bg-neutral-700 border border-neutral-600 rounded-md p-2 text-neutral-200"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    placeholder="e.g., 5'10 or 178 cm"
                  ></input>
                </div>

                <div>
                  <label className="text-neutral-300 block mb-1">Weight</label>
                  <input
                    type="text"
                    className="w-full bg-neutral-700 border border-neutral-600 rounded-md p-2 text-neutral-200"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    placeholder="e.g., 160 lbs or 72 kg"
                  />
                </div>
              </div>
            </div>

            {/* Lifestyle Section */}
            <div className="bg-neutral-750 rounded-md p-4 border border-neutral-700">
              <h3 className="text-rose-500 text-lg mb-4 font-medium">Lifestyle Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-neutral-300 block mb-1">Average Sleep</label>
                  <input
                    type="text"
                    className="w-full bg-neutral-700 border border-neutral-600 rounded-md p-2 text-neutral-200"
                    value={formData.avgSleep}
                    onChange={(e) => setFormData({ ...formData, avgSleep: e.target.value })}
                    placeholder="e.g., 7-8 hours"
                  />
                </div>

                <div>
                  <label className="text-neutral-300 block mb-1">Exercise Habits</label>
                  <input
                    type="text"
                    className="w-full bg-neutral-700 border border-neutral-600 rounded-md p-2 text-neutral-200"
                    value={formData.exercise}
                    onChange={(e) => setFormData({ ...formData, exercise: e.target.value })}
                    placeholder="e.g., 30 min daily walk, gym 3x week"
                  />
                </div>

                <div>
                  <label className="text-neutral-300 block mb-1">Diet</label>
                  <input
                    type="text"
                    className="w-full bg-neutral-700 border border-neutral-600 rounded-md p-2 text-neutral-200"
                    value={formData.diet}
                    onChange={(e) => setFormData({ ...formData, diet: e.target.value })}
                    placeholder="e.g., vegetarian, balanced, keto"
                  />
                </div>

                <div>
                  <label className="text-neutral-300 block mb-1">Water Intake</label>
                  <input
                    type="text"
                    className="w-full bg-neutral-700 border border-neutral-600 rounded-md p-2 text-neutral-200"
                    value={formData.waterIntake}
                    onChange={(e) => setFormData({ ...formData, waterIntake: e.target.value })}
                    placeholder="e.g., 2 liters daily"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="bg-neutral-750 rounded-md p-4 border border-neutral-700">
              <h3 className="text-rose-500 text-lg mb-4 font-medium">Additional Information</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-neutral-300 block mb-1">Allergies</label>
                  <input
                    type="text"
                    className="w-full bg-neutral-700 border border-neutral-600 rounded-md p-2 text-neutral-200"
                    value={formData.allergies}
                    onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                    placeholder="e.g., peanuts, penicillin, none"
                  />
                </div>

                <div>
                  <label className="text-neutral-300 block mb-1">Health Goals</label>
                  <textarea
                    className="w-full bg-neutral-700 border border-neutral-600 rounded-md p-2 text-neutral-200 min-h-24"
                    value={formData.healthGoals}
                    onChange={(e) => setFormData({ ...formData, healthGoals: e.target.value })}
                    placeholder="Describe your health goals and what you'd like to achieve"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button type="submit" className="px-8 py-2 bg-rose-600 text-white hover:bg-rose-700 transition">
                Save Health Profile
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}