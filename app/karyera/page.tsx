import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import KaryeraCard from "@/components/KaryeraCard";

export default function KaryeraPage() {
  const karyeraServices = [
    {
      title: "Peşəkar İnkişaf",
      description:
        "Tələbələrin peşəkar bacarıqlarının inkişafı üçün xidmətlər və proqramlar",
      href: "/karyera/pesekar-inkisaf",
      features: [
        "Soft skills təlimləri",
        "Liderlik bacarıqları",
        "Kommunikasiya təlimləri",
        "Komanda işi bacarıqları",
      ],
      icon: "🚀",
      color: "bg-blue-500",
    },
    {
      title: "Karyera Xidmətləri",
      description: "Karyera planlaşdırması və iş axtarışı üçün xidmətlər",
      href: "/karyera/xidmetler",
      features: [
        "CV hazırlama",
        "İş axtarışı dəstəyi",
        "Müsahibə hazırlığı",
        "Karyera məsləhəti",
      ],
      icon: "💼",
      color: "bg-green-500",
    },
    {
      title: "Karyera Məsləhəti",
      description: "Fərdi karyera məsləhəti və istiqamətləndirmə xidmətləri",
      href: "/karyera/meslehet",
      features: [
        "Fərdi məsləhət sessiyaları",
        "Karyera yol xəritəsi",
        "Məqsəd müəyyənləşdirmə",
        "İnkişaf planı",
      ],
      icon: "🎯",
      color: "bg-purple-500",
    },
    {
      title: "Karyera Günləri",
      description:
        "Müəssisələrlə görüş və karyera imkanlarının təqdim edilməsi",
      href: "/karyera/gunler",
      features: [
        "Müəssisə nümayəndələri ilə görüş",
        "Vakansiya təqdimatları",
        "Şəbəkə qurma imkanları",
        "İş təcrübəsi paylaşımı",
      ],
      icon: "📅",
      color: "bg-orange-500",
    },
    {
      title: "Məzunlarımız və Uğur Hekayələri",
      description: "Uğurlu məzunlarımızın karyera hekayələri və təcrübələri",
      href: "/karyera/mezunlar",
      features: [
        "Uğur hekayələri",
        "Məzun şəbəkəsi",
        "Mentorluq imkanları",
        "Təcrübə paylaşımı",
      ],
      icon: "🏆",
      color: "bg-red-500",
    },
    {
      title: "Karyeraya Dair Onlayn Resurslar",
      description: "Karyera inkişafı üçün onlayn resurslar və materiallar",
      href: "/karyera/resurslar",
      features: [
        "Onlayn kurslar",
        "Vebinar və təlimlər",
        "Karyera məqalələri",
        "İnteraktiv materiallar",
      ],
      icon: "💻",
      color: "bg-indigo-500",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />

      {/* Hero Section */}
      <section className="bg-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
              Karyera İmkanları
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Tələbələrin karyera planlaşdırmasına məsləhət və istiqamət
              verərək, onları iş dünyasına hazırlayırıq. Məzunlarla əlaqəni
              gücləndirərək, yeni imkanlar yaradırıq.
            </p>
          </div>
        </div>
      </section>

      {/* Karyera Xidmətləri */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {karyeraServices.map((service, index) => (
              <KaryeraCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Mərkəz Haqqında */}
      <section className="bg-sdu-light-blue py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
              Karyera və Məzunlarla İş Mərkəzi
            </h2>
            <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-4xl mx-auto px-4">
              Sumqayıt Dövlət Universitetinin Karyera və Məzunlarla İş Mərkəzi
              universitetin struktur bölməsidir və ali təhsilin ikipilləli
              strukturunda magistrantların və bakalavrların ixtisasyönümlü
              təcrübəsini təşkil etməli, məzunlara işə düzəlməkdə dəstək
              göstərməlidir.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
