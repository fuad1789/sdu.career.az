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
    {
      title: "Vakansiyalar",
      description: "Müxtəlif sahələrdə iş imkanları və vakansiyalar",
      href: "/karyera/vakansiyalar",
      features: [
        "Yerli və beynəlxalq vakansiyalar",
        "İxtisaslaşmış iş imkanları",
        "Staj və təcrübə imkanları",
        "Karyera imkanları",
      ],
      icon: "🔍",
      color: "bg-teal-500",
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
              Karyera İmkanları
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tələbələrin karyera planlaşdırmasına məsləhət və istiqamət
              verərək, onları iş dünyasına hazırlayırıq. Məzunlarla əlaqəni
              gücləndirərək, yeni imkanlar yaradırıq.
            </p>
          </div>
        </div>
      </section>

      {/* Karyera Xidmətləri */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {karyeraServices.map((service, index) => (
              <KaryeraCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Mərkəz Haqqında */}
      <section className="bg-sdu-light-blue py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-6">
              Karyera və Məzunlarla İş Mərkəzi
            </h2>
            <p className="text-xl mb-8 max-w-4xl mx-auto">
              Sumqayıt Dövlət Universitetinin Karyera və Məzunlarla İş Mərkəzi
              universitetin struktur bölməsidir və ali təhsilin ikipilləli
              strukturunda magistrantların və bakalavrların ixtisasyönümlü
              təcrübəsini təşkil etməli, məzunlara işə düzəlməkdə dəstək
              göstərməlidir.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white bg-opacity-10 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Məqsəd</h3>
                <p className="text-blue-100">
                  Gənclərin bilik, praktiki bacarıq və vərdişlərinin
                  artırılması, onların məşğulluq problemlərinin həll edilməsi
                  üzrə kompleks təşkilati, texniki, informasiya, məsləhət,
                  tədris və maarifləndirmə tədbirlərinin həyata keçirilməsidir.
                </p>
              </div>

              <div className="bg-white bg-opacity-10 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Fəaliyyət</h3>
                <p className="text-blue-100">
                  Yerli və beynəlxalq şirkətlərlə, dövlət müəssisələri ilə
                  əməkdaşlıq etməkdən ibarətdir. Universitetə sənaye
                  müəsissələrindən və uğurlu SDU məzunlarından nümayəndələrin
                  dəvət edilməsi, tələbələrlə müxtəlif görüşlərin təşkil
                  olunması istiqaməti Mərkəzin əsas fəaliyyətlərindən sayılır.
                </p>
              </div>

              <div className="bg-white bg-opacity-10 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Dəstək</h3>
                <p className="text-blue-100">
                  Təhsilalanların qısa və uzunmüddətli kurslara və təlim
                  proqramlarına cəlb olunmasına, Karyeraya dair tədbirlərin
                  keçirilməsinə, məzunların ixtisaslarına uyğun iş imkanlarının
                  müəyyən edilməsinə dəstək göstərir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

