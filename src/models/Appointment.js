import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    docEmail: { type: String, required: true }, // Doctor's email
    patientEmail: { type: String, required: true }, // Patient's email
    time: { type: String, required: true }, // Appointment time
    date: { type: String, required: true }, // Appointment date
    reason: { type: String, required: true }, // Patient's reason for visit
    approved: { type: Boolean, default: false }, // Approved by the doctor or not
    completed: { type: Boolean, default: false }, // Mark if the appointment is completed
    doctorResponse: { type: String, default: "" }, // Doctor's response message (optional)
  },
  { timestamps: true }
);

export default mongoose.models.Appointment || mongoose.model("Appointment", AppointmentSchema);
