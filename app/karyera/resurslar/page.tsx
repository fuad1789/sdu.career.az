import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function OnlaynResurslarPage() {
  const onlineCourses = [
    {
      title: "Karyera Planlaşdırması",
      description: "Karyera yolunuzu planlaşdırmaq üçün əsas prinsiplər",
      duration: "4 həftə",
      level: "Başlanğıc",
      instructor: "Dr. Leyla Məmmədova",
      price: "Pulsuz",
      features: [
        "Karyera məqsədlərinin müəyyənləşdirilməsi",
        "Bacarıq analizi",
        "İş bazarının araşdırılması",
        "Karyera planının hazırlanması",
      ],
      icon: "🎯",
    },
    {
      title: "CV və Müsahibə Hazırlığı",
      description: "Peşəkar CV hazırlama və müsahibə texnikaları",
      duration: "3 həftə",
      level: "Orta",
      instructor: "Elçin Həsənov",
      price: "Pulsuz",
      features: [
        "CV yazma texnikaları",
        "Müsahibə növləri",
        "Bədən dili",
        "Mock müsahibələr",
      ],
      icon: "📝",
    },
    {
      title: "Şəbəkə Qurma və LinkedIn",
      description: "Peşəkar şəbəkə qurma və LinkedIn-dən istifadə",
      duration: "2 həftə",
      level: "Başlanğıc",
      instructor: "Aysel Rəhimova",
      price: "Pulsuz",
      features: [
        "LinkedIn profil optimallaşdırması",
        "Şəbəkə qurma strategiyaları",
        "Peşəkar əlaqələr",
        "Online presence",
      ],
      icon: "🌐",
    },
    {
      title: "Soft Skills İnkişafı",
      description: "Kommunikasiya, liderlik və komanda işi bacarıqları",
      duration: "5 həftə",
      level: "Orta",
      instructor: "Rəşad Əliyev",
      price: "Pulsuz",
      features: [
        "Kommunikasiya bacarıqları",
        "Liderlik keyfiyyətləri",
        "Komanda işi",
        "Konflikt həlli",
      ],
      icon: "🤝",
    },
  ];

  const webinars = [
    {
      title: "İş Bazarında Uğur Strategiyaları",
      date: "2024-12-20",
      time: "15:00",
      speaker: "Dr. Leyla Məmmədova",
      description:
        "Müasir iş bazarında uğur qazanmaq üçün strategiyalar və texnikalar",
      duration: "60 dəqiqə",
      attendees: 150,
      status: "upcoming",
    },
    {
      title: "Startup Dünyası və Entrepreneurship",
      date: "2024-12-25",
      time: "14:00",
      speaker: "Elçin Həsənov",
      description: "Startup qurma və öz biznesinizi inkişaf etdirmə haqqında",
      duration: "90 dəqiqə",
      attendees: 200,
      status: "upcoming",
    },
    {
      title: "Beynəlxalq Karyera İmkanları",
      date: "2024-11-30",
      time: "16:00",
      speaker: "Aysel Rəhimova",
      description: "Beynəlxalq şirkətlərdə iş imkanları və tələblər",
      duration: "75 dəqiqə",
      attendees: 120,
      status: "completed",
    },
  ];

  const resources = [
    {
      title: "Karyera Məqalələri",
      description: "Karyera inkişafı haqqında müxtəlif məqalələr",
      count: "50+",
      icon: "📚",
      categories: [
        "Karyera planlaşdırması",
        "İş axtarışı",
        "Müsahibə texnikaları",
        "Peşəkar inkişaf",
      ],
    },
    {
      title: "Video Təlimlər",
      description: "Karyera inkişafı üzrə video təlimlər",
      count: "30+",
      icon: "🎥",
      categories: [
        "CV hazırlama",
        "Müsahibə hazırlığı",
        "Şəbəkə qurma",
        "Soft skills",
      ],
    },
    {
      title: "İnteraktiv Alətlər",
      description: "Karyera planlaşdırması üçün alətlər",
      count: "15+",
      icon: "🛠️",
      categories: [
        "Karyera testləri",
        "Bacarıq qiymətləndirməsi",
        "Məqsəd müəyyənləşdirmə",
        "İş axtarışı planı",
      ],
    },
    {
      title: "Şablonlar və Nümunələr",
      description: "CV, məktub və digər sənədlər üçün şablonlar",
      count: "25+",
      icon: "📄",
      categories: [
        "CV şablonları",
        "İş məktubu nümunələri",
        "Portfolio şablonları",
        "Email şablonları",
      ],
    },
  ];

  const tools = [
    {
      title: "Karyera Testi",
      description: "Karyera istiqamətinizi müəyyənləşdirin",
      icon: "🧭",
      link: "#",
      features: [
        "Peşə seçimi testi",
        "Bacarıq analizi",
        "Şəxsiyyət testi",
        "Karyera uyğunluğu",
      ],
    },
    {
      title: "CV Builder",
      description: "Peşəkar CV hazırlayın",
      icon: "📝",
      link: "#",
      features: [
        "Müasir şablonlar",
        "Açar sözlər",
        "PDF export",
        "A/B testing",
      ],
    },
    {
      title: "İş Axtarışı Tracker",
      description: "İş axtarışınızı idarə edin",
      icon: "📊",
      link: "#",
      features: [
        "Müraciət izləməsi",
        "Müsahibə planlaşdırması",
        "Statistikalar",
        "Xatırlatmalar",
      ],
    },
    {
      title: "Şəbəkə Qurma Plani",
      description: "Peşəkar şəbəkənizi qurun",
      icon: "🌐",
      link: "#",
      features: [
        "LinkedIn optimallaşdırması",
        "Tədbir planlaşdırması",
        "Əlaqə izləməsi",
        "Follow-up strategiyaları",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">
              Karyeraya Dair Onlayn Resurslar
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Karyera inkişafınız üçün lazım olan bütün resursları bir yerdə
              tapın. Onlayn kurslar, vebinarlar, məqalələr və interaktiv
              alətlərlə karyera uğurunuzu təmin edin.
            </p>
          </div>
        </div>
      </section>

      {/* Onlayn Kurslar */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Onlayn Kurslar
            </h2>
            <p className="text-xl text-gray-600">
              Karyera inkişafı üzrə pulsuz onlayn kurslar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {onlineCourses.map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{course.icon}</div>
                  <div className="text-right">
                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                      {course.level}
                    </span>
                    <p className="text-sm text-gray-600 mt-1">
                      {course.duration}
                    </p>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-3">{course.description}</p>

                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    <strong>Müəllim:</strong> {course.instructor}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Qiymət:</strong>{" "}
                    <span className="text-green-600 font-medium">
                      {course.price}
                    </span>
                  </p>
                </div>

                <ul className="space-y-2 mb-4">
                  {course.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <span className="text-indigo-500 mr-2">✓</span>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                  Kursa Qoşul
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vebinarlar */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Vebinarlar və Təlimlər
            </h2>
            <p className="text-xl text-gray-600">
              Karyera mütəxəssisləri ilə canlı vebinarlar
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {webinars.map((webinar, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {webinar.title}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <span className="mr-4">📅 {webinar.date}</span>
                      <span className="mr-4">🕒 {webinar.time}</span>
                    </div>
                    <p className="text-gray-600 mb-2">
                      <strong>Müəllim:</strong> {webinar.speaker}
                    </p>
                    <p className="text-gray-600">
                      <strong>Müddət:</strong> {webinar.duration}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      webinar.status === "upcoming"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {webinar.status === "upcoming" ? "Gələcək" : "Keçmiş"}
                  </span>
                </div>

                <p className="text-gray-700 mb-4">{webinar.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    👥 {webinar.attendees} iştirakçı
                  </span>
                  {webinar.status === "upcoming" ? (
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                      Qeydiyyatdan Keç
                    </button>
                  ) : (
                    <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                      Qeydiyyatı İzlə
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resurslar */}
      <section className="bg-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Resurslar və Materiallar
            </h2>
            <p className="text-xl text-gray-600">
              Karyera inkişafı üçün zəngin resurs bazası
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {resources.map((resource, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 text-center"
              >
                <div className="text-4xl mb-4">{resource.icon}</div>
                <div className="text-2xl font-bold text-indigo-600 mb-2">
                  {resource.count}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {resource.title}
                </h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <ul className="space-y-1 text-sm text-gray-700">
                  {resource.categories.map((category, categoryIndex) => (
                    <li key={categoryIndex}>• {category}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* İnteraktiv Alətlər */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              İnteraktiv Alətlər
            </h2>
            <p className="text-xl text-gray-600">
              Karyera inkişafınız üçün praktik alətlər
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tools.map((tool, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="text-4xl">{tool.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {tool.title}
                    </h3>
                    <p className="text-gray-600">{tool.description}</p>
                  </div>
                </div>

                <ul className="space-y-2 mb-4">
                  {tool.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <span className="text-indigo-500 mr-2">✓</span>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={tool.link}
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Aləti İstifadə Et
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Əlaqə */}
      <section className="bg-indigo-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Resurslardan İstifadə Edin
            </h2>
            <p className="text-xl mb-8">
              Karyera inkişafınız üçün bütün resurslarımızdan pulsuz istifadə
              edin
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/elaqe"
                className="bg-white text-indigo-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Dəstək Al
              </a>
              <a
                href="/karyera"
                className="bg-indigo-700 text-white border border-white px-8 py-3 rounded-lg hover:bg-indigo-800 transition-colors"
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

