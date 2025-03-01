"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CheckCircle, XCircle, Calendar, Clock, User, CheckCheck, X } from "lucide-react";

export default function DoctorAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isResponseOpen, setIsResponseOpen] = useState(false);
  const [doctorEmail, setDoctorEmail] = useState("");
  const [doctorResponse, setDoctorResponse] = useState("");

  useEffect(() => {
    async function fetchDoctorEmail() {
      try {
        const response = await fetch("/api/auth/user");
        const data = await response.json();
        if (data.user) {
          setDoctorEmail(data.user.email);
        }
      } catch (error) {
        console.error("Error fetching doctor email:", error);
      }
    }

    fetchDoctorEmail();
  }, []);

  useEffect(() => {
    if (doctorEmail) {
      async function fetchAppointments() {
        try {
          const response = await fetch(`/api/appointments?docEmail=${doctorEmail}`);
          const data = await response.json();
          if (data.success) {
            setAppointments(data.appointments);
          }
        } catch (error) {
          console.error("Error fetching appointments:", error);
        } finally {
          setLoading(false);
        }
      }
      fetchAppointments();
    }
  }, [doctorEmail]);

  const handleApprove = (appointment) => {
    setSelectedAppointment(appointment);
    setIsResponseOpen(true);
  };

  const handleSubmitResponse = async () => {
    if (!doctorResponse) {
      alert("Please enter a response before approving.");
      return;
    }

    const updatedAppointment = {
      ...selectedAppointment,
      approved: true,
      doctorResponse: doctorResponse,
    };

    try {
      const response = await fetch("/api/appointments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedAppointment),
      });

      if (response.ok) {
        alert("Appointment approved successfully!");
        setAppointments((prev) =>
          prev.map((appt) =>
            appt._id === selectedAppointment._id ? { ...appt, approved: true, doctorResponse } : appt
          )
        );
        setIsResponseOpen(false);
        setDoctorResponse("");
      } else {
        alert("Failed to approve appointment.");
      }
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  const handleReject = async (appointmentId) => {
    try {
      // Changed to match the POST method expected by the API
      const response = await fetch("/api/update-appointment", {
        method: "POST",  // This matches your API route
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          _id: appointmentId, 
          approved: false, 
          completed: true 
        }),
      });

      if (response.ok) {
        alert("Appointment rejected.");
        setAppointments((prev) => 
          prev.map((appt) => 
            appt._id === appointmentId ? { ...appt, approved: false, completed: true } : appt
          )
        );
      } else {
        alert("Failed to reject appointment.");
      }
    } catch (error) {
      console.error("Error rejecting appointment:", error);
    }
  };

  // Function to determine if an appointment is pending (not yet approved or rejected)
  const isPending = (appointment) => {
    return !appointment.approved && !appointment.completed;
  };

  // Function to get status badge
  const getStatusBadge = (appointment) => {
    if (appointment.approved) {
      return (
        <div className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2">
          <CheckCheck className="w-4 h-4" /> Approved
        </div>
      );
    } else if (appointment.completed && !appointment.approved) {
      return (
        <div className="bg-red-600 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2">
          <X className="w-4 h-4" /> Rejected
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-neutral-900 min-h-screen text-white">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-8 text-rose-400">Patient Appointment Requests</h1>

        {loading ? (
          <p className="text-center text-rose-400">Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <p className="text-center text-gray-400">No appointments found.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {appointments.map((appointment) => (
              <Card key={appointment._id} className="bg-neutral-800 border-none overflow-hidden rounded-xl shadow-lg">
                <CardHeader className="p-4">
                  <h3 className="text-lg font-semibold text-rose-400">
                    <User className="w-4 h-4 inline-block mr-2 text-rose-300" />
                    {appointment.patientEmail}
                  </h3>
                  <p className="text-gray-300">
                    <Calendar className="w-4 h-4 inline-block text-rose-300" /> {appointment.date}
                  </p>
                  <p className="text-gray-300">
                    <Clock className="w-4 h-4 inline-block text-rose-300" /> {appointment.time}
                  </p>
                  <p className="text-gray-300">Reason: {appointment.reason}</p>
                  
                  {appointment.doctorResponse && (
                    <div className="mt-3 p-3 bg-neutral-700 rounded-md">
                      <p className="text-sm text-gray-300 font-semibold">Your Response:</p>
                      <p className="text-gray-300">{appointment.doctorResponse}</p>
                    </div>
                  )}
                </CardHeader>
                <CardFooter className="p-4 flex gap-4">
                  {isPending(appointment) ? (
                    <>
                      <Button
                        onClick={() => handleApprove(appointment)}
                        className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" /> Approve
                      </Button>
                      <Button
                        onClick={() => handleReject(appointment._id)}
                        className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-2"
                      >
                        <XCircle className="w-4 h-4" /> Reject
                      </Button>
                    </>
                  ) : (
                    <div className="w-full">
                      {getStatusBadge(appointment)}
                    </div>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Response Modal */}
        <Dialog open={isResponseOpen} onOpenChange={setIsResponseOpen}>
          <DialogContent className="bg-neutral-800 border border-neutral-700 text-neutral-200 rounded-lg p-6">
            <DialogHeader>
              <DialogTitle className="text-white text-lg">Provide a Response</DialogTitle>
            </DialogHeader>
            <Input
              type="text"
              placeholder="Enter your response for the patient"
              className="w-full bg-neutral-700 border border-neutral-600 p-2 text-neutral-200"
              value={doctorResponse}
              onChange={(e) => setDoctorResponse(e.target.value)}
            />
            <Button
              onClick={handleSubmitResponse}
              className="bg-green-500 hover:bg-green-600 text-white w-full mt-4"
            >
              Submit Response
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}