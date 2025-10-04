import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function KaryeraXidmetleriPage() {
  const services = [
    {
      title: "CV Hazırlama",
      description: "Peşəkar CV hazırlama xidməti və məsləhəti",
      features: [
        "Müasir CV formatları",
        "Açar sözlər və SEO optimallaşdırması",
        "Fərdi təcrübə və bacarıqların vurğulanması",
        "Peşəkar dizayn və formatlaşdırma",
      ],
      icon: "📄",
    },
    {
      title: "İş Axtarışı Dəstəyi",
      description: "İş axtarışı strategiyası və dəstək xidmətləri",
      features: [
        "İş axtarışı strategiyasının müəyyənləşdirilməsi",
        "İş elanlarının analizi və seçimi",
        "Şəbəkə qurma strategiyaları",
        "İş axtarışı planının hazırlanması",
      ],
      icon: "🔍",
    },
    {
      title: "Müsahibə Hazırlığı",
      description: "İş müsahibələrinə hazırlıq və təlim",
      features: [
        "Müsahibə növləri və formatları",
        "Tipik suallar və cavablar",
        "Bədən dili və təqdimat bacarıqları",
        "Mock müsahibələr və təcrübə",
      ],
      icon: "💬",
    },
    {
      title: "Karyera Məsləhəti",
      description: "Fərdi karyera planlaşdırması və məsləhət",
      features: [
        "Karyera yol xəritəsinin hazırlanması",
        "Məqsəd müəyyənləşdirmə",
        "Bacarıq analizi və inkişaf planı",
        "Peşə seçimi və istiqamətləndirmə",
      ],
      icon: "🎯",
    },
    {
      title: "Şəbəkə Qurma",
      description: "Peşəkar şəbəkə qurma və əlaqələrin inkişafı",
      features: [
        "LinkedIn profil optimallaşdırması",
        "Peşəkar şəbəkə strategiyaları",
        "Tədbirlərə qatılım və networking",
        "Mentorluq və əlaqə qurma",
      ],
      icon: "🌐",
    },
    {
      title: "İş Məktubu Hazırlama",
      description: "Peşəkar iş məktubu və ərizə hazırlama",
      features: [
        "Məktub formatları və struktur",
        "Şirkətə xüsusi məzmun",
        "Açar sözlər və vurğular",
        "Peşəkar ton və üslub",
      ],
      icon: "✉️",
    },
  ];

  const processSteps = [
    {
      step: "1",
      title: "Müraciət",
      description:
        "Karyera xidmətlərimizə müraciət edin və ehtiyaclarınızı bildirin",
    },
    {
      step: "2",
      title: "Görüş",
      description: "Karyera məsləhətçimizlə fərdi görüş təşkil edin",
    },
    {
      step: "3",
      title: "Planlaşdırma",
      description: "Sizin üçün fərdi karyera planı hazırlayaq",
    },
    {
      step: "4",
      title: "Tətbiq",
      description: "Planı tətbiq edərək karyera məqsədlərinizə çatın",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Karyera Xidmətləri</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Tələbələrin karyera planlaşdırmasına məsləhət və istiqamət
              verərək, onları iş dünyasına hazırlayırıq. Peşəkar karyera
              xidmətlərimizlə uğurlu karyera yolunuzu qurun.
            </p>
          </div>
        </div>
      </section>

      {/* Xidmətlər */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Xidmətlərimiz
            </h2>
            <p className="text-xl text-gray-600">
              Karyera uğurunuz üçün lazım olan bütün xidmətləri təqdim edirik
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
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

      {/* Proses */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Xidmət Prosesi
            </h2>
            <p className="text-xl text-gray-600">
              Karyera xidmətlərimizdən necə istifadə edəcəyinizi öyrənin
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
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
      <section className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Karyera Xidmətlərimizdən İstifadə Edin
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Karyera məsləhətçilərimizlə əlaqə saxlayın və karyera yolunuzu
              planlaşdırın
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/elaqe"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Əlaqə Saxla
              </a>
              <a
                href="/karyera"
                className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
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

