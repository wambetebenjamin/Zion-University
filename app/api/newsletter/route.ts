import { NextRequest, NextResponse } from "next/server";
import { verifyCaptcha } from "@/lib/captcha";
import { kvListPush, kvSet } from "@/lib/kv";
import { sendEmail } from "@/lib/mail";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const captchaRes = await verifyCaptcha(data.captchaToken);
    if (!captchaRes.success && captchaRes.challengeNeeded) {
      return NextResponse.json(
        { success: false, error: "Security challenge required.", challengeNeeded: true },
        { status: 400 }
      );
    }

    const subscriberRecord = {
      email: data.email,
      name: data.name || "",
      type: data.type || "newsletter", // 'newsletter' | 'prospectus_download'
      programmeInterest: data.programmeInterest || "General",
      subscribedAt: new Date().toISOString(),
    };

    await kvListPush("subscribers:all", subscriberRecord);
    await kvSet(`subscriber:${data.email}`, subscriberRecord);

    if (data.type === "prospectus_download" && data.email) {
      await sendEmail({
        to: data.email,
        subject: "Zion University 2026/2027 Academic Prospectus & Course Guide",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; color: #162239; line-height: 1.6;">
            <div style="background-color: #162239; padding: 20px; text-align: center; border-bottom: 4px solid #f5a425;">
              <h1 style="color: #ffffff; margin: 0;">ZION UNIVERSITY</h1>
              <p style="color: #f5a425; margin: 4px 0 0 0;">Official Academic Prospectus 2026/2027</p>
            </div>
            <div style="padding: 25px; border: 1px solid #e5e7eb;">
              <h2>Thank you for your interest in Zion University!</h2>
              <p>We are delighted to share our comprehensive 2026/2027 Academic Prospectus containing complete details on our 80+ accredited degree, diploma, and certificate programmes.</p>
              <p style="text-align: center; margin: 30px 0;">
                <a href="https://zion.ac.ke/downloads/zion-university-prospectus-2026.pdf" style="background-color: #f5a425; color: #ffffff; padding: 12px 25px; text-decoration: none; font-weight: bold; border-radius: 4px; display: inline-block;">Download Official Prospectus (PDF)</a>
              </p>
              <p>If you wish to proceed directly to apply, visit our <a href="https://zion.ac.ke/apply" style="color: #f5a425;">Online Application Portal</a>.</p>
            </div>
          </div>
        `,
      });
    }

    return NextResponse.json({
      success: true,
      message: data.type === "prospectus_download" ? "Prospectus link sent to your email" : "Subscribed successfully",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to process request" },
      { status: 500 }
    );
  }
}
