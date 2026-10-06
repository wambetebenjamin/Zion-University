import nodemailer from "nodemailer";

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}): Promise<boolean> {
  try {
    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || "587", 10);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (host && user && pass) {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || `"Zion University Admissions" <admissions@zion.ac.ke>`,
        to,
        subject,
        html,
        text: text || html.replace(/<[^>]+>/g, ""),
      });
      return true;
    } else {
      console.log(`[Simulated Email Dispatch] To: ${to} | Subject: ${subject}`);
      return true;
    }
  } catch (error) {
    console.error("Failed to send email via nodemailer:", error);
    return false;
  }
}
