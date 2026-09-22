import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !email || !message || !email.includes("@")) {
    return NextResponse.json({ error: "Please complete every field." }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
