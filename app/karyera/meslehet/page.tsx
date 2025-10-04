import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function KaryeraMeslehetiPage() {
  const counselingTypes = [
    {
      title: "Fərdi Məsləhət",
      description: "Bir-bir görüşlərlə fərdi karyera məsləhəti",
      features: [
        "Karyera yol xəritəsinin hazırlanması",
        "Məqsəd müəyyənləşdirmə və prioritetlər",
        "Bacarıq analizi və inkişaf planı",
        "Peşə seçimi və istiqamətləndirmə",
      ],
      icon: "👤",
      duration: "45-60 dəqiqə",
    },
    {
      title: "Qrup Məsləhəti",
      description: "Kiçik qruplarda karyera məsləhəti sessiyaları",
      features: [
        "Qrup diskussiyaları və təcrübə paylaşımı",
        "Karyera strategiyalarının müzakirəsi",
        "Peşəkar şəbəkə qurma",
        "Birgə məqsəd müəyyənləşdirmə",
      ],
      icon: "👥",
      duration: "90-120 dəqiqə",
    },
    {
      title: "Onlayn Məsləhət",
      description: "Virtual mühitdə karyera məsləhəti xidməti",
      features: [
        "Video konfrans vasitəsilə görüşlər",
        "Onlayn resurslar və materiallar",
        "E-mail dəstəyi və məsləhət",
        "Virtual təlimlər və vebinarlar",
      ],
      icon: "💻",
      duration: "30-45 dəqiqə",
    },
    {
      title: "Krizis Məsləhəti",
      description: "Karyera böhranları və çətinliklər üçün dəstək",
      features: [
        "İş itkisi və keçid dövrləri",
        "Karyera dəyişikliyi dəstəyi",
        "Stress idarəetməsi",
        "Yeni imkanların axtarışı",
      ],
      icon: "🆘",
      duration: "60-90 dəqiqə",
    },
  ];

  const counselors = [
    {
      name: "Dr. Leyla Məmmədova",
      title: "Baş Karyera Məsləhətçisi",
      specialization: "İnformasiya Texnologiyaları",
      experience: "8 il təcrübə",
      education: "Psixologiya Doktoru",
      image: "👩‍💼",
    },
    {
      name: "Elçin Həsənov",
      title: "Karyera Məsləhətçisi",
      specialization: "Biznes və İqtisadiyyat",
      experience: "5 il təcrübə",
      education: "MBA, İnsan Resursları",
      image: "👨‍💼",
    },
    {
      name: "Aysel Rəhimova",
      title: "Karyera Məsləhətçisi",
      specialization: "Mühəndislik və Texnologiya",
      experience: "6 il təcrübə",
      education: "Psixologiya Magistri",
      image: "👩‍🔬",
    },
  ];

  const benefits = [
    {
      title: "Fərdi Yanaşma",
      description: "Hər tələbə üçün fərdi karyera planı hazırlanır",
    },
    {
      title: "Peşəkar Dəstək",
      description: "Təcrübəli məsləhətçilər tərəfindən dəstək",
    },
    {
      title: "Müasir Metodlar",
      description: "Ən son karyera inkişaf metodlarından istifadə",
    },
    {
      title: "Davamlı Dəstək",
      description: "Karyera yolunda davamlı dəstək və müşayiət",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Karyera Məsləhəti</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Təcrübəli karyera məsləhətçilərimizlə birlikdə karyera yolunuzu
              planlaşdırın və məqsədlərinizə çatın. Fərdi və qrup məsləhət
              xidmətlərimizlə karyera uğurunuzu təmin edin.
            </p>
          </div>
        </div>
      </section>

      {/* Məsləhət Növləri */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Məsləhət Növləri
            </h2>
            <p className="text-xl text-gray-600">
              Ehtiyaclarınıza uyğun məsləhət xidməti seçin
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {counselingTypes.map((type, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{type.icon}</div>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    {type.duration}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {type.title}
                </h3>
                <p className="text-gray-600 mb-4">{type.description}</p>
                <ul className="space-y-2">
                  {type.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <span className="text-purple-500 mr-2">✓</span>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Məsləhətçilər */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Məsləhətçilərimiz
            </h2>
            <p className="text-xl text-gray-600">
              Təcrübəli və peşəkar karyera məsləhətçilərimizlə tanış olun
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {counselors.map((counselor, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-6 text-center"
              >
                <div className="text-6xl mb-4">{counselor.image}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {counselor.name}
                </h3>
                <p className="text-purple-600 font-medium mb-2">
                  {counselor.title}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>İxtisas:</strong> {counselor.specialization}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Təcrübə:</strong> {counselor.experience}
                </p>
                <p className="text-gray-600">
                  <strong>Təhsil:</strong> {counselor.education}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Üstünlüklər */}
      <section className="bg-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Niyə Bizim Məsləhət Xidmətimizi Seçməlisiniz?
            </h2>
            <p className="text-xl text-gray-600">
              Karyera məsləhəti xidmətlərimizin üstünlükləri
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
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

      {/* Randevu */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Məsləhət Randevusu Alın
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Karyera məsləhətçilərimizlə görüş təşkil etmək üçün bizimlə əlaqə
              saxlayın
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/elaqe"
                className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Randevu Al
              </a>
              <a
                href="/karyera"
                className="bg-white text-purple-600 border border-purple-600 px-8 py-3 rounded-lg hover:bg-purple-50 transition-colors"
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

