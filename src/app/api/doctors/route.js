import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Doctor from "@/models/Doctor";

// 📌 **GET ALL - Fetch All Doctors**
export async function GET() {
  try {
    await connectToDatabase();
    const doctors = await Doctor.find({});
    return NextResponse.json({ success: true, doctors }, { status: 200 });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// 📌 **POST - Create a New Doctor Profile**
export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();

    if (!body.email || !body.name) {
      return NextResponse.json({ error: "Name and Email are required" }, { status: 400 });
    }

    // Check if doctor already exists
    const existingDoctor = await Doctor.findOne({ email: body.email });
    if (existingDoctor) {
      return NextResponse.json({ error: "Doctor already exists" }, { status: 400 });
    }

    const newDoctor = new Doctor(body);
    await newDoctor.save();

    return NextResponse.json({ success: true, message: "Doctor profile created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error saving doctor details:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// 📌 **PUT - Update a Doctor Profile**
export async function PUT(req) {
  try {
    await connectToDatabase();
    const body = await req.json();

    if (!body.email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Find doctor and update details
    const updatedDoctor = await Doctor.findOneAndUpdate({ email: body.email }, body, { new: true });

    if (!updatedDoctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Doctor profile updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating doctor details:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
