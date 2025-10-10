import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function PesekarInkisafPage() {
  const developmentAreas = [
    {
      title: "Texniki Bacarıqlar",
      description: "Müasir texnologiyalar və proqramlaşdırma dilləri",
      features: [
        "Web Development (React, Vue, Angular)",
        "Mobile Development (iOS, Android)",
        "Backend Development (Node.js, Python, Java)",
        "Database Management (SQL, NoSQL)",
        "Cloud Technologies (AWS, Azure, GCP)",
        "DevOps və CI/CD",
      ],
      icon: "💻",
      color: "bg-blue-500",
    },
    {
      title: "Soft Skills",
      description: "Peşəkar kommunikasiya və liderlik bacarıqları",
      features: [
        "Kommunikasiya və təqdimat bacarıqları",
        "Komanda işi və əməkdaşlıq",
        "Liderlik və idarəetmə",
        "Problemin həlli və analitik düşüncə",
        "Zaman idarəetməsi və prioritetləşdirmə",
        "Emotional Intelligence",
      ],
      icon: "🤝",
      color: "bg-green-500",
    },
    {
      title: "İnnovasiya və Yaradıcılıq",
      description: "Yaradıcı düşüncə və innovativ həllər",
      features: [
        "Design Thinking metodologiyası",
        "UX/UI Design prinsipləri",
        "Startup və entrepreneurship",
        "İnnovasiya idarəetməsi",
        "Yaradıcı problem həlli",
        "Futuristik texnologiyalar",
      ],
      icon: "💡",
      color: "bg-purple-500",
    },
    {
      title: "Biznes və İqtisadiyyat",
      description: "Biznes analitikası və iqtisadi düşüncə",
      features: [
        "Biznes analitikası və data science",
        "Marketinq strategiyaları",
        "Maliyyə və investisiya",
        "Proyekt idarəetməsi",
        "Strateji planlaşdırma",
        "İnternational business",
      ],
      icon: "📊",
      color: "bg-orange-500",
    },
    {
      title: "Dil Bacarıqları",
      description: "Beynəlxalq kommunikasiya üçün dil inkişafı",
      features: [
        "İngilis dili (IELTS, TOEFL hazırlığı)",
        "Alman dili (Goethe sertifikatı)",
        "Fransız dili (DELF, DALF)",
        "Rus dili və digər dillər",
        "Peşəkar terminologiya",
        "Cross-cultural communication",
      ],
      icon: "🌍",
      color: "bg-teal-500",
    },
    {
      title: "Sertifikatlaşma",
      description: "Peşəkar sertifikatlar və lisenziyalar",
      features: [
        "IT sertifikatları (Microsoft, Google, AWS)",
        "Proyekt idarəetməsi (PMP, PRINCE2)",
        "Dil sertifikatları",
        "Peşəkar lisenziyalar",
        "Beynəlxalq standartlar",
        "Continuing education",
      ],
      icon: "🏆",
      color: "bg-red-500",
    },
  ];

  const developmentPrograms = [
    {
      title: "İntensiv Bootcamp Proqramları",
      duration: "3-6 ay",
      format: "Tam vaxt",
      description: "Sürətli peşəkar inkişaf üçün intensiv proqramlar",
      features: [
        "Gündə 8 saat praktik təlim",
        "Real layihələr üzərində iş",
        "Mentorluq və dəstək",
        "İş yerləşdirmə dəstəyi",
      ],
      icon: "⚡",
    },
    {
      title: "Part-time Təlim Proqramları",
      duration: "6-12 ay",
      format: "Həftəsonu",
      description: "İşləyənlər üçün rahat təlim formatı",
      features: [
        "Həftəsonu təlimlər",
        "Onlayn və offline format",
        "Fərdi temp",
        "İş yerində tətbiq",
      ],
      icon: "📅",
    },
    {
      title: "Onlayn Kurslar",
      duration: "1-3 ay",
      format: "Öz tempində",
      description: "Evdən rahat öyrənmə imkanı",
      features: [
        "Video təlimlər",
        "İnteraktiv tapşırıqlar",
        "Forum və dəstək",
        "Sertifikat verilməsi",
      ],
      icon: "💻",
    },
    {
      title: "Mentorluq Proqramları",
      duration: "3-12 ay",
      format: "Fərdi",
      description: "Təcrübəli mütəxəssislərdən fərdi dəstək",
      features: [
        "1-1 mentorluq sessiyaları",
        "Karyera məsləhəti",
        "Şəbəkə qurma dəstəyi",
        "Peşəkar inkişaf planı",
      ],
      icon: "👨‍🏫",
    },
  ];

  const successStories = [
    {
      name: "Leyla Məmmədova",
      position: "Senior Frontend Developer",
      company: "TechCorp Azerbaijan",
      story:
        "Peşəkar inkişaf proqramımız sayəsində 6 ay ərzində Junior-dan Senior developerə yüksəldim.",
      image: "👩‍💻",
    },
    {
      name: "Elçin Həsənov",
      position: "Product Manager",
      company: "StartupHub",
      story:
        "Soft skills təlimləri və mentorluq proqramı ilə öz startupımı qurmağa müvəffəq oldum.",
      image: "👨‍💼",
    },
    {
      name: "Aysel Rəhimova",
      position: "Data Scientist",
      company: "Bank of Azerbaijan",
      story:
        "Data Science bootcamp proqramından sonra maliyyə sektorunda yüksək vəzifəyə təyin edildim.",
      image: "👩‍🔬",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Peşəkar İnkişaf</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Karyera uğurunuz üçün lazım olan bacarıqları inkişaf etdirin.
              Müasir təlim proqramları və mentorluq sistemi ilə peşəkar
              inkişafınızı sürətləndirin.
            </p>
          </div>
        </div>
      </section>

      {/* İnkişaf Sahələri */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              İnkişaf Sahələri
            </h2>
            <p className="text-xl text-gray-600">
              Müxtəlif sahələrdə peşəkar inkişaf imkanları
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {developmentAreas.map((area, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`w-12 h-12 ${area.color} rounded-lg flex items-center justify-center text-2xl text-white mr-4`}
                  >
                    {area.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {area.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">{area.description}</p>
                <ul className="space-y-2">
                  {area.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Təlim Proqramları */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Təlim Proqramları
            </h2>
            <p className="text-xl text-gray-600">
              Sizin ehtiyaclarınıza uyğun təlim formatları
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {developmentPrograms.map((program, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-start mb-4">
                  <div className="text-3xl mr-4">{program.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {program.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <span className="mr-4">⏱️ {program.duration}</span>
                      <span>📋 {program.format}</span>
                    </div>
                    <p className="text-gray-700 mb-4">{program.description}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {program.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <span className="text-indigo-500 mr-2">•</span>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Uğur Hekayələri */}
      <section className="bg-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Uğur Hekayələri
            </h2>
            <p className="text-xl text-gray-600">
              Proqramlarımızdan istifadə edən tələbələrimizin uğurları
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 text-center"
              >
                <div className="text-4xl mb-4">{story.image}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {story.name}
                </h3>
                <p className="text-indigo-600 font-medium mb-2">
                  {story.position}
                </p>
                <p className="text-gray-600 text-sm mb-4">{story.company}</p>
                <p className="text-gray-700 text-sm italic">"{story.story}"</p>
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
              Peşəkar İnkişaf Proqramlarımıza Qoşulun
            </h2>
            <p className="text-xl mb-8">
              Karyera uğurunuz üçün lazım olan bacarıqları inkişaf etdirin
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/elaqe"
                className="bg-white text-indigo-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Müraciət Et
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
