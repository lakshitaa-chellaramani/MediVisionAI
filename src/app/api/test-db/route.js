import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  try {
    await connectToDatabase();
    const users = await User.find({});
    return Response.json(users, { status: 200 });
  } catch (error) {
    console.error("Database connection error:", error);
    return Response.json({ message: "Database connection error" }, { status: 500 });
  }
}
