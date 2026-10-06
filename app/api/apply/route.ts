import { NextRequest, NextResponse } from "next/server";
import { verifyCaptcha } from "@/lib/captcha";
import { kvListPush, kvSet } from "@/lib/kv";
import { sendEmail } from "@/lib/mail";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // 1. Verify reCAPTCHA
    const captchaRes = await verifyCaptcha(data.captchaToken);
    if (!captchaRes.success && captchaRes.challengeNeeded) {
      return NextResponse.json(
        {
          success: false,
          error: "reCAPTCHA verification score low. Please complete the security challenge.",
          challengeNeeded: true,
        },
        { status: 400 }
      );
    }

    // 2. Generate unique reference number
    const prefix = data.campus === "Mombasa" ? "MSA" : "NBO";
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const applicationRef = `ZU-2026-${prefix}-${randomDigits}`;

    const timestamp = new Date().toISOString();
    const applicationRecord = {
      ...data,
      applicationRef,
      submittedAt: timestamp,
      status: "Submitted",
      reviewStage: "Admissions Verification",
    };

    // 3. Save to Vercel KV
    await kvSet(`application:${applicationRef}`, applicationRecord);
    await kvListPush("applications:all", applicationRecord);

    // 4. Send applicant confirmation email
    const emailSubject = `Application Received [${applicationRef}] - Zion University`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #162239; line-height: 1.6;">
        <div style="background-color: #162239; padding: 25px; text-align: center; border-bottom: 4px solid #f5a425;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">ZION UNIVERSITY</h1>
          <p style="color: #f5a425; margin: 5px 0 0 0; font-size: 14px; text-transform: uppercase;">Admissions & Student Affairs Directorate</p>
        </div>
        <div style="padding: 30px; background-color: #ffffff; border: 1px solid #e5e7eb;">
          <h2 style="color: #162239; margin-top: 0;">Dear ${data.fullName || "Applicant"},</h2>
          <p>Thank you for submitting your online application to study at <strong>Zion University</strong> for the 2026/2027 Academic Year.</p>
          
          <div style="background-color: #f8fafc; border-left: 4px solid #f5a425; padding: 15px; margin: 20px 0;">
            <p style="margin: 0 0 8px 0;"><strong>Application Reference:</strong> <span style="font-size: 18px; color: #162239; font-weight: bold;">${applicationRef}</span></p>
            <p style="margin: 0 0 8px 0;"><strong>Selected Programme:</strong> ${data.programmeName || data.programme || "Undergraduate / Diploma Programme"}</p>
            <p style="margin: 0 0 8px 0;"><strong>Campus:</strong> ${data.campus || "Nairobi Main Campus"}</p>
            <p style="margin: 0;"><strong>Study Mode:</strong> ${data.studyMode || "Full Time"}</p>
          </div>

          <h3 style="color: #162239;">Next Steps</h3>
          <ol style="padding-left: 20px; color: #374151;">
            <li>Our Admissions Board will authenticate your uploaded academic credentials and national identification.</li>
            <li>You will receive an official notification and Provisional Letter of Admission within <strong>3 to 5 business days</strong>.</li>
            <li>You can track your admission progress anytime via the Zion University Student Portal.</li>
          </ol>

          <p style="margin-top: 30px;">For urgent queries, reach out via WhatsApp at <strong>+254 112 272 061</strong> quoting your reference <strong>${applicationRef}</strong>.</p>

          <p style="margin-top: 25px; border-top: 1px solid #e5e7eb; padding-top: 15px; font-size: 13px; color: #6b7280;">
            Academic Registrar | Zion University<br />
            Nairobi Main Campus & Mombasa Coastal Satellite Campus
          </p>
        </div>
      </div>
    `;

    if (data.email) {
      await sendEmail({
        to: data.email,
        subject: emailSubject,
        html: emailHtml,
      });
    }

    // 5. Send notification to Admissions Office
    await sendEmail({
      to: "admissions@zion.ac.ke",
      subject: `New Online Application: ${data.fullName} [${applicationRef}]`,
      html: `
        <p>A new student application has been submitted.</p>
        <p><strong>Ref:</strong> ${applicationRef}</p>
        <p><strong>Name:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Programme:</strong> ${data.programmeName || data.programme}</p>
        <p><strong>Campus:</strong> ${data.campus}</p>
      `,
    });

    // 6. Simulated WhatsApp Dispatch
    const whatsappMessage = `Hello ${data.fullName}! Your application to Zion University has been received. Your Application Reference is ${applicationRef}. Track your status at https://zion.ac.ke/portal`;
    console.log(`[WhatsApp Dispatch to ${data.phone}]: ${whatsappMessage}`);

    return NextResponse.json({
      success: true,
      applicationRef,
      message: "Application submitted successfully",
      applicant: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        programme: data.programmeName || data.programme,
        campus: data.campus,
      },
      submittedAt: timestamp,
    });
  } catch (err: any) {
    console.error("Application processing error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to process application" },
      { status: 500 }
    );
  }
}
