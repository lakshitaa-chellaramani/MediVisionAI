import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectToDatabase();
    const { fullName, email, gender, dob, role, phoneNumber } = await req.json();

    if (!fullName || !email || !gender || !dob || !role || !phoneNumber) {
      return Response.json({ error: "All fields are required" }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return Response.json({ message: "User already exists" }, { status: 200 });
    }

    const newUser = new User({ fullName, email, gender, dob, role, phoneNumber });
    await newUser.save();

    return Response.json({ message: "User saved successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error saving user:", error);
    return Response.json({ error: "Database error" }, { status: 500 });
  }
}
