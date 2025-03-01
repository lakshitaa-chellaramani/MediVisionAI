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
    <div className="pt-20 min-h-screen flex items-center justify-center bg-neutral-100">
      <div className="max-w-5xl w-full bg-neutral-50 p-8 rounded-lg shadow-lg border border-white">
        <h2 className="text-2xl font-bold text-green-900 mb-6 text-center">
          Complete Your Doctor Profile
        </h2>

        {loading ? (
          <p className="text-green-400 text-lg text-center">Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Section */}
            <div className="bg-neutral-750 rounded-md p-4 border border-white">
              <h3 className="text-green-500 text-lg mb-4 font-medium">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="text-neutral-900 block mb-1">Full Name</label>
                  <input
                    type="text"
                    className="w-full bg-white border border-green-50 rounded-md p-2 text-neutral-400"
                    value={formData.name}
                    disabled
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="text-neutral-900 block mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full bg-white border border-green-50 rounded-md p-2 text-neutral-400"
                    value={formData.email}
                    disabled
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
              </div>
            </div>

            {/* Professional Credentials Section */}
            <div className="bg-neutral-750 rounded-md p-4 border border-white">
              <h3 className="text-green-500 text-lg mb-4 font-medium">Professional Credentials</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-neutral-900 block mb-1">Specialization</label>
                  <input
                    type="text"
                    className="w-full bg-white border border-green-50 rounded-md p-2 text-neutral-200"
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    placeholder="e.g., Cardiology, Pediatrics"
                  />
                  {errors.specialization && <p className="text-red-500 text-sm">{errors.specialization}</p>}
                </div>

                <div>
                  <label className="text-neutral-900 block mb-1">Years Experience</label>
                  <input
                    type="number"
                    className="w-full bg-white border border-green-50 rounded-md p-2 text-neutral-200"
                    value={formData.yearsExperience}
                    onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
                    placeholder="e.g., 10"
                  />
                  {errors.yearsExperience && <p className="text-red-500 text-sm">{errors.yearsExperience}</p>}
                </div>

                <div>
                  <label className="text-neutral-900 block mb-1">Degrees</label>
                  <input
                    type="text"
                    className="w-full bg-white border border-green-50 rounded-md p-2 text-neutral-200"
                    value={formData.degrees}
                    onChange={(e) => setFormData({ ...formData, degrees: e.target.value })}
                    placeholder="e.g., MD, MBBS, Ph.D."
                  />
                  {errors.degrees && <p className="text-red-500 text-sm">{errors.degrees}</p>}
                </div>

                <div>
                  <label className="text-neutral-900 block mb-1">Licence Number</label>
                  <input
                    type="text"
                    className="w-full bg-white border border-green-50 rounded-md p-2 text-neutral-200"
                    value={formData.licenceNumber}
                    onChange={(e) => setFormData({ ...formData, licenceNumber: e.target.value })}
                    placeholder="e.g., MCI-12345"
                  />
                  {errors.licenceNumber && <p className="text-red-500 text-sm">{errors.licenceNumber}</p>}
                </div>
              </div>
            </div>

            {/* Practice Details Section */}
            <div className="bg-neutral-750 rounded-md p-4 border border-white">
              <h3 className="text-green-500 text-lg mb-4 font-medium">Practice Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-neutral-900 block mb-1">Hospital Affiliation</label>
                  <input
                    type="text"
                    className="w-full bg-white border border-green-50 rounded-md p-2 text-neutral-200"
                    value={formData.hospitalAffiliation}
                    onChange={(e) => setFormData({ ...formData, hospitalAffiliation: e.target.value })}
                    placeholder="e.g., City General Hospital"
                  />
                </div>

                <div>
                  <label className="text-neutral-900 block mb-1">Clinic Location</label>
                  <input
                    type="text"
                    className="w-full bg-white border border-green-50 rounded-md p-2 text-neutral-200"
                    value={formData.clinicLocation}
                    onChange={(e) => setFormData({ ...formData, clinicLocation: e.target.value })}
                    placeholder="e.g., 123 Medical Plaza, Suite 456"
                  />
                </div>

                <div>
                  <label className="text-neutral-900 block mb-1">Consultation Fee</label>
                  <input
                    type="number"
                    className="w-full bg-white border border-green-50 rounded-md p-2 text-neutral-200"
                    value={formData.consultationFee}
                    onChange={(e) => setFormData({ ...formData, consultationFee: e.target.value })}
                    placeholder="e.g., 150"
                  />
                  {errors.consultationFee && <p className="text-red-500 text-sm">{errors.consultationFee}</p>}
                </div>

                <div>
                  <label className="text-neutral-900 block mb-1">Availability</label>
                  <select
                    className="w-full bg-white border border-green-50 rounded-md p-2 text-neutral-200"
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  >
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Additional Details Section */}
            <div className="bg-neutral-750 rounded-md p-4 border border-white">
              <h3 className="text-green-500 text-lg mb-4 font-medium">Additional Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-neutral-900 block mb-1">Languages Spoken</label>
                  <input
                    type="text"
                    className="w-full bg-white border border-green-50 rounded-md p-2 text-neutral-200"
                    value={formData.languagesSpoken}
                    onChange={(e) => setFormData({ ...formData, languagesSpoken: e.target.value })}
                    placeholder="e.g., English, Spanish, Hindi"
                  />
                </div>

                <div>
                  <label className="text-neutral-900 block mb-1">Consultation Mode</label>
                  <input
                    type="text"
                    className="w-full bg-white border border-green-50 rounded-md p-2 text-neutral-200"
                    value={formData.consultationMode}
                    onChange={(e) => setFormData({ ...formData, consultationMode: e.target.value })}
                    placeholder="e.g., In-person, Video, Both"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-neutral-900 block mb-1">Treatment Expertise</label>
                  <textarea
                    className="w-full bg-white border border-green-50 rounded-md p-2 text-neutral-200 min-h-24"
                    value={formData.treatmentExpertise}
                    onChange={(e) => setFormData({ ...formData, treatmentExpertise: e.target.value })}
                    placeholder="Describe your specific treatment specialties, procedures, or conditions you specialize in treating"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button type="submit" className="px-8 py-2 bg-green-600 text-green-900 hover:bg-green-700 transition">
                Save Doctor Profile
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}