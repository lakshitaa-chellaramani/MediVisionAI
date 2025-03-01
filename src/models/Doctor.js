import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    specialization: { type: String, required: true },
    yearsExperience: { type: Number, required: true },
    hospitalAffiliation: { type: String, default: "" },
    clinicLocation: { type: String, required: true },
    consultationFee: { type: Number, required: true },
    availability: { type: String, enum: ["Available", "Unavailable"], default: "Available" },
    degrees: { type: [String], required: true },
    licenceNumber: { type: String, required: true, unique: true },
    languagesSpoken: { type: [String], required: true },
    treatmentExpertise: { type: [String], required: true },
    consultationMode: { type: [String], enum: ["Online", "In-Person", "Both"], required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Doctor || mongoose.model("Doctor", DoctorSchema);
