import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req) {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Get email from query params
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Find user in the database
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ exists: false }, { status: 200 });
    }

    // Return user details
    return NextResponse.json({ exists: true, user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
