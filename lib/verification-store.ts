// In-memory store for verification codes and attempts
// In production, this should be stored in Redis or a database

interface VerificationRecord {
  code: string;
  email: string;
  expiresAt: number;
  attempts: number;
  createdAt: number;
}

interface RateLimitRecord {
  email: string;
  attempts: number;
  windowStart: number;
}

// Store verification codes - using global to persist across hot reloads
declare global {
  var __verificationStore: Map<string, VerificationRecord> | undefined;
  var __rateLimitStore: Map<string, RateLimitRecord> | undefined;
  var __storeResetCount: number | undefined;
}

// Store verification codes
const verificationStore =
  globalThis.__verificationStore || new Map<string, VerificationRecord>();
globalThis.__verificationStore = verificationStore;

// Store rate limiting data
const rateLimitStore =
  globalThis.__rateLimitStore || new Map<string, RateLimitRecord>();
globalThis.__rateLimitStore = rateLimitStore;

// Track store resets
let storeResetCount = globalThis.__storeResetCount || 0;
globalThis.__storeResetCount = storeResetCount;

// Clean up expired records every 2 minutes
setInterval(() => {
  const now = Date.now();
  let deletedCount = 0;

  // Clean verification records
  for (const [key, record] of Array.from(verificationStore.entries())) {
    if (record.expiresAt < now) {
      verificationStore.delete(key);
      deletedCount++;
    }
  }

  // Clean rate limit records
  for (const [key, record] of Array.from(rateLimitStore.entries())) {
    if (record.windowStart + 15 * 60 * 1000 < now) {
      // 15 minutes window
      rateLimitStore.delete(key);
    }
  }

  if (deletedCount > 0) {
    console.log(`🧹 Cleaned up ${deletedCount} expired verification records`);
  }
}, 2 * 60 * 1000);

export class VerificationStore {
  // Store verification code
  static storeVerificationCode(email: string, code: string): void {
    const normalizedEmail = email.toLowerCase().trim();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Check if this is a new store instance
    if (verificationStore.size === 0) {
      storeResetCount++;
      console.log(`🔄 Store reset detected! Count: ${storeResetCount}`);
    }

    verificationStore.set(normalizedEmail, {
      code,
      email: normalizedEmail,
      expiresAt,
      attempts: 0,
      createdAt: Date.now(),
    });

    console.log("💾 Stored verification code:", {
      email: normalizedEmail,
      code,
      expiresAt: new Date(expiresAt).toISOString(),
      storeSize: verificationStore.size,
      storeResetCount,
    });
  }

  // Verify code
  static verifyCode(
    email: string,
    inputCode: string
  ): { success: boolean; error?: string } {
    const normalizedEmail = email.toLowerCase().trim();
    const record = verificationStore.get(normalizedEmail);

    console.log("🔍 Verification Debug:", {
      inputEmail: email,
      normalizedEmail,
      inputCode,
      storedCode: record?.code,
      recordExists: !!record,
      currentTime: new Date().toISOString(),
      expiresAt: record ? new Date(record.expiresAt).toISOString() : null,
      isExpired: record ? record.expiresAt < Date.now() : null,
      attempts: record?.attempts || 0,
      storeSize: verificationStore.size,
      storeResetCount,
    });

    if (!record) {
      console.log("❌ No record found for email:", normalizedEmail);
      console.log(
        "📋 Available emails in store:",
        Array.from(verificationStore.keys())
      );
      return {
        success: false,
        error: "Doğrulama kodu tapılmadı və ya müddəti bitib",
      };
    }

    if (record.expiresAt < Date.now()) {
      verificationStore.delete(normalizedEmail);
      return { success: false, error: "Doğrulama kodu müddəti bitib" };
    }

    if (record.attempts >= 5) {
      verificationStore.delete(normalizedEmail);
      return {
        success: false,
        error: "Çox sayda səhv cəhd. Yeni kod tələb edin",
      };
    }

    if (record.code !== inputCode) {
      record.attempts++;
      return { success: false, error: "Səhv doğrulama kodu" };
    }

    // Code is correct, remove it
    verificationStore.delete(normalizedEmail);
    return { success: true };
  }

  // Check rate limiting
  static checkRateLimit(email: string): { allowed: boolean; error?: string } {
    const normalizedEmail = email.toLowerCase().trim();
    const now = Date.now();
    const windowMs = 15 * 60 * 1000; // 15 minutes
    const maxAttempts = 5;

    const record = rateLimitStore.get(normalizedEmail);

    if (!record) {
      rateLimitStore.set(normalizedEmail, {
        email: normalizedEmail,
        attempts: 1,
        windowStart: now,
      });
      return { allowed: true };
    }

    // Reset window if expired
    if (now - record.windowStart > windowMs) {
      record.attempts = 1;
      record.windowStart = now;
      return { allowed: true };
    }

    // Check if within limits
    if (record.attempts >= maxAttempts) {
      const remainingTime = Math.ceil(
        (windowMs - (now - record.windowStart)) / 60000
      );
      return {
        allowed: false,
        error: `Çox sayda cəhd. ${remainingTime} dəqiqə sonra yenidən cəhd edin`,
      };
    }

    record.attempts++;
    return { allowed: true };
  }

  // Get verification status
  static getVerificationStatus(email: string): {
    exists: boolean;
    attempts: number;
    expiresIn: number;
  } {
    const normalizedEmail = email.toLowerCase().trim();
    const record = verificationStore.get(normalizedEmail);

    if (!record) {
      return { exists: false, attempts: 0, expiresIn: 0 };
    }

    const expiresIn = Math.max(
      0,
      Math.ceil((record.expiresAt - Date.now()) / 1000)
    );
    return {
      exists: true,
      attempts: record.attempts,
      expiresIn,
    };
  }
}
