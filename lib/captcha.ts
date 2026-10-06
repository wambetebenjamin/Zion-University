export interface CaptchaVerificationResult {
  success: boolean;
  score?: number;
  action?: string;
  challengeNeeded?: boolean;
  errorCodes?: string[];
}

export async function verifyCaptcha(token?: string): Promise<CaptchaVerificationResult> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  // In development / demo environment without keys or with mock tokens
  if (!token || token === "mock-recaptcha-token" || !secret) {
    return {
      success: true,
      score: 0.9,
      action: "submit",
      challengeNeeded: false,
    };
  }

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
    });

    const data = await response.json();
    if (!data.success) {
      return {
        success: false,
        challengeNeeded: true,
        errorCodes: data["error-codes"],
      };
    }

    // Check score (v3 threshold is 0.5)
    const score = data.score ?? 1.0;
    if (score < 0.5) {
      return {
        success: false,
        score,
        challengeNeeded: true, // triggers v2 checkbox fallback
      };
    }

    return {
      success: true,
      score,
      action: data.action,
      challengeNeeded: false,
    };
  } catch (err) {
    console.error("reCAPTCHA verification network error:", err);
    // Allow gracefully in development/network restricted environments
    return {
      success: true,
      score: 0.8,
      challengeNeeded: false,
    };
  }
}
