"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [step, setStep] = useState<"email" | "verification" | "loading">(
    "email"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [countdown, setCountdown] = useState(0);
  const router = useRouter();

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/admin/send-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        setStep("verification");
        setCountdown(60); // 60 seconds cooldown
      } else {
        setError(data.error || "Xəta baş verdi");
      }
    } catch (err) {
      setError("Server xətası baş verdi");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/admin/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code: verificationCode }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        setStep("loading");
        // Redirect to dashboard after showing loading screen
        setTimeout(() => {
          router.push("/admin/dashboard");
        }, 2000); // 2 seconds loading screen
      } else {
        setError(data.error || "Doğrulama xətası");
      }
    } catch (err) {
      setError("Server xətası baş verdi");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (countdown > 0) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/admin/send-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Yeni kod göndərildi");
        setCountdown(60);
      } else {
        setError(data.error || "Kod göndərilmədi");
      }
    } catch (err) {
      setError("Server xətası baş verdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Admin Panel
            </h2>
            <p className="text-gray-600 mb-8">
              {step === "email"
                ? "Giriş etmək üçün e-poçt ünvanınızı daxil edin"
                : "E-poçt ünvanınıza göndərilən kodu daxil edin"}
            </p>
          </div>

          {step === "email" ? (
            <form onSubmit={handleSendCode} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  E-poçt ünvanı
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                  placeholder="admin@example.com"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Göndərilir..." : "Doğrulama kodu göndər"}
              </button>
            </form>
          ) : step === "verification" ? (
            <form onSubmit={handleVerifyCode} className="space-y-6">
              <div>
                <label
                  htmlFor="email-display"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  E-poçt ünvanı
                </label>
                <input
                  id="email-display"
                  type="email"
                  value={email}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
                />
              </div>

              <div>
                <label
                  htmlFor="verificationCode"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Doğrulama kodu
                </label>
                <input
                  id="verificationCode"
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white text-center text-2xl tracking-widest"
                  placeholder="000000"
                  maxLength={6}
                  required
                />
              </div>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                  {success}
                </div>
              )}

              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Yoxlanılır..." : "Daxil ol"}
                </button>

                <div className="flex justify-between items-center text-sm">
                  <button
                    type="button"
                    onClick={() => setStep("email")}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ← E-poçt dəyişdir
                  </button>

                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={countdown > 0 || loading}
                    className="text-blue-600 hover:text-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed"
                  >
                    {countdown > 0
                      ? `${countdown}s sonra yenidən göndər`
                      : "Kodu yenidən göndər"}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Uğurla daxil oldunuz!
              </h3>
              <p className="text-gray-600 mb-4">
                Admin panela yönləndirilirsiniz...
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full animate-pulse"
                  style={{ width: "100%" }}
                ></div>
              </div>
            </div>
          )}

          {step !== "loading" && (
            <div className="mt-6 text-center text-sm text-gray-600">
              <p className="font-semibold mb-2">Təhlükəsizlik məlumatları:</p>
              <p>• Yalnız icazə verilən e-poçt ünvanları ilə giriş mümkündür</p>
              <p>• Doğrulama kodu 10 dəqiqə ərzində etibarlıdır</p>
              <p>• 5 səhv cəhddən sonra yeni kod tələb olunur</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
