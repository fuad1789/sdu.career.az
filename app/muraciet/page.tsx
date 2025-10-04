import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function MuracietPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />

      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Müraciət Et
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Karyera və Məzunlarla İş Mərkəzinin xidmətlərindən istifadə etmək
              üçün müraciət edin
            </p>
          </div>
        </div>
      </section>

      {/* Müraciət Növləri */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Təcrübə Müraciəti */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m0 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Təcrübə Müraciəti
                </h3>
                <p className="text-gray-600 mb-4">
                  İstehsalat təcrübəsi, magistr təcrübəsi və müəssisə təcrübəsi
                  üçün müraciət edin
                </p>
                <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                  Müraciət Et
                </button>
              </div>
            </div>

            {/* Karyera Məsləhəti */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
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
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Karyera Məsləhəti
                </h3>
                <p className="text-gray-600 mb-4">
                  Fərdi karyera məsləhəti və istiqamətləndirmə xidmətləri üçün
                  müraciət edin
                </p>
                <button className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                  Müraciət Et
                </button>
              </div>
            </div>

            {/* İş Axtarışı */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  İş Axtarışı
                </h3>
                <p className="text-gray-600 mb-4">
                  Vakansiyalar və iş imkanları haqqında məlumat almaq üçün
                  müraciət edin
                </p>
                <button className="w-full bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">
                  Müraciət Et
                </button>
              </div>
            </div>

            {/* Təlimlər */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Təlimlər
                </h3>
                <p className="text-gray-600 mb-4">
                  Peşəkar inkişaf təlimləri və kursları üçün müraciət edin
                </p>
                <button className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                  Müraciət Et
                </button>
              </div>
            </div>

            {/* Karyera Günləri */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Karyera Günləri
                </h3>
                <p className="text-gray-600 mb-4">
                  Karyera günləri və tədbirlərdə iştirak etmək üçün müraciət
                  edin
                </p>
                <button className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                  Müraciət Et
                </button>
              </div>
            </div>

            {/* Ümumi Müraciət */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Ümumi Müraciət
                </h3>
                <p className="text-gray-600 mb-4">
                  Digər suallar və təkliflər üçün ümumi müraciət edin
                </p>
                <button className="w-full bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors">
                  Müraciət Et
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Müraciət Prosesi */}
      <section className="bg-sdu-light-blue py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Müraciət Prosesi</h2>
          <p className="text-xl mb-8 max-w-4xl mx-auto">
            Müraciət etmək üçün aşağıdakı addımları izləyin
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Müraciət Növünü Seçin
              </h3>
              <p className="text-blue-100">İstədiyiniz xidmət növünü seçin</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Formu Doldurun</h3>
              <p className="text-blue-100">
                Məlumatları düzgün şəkildə doldurun
              </p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Göndərin</h3>
              <p className="text-blue-100">Müraciətinizi göndərin</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-xl font-bold">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Gözləyin</h3>
              <p className="text-blue-100">Cavabı gözləyin</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
