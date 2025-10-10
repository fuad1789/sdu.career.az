import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function BakalavrTecrubePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sdu-blue to-blue-700 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-lg sm:rounded-xl mb-4 sm:mb-6">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              Bakalavr Təcrübəsi
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed px-4">
              Bakalavr pilləsində təhsil alan tələbələr üçün istehsalat
              təcrübəsi imkanları
            </p>
          </div>
        </div>
      </section>

      {/* Məlumat Bölməsi */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Sol tərəf - Təcrübə Haqqında */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
                İstehsalat Təcrübəsi Haqqında
              </h2>

              <div className="space-y-6">
                <div className="bg-blue-50 p-4 sm:p-6 rounded-xl border-l-4 border-blue-500">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                      Kredit Sistemi
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    Təhsil Nazirliyinin standartlarına əsasən istehsalat
                    təcrübəsi 21 kredit təşkil edir. Bakalavr pilləsində təhsil
                    alan bütün tələbələr tədris planında nəzərdə tutulan
                    semestrə uyğun olaraq ixtisasları üzrə istehsalat təcrübəsi
                    keçməlidirlər.
                  </p>
                </div>

                <div className="bg-green-50 p-4 sm:p-6 rounded-xl border-l-4 border-green-500">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                      Təcrübə Müddəti
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    Tələbələr tədris ilinin 8-ci semestrində istehsalat
                    təcrübəsində iştirak etmək hüququna malikdirlər. Təcrübə
                    müəyyən edilmiş vaxtda başlayır və bir dəfə olmaqla nəzərdə
                    tutulan semestr ərzində tamamlanır.
                  </p>
                </div>

                <div className="bg-yellow-50 p-4 sm:p-6 rounded-xl border-l-4 border-yellow-500">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-500 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                      İştirak Qaydaları
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    Təcrübə müddətində tələbə nəzərdə tutulmuş iş saatında
                    təcrübə yerində olmalıdır. Tələbəyə heç bir halda təcrübəyə
                    ayrılan müddətin 25%-dən artığında iştirak etməməyə icazə
                    verilmir.
                  </p>
                </div>
              </div>
            </div>

            {/* Sağ tərəf - Proqram Xüsusiyyətləri */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
                Proqram Xüsusiyyətləri
              </h2>
              <div className="space-y-6">
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                    Təcrübə Sahələri
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">
                        Riyaziyyat və Təbiət Elmləri
                      </span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">
                        İqtisadiyyat və İdarəetmə
                      </span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">Mühəndislik</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">Tarix və Coğrafiya</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">Filologiya</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                    Təcrübə Müəssisələri
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Yerli istehsalat müəssisələri</li>
                    <li>• Dövlət müəssisələri</li>
                    <li>• Beynəlxalq şirkətlər</li>
                    <li>• Elmi-tədqiqat mərkəzləri</li>
                    <li>• İnnovasiya və texnologiya şirkətləri</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Müraciət Bölməsi */}
      <section className="bg-sdu-blue py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
            Təcrübəyə Müraciət
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Bakalavr təcrübəsi üçün müraciət etmək istəyirsinizsə, aşağıdakı
            düyməyə klikləyin
          </p>
          <Link
            href="/elaqe"
            className="inline-block bg-white text-sdu-blue px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm sm:text-base"
          >
            Müraciət Et
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
