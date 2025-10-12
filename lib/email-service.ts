import nodemailer from "nodemailer";
import crypto from "crypto";

// Email configuration
const emailConfig = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER || "your-email@gmail.com",
    pass: process.env.GMAIL_APP_PASSWORD || "your-app-password",
  },
};

// Create transporter
const transporter = nodemailer.createTransport(emailConfig);

// Generate secure verification code
export function generateVerificationCode(): string {
  return crypto.randomInt(100000, 999999).toString();
}

// Generate secure token for verification
export function generateSecureToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

// Send verification code email
export async function sendVerificationCode(
  email: string,
  code: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const mailOptions = {
      from: `"SDU Career Admin Panel" <${emailConfig.auth.user}>`,
      to: email,
      subject: "Admin Panel Giriş Kodu",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Admin Panel Giriş Kodu</h1>
          </div>
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
            <p style="color: #333; font-size: 16px; margin-bottom: 20px;">
              Salam! Admin panela giriş etmək üçün aşağıdakı kodu istifadə edin:
            </p>
            <div style="background: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; border: 2px solid #667eea;">
              <h2 style="color: #667eea; font-size: 32px; margin: 0; letter-spacing: 5px; font-family: 'Courier New', monospace;">
                ${code}
              </h2>
            </div>
            <p style="color: #666; font-size: 14px; margin-bottom: 10px;">
              Bu kod 10 dəqiqə ərzində etibarlıdır.
            </p>
            <p style="color: #666; font-size: 14px; margin-bottom: 0;">
              Əgər bu giriş cəhdini siz etməmisinizsə, bu e-poçtu görməzlikdən gəlin.
            </p>
          </div>
          <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
            <p>SDU Career Portal - Admin Panel</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Email sending error:", error);
    return {
      success: false,
      error: "E-poçt göndərilmədi. Zəhmət olmasa daha sonra cəhd edin.",
    };
  }
}

// Verify email is in whitelist
export function isEmailAllowed(email: string): boolean {
  const allowedEmails =
    process.env.ADMIN_EMAILS?.split(",").map((e) => e.trim()) || [];

  console.log("🔐 Email whitelist check:", {
    inputEmail: email,
    normalizedEmail: email.toLowerCase(),
    allowedEmails,
    isAllowed: allowedEmails.includes(email.toLowerCase()),
  });

  return allowedEmails.includes(email.toLowerCase());
}

// Test email configuration
export async function testEmailConfiguration(): Promise<boolean> {
  try {
    await transporter.verify();
    return true;
  } catch (error) {
    console.error("Email configuration test failed:", error);
    return false;
  }
}
