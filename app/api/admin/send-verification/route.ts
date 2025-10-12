import { NextRequest, NextResponse } from "next/server";
import {
  sendVerificationCode,
  isEmailAllowed,
  generateVerificationCode,
} from "@/lib/email-service";
import { VerificationStore } from "@/lib/verification-store";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "E-poçt ünvanı tələb olunur" },
        { status: 400 }
      );
    }

    // Check if email is in whitelist
    if (!isEmailAllowed(email)) {
      return NextResponse.json(
        { error: "Bu e-poçt ünvanına giriş icazəsi yoxdur" },
        { status: 403 }
      );
    }

    // Check rate limiting
    const rateLimitCheck = VerificationStore.checkRateLimit(email);
    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        { error: rateLimitCheck.error },
        { status: 429 }
      );
    }

    // Generate verification code
    const code = generateVerificationCode();

    // Store verification code
    VerificationStore.storeVerificationCode(email, code);

    // Send email
    const emailResult = await sendVerificationCode(email, code);

    if (!emailResult.success) {
      return NextResponse.json(
        { error: emailResult.error || "E-poçt göndərilmədi" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Doğrulama kodu e-poçt ünvanınıza göndərildi",
    });
  } catch (error) {
    console.error("Send verification error:", error);
    return NextResponse.json(
      { error: "Server xətası baş verdi" },
      { status: 500 }
    );
  }
}
