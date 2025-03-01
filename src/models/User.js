import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    dob: { type: Date, required: true },
    role: { type: String, enum: ["Patient", "Doctor"], required: true },
    phoneNumber: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
