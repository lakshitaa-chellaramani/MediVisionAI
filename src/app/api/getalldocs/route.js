import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Doctor from "@/models/Doctor";

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
