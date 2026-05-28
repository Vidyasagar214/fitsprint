import { NextResponse } from "next/server";
import { registerUser } from "@/lib/auth/register-user";
import { hasSupabaseEnv } from "@/lib/env";

export async function POST(request: Request) {
  if (!hasSupabaseEnv()) {
    return NextResponse.json(
      { error: "Supabase is not configured." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const email =
    typeof body === "object" &&
    body !== null &&
    "email" in body &&
    typeof (body as { email: unknown }).email === "string"
      ? (body as { email: string }).email
      : "";

  const password =
    typeof body === "object" &&
    body !== null &&
    "password" in body &&
    typeof (body as { password: unknown }).password === "string"
      ? (body as { password: string }).password
      : "";

  const fullName =
    typeof body === "object" &&
    body !== null &&
    "fullName" in body &&
    typeof (body as { fullName: unknown }).fullName === "string"
      ? (body as { fullName: string }).fullName
      : undefined;

  const result = await registerUser({ email, password, fullName });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    needsVerification: result.needsVerification,
    email: result.email,
  });
}
