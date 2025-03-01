import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import PatientDetails from "@/models/PatientDetails";

// 📌 **PUT - Update Patient Details**
export async function PUT(req) {
  try {
    await connectToDatabase();
    const body = await req.json();

    if (!body.email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const updatedPatient = await PatientDetails.findOneAndUpdate({ email: body.email }, body, { new: true });

    if (!updatedPatient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Patient details updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating patient details:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const patient = await PatientDetails.findOne({ email });

    if (!patient) {
      return NextResponse.json({ exists: false }, { status: 200 });
    }

    return NextResponse.json({ exists: true, patient }, { status: 200 });
  } catch (error) {
    console.error("Error fetching patient details:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// 📌 **POST - Create or Update Patient Details**
export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();

    if (!body.email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const existingPatient = await PatientDetails.findOne({ email: body.email });

    if (existingPatient) {
      // Update existing patient details
      await PatientDetails.updateOne({ email: body.email }, body);
      return NextResponse.json({ message: "Patient details updated successfully" }, { status: 200 });
    } else {
      // Create new patient entry
      const newPatient = new PatientDetails(body);
      await newPatient.save();
      return NextResponse.json({ message: "Patient details added successfully" }, { status: 201 });
    }
  } catch (error) {
    console.error("Error saving patient details:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
