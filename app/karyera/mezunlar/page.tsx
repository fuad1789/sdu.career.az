import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function MezunlarPage() {
  const successStories = [
    {
      name: "Leyla Məmmədova",
      graduationYear: "2018",
      degree: "İnformasiya Texnologiyaları",
      currentPosition: "Senior Software Engineer",
      company: "Microsoft",
      location: "Seattle, USA",
      story:
        "SDU-dan məzun olduqdan sonra Microsoft-da işləməyə başladım. Universitetdə əldə etdiyim texniki biliklər və soft skills mənə böyük kömək oldu.",
      achievements: [
        "Microsoft Azure Expert",
        "3 patent sahibi",
        "Tech conference speaker",
      ],
      image: "👩‍💻",
      linkedin: "#",
    },
    {
      name: "Elçin Həsənov",
      graduationYear: "2016",
      degree: "Biznes İdarəetməsi",
      currentPosition: "CEO",
      company: "TechStart Azerbaijan",
      location: "Bakı, Azərbaycan",
      story:
        "SDU-da təhsil aldığım dövrdə startup ideyalarım formalaşdı. İndi öz şirkətim var və 50+ işçi ilə işləyirik.",
      achievements: [
        "Forbes 30 Under 30",
        "Startup of the Year 2023",
        "Angel Investor",
      ],
      image: "👨‍💼",
      linkedin: "#",
    },
    {
      name: "Aysel Rəhimova",
      graduationYear: "2019",
      degree: "Kimya Mühəndisliyi",
      currentPosition: "Research Scientist",
      company: "SOCAR",
      location: "Sumqayıt, Azərbaycan",
      story:
        "SDU-da əldə etdiyim təcrübə və biliklər sayəsində SOCAR-da araşdırma elmi işçisi kimi işləyirəm. Yeni texnologiyaların inkişafında iştirak edirəm.",
      achievements: ["5 elmi məqalə", "Innovation Award 2023", "Patent sahibi"],
      image: "👩‍🔬",
      linkedin: "#",
    },
    {
      name: "Rəşad Əliyev",
      graduationYear: "2017",
      degree: "İqtisadiyyat",
      currentPosition: "Investment Banker",
      company: "Goldman Sachs",
      location: "London, UK",
      story:
        "SDU-da iqtisadiyyat təhsili aldıqdan sonra London School of Economics-də magistr təhsili aldım. İndi Goldman Sachs-da investment banker kimi işləyirəm.",
      achievements: [
        "CFA Charterholder",
        "Deal of the Year 2023",
        "Mentor to 20+ students",
      ],
      image: "👨‍💼",
      linkedin: "#",
    },
  ];

  const alumniNetwork = [
    {
      title: "Məzun Şəbəkəsi",
      description: "Dünya üzrə 5000+ məzunumuzla əlaqə qurun",
      count: "5000+",
      icon: "🌐",
    },
    {
      title: "Mentorluq Proqramı",
      description: "Təcrübəli məzunlardan mentorluq alın",
      count: "200+",
      icon: "👥",
    },
    {
      title: "Karyera Dəstəyi",
      description: "Məzunlar tərəfindən təklif edilən iş imkanları",
      count: "150+",
      icon: "💼",
    },
    {
      title: "Tədbirlər",
      description: "İllik məzun tədbirləri və görüşlər",
      count: "50+",
      icon: "🎉",
    },
  ];

  const mentorshipProgram = [
    {
      title: "Fərdi Mentorluq",
      description: "Bir-bir mentorluq sessiyaları",
      duration: "6 ay",
      features: [
        "Həftəlik görüşlər",
        "Karyera məsləhəti",
        "Şəbəkə qurma dəstəyi",
        "CV və müsahibə hazırlığı",
      ],
    },
    {
      title: "Qrup Mentorluq",
      description: "Kiçik qruplarda mentorluq",
      duration: "3 ay",
      features: [
        "Aylıq qrup sessiyaları",
        "Təcrübə paylaşımı",
        "Birgə layihələr",
        "Şəbəkə qurma",
      ],
    },
    {
      title: "Onlayn Mentorluq",
      description: "Virtual mentorluq xidməti",
      duration: "4 ay",
      features: [
        "Video konfrans görüşləri",
        "E-mail dəstəyi",
        "Onlayn resurslar",
        "Fleksibl vaxt",
      ],
    },
  ];

  const achievements = [
    {
      title: "Beynəlxalq Uğurlar",
      description: "Məzunlarımız dünya şirkətlərində uğur qazanırlar",
      examples: ["Microsoft", "Google", "Amazon", "Goldman Sachs"],
    },
    {
      title: "Entrepreneurship",
      description: "Məzunlarımız öz bizneslərini qururlar",
      examples: ["TechStart", "Innovation Hub", "GreenTech", "FinTech"],
    },
    {
      title: "Elmi Tədqiqatlar",
      description: "Məzunlarımız elmi sahədə uğur qazanırlar",
      examples: ["Patent sahibləri", "Elmi məqalələr", "Konfrans təqdimatları"],
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">
              Məzunlarımız və Uğur Hekayələri
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              SDU məzunlarının karyera uğurları və təcrübələri. Dünya üzrə
              fərqli sahələrdə uğur qazanan məzunlarımızın hekayələrini oxuyun
              və ilham alın.
            </p>
          </div>
        </div>
      </section>

      {/* Məzun Şəbəkəsi Statistikaları */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Məzun Şəbəkəmiz
            </h2>
            <p className="text-xl text-gray-600">
              Güclü məzun şəbəkəmizin göstəriciləri
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {alumniNetwork.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 text-center"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="text-3xl font-bold text-red-600 mb-2">
                  {item.count}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Uğur Hekayələri */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Uğur Hekayələri
            </h2>
            <p className="text-xl text-gray-600">
              Məzunlarımızın karyera yolunda qazandıqları uğurlar
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="text-6xl">{story.image}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {story.name}
                    </h3>
                    <p className="text-red-600 font-medium mb-1">
                      {story.currentPosition} - {story.company}
                    </p>
                    <p className="text-gray-600 text-sm mb-1">
                      {story.degree} ({story.graduationYear})
                    </p>
                    <p className="text-gray-600 text-sm">📍 {story.location}</p>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{story.story}</p>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Uğurlar:</h4>
                  <ul className="space-y-1">
                    {story.achievements.map((achievement, achievementIndex) => (
                      <li key={achievementIndex} className="flex items-start">
                        <span className="text-red-500 mr-2">🏆</span>
                        <span className="text-sm text-gray-700">
                          {achievement}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={story.linkedin}
                  className="inline-flex items-center text-red-600 hover:text-red-700 font-medium"
                >
                  LinkedIn-də bax
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

      {/* Mentorluq Proqramı */}
      <section className="bg-red-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Mentorluq Proqramı
            </h2>
            <p className="text-xl text-gray-600">
              Təcrübəli məzunlardan mentorluq alın
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mentorshipProgram.map((program, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 mb-2">{program.description}</p>
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                    {program.duration}
                  </span>
                </div>

                <ul className="space-y-2">
                  {program.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <span className="text-red-500 mr-2">✓</span>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Uğur Sahələri */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Məzunlarımızın Uğur Sahələri
            </h2>
            <p className="text-xl text-gray-600">
              Məzunlarımızın fərqli sahələrdə qazandıqları uğurlar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {achievement.title}
                </h3>
                <p className="text-gray-600 mb-4">{achievement.description}</p>
                <div className="space-y-2">
                  {achievement.examples.map((example, exampleIndex) => (
                    <div key={exampleIndex} className="flex items-center">
                      <span className="text-red-500 mr-2">🎯</span>
                      <span className="text-sm text-gray-700">{example}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qoşulma */}
      <section className="bg-red-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Məzun Şəbəkəmizə Qoşulun
            </h2>
            <p className="text-xl mb-8">
              Məzun şəbəkəmizə qoşulun və karyera uğurunuzu paylaşın
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/elaqe"
                className="bg-white text-red-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Məzun Olaraq Qeydiyyat
              </a>
              <a
                href="/karyera"
                className="bg-red-700 text-white border border-white px-8 py-3 rounded-lg hover:bg-red-800 transition-colors"
              >
                Mentorluq Proqramı
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

