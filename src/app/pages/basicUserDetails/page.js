"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function UserDetailsForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    gender: "",
    dob: "",
    role: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
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
    fetchUser();
  }, []);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.role) newErrors.role = "Role is required";
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number (10 digits required)";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("/api/save-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/");
      } else {
        console.error("Failed to save user data");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (loading) return <p className="text-white text-center">Loading...</p>;

  return (
    <div className="max-w-lg mx-auto bg-neutral-900 p-6 rounded-lg shadow-lg border border-neutral-800">
      <h2 className="text-2xl font-bold text-white mb-4">Complete Your Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-neutral-300 block mb-1">Full Name</label>
          <input
            type="text"
            className="w-full bg-neutral-800 border border-neutral-700 rounded-md p-2 text-neutral-200"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
        </div>

        <div>
          <label className="text-neutral-300 block mb-1">Email</label>
          <input
            type="email"
            className="w-full bg-neutral-800 border border-neutral-700 rounded-md p-2 text-neutral-400"
            value={formData.email}
            disabled
          />
        </div>

        <div>
          <label className="text-neutral-300 block mb-1">Gender</label>
          <select
            className="w-full bg-neutral-800 border border-neutral-700 rounded-md p-2 text-neutral-200"
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
        </div>

        <div>
          <label className="text-neutral-300 block mb-1">Date of Birth</label>
          <input
            type="date"
            className="w-full bg-neutral-800 border border-neutral-700 rounded-md p-2 text-neutral-200"
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
          />
          {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
        </div>

        <div>
          <label className="text-neutral-300 block mb-1">Role</label>
          <select
            className="w-full bg-neutral-800 border border-neutral-700 rounded-md p-2 text-neutral-200"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="">Select Role</option>
            <option value="Patient">Patient</option>
            <option value="Doctor">Doctor</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
        </div>

        <div>
          <label className="text-neutral-300 block mb-1">Phone Number</label>
          <input
            type="tel"
            className="w-full bg-neutral-800 border border-neutral-700 rounded-md p-2 text-neutral-200"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
        </div>

        <Button type="submit" className="w-full bg-rose-600 text-white">
          Submit
        </Button>
      </form>
    </div>
  );
}
