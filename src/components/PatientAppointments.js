"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Stethoscope, MapPin, Calendar, Clock, User, CheckCircle, XCircle, MessageSquare } from "lucide-react";

export default function PatientAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [patientEmail, setPatientEmail] = useState("");

  useEffect(() => {
    async function fetchPatientEmail() {
      try {
        const response = await fetch("/api/auth/user");
        const data = await response.json();
        if (data.user) {
          setPatientEmail(data.user.email);
        }
      } catch (error) {
        console.error("Error fetching patient email:", error);
      }
    }

    fetchPatientEmail();
  }, []);

  useEffect(() => {
    if (patientEmail) {
      async function fetchAppointments() {
        try {
          const response = await fetch(`/api/get-patients-appointments?patientEmail=${patientEmail}`);
          const data = await response.json();
          if (data.success) {
            setAppointments(data.appointments);
            console.log("Appointments:", data.appointments);
          }
        } catch (error) {
          console.error("Error fetching appointments:", error);
        } finally {
          setLoading(false);
        }
      }
      fetchAppointments();
    }
  }, [patientEmail]);

  return (
    <div className="bg-neutral-100 min-h-screen text-green-900">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-8 text-green-400">My Appointments</h1>

        {loading ? (
          <p className="text-center text-green-400">Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <p className="text-center text-gray-400">No appointments found.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {appointments.map((appointment) => (
              <Card key={appointment._id} className="bg-neutral-50 border-none overflow-hidden rounded-xl shadow-lg">
                <CardHeader className="p-4">
                  <h3 className="text-lg font-semibold text-green-400">
                    <User className="w-4 h-4 inline-block mr-2 text-green-300" />
                    Dr. {appointment.docEmail || "Unknown Doctor"}
                  </h3>
                  <p className="text-gray-300">
                    <Stethoscope className="w-4 h-4 inline-block text-green-300" />{" "}
                    {appointment.doctorDetails?.specialization || "Specialty not available"}
                  </p>
                  <p className="text-gray-300">
                    <MapPin className="w-4 h-4 inline-block text-green-300" />{" "}
                    {appointment.doctorDetails?.clinicLocation || "Location not available"}
                  </p>
                  <p className="text-gray-300">
                    <Calendar className="w-4 h-4 inline-block text-green-300" /> {appointment.date}
                  </p>
                  <p className="text-gray-300">
                    <p className="w-4 h-4 inline-block text-green-300" /> {appointment.time}
                  </p>
                  
                  <p className="text-gray-300">Reason: {appointment.reason}</p>
                </CardHeader>

                <CardFooter className="p-4 flex flex-col gap-2">
                  {appointment.approved ? (
                    <p className="text-green-400 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      Approved
                    </p>
                  ) : appointment.completed ? (
                    <p className="text-red-400 flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-red-400" />
                      Rejected
                    </p>
                  ) : (
                    <p className="text-yellow-400 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-yellow-400" />
                      Pending Approval
                    </p>
                  )}

                  {appointment.approved && appointment.doctorResponse && (
                    <p className="text-gray-300 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-blue-400" />
                      Doctor's Response: {appointment.doctorResponse}
                    </p>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
