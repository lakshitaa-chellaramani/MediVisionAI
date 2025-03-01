import Appointment from "@/models/Appointment";
import Doctor from "@/models/Doctor";
import {connectToDatabase} from "@/lib/mongodb";

export async function GET(req) {
  try {
    await connectToDatabase();

    // Get query parameters
    const { searchParams } = new URL(req.url);
    const patientEmail = searchParams.get("patientEmail");

    if (!patientEmail) {
      return new Response(JSON.stringify({ success: false, message: "Missing patientEmail parameter" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const appointments = await Appointment.find({ patientEmail });

    // Fetch doctor details
    const doctorDetailsPromises = appointments.map(async (appointment) => {
      const doctor = await Doctor.findOne({ email: appointment.docEmail });
      return {
        ...appointment.toObject(),
        doctorDetails: doctor
          ? {
              fullName: doctor.fullName,
              specialization: doctor.specialization,
              clinicLocation: doctor.clinicLocation,
            }
          : null,
      };
    });

    const detailedAppointments = await Promise.all(doctorDetailsPromises);

    return new Response(JSON.stringify({ success: true, appointments: detailedAppointments }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return new Response(JSON.stringify({ success: false, message: "Error fetching appointments" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
