import Appointment from "@/models/Appointment";
import {connectToDatabase} from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function PUT(request) {
  await connectToDatabase();
  
  const { _id, approved, doctorResponse, completed } = await request.json();
  
  try {
    await Appointment.findByIdAndUpdate(_id, { approved, doctorResponse, completed });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  await connectToDatabase();
  
  const { _id, approved, doctorResponse, completed } = await request.json();
  
  try {
    await Appointment.findByIdAndUpdate(_id, { approved, doctorResponse, completed });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}