import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Appointment from "@/models/Appointment";

// 📌 **GET - Fetch Appointments (By Doctor or Patient)**
export async function GET(req) {
  try {
    await connectToDatabase();

    // Extract query parameters from request URL
    const { searchParams } = new URL(req.url);
    const docEmail = searchParams.get("docEmail");
    const patientEmail = searchParams.get("patientEmail");

    if (!docEmail && !patientEmail) {
      return NextResponse.json({ error: "Doctor or Patient email required" }, { status: 400 });
    }

    // Fetch appointments based on email
    const filter = docEmail ? { docEmail } : { patientEmail };
    const appointments = await Appointment.find(filter);

    return NextResponse.json({ success: true, appointments }, { status: 200 });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// 📌 **POST - Create a New Appointment**
export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();

    // Validate required fields
    if (!body.docEmail || !body.patientEmail || !body.time || !body.date || !body.reason) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const newAppointment = new Appointment(body);
    await newAppointment.save();

    return NextResponse.json({ success: true, message: "Appointment created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}




// 📌 **PUT - Update an Appointment (Approval, Completion, Response)**
export async function PUT(req) {
  try {
    await connectToDatabase();
    const body = await req.json();

    if (!body.docEmail || !body.patientEmail) {
      return NextResponse.json({ error: "Doctor and Patient email are required" }, { status: 400 });
    }

    // Find the appointment and update
    const updatedAppointment = await Appointment.findOneAndUpdate(
      { docEmail: body.docEmail, patientEmail: body.patientEmail, date: body.date, time: body.time },
      body,
      { new: true }
    );

    if (!updatedAppointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Appointment updated successfully", updatedAppointment }, { status: 200 });
  } catch (error) {
    console.error("Error updating appointment:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
