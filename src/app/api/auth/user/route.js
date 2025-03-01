import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function GET() {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return new Response(JSON.stringify({ user: null }), { status: 200 });
  }

  return new Response(JSON.stringify({ user }), { status: 200 });
}
