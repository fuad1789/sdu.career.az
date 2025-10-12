import { NextRequest, NextResponse } from "next/server";
import {
  verifyAdminToken,
  createAdminAuthResponse,
} from "@/lib/auth-middleware";

export async function GET(request: NextRequest) {
  try {
    const tokenResult = verifyAdminToken(request);

    if (!tokenResult.valid) {
      return NextResponse.json(
        { error: tokenResult.error || "Etibarsız token" },
        { status: 401 }
      );
    }

    const authData = createAdminAuthResponse(tokenResult.payload!);
    return NextResponse.json(authData);
  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.json(
      { error: "Server xətası baş verdi" },
      { status: 500 }
    );
  }
}
