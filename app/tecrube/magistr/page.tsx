import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function MagistrTecrubePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-purple-800 py-8 sm:py-12">
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
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              Magistr Təcrübəsi
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-purple-100 max-w-2xl mx-auto leading-relaxed px-4">
              Magistr tələbələri üçün xüsusi təcrübə proqramları və imkanları
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
                Magistr Təcrübəsi Haqqında
              </h2>

              <div className="space-y-6">
                <div className="bg-purple-50 p-4 sm:p-6 rounded-xl border-l-4 border-purple-500">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
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
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                      Elmi-Tədqiqat Təcrübəsi
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    Magistr tələbələri üçün elmi-tədqiqat fəaliyyəti əsaslı
                    təcrübə proqramları təşkil edilir. Tələbələr müxtəlif elmi
                    sahələrdə tədqiqat işləri aparır, konfranslarda iştirak edir
                    və elmi məqalələr yazırlar.
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
                          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                      Beynəlxalq Əməkdaşlıq
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    Beynəlxalq universitetlər və tədqiqat mərkəzləri ilə
                    əməkdaşlıq imkanları yaradılır. Tələbələr xarici
                    müəssisələrdə təcrübə keçə, beynəlxalq konfranslarda iştirak
                    edə bilərlər.
                  </p>
                </div>

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
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                      Mentorluq Sistemi
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    Hər tələbəyə təcrübəli mentor təyin edilir. Mentorlar
                    tələbələrin elmi işlərində dəstək göstərir, karyera
                    planlaşdırmasında kömək edir və təcrübə paylaşırlar.
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
                      <span className="text-gray-700 text-sm sm:text-base">
                        Elmi Tədqiqat və İnnovasiya
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
                      <span className="text-gray-700 text-sm sm:text-base">
                        Beynəlxalq Əməkdaşlıq
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
                      <span className="text-gray-700 text-sm sm:text-base">
                        Karyera Planlaşdırması
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
                      <span className="text-gray-700 text-sm sm:text-base">
                        Mentorluq və Dəstək
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                    Təcrübə Müddəti
                  </h3>
                  <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
                    <li>• 1-2 il müddətində təcrübə proqramı</li>
                    <li>• Həftədə 20-30 saat iş rejimi</li>
                    <li>• Elmi işlər üzrə nəticələrin təqdim edilməsi</li>
                    <li>• Mentorluq sessiyaları və dəstək</li>
                    <li>• Beynəlxalq konfranslarda iştirak imkanı</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Müraciət Bölməsi */}
      <section className="bg-purple-600 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
            Magistr Təcrübəsinə Müraciət
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-purple-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Magistr təcrübəsi üçün müraciət etmək istəyirsinizsə, aşağıdakı
            düyməyə klikləyin
          </p>
          <button className="bg-white text-purple-600 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm sm:text-base">
            Müraciət Et
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
