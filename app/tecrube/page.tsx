import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import TecrubeCard from "@/components/TecrubeCard";

export default function TecrubePage() {
  const tecrubeTypes = [
    {
      title: "Bakalavr Təcrübəsi",
      description:
        "Bakalavr pilləsində təhsil alan tələbələr üçün istehsalat təcrübəsi imkanları",
      href: "/tecrube/bakalavr",
      features: [
        "21 kredit təcrübə proqramı",
        "8-ci semestrdə təcrübə imkanı",
        "Müəssisələrlə birbaşa əlaqə",
        "Praktiki bacarıq qazanma",
      ],
      icon: "🎓",
    },
    {
      title: "Magistr Təcrübəsi",
      description:
        "Magistr tələbələri üçün xüsusi təcrübə proqramları və imkanları",
      href: "/tecrube/magistr",
      features: [
        "Elmi-tədqiqat təcrübəsi",
        "Beynəlxalq müəssisələrlə əməkdaşlıq",
        "Mentorluq sistemi",
        "Karyera planlaşdırması",
      ],
      icon: "🔬",
    },
    {
      title: "Müəssisə Təcrübəsi",
      description:
        "Müxtəlif sahələrdə fəaliyyət göstərən müəssisələrdə təcrübə imkanları",
      href: "/tecrube/muessise",
      features: [
        "Yerli və beynəlxalq şirkətlər",
        "Dövlət müəssisələri",
        "Startup və innovasiya şirkətləri",
        "İxtisaslaşmış təcrübə",
      ],
      icon: "🏢",
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
              Təcrübə İmkanları
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tələbələrimizə müxtəlif sahələrdə praktiki təcrübə qazanma imkanı
              təqdim edirik. İstehsalat təcrübəsi, elmi-tədqiqat fəaliyyəti və
              müəssisələrdə təcrübə proqramları.
            </p>
          </div>
        </div>
      </section>

      {/* Təcrübə Növləri */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tecrubeTypes.map((tecrube, index) => (
              <TecrubeCard key={index} {...tecrube} />
            ))}
          </div>
        </div>
      </section>

      {/* Məlumat Bölməsi */}
      <section className="bg-sdu-light-blue py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-6">
              Təcrübə Haqqında Məlumat
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="bg-white bg-opacity-10 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Təcrübə Qaydaları
                </h3>
                <ul className="space-y-2">
                  <li>• Təcrübə müəyyən edilmiş vaxtda başlayır</li>
                  <li>
                    • Tələbə nəzərdə tutulmuş iş saatında təcrübə yerində
                    olmalıdır
                  </li>
                  <li>
                    • Təcrübəyə ayrılan müddətin 25%-dən artığında iştirak
                    etməməyə icazə verilmir
                  </li>
                  <li>
                    • Təcrübəni uğurla başa çatdırmayan tələbə növbəti tədris
                    ilində təcrübəyə buraxılır
                  </li>
                </ul>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Təcrübə İmkanları
                </h3>
                <ul className="space-y-2">
                  <li>• Yerli və beynəlxalq müəssisələrlə əməkdaşlıq</li>
                  <li>• Müxtəlif sahələrdə təcrübə imkanları</li>
                  <li>• Mentorluq və dəstək sistemi</li>
                  <li>• Karyera planlaşdırması və məsləhət xidmətləri</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

