import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function ElanlarPage() {
  const elanlar = [
    {
      title:
        "SDU-nun tələbələri Karyera və Psixologiya Mərkəzinin sertifikatlarına layiq görüldülər",
      date: "2024-12-15",
      category: "Sertifikat",
      description:
        "Tələbələrimiz karyera və psixologiya sahəsində əldə etdikləri uğurlar nəticəsində sertifikatlara layiq görülmüşdür.",
    },
    {
      title:
        'Tələbələrimiz "Azərtexnolayn" istehsalat müəssisəsində təcrübə keçəcək',
      date: "2024-12-10",
      category: "Təcrübə",
      description:
        'Müxtəlif fakültələrdən tələbələrimiz "Azərtexnolayn" istehsalat müəssisəsində təcrübə keçmək imkanı əldə edəcəklər.',
    },
    {
      title:
        'SDU ilə "Gilan Tekstil Parkı" MMC tələbələrə yeni imkanların yaradılması üçün birgə fəaliyyət göstərəcəklər',
      date: "2024-12-05",
      category: "Əməkdaşlıq",
      description:
        'Universitetimiz "Gilan Tekstil Parkı" MMC ilə tələbələrə yeni imkanların yaradılması üçün birgə fəaliyyət göstərəcək.',
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Elanlar</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Karyera və Məzunlarla İş Mərkəzinin ən son elanları və xəbərləri
            </p>
          </div>
        </div>
      </section>

      {/* Elanlar Siyahısı */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {elanlar.map((elan, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <span className="bg-sdu-blue text-white px-3 py-1 rounded-full text-sm font-medium">
                        {elan.category}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {new Date(elan.date).toLocaleDateString("az-AZ")}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {elan.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{elan.description}</p>
                    <button className="text-sdu-blue hover:text-blue-700 font-medium">
                      Ətraflı oxu →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Əlavə Məlumat */}
      <section className="bg-sdu-light-blue py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Elanlar Haqqında</h2>
          <p className="text-xl mb-8 max-w-4xl mx-auto">
            Karyera və Məzunlarla İş Mərkəzi müntəzəm olaraq tələbələr və
            məzunlar üçün vacib elanlar və xəbərlər yayımlayır. Bu elanlar
            təcrübə imkanları, karyera günləri, təlimlər və digər fəaliyyətlər
            haqqında məlumat verir.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Təcrübə Elanları</h3>
              <p className="text-blue-100">
                Müxtəlif sahələrdə təcrübə imkanları və istehsalat təcrübəsi
                elanları
              </p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Karyera Tədbirləri</h3>
              <p className="text-blue-100">
                Karyera günləri, seminarlar və peşəkar inkişaf tədbirləri
              </p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Vakansiyalar</h3>
              <p className="text-blue-100">
                Yerli və beynəlxalq şirkətlərdə iş imkanları və vakansiyalar
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

