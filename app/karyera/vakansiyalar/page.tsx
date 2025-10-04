import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function VakansiyalarPage() {
  const jobCategories = [
    {
      title: "İnformasiya Texnologiyaları",
      count: 25,
      icon: "💻",
      description:
        "Software Developer, Data Analyst, System Administrator və s.",
    },
    {
      title: "Biznes və İqtisadiyyat",
      count: 18,
      icon: "📊",
      description:
        "Business Analyst, Financial Advisor, Marketing Manager və s.",
    },
    {
      title: "Mühəndislik",
      count: 22,
      icon: "⚙️",
      description:
        "Mechanical Engineer, Civil Engineer, Chemical Engineer və s.",
    },
    {
      title: "Təhsil və Tədqiqat",
      count: 12,
      icon: "🎓",
      description: "Teacher, Researcher, Academic Advisor və s.",
    },
    {
      title: "Səhiyyə",
      count: 15,
      icon: "🏥",
      description: "Doctor, Nurse, Medical Technician və s.",
    },
    {
      title: "Media və Kommunikasiya",
      count: 8,
      icon: "📺",
      description: "Journalist, Content Creator, PR Specialist və s.",
    },
  ];

  const featuredJobs = [
    {
      title: "Senior Software Developer",
      company: "Microsoft Azerbaijan",
      location: "Bakı, Azərbaycan",
      type: "Full-time",
      salary: "3000-5000 AZN",
      experience: "3-5 il",
      description:
        "C# və .NET texnologiyalarında təcrübəli developer axtarırıq. Agile metodologiyaları və cloud texnologiyaları bilik tələb olunur.",
      requirements: [
        "C# və .NET Core bilik",
        "SQL Server təcrübəsi",
        "Azure cloud platforması",
        "Agile/Scrum metodologiyaları",
      ],
      benefits: [
        "Rəqabətli maaş",
        "Səhiyyə sığortası",
        "Təlim imkanları",
        "Fleksibl iş saatları",
      ],
      postedDate: "2024-12-15",
      deadline: "2025-01-15",
      status: "active",
    },
    {
      title: "Business Analyst",
      company: "PwC Azerbaijan",
      location: "Bakı, Azərbaycan",
      type: "Full-time",
      salary: "2500-4000 AZN",
      experience: "2-4 il",
      description:
        "Biznes proseslərinin analizi və təkmilləşdirilməsi üzrə işləyəcək analitik axtarırıq. Excel və SQL bilik tələb olunur.",
      requirements: [
        "Biznes analitikası təcrübəsi",
        "Excel və SQL bilik",
        "İngilis dili (Upper-Intermediate)",
        "Analitik düşüncə",
      ],
      benefits: [
        "Beynəlxalq təcrübə",
        "Karyera inkişafı",
        "Bonus sistemi",
        "İş-günü yeməyi",
      ],
      postedDate: "2024-12-12",
      deadline: "2025-01-10",
      status: "active",
    },
    {
      title: "Mechanical Engineer",
      company: "SOCAR",
      location: "Sumqayıt, Azərbaycan",
      type: "Full-time",
      salary: "2000-3500 AZN",
      experience: "1-3 il",
      description:
        "Neft-qaz sahəsində mexaniki mühəndis kimi işləyəcək mütəxəssis axtarırıq. AutoCAD və SolidWorks bilik tələb olunur.",
      requirements: [
        "Mexaniki mühəndislik təhsili",
        "AutoCAD və SolidWorks bilik",
        "İngilis dili (Intermediate)",
        "Komanda işi bacarığı",
      ],
      benefits: [
        "Stabil iş yeri",
        "Səhiyyə sığortası",
        "Tətil günləri",
        "Təlim imkanları",
      ],
      postedDate: "2024-12-10",
      deadline: "2025-01-05",
      status: "active",
    },
  ];

  const internshipOpportunities = [
    {
      title: "IT Stajyer",
      company: "Azercell",
      duration: "3 ay",
      type: "Paid",
      description: "Software development və testing sahəsində təcrübə imkanı",
      requirements: [
        "İnformasiya texnologiyaları təhsili",
        "Java və ya Python bilik",
        "İngilis dili bilik",
      ],
    },
    {
      title: "Marketing Stajyer",
      company: "Kapital Bank",
      duration: "2 ay",
      type: "Paid",
      description: "Digital marketing və sosial media idarəetməsi təcrübəsi",
      requirements: [
        "Marketing və ya əlaqəli sahə təhsili",
        "Sosial media bilik",
        "Yaradıcı düşüncə",
      ],
    },
    {
      title: "HR Stajyer",
      company: "Bakcell",
      duration: "4 ay",
      type: "Unpaid",
      description: "İnsan resursları və rekrutment sahəsində təcrübə",
      requirements: [
        "Psixologiya və ya əlaqəli sahə təhsili",
        "Kommunikasiya bacarığı",
        "Microsoft Office bilik",
      ],
    },
  ];

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

  const tips = [
    {
      title: "CV Optimallaşdırması",
      description: "CV-nizi hər vakansiya üçün xüsusi olaraq hazırlayın",
    },
    {
      title: "Açar Sözlər",
      description:
        "İş elanlarında istifadə olunan açar sözləri CV-nizdə istifadə edin",
    },
    {
      title: "Şəbəkə Qurma",
      description: "LinkedIn-də aktiv olun və peşəkar şəbəkə qurun",
    },
    {
      title: "Müsahibə Hazırlığı",
      description: "Şirkət haqqında araşdırma aparın və sualları hazırlayın",
    },
  ];

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

      {/* İş Kateqoriyaları */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              İş Kateqoriyaları
            </h2>
            <p className="text-xl text-gray-600">
              İxtisasınıza uyğun iş sahələrini kəşf edin
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobCategories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{category.icon}</div>
                  <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">
                    {category.count} vakansiya
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600">{category.description}</p>
              </div>
            ))}
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

          <div className="space-y-8">
            {featuredJobs.map((job, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                      {job.title}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <span className="mr-4">🏢 {job.company}</span>
                      <span className="mr-4">📍 {job.location}</span>
                      <span className="mr-4">⏰ {job.type}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <span className="mr-4">💰 {job.salary}</span>
                      <span className="mr-4">👨‍💼 {job.experience}</span>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {job.status === "active" ? "Aktiv" : "Bağlı"}
                  </span>
                </div>

                <p className="text-gray-700 mb-4">{job.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Tələblər:
                    </h4>
                    <ul className="space-y-1">
                      {job.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-start">
                          <span className="text-teal-500 mr-2">•</span>
                          <span className="text-sm text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Üstünlüklər:
                    </h4>
                    <ul className="space-y-1">
                      {job.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start">
                          <span className="text-teal-500 mr-2">✓</span>
                          <span className="text-sm text-gray-700">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <span>📅 Yerləşdirilib: {job.postedDate}</span>
                    <span className="ml-4">⏰ Son tarix: {job.deadline}</span>
                  </div>
                  <button className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors">
                    Müraciət Et
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Staj İmkanları */}
      <section className="bg-teal-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Staj İmkanları
            </h2>
            <p className="text-xl text-gray-600">
              Təcrübə qazanmaq üçün staj imkanları
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {internshipOpportunities.map((internship, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {internship.title}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      internship.type === "Paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {internship.type}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-gray-600 mb-2">
                    <strong>Şirkət:</strong> {internship.company}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong>Müddət:</strong> {internship.duration}
                  </p>
                </div>

                <p className="text-gray-700 mb-4">{internship.description}</p>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Tələblər:</h4>
                  <ul className="space-y-1">
                    {internship.requirements.map((req, reqIndex) => (
                      <li key={reqIndex} className="flex items-start">
                        <span className="text-teal-500 mr-2">•</span>
                        <span className="text-sm text-gray-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors">
                  Müraciət Et
                </button>
              </div>
            ))}
          </div>
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

      {/* Məsləhətlər */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              İş Axtarışı Məsləhətləri
            </h2>
            <p className="text-xl text-gray-600">
              Uğurlu iş müraciəti üçün faydalı məsləhətlər
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tips.map((tip, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-6 text-center"
              >
                <div className="w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {tip.title}
                </h3>
                <p className="text-gray-600">{tip.description}</p>
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

