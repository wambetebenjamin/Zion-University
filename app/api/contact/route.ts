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
        { success: false, error: "Security verification required.", challengeNeeded: true },
        { status: 400 }
      );
    }

    const ticketId = `TKT-${Date.now().toString(36).toUpperCase()}`;
    const enquiry = {
      ...data,
      ticketId,
      receivedAt: new Date().toISOString(),
    };

    await kvListPush("enquiries:general", enquiry);

    // Send email to admissions/support desk
    await sendEmail({
      to: "info@zion.ac.ke",
      subject: `New Web Enquiry [${ticketId}]: ${data.subject || "General Admission Question"}`,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>New Website Enquiry Received</h2>
          <p><strong>Ticket ID:</strong> ${ticketId}</p>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone || "Not provided"}</p>
          <p><strong>Campus Interest:</strong> ${data.campus || "Nairobi Main Campus"}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f3f4f6; padding: 15px; border-left: 3px solid #f5a425;">
            ${data.message?.replace(/\n/g, "<br/>")}
          </div>
        </div>
      `,
    });

    // Send automated acknowledgement to enquirer
    if (data.email) {
      await sendEmail({
        to: data.email,
        subject: `We Received Your Enquiry [Ticket: ${ticketId}] - Zion University`,
        html: `
          <div style="font-family: Arial, sans-serif; color: #162239; line-height: 1.6;">
            <h2>Hello ${data.name || "there"},</h2>
            <p>Thank you for reaching out to Zion University. Your enquiry has been routed to our admissions advisory team under Reference <strong>${ticketId}</strong>.</p>
            <p>One of our academic counselors will respond to your inquiry within 24 business hours.</p>
            <p>For urgent queries, feel free to chat with us directly on WhatsApp at <strong>+254 112 272 061</strong>.</p>
          </div>
        `,
      });
    }

    return NextResponse.json({
      success: true,
      ticketId,
      message: "Your message has been sent successfully. An admissions counselor will respond shortly.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to submit enquiry" },
      { status: 500 }
    );
  }
}
