"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface Vacancy {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  experience: string;
  description: string;
  requirements: string[];
  benefits: string[];
  postedDate: string;
  deadline: string;
  status: string;
  applicationLink?: string;
}

export default function VakansiyalarPage() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/vakansiyalar");

        if (!response.ok) {
          throw new Error("Failed to fetch vacancies");
        }

        const data = await response.json();
        setVacancies(data.vacancies || []);
      } catch (err) {
        console.error("Error fetching vacancies:", err);
        setError("Vakansiyalar yüklənərkən xəta baş verdi");
      } finally {
        setLoading(false);
      }
    };

    fetchVacancies();

    
  }, []);

  const applicationProcess = [
    {
      step: "1",
      title: "Vakansiya Seçimi",
      description: "Maraqlı olduğunuz vakansiyaları seçin və tələbləri oxuyun",
    },
    {
      step: "2",
      title: "CV Hazırlama",
      description: "Peşəkar CV hazırlayın və təcrübənizi vurğulayın",
    },
    {
      step: "3",
      title: "Müraciət",
      description: "Onlayn müraciət formunu doldurun və sənədləri yükləyin",
    },
    {
      step: "4",
      title: "Müsahibə",
      description: "Seçilərsəniz, müsahibə mərhələsinə keçin",
    },
  ];

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("az-AZ", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const handleApply = (vacancy: Vacancy) => {
    if (vacancy.applicationLink) {
      window.open(vacancy.applicationLink, "_blank");
    } else {
      // Fallback to contact page if no application link
      window.location.href = "/elaqe";
    }
  };
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Vakansiyalar</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Müxtəlif sahələrdə iş imkanları və vakansiyalar. Yerli və
              beynəlxalq şirkətlərdə karyera imkanlarını kəşf edin. Gələcək
              karyeranızı burada başlayın.
            </p>
          </div>
        </div>
      </section>


      {/* Seçilmiş Vakansiyalar */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Seçilmiş Vakansiyalar
            </h2>
            <p className="text-xl text-gray-600">
              Ən məşhur və tələb olunan iş imkanları
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
              <p className="mt-4 text-gray-600">Vakansiyalar yüklənir...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
              >
                Yenidən yoxla
              </button>
            </div>
          ) : vacancies.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Hazırda aktiv vakansiya yoxdur.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {vacancies.map((job, index) => (
                <div
                  key={job.id || index}
                  className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-gray-600 text-sm mb-2">
                        <span>🏢 {job.company}</span>
                        <span>📍 {job.location}</span>
                        <span>⏰ {job.type}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-gray-600 text-sm">
                        <span>💰 {job.salary}</span>
                        <span>👨‍💼 {job.experience}</span>
                      </div>
                    </div>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium self-start md:self-auto">
                      {job.status === "Aktiv" ? "Aktiv" : "Bağlı"}
                    </span>
                  </div>

                  <p className="text-gray-700 mb-4">{job.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Tələblər:
                      </h4>
                      <ul className="space-y-1">
                        {job.requirements && job.requirements.length > 0 ? (
                          job.requirements.map((req, reqIndex) => (
                            <li key={reqIndex} className="flex items-start">
                              <span className="text-teal-500 mr-2">•</span>
                              <span className="text-sm text-gray-700">
                                {req}
                              </span>
                            </li>
                          ))
                        ) : (
                          <li className="text-sm text-gray-500">
                            Tələb yoxdur
                          </li>
                        )}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Üstünlüklər:
                      </h4>
                      <ul className="space-y-1">
                        {job.benefits && job.benefits.length > 0 ? (
                          job.benefits.map((benefit, benefitIndex) => (
                            <li key={benefitIndex} className="flex items-start">
                              <span className="text-teal-500 mr-2">✓</span>
                              <span className="text-sm text-gray-700">
                                {benefit}
                              </span>
                            </li>
                          ))
                        ) : (
                          <li className="text-sm text-gray-500">
                            Üstünlük göstərilməyib
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm text-gray-600 space-y-1 sm:space-y-0 sm:flex sm:flex-wrap sm:items-center sm:gap-4">
                      <span>
                        📅 Yerləşdirilib: {formatDate(job.postedDate)}
                      </span>
                      <span>⏰ Son tarix: {formatDate(job.deadline)}</span>
                    </div>
                    <button
                      onClick={() => handleApply(job)}
                      className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors w-full sm:w-auto"
                    >
                      Müraciət Et
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Müraciət Prosesi */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Müraciət Prosesi
            </h2>
            <p className="text-xl text-gray-600">
              İş müraciəti üçün addım-addım təlimat
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {applicationProcess.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Əlaqə */}
      <section className="bg-teal-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Vakansiyalarımızdan İstifadə Edin
            </h2>
            <p className="text-xl mb-8">
              Karyera uğurunuz üçün ən yaxşı iş imkanlarını tapın
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/elaqe"
                className="bg-white text-teal-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Dəstək Al
              </a>
              <a
                href="/karyera"
                className="bg-teal-700 text-white border border-white px-8 py-3 rounded-lg hover:bg-teal-800 transition-colors"
              >
                Digər Xidmətlər
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
