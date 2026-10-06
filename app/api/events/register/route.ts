import { NextRequest, NextResponse } from "next/server";
import { verifyCaptcha } from "@/lib/captcha";
import { kvListPush } from "@/lib/kv";
import { sendEmail } from "@/lib/mail";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const captchaRes = await verifyCaptcha(data.captchaToken);
    if (!captchaRes.success && captchaRes.challengeNeeded) {
      return NextResponse.json(
        { success: false, error: "reCAPTCHA verification failed. Please try again.", challengeNeeded: true },
        { status: 400 }
      );
    }

    const regId = `EVT-REG-${Date.now().toString(36).toUpperCase()}`;
    const registrationRecord = {
      ...data,
      regId,
      registeredAt: new Date().toISOString(),
    };

    await kvListPush(`event:${data.eventSlug || "general"}:registrations`, registrationRecord);

    if (data.email) {
      await sendEmail({
        to: data.email,
        subject: `Event Registration Confirmed: ${data.eventTitle || "Zion University Event"}`,
        html: `
          <div style="font-family: Arial, sans-serif; color: #162239; line-height: 1.6;">
            <h2>Registration Confirmation</h2>
            <p>Dear ${data.fullName || "Guest"},</p>
            <p>You have successfully registered for <strong>${data.eventTitle || "Zion University Event"}</strong>.</p>
            <p><strong>Registration ID:</strong> ${regId}</p>
            <p><strong>Venue / Link:</strong> ${data.venue || "Zion University Main Campus"}</p>
            <p>Please present this confirmation email upon arrival.</p>
          </div>
        `,
      });
    }

    return NextResponse.json({
      success: true,
      regId,
      message: "Registration successful",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to register" },
      { status: 500 }
    );
  }
}
