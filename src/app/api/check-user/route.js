import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req) {
  try {
    await connectToDatabase();
    const url = new URL(req.url);
    const email = url.searchParams.get("email");

    if (!email) {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    const userExists = await User.findOne({ email });

    return Response.json({ exists: !!userExists }, { status: 200 });
  } catch (error) {
    console.error("Error checking user:", error);
    return Response.json({ error: "Database error" }, { status: 500 });
  }
}
