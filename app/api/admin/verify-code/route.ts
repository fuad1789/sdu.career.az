import { NextRequest, NextResponse } from "next/server";
import { VerificationStore } from "@/lib/verification-store";
import { isEmailAllowed } from "@/lib/email-service";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json();

    // Validate input
    if (!email || !code) {
      return NextResponse.json(
        { error: "E-poçt və doğrulama kodu tələb olunur" },
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

    // Verify code
    const verificationResult = VerificationStore.verifyCode(email, code);

    if (!verificationResult.success) {
      return NextResponse.json(
        { error: verificationResult.error },
        { status: 400 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        email,
        role: "admin",
        iat: Math.floor(Date.now() / 1000),
      },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: "24h" }
    );

    // Set secure HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      message: "Uğurla daxil oldunuz",
    });

    response.cookies.set("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    return response;
  } catch (error) {
    console.error("Verify code error:", error);
    return NextResponse.json(
      { error: "Server xətası baş verdi" },
      { status: 500 }
    );
  }
}
