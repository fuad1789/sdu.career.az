import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function MerkezHaqqindaPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />

      {/* Hero Section */}
      <section className="bg-sdu-light-blue py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3">
              Karyera və Məzunlarla İş Mərkəzi
            </h1>
            <p className="text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
              Sumqayıt Dövlət Universitetinin Karyera və Məzunlarla İş Mərkəzi
              universitetin struktur bölməsidir və ali təhsilin ikipilləli
              strukturunda magistrantların və bakalavrların ixtisasyönümlü
              təcrübəsini təşkil etməli, məzunlara işə düzəlməkdə dəstək
              göstərməlidir.
            </p>
          </div>
        </div>
      </section>

      {/* Fəaliyyət İstiqamətləri */}
      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              KARYERA VƏ MƏZUNLARLA İŞ MƏRKƏZİNİN FƏALİYYƏT İSTİQAMƏTLƏRİ
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Fəaliyyət İstiqamətləri Siyahısı */}
            <div className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
                Əsas Fəaliyyət İstiqamətləri
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-2 h-2 bg-sdu-light-blue rounded-full mt-2 mr-4"></div>
                  <p className="text-gray-700 text-sm sm:text-base">
                    Təhsilalanların elektron məlumat bazasının yaradılması
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-2 h-2 bg-sdu-light-blue rounded-full mt-2 mr-4"></div>
                  <p className="text-gray-700 text-sm sm:text-base">
                    Karyera günlərinin təşkil olunması
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-2 h-2 bg-sdu-light-blue rounded-full mt-2 mr-4"></div>
                  <p className="text-gray-700 text-sm sm:text-base">
                    Azərbaycan Respublikasının ali məktəblərində fəaliyyət
                    göstərən Karyera və Məzunlarla iş Mərkəzləri ilə
                    əməkdaşlığın genişləndirilməsi
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-2 h-2 bg-sdu-light-blue rounded-full mt-2 mr-4"></div>
                  <p className="text-gray-700 text-sm sm:text-base">
                    Təhsilalanların öz potensialını ortaya çıxarması üçün münbit
                    şəraitin yaradılması
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-2 h-2 bg-sdu-light-blue rounded-full mt-2 mr-4"></div>
                  <p className="text-gray-700 text-sm sm:text-base">
                    Təhsilalanların və məzunların irqi, dini, cinsi, mənşəyi,
                    etnik, dil, əqidə, siyasi və sosial mənsubiyyətindən asılı
                    olmayaraq inkişafının təmin edilməsi
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-2 h-2 bg-sdu-light-blue rounded-full mt-2 mr-4"></div>
                  <p className="text-gray-700 text-sm sm:text-base">
                    Təhsilalanların və məzunların karyera inkişafı istiqamətində
                    maraq və tələbatlarının nəzərə alınması
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-2 h-2 bg-sdu-light-blue rounded-full mt-2 mr-4"></div>
                  <p className="text-gray-700 text-sm sm:text-base">
                    Təhsilalan və məzunların şəxsi və peşəkar inkişafına dəstək
                    olunması
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-2 h-2 bg-sdu-light-blue rounded-full mt-2 mr-4"></div>
                  <p className="text-gray-700 text-sm sm:text-base">
                    Təhsilalan və məzunların təcrübə proqramlarında iştirakına
                    dəstək olunması
                  </p>
                </li>
              </ul>
            </div>

            {/* Ətraflı Məlumat */}
            <div className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
                Mərkəzin Əsas Fəaliyyətləri
              </h3>

              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 text-sm sm:text-base mb-4">
                  Karyera və Məzunlarla iş Mərkəzinin fəaliyyətinin əsas
                  istiqaməti yerli və beynəlxalq şirkətlərlə, dövlət
                  müəssisələri ilə əməkdaşlıq etməkdən ibarətdir. Eləcə də
                  universitetə sənaye müəsissələrindən və uğurlu SDU
                  məzunlarından nümayəndələrin dəvət edilməsi, tələbələrlə
                  müxtəlif görüşlərin təşkil olunması istiqaməti Mərkəzin əsas
                  fəaliyyətlərindən sayılır.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 text-sm sm:text-base mb-4">
                  Karyera və Məzunlarla iş Mərkəzi təhsilalanların qısa və
                  uzunmüddətli kurslara və təlim proqramlarına cəlb olunmasına,
                  Karyeraya dair tədbirlərin keçirilməsinə, məzunların
                  ixtisaslarına uyğun iş imkanlarının müəyyən edilməsinə və s.
                  kimi məsələlərə dəstək göstərir.
                </p>
              </div>

              <div className="bg-sdu-light-blue bg-opacity-10 rounded-lg p-6">
                <p className="text-gray-700 text-sm sm:text-base">
                  Mərkəzin fəaliyyətini daha da genişləndirmək məqsədilə daima
                  yenilənən{" "}
                  <strong>"SDU_ Karyera və Məzunlarla iş Mərkəzi"</strong> adlı
                  sosial platformalar mövcuddur. Məqsəd məzun və tələbələrin iş
                  axtarışına dəstək olmaq, müxtəlif təlimlər barədə onlara
                  məlumatları yönləndirmək, tələbələr üçün simulyasiya tipli
                  müsahibələrin keçirilməsi barədə məlumatlar ötürməkdən
                  ibarətdir.
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
