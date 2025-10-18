import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function EmekdaslarPage() {
  const emekdaslar = [
    {
      name: "Anar Dünyamalıyev",
      position: "Karyera və Məzunlarla İş Mərkəzinin Rəhbəri",
      education:
        "Sumqayıt Dövlət Universiteti - Fizika və elektroenergetika fakültəsi (2005)",
      experience: "2007-ci ildən SDU-da fəaliyyət göstərir",
      achievements: [
        "Elektroenergetika kafedrasında laborant",
        "İnformasiya Texnologiyalar Mərkəzində Texnoloji innovasiyalar və texniki xidmət şöbəsinin müdiri",
        "İctimaiyyətlə əlaqələr şöbəsində baş mütəxəssis",
        "Mükəmməllik Mərkəzində baş mütəxəssis",
      ],
      trainings: [
        "EURAS Webinar – Closing the Leadership Gap 2025",
        "Sabancı Üniversitesi EDU – Pazar Araştırma Yöntem ve Uygulamaları",
        "İstanbul Aydın Universiteti – İş Ortamında Öz Yönetim ve Psikolojik Sağlamlık",
        "British Council – Creative Spark layihəsi",
        "Erasmus PETRA layihəsi – Tədqiqat bacarıqlarının inkişaf etdirilməsi",
      ],
      email: "anarahmedoglu@sdu.edu.az",
      phone: "+994 (50) 566 88 88",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />

      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Əməkdaşlar
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Karyera və Məzunlarla İş Mərkəzinin peşəkar komandası
            </p>
          </div>
        </div>
      </section>

      {/* Əməkdaşlar Siyahısı */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {emekdaslar.map((emekdas, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sol tərəf - Şəxsi məlumatlar */}
                    <div className="lg:w-1/3">
                      <div className="text-center lg:text-left">
                        <div className="w-32 h-32 rounded-full mx-auto lg:mx-0 mb-6 overflow-hidden">
                          <Image
                            src="/images/anar-dunyamaliyev.jpg"
                            alt={emekdas.name}
                            width={128}
                            height={128}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                          {emekdas.name}
                        </h2>
                        <p className="text-lg text-sdu-blue font-semibold mb-4">
                          {emekdas.position}
                        </p>
                        <div className="space-y-2 text-gray-600">
                          <p className="flex items-center">
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            {emekdas.email}
                          </p>
                          <p className="flex items-center">
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            {emekdas.phone}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Sağ tərəf - Təcrübə və təlimlər */}
                    <div className="lg:w-2/3">
                      <div className="space-y-6">
                        {/* Təhsil */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Təhsil
                          </h3>
                          <p className="text-gray-700">{emekdas.education}</p>
                        </div>

                        {/* Təcrübə */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Təcrübə
                          </h3>
                          <p className="text-gray-700 mb-3">
                            {emekdas.experience}
                          </p>
                          <ul className="space-y-2">
                            {emekdas.achievements.map((achievement, idx) => (
                              <li key={idx} className="flex items-start">
                                <svg
                                  className="w-4 h-4 text-green-500 mr-2 mt-1"
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
                                  {achievement}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Təlimlər */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Təlimlər və Sertifikatlar
                          </h3>
                          <ul className="space-y-2">
                            {emekdas.trainings.map((training, idx) => (
                              <li key={idx} className="flex items-start">
                                <svg
                                  className="w-4 h-4 text-blue-500 mr-2 mt-1"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span className="text-gray-700">
                                  {training}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Komanda Haqqında */}
      <section className="bg-sdu-light-blue py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Komandamız Haqqında</h2>
          <p className="text-xl mb-8 max-w-4xl mx-auto">
            Karyera və Məzunlarla İş Mərkəzinin komandası tələbələrin karyera
            inkişafına dəstək göstərmək üçün peşəkar təcrübəyə malik
            mütəxəssislərdən ibarətdir. Komandamız müxtəlif sahələrdə təcrübə
            qazanmış və beynəlxalq təlimlərə qatılmış mütəxəssislərdən
            ibarətdir.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Peşəkar Təcrübə</h3>
              <p className="text-blue-100">
                Komandamızın üzvləri müxtəlif sahələrdə uzun illər təcrübə
                qazanmışdır
              </p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">
                Beynəlxalq Təlimlər
              </h3>
              <p className="text-blue-100">
                Beynəlxalq təlimlərə qatılaraq ən son metodları öyrənirik
              </p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Tələbə Dəstəyi</h3>
              <p className="text-blue-100">
                Tələbələrin karyera inkişafına dəstək göstərmək bizim əsas
                məqsədimizdir
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
