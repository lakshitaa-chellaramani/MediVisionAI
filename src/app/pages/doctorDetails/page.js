"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function DoctorDetailsForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialization: "",
    yearsExperience: "",
    hospitalAffiliation: "",
    clinicLocation: "",
    consultationFee: "",
    availability: "Available",
    degrees: "",
    licenceNumber: "",
    languagesSpoken: "",
    treatmentExpertise: "",
    consultationMode: "",
  });

  const [errors, setErrors] = useState({});

  // Fetch user name and email from auth
  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const response = await fetch("/api/auth/user");
        const data = await response.json();
        
        if (data.user) {
          setFormData((prev) => ({
            ...prev,
            name: data.user.given_name || "User",
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

    if (!formData.name) newErrors.name = "Full Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.specialization) newErrors.specialization = "Specialization is required";
    if (!formData.yearsExperience) newErrors.yearsExperience = "Years of experience is required";
    if (!formData.licenceNumber) newErrors.licenceNumber = "License number is required";
    if (!formData.consultationFee) newErrors.consultationFee = "Consultation fee is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("/api/doctors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Doctor details saved successfully!");
        router.push("/"); // Redirect to the dashboard
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error saving doctor details:", error);
    }
  };

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-neutral-900">
      <div className="max-w-lg w-full bg-neutral-800 p-8 rounded-lg shadow-lg border border-neutral-700">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Complete Your Doctor Profile
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
                value={formData.name}
                disabled
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
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

            {/* Other Input Fields */}
            {[
              "specialization",
              "yearsExperience",
              "hospitalAffiliation",
              "clinicLocation",
              "consultationFee",
              "degrees",
              "licenceNumber",
              "languagesSpoken",
              "treatmentExpertise",
              "consultationMode",
            ].map((key) => (
              <div key={key}>
                <label className="text-neutral-300 block mb-1 capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type={key === "yearsExperience" || key === "consultationFee" ? "number" : "text"}
                  className="w-full bg-neutral-700 border border-neutral-600 rounded-md p-2 text-neutral-200"
                  value={formData[key]}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                />
                {errors[key] && <p className="text-red-500 text-sm">{errors[key]}</p>}
              </div>
            ))}

            {/* Availability */}
            <div>
              <label className="text-neutral-300 block mb-1">Availability</label>
              <select
                className="w-full bg-neutral-700 border border-neutral-600 rounded-md p-2 text-neutral-200"
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
              >
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>

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
