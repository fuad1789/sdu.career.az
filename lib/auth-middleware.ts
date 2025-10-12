import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface AdminTokenPayload {
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export function verifyAdminToken(request: NextRequest): {
  valid: boolean;
  payload?: AdminTokenPayload;
  error?: string;
} {
  try {
    const token = request.cookies.get("adminToken")?.value;

    if (!token) {
      return { valid: false, error: "Token tapılmadı" };
    }

    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback-secret"
    ) as AdminTokenPayload;

    // Check if token is expired
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return { valid: false, error: "Token müddəti bitib" };
    }

    // Check if user has admin role
    if (payload.role !== "admin") {
      return { valid: false, error: "Admin icazəsi yoxdur" };
    }

    return { valid: true, payload };
  } catch (error) {
    console.error("Token verification error:", error);
    return { valid: false, error: "Etibarsız token" };
  }
}

export function createAdminAuthResponse(payload: AdminTokenPayload) {
  return {
    email: payload.email,
    role: payload.role,
    isAuthenticated: true,
  };
}
