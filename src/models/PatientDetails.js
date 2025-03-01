import mongoose from "mongoose";

const PatientDetailsSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    allergies: { type: String, default: "" },
    avgSleep: { type: String, default: "" },
    diet: { type: String, default: "" },
    waterIntake: { type: String, default: "" },
    exercise: { type: String, default: "" },
    healthGoals: { type: String, default: "" },
    bloodGroup: { type: String, default: "" },
    height: { type: String, default: "" },
    weight: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.PatientDetails || mongoose.model("PatientDetails", PatientDetailsSchema);
