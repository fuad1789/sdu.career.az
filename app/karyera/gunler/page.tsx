import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function KaryeraGunleriPage() {
  const upcomingEvents = [
    {
      title: "IT Karyera Günü 2024",
      date: "2024-12-20",
      time: "10:00 - 16:00",
      location: "SDU Konfrans Zalı",
      description:
        "İnformasiya texnologiyaları sahəsində karyera imkanları və təcrübə paylaşımı",
      companies: ["Microsoft", "Google", "IBM", "Azercell"],
      type: "IT",
      status: "upcoming",
    },
    {
      title: "Biznes və İqtisadiyyat Karyera Günü",
      date: "2024-12-25",
      time: "09:00 - 15:00",
      location: "SDU Biznes Mərkəzi",
      description:
        "Biznes və iqtisadiyyat sahəsində karyera imkanları və şəbəkə qurma",
      companies: ["PwC", "Deloitte", "EY", "KPMG"],
      type: "Business",
      status: "upcoming",
    },
    {
      title: "Mühəndislik Karyera Günü",
      date: "2025-01-10",
      time: "10:00 - 17:00",
      location: "SDU Mühəndislik Fakültəsi",
      description:
        "Mühəndislik sahəsində karyera imkanları və texnoloji yeniliklər",
      companies: ["BP", "SOCAR", "Azal", "Azərsu"],
      type: "Engineering",
      status: "upcoming",
    },
  ];

  const pastEvents = [
    {
      title: "Karyera Günü 2024 - Payız",
      date: "2024-11-15",
      description: "Ümumi karyera imkanları və məzunlarla görüş",
      participants: 150,
      companies: 25,
      status: "completed",
    },
    {
      title: "Startup və İnnovasiya Günü",
      date: "2024-10-20",
      description: "Startup ekosistemi və innovasiya imkanları",
      participants: 80,
      companies: 15,
      status: "completed",
    },
  ];

  const eventTypes = [
    {
      title: "Sektor Karyera Günləri",
      description: "Müxtəlif sektorlarda karyera imkanları",
      features: [
        "İxtisaslaşmış şirkətlərlə görüş",
        "Sektor təcrübəsi paylaşımı",
        "Vakansiya təqdimatları",
        "Şəbəkə qurma imkanları",
      ],
      icon: "🏢",
    },
    {
      title: "Məzunlarla Görüş",
      description: "Uğurlu məzunlarla təcrübə paylaşımı",
      features: [
        "Uğur hekayələri",
        "Karyera məsləhəti",
        "Mentorluq imkanları",
        "Şəbəkə qurma",
      ],
      icon: "🎓",
    },
    {
      title: "Startup və İnnovasiya",
      description: "Yeni texnologiyalar və innovasiya imkanları",
      features: [
        "Startup ekosistemi",
        "İnnovasiya layihələri",
        "İnvestisiya imkanları",
        "Entrepreneurship",
      ],
      icon: "🚀",
    },
    {
      title: "Beynəlxalq Karyera",
      description: "Beynəlxalq karyera imkanları və proqramlar",
      features: [
        "Beynəlxalq şirkətlər",
        "Exchange proqramları",
        "Qlobal imkanlar",
        "Dil təlimləri",
      ],
      icon: "🌍",
    },
  ];

  const benefits = [
    {
      title: "Şəbəkə Qurma",
      description: "Peşəkar şəbəkə qurma və əlaqələrin inkişafı",
    },
    {
      title: "Vakansiya İmkanları",
      description: "Birbaşa iş imkanları və vakansiyalar",
    },
    {
      title: "Təcrübə Paylaşımı",
      description: "Sənaye təcrübəsi və praktiki məsləhət",
    },
    {
      title: "Karyera Məsləhəti",
      description: "Peşəkar karyera məsləhəti və istiqamətləndirmə",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Karyera Günləri</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Tələbələri iş dünyası ilə birləşdirən, karyera imkanlarını təqdim
              edən və şəbəkə qurma imkanları yaradan tədbirlər. Gələcək
              karyeranızı planlaşdırmaq üçün bizə qoşulun.
            </p>
          </div>
        </div>
      </section>

      {/* Gələcək Tədbirlər */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Gələcək Tədbirlər
            </h2>
            <p className="text-xl text-gray-600">
              Yaxın gələcəkdə keçiriləcək karyera günləri
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {event.title}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <span className="mr-4">📅 {event.date}</span>
                      <span className="mr-4">🕒 {event.time}</span>
                    </div>
                    <p className="text-gray-600 mb-2">📍 {event.location}</p>
                  </div>
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                    {event.type}
                  </span>
                </div>

                <p className="text-gray-700 mb-4">{event.description}</p>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">
                    İştirak edən şirkətlər:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {event.companies.map((company, companyIndex) => (
                      <span
                        key={companyIndex}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                      >
                        {company}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors">
                  Qeydiyyatdan Keç
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tədbir Növləri */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tədbir Növləri
            </h2>
            <p className="text-xl text-gray-600">
              Müxtəlif karyera tədbirləri və onların xüsusiyyətləri
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {eventTypes.map((type, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="text-4xl mb-4">{type.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {type.title}
                </h3>
                <p className="text-gray-600 mb-4">{type.description}</p>
                <ul className="space-y-2">
                  {type.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <span className="text-orange-500 mr-2">✓</span>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Keçmiş Tədbirlər */}
      <section className="bg-orange-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Keçmiş Tədbirlər
            </h2>
            <p className="text-xl text-gray-600">
              Əvvəlki karyera günlərimizin nəticələri
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pastEvents.map((event, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-600 mb-2">📅 {event.date}</p>
                <p className="text-gray-700 mb-4">{event.description}</p>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>👥 {event.participants} iştirakçı</span>
                  <span>🏢 {event.companies} şirkət</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Üstünlüklər */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Karyera Günlərinin Üstünlükləri
            </h2>
            <p className="text-xl text-gray-600">
              Niyə karyera günlərimizdə iştirak etməlisiniz?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qeydiyyat */}
      <section className="bg-orange-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Karyera Günlərimizdə İştirak Edin
            </h2>
            <p className="text-xl mb-8">
              Gələcək karyeranızı planlaşdırmaq üçün karyera günlərimizdə
              iştirak edin
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/elaqe"
                className="bg-white text-orange-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Qeydiyyatdan Keç
              </a>
              <a
                href="/karyera"
                className="bg-orange-700 text-white border border-white px-8 py-3 rounded-lg hover:bg-orange-800 transition-colors"
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

