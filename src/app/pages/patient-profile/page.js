"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import PatientAppointmentsPage from "@/components/PatientAppointments";

export default function PatientDetailsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [patientDetails, setPatientDetails] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch user details from KindeAuth
        const userResponse = await fetch("/api/auth/user");
        const userData = await userResponse.json();

        if (!userData.user || !userData.user.email) {
          console.error("User not found");
          return;
        }

        setUserDetails(userData.user);

        // Fetch patient details
        const patientResponse = await fetch(`/api/patient-details?email=${userData.user.email}`);
        const patientData = await patientResponse.json();

        if (patientData.exists) {
          setPatientDetails(patientData.patient);
        }
      } catch (error) {
        console.error("Error fetching patient details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleEditClick = () => {
    setEditFormData(patientDetails);
    setIsEditModalOpen(true);
  };

  const handleInputChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch("/api/patient-details", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData),
      });

      if (response.ok) {
        setPatientDetails(editFormData);
        setIsEditModalOpen(false);
      } else {
        console.error("Failed to update patient details.");
      }
    } catch (error) {
      console.error("Error updating patient details:", error);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-200 flex flex-col items-center pt-24 px-10">
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="w-10 h-10 text-green-500 animate-spin" />
        </div>
      ) : patientDetails ? (
        <div className="w-full max-w-4xl bg-neutral-50 p-6 rounded-lg shadow-lg border border-white">
          <h2 className="text-3xl font-semibold text-green-900 mb-4">Patient Profile</h2>

          {/* Basic Details */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {["fullName", "email", "bloodGroup", "height", "weight"].map((key) => (
              <div key={key}>
                <label className="text-neutral-400 block mb-1 capitalize">{key.replace(/([A-Z])/g, " $1")}</label>
                <p className="bg-white p-2 rounded-md">{patientDetails[key] || "Not Provided"}</p>
              </div>
            ))}
          </div>

          {/* Health & Lifestyle */}
          <h3 className="text-xl font-medium text-green-300 mb-2">Health & Lifestyle</h3>
          <div className="grid grid-cols-2 gap-6">
            {["allergies", "avgSleep", "diet", "waterIntake", "exercise", "healthGoals"].map((key) => (
              <div key={key}>
                <label className="text-neutral-400 block mb-1 capitalize">{key.replace(/([A-Z])/g, " $1")}</label>
                <p className="bg-white p-2 rounded-md">{patientDetails[key] || "Not Provided"}</p>
              </div>
            ))}
          </div>

          {/* Edit Button */}
          <div className="mt-8 flex justify-center">
            <Button onClick={handleEditClick} className="bg-green-500 hover:bg-green-600 text-green-900 px-6 py-2 rounded-lg">
              Edit Profile
            </Button>
          </div>

          {/* Edit Modal */}
          <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogContent className="bg-neutral-50 border border-neutral-700 text-neutral-200 max-w-4xl mx-auto p-6 overflow-y-auto h-[90vh]">
              <DialogHeader>
                <DialogTitle className="text-green-900">Edit Profile</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {["bloodGroup", "height", "weight", "allergies", "avgSleep", "diet", "waterIntake", "exercise", "healthGoals"].map((key) => (
                  <div key={key}>
                    <label className="text-neutral-900 block mb-1 capitalize">{key.replace(/([A-Z])/g, " $1")}</label>
                    <input
                      type="text"
                      name={key}
                      className="w-full bg-white border border-green-50 rounded-md p-2 text-neutral-200"
                      value={editFormData[key] || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end gap-4">
                <DialogClose asChild>
                  <Button variant="outline" className="border-neutral-500 text-neutral-400">
                    Cancel
                  </Button>
                </DialogClose>
                <Button onClick={handleSaveChanges} className="bg-green-500 hover:bg-green-600 text-green-900">
                  Save Changes
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <p className="text-neutral-900">Patient details not found.</p>
      )}
      <PatientAppointmentsPage/>
    </div>
  );
}
