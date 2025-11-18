"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function MezunQeydiyyatiPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    ad: "",
    ataAdi: "",
    soyad: "",
    elektronUnvan: "",
    mezunOlduguIl: "",
    elaqeNomresi: "",
    ixtisas: "",
    ixtisasaUygunIsleyir: "",
    hansiSaheUzreIsleyir: "",
    isYeriVeVezife: "",
    karyeraXidmetleri: "",
    elaveQeyd: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [redirectCountdown, setRedirectCountdown] = useState(5);

  // Handle countdown and redirect after successful registration
  useEffect(() => {
    if (submitStatus === "success") {
      const timer = setInterval(() => {
        setRedirectCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            router.push("/");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [submitStatus, router]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/mezun-qeydiyyati", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        // Show success toast notification first
        toast.success(
          "Qeydiyyat uğurla tamamlandı! Məlumatlarınız admin tərəfindən təsdiq edildikdən sonra sistemə əlavə olunacaq.",
          {
            duration: 6000,
            position: "top-center",
            style: {
              background: "#10B981",
              color: "#fff",
              fontSize: "16px",
              padding: "16px 20px",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            },
          }
        );

        // Wait a bit before showing success message and resetting form
        setTimeout(() => {
          setSubmitStatus("success");
          setRedirectCountdown(5); // Reset countdown
          // Reset form
          setFormData({
            ad: "",
            ataAdi: "",
            soyad: "",
            elektronUnvan: "",
            mezunOlduguIl: "",
            elaqeNomresi: "",
            ixtisas: "",
            ixtisasaUygunIsleyir: "",
            hansiSaheUzreIsleyir: "",
            isYeriVeVezife: "",
            karyeraXidmetleri: "",
            elaveQeyd: "",
          });
        }, 1000); // 1 second delay
      } else {
        // Show error toast notification
        toast.error(
          "Qeydiyyat zamanı xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.",
          {
            duration: 5000,
            position: "top-center",
            style: {
              background: "#EF4444",
              color: "#fff",
              fontSize: "16px",
              padding: "16px 20px",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            },
          }
        );
        setSubmitStatus("error");
        console.error("Registration failed:", result.error);
      }
    } catch (error) {
      // Show error toast notification
      toast.error("Server xətası baş verdi. Zəhmət olmasa yenidən cəhd edin.", {
        duration: 5000,
        position: "top-center",
        style: {
          background: "#EF4444",
          color: "#fff",
          fontSize: "16px",
          padding: "16px 20px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        },
      });
      setSubmitStatus("error");
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Toaster />
      <Header />
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Məzun Qeydiyyatı
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto">
              SDU-nun məzunları olaraq bizimlə əlaqə saxlayın və karyera
              imkanlarından yararlanın
            </p>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Qeydiyyat Formu
              </h2>
              <p className="text-gray-600">
                Aşağıdakı məlumatları dolduraraq məzun qeydiyyatınızı tamamlayın
              </p>
            </div>

            {submitStatus === "success" && (
              <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-300 text-green-800 rounded-xl shadow-lg">
                {/* Top Button */}
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => router.push("/")}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    <span>Əsas Səhifəyə Keç</span>
                  </button>
                </div>

                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-green-900">
                    Qeydiyyat Uğurla Əlavə Edildi!
                  </h3>
                  <p className="text-green-800 mb-4">
                    Məzun qeydiyyatınız uğurla əlavə edildi. Admin tərəfindən
                    təsdiq olunacaq və tezliklə sizinlə əlaqə saxlayacağıq.
                  </p>
                  <div className="bg-white bg-opacity-50 rounded-lg p-3 border border-green-200">
                    <p className="text-sm text-green-700">
                      <span className="font-semibold">{redirectCountdown}</span>{" "}
                      saniyə sonra avtomatik olaraq əsas səhifəyə
                      yönləndiriləcəksiniz
                    </p>
                  </div>
                </div>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Şəxsi Məlumatlar
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="ad"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Ad *
                    </label>
                    <input
                      type="text"
                      id="ad"
                      name="ad"
                      value={formData.ad}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="ataAdi"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Ata adı *
                    </label>
                    <input
                      type="text"
                      id="ataAdi"
                      name="ataAdi"
                      value={formData.ataAdi}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="soyad"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Soyad *
                    </label>
                    <input
                      type="text"
                      id="soyad"
                      name="soyad"
                      value={formData.soyad}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Əlaqə Məlumatları
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="elektronUnvan"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Elektron ünvan *
                    </label>
                    <input
                      type="email"
                      id="elektronUnvan"
                      name="elektronUnvan"
                      value={formData.elektronUnvan}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="elaqeNomresi"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Əlaqə nömrəsi *
                    </label>
                    <input
                      type="tel"
                      id="elaqeNomresi"
                      name="elaqeNomresi"
                      value={formData.elaqeNomresi}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    />
                  </div>
                </div>
              </div>

              {/* Education Information */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Təhsil Məlumatları
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="mezunOlduguIl"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Məzun olduğunuz il *
                    </label>
                    <input
                      type="number"
                      id="mezunOlduguIl"
                      name="mezunOlduguIl"
                      value={formData.mezunOlduguIl}
                      onChange={handleInputChange}
                      required
                      min="1990"
                      max="2025"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="ixtisas"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      İxtisas *
                    </label>
                    <input
                      type="text"
                      id="ixtisas"
                      name="ixtisas"
                      value={formData.ixtisas}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    />
                  </div>
                </div>
              </div>

              {/* Work Information */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  İş Məlumatları
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      İxtisasınıza uyğun işləyirsinizmi? *
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center text-gray-900">
                        <input
                          type="radio"
                          name="ixtisasaUygunIsleyir"
                          value="bəli"
                          checked={formData.ixtisasaUygunIsleyir === "bəli"}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        Bəli
                      </label>
                      <label className="flex items-center text-gray-900">
                        <input
                          type="radio"
                          name="ixtisasaUygunIsleyir"
                          value="xeyr"
                          checked={formData.ixtisasaUygunIsleyir === "xeyr"}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        Xeyr
                      </label>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="hansiSaheUzreIsleyir"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Hansı sahə üzrə işləyirsiniz?
                    </label>
                    <input
                      type="text"
                      id="hansiSaheUzreIsleyir"
                      name="hansiSaheUzreIsleyir"
                      value={formData.hansiSaheUzreIsleyir}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="isYeriVeVezife"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      İş yeri və vəzifəniz
                    </label>
                    <input
                      type="text"
                      id="isYeriVeVezife"
                      name="isYeriVeVezife"
                      value={formData.isYeriVeVezife}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    />
                  </div>
                </div>
              </div>

              {/* Career Services */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Karyera Xidmətləri
                </h3>
                <div>
                  <label
                    htmlFor="karyeraXidmetleri"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    SDU-nun təklif etdiyi Karyera xidmətlərindən hansı sizə
                    uyğundur?
                  </label>
                  <input
                    type="text"
                    id="karyeraXidmetleri"
                    name="karyeraXidmetleri"
                    value={formData.karyeraXidmetleri}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="Məsələn: Karyera məsləhəti, İş axtarışı dəstəyi, CV hazırlama..."
                  />
                </div>
              </div>

              {/* Additional Notes */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Əlavə Qeyd
                </h3>
                <div>
                  <label
                    htmlFor="elaveQeyd"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Əlavə qeydiniz
                  </label>
                  <textarea
                    id="elaveQeyd"
                    name="elaveQeyd"
                    value={formData.elaveQeyd}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="Əlavə məlumat və ya suallarınızı buraya yaza bilərsiniz..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Göndərilir...
                    </div>
                  ) : (
                    "Qeydiyyatı Tamamla"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
