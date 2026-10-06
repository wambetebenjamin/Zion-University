import { NextRequest, NextResponse } from "next/server";
import { verifyCaptcha } from "@/lib/captcha";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const token = body.token;
    const result = await verifyCaptcha(token);

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to verify reCAPTCHA" },
      { status: 500 }
    );
  }
}
