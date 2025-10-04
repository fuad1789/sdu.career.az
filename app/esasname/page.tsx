import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function EsasnamePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />

      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Əsasnamə</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Karyera və Məzunlarla İş Mərkəzinin əsasnaməsi və fəaliyyət
              prinsipləri
            </p>
          </div>
        </div>
      </section>

      {/* Əsasnamə Məzmunu */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Karyera və Məzunlarla İş Mərkəzinin Əsasnaməsi
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    1. Ümumi Müddəalar
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Sumqayıt Dövlət Universitetinin Karyera və Məzunlarla İş
                    Mərkəzi Azərbaycan Respublikası Nazirlər Kabinetinin 19 iyun
                    2009-cu il tarixli, 833-IIIQ №-li "Təhsil haqqında
                    Azərbaycan Respublikasının Qanunu"na əsasən yaradılmışdır.
                  </p>
                  <p className="text-gray-700">
                    Karyera və Məzunlarla İş Mərkəzinin Əsasnaməsi Sumqayıt
                    Dövlət Universiteti Elmi Şurasının 29.05.2015-ci il tarixli
                    iclasının (pr. № 08) qərarı ilə təsdiq edilmişdir.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    2. Məqsəd və Vəzifələr
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Karyera və Məzunlarla iş Mərkəzi universitetin struktur
                    bölməsidir və ali təhsilin ikipilləli strukturunda
                    magistrantların və bakalavrların ixtisasyönümlü təcrübəsini
                    təşkil etməli, məzunlara işə düzəlməkdə dəstək
                    göstərməlidir.
                  </p>
                  <p className="text-gray-700">
                    Mərkəzin yaradılmasının başlıca məqsədi gənclərin bilik,
                    praktiki bacarıq və vərdişlərinin artırılması, onların
                    məşğulluq problemlərinin həll edilməsi üzrə kompleks
                    təşkilati, texniki, informasiya, məsləhət, tədris və
                    maarifləndirmə tədbirlərinin həyata keçirilməsidir.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    3. Fəaliyyət İstiqamətləri
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>
                      Təhsilalanların elektron məlumat bazasının yaradılması
                    </li>
                    <li>Karyera günlərinin təşkil olunması</li>
                    <li>
                      Azərbaycan Respublikasının ali məktəblərində fəaliyyət
                      göstərən Karyera və Məzunlarla iş Mərkəzləri ilə
                      əməkdaşlığın genişləndirilməsi
                    </li>
                    <li>
                      Təhsilalanların öz potensialını ortaya çıxarması üçün
                      münbit şəraitin yaradılması
                    </li>
                    <li>
                      Təhsilalanların və məzunların irqi, dini, cinsi, mənşəyi,
                      etnik, dil, əqidə, siyasi və sosial mənsubiyyətindən asılı
                      olmayaraq inkişafının təmin edilməsi
                    </li>
                    <li>
                      Təhsilalanların və məzunların karyera inkişafı
                      istiqamətində maraq və tələbatlarının nəzərə alınması
                    </li>
                    <li>
                      Təhsilalan və məzunların şəxsi və peşəkar inkişafına
                      dəstək olunması
                    </li>
                    <li>
                      Təhsilalan və məzunların təcrübə proqramlarında iştirakına
                      dəstək olunması
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    4. Əməkdaşlıq
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Karyera və Məzunlarla iş Mərkəzi öz fəaliyyətini mövcud
                    qanunvericiliyə uyğun olaraq, dövlət, özəl və xarici
                    müəssisələrlə bağlanmış sazişlər və müqavilələr əsasında
                    həyata keçirməyi nəzərdə tutur.
                  </p>
                  <p className="text-gray-700">
                    Mərkəzin fəaliyyətinin əsas istiqaməti yerli və beynəlxalq
                    şirkətlərlə, dövlət müəssisələri ilə əməkdaşlıq etməkdən
                    ibarətdir. Universitetə sənaye müəsissələrindən və uğurlu
                    SDU məzunlarından nümayəndələrin dəvət edilməsi, tələbələrlə
                    müxtəlif görüşlərin təşkil olunması istiqaməti Mərkəzin əsas
                    fəaliyyətlərindən sayılır.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    5. Dəstək Xidmətləri
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Karyera və Məzunlarla iş Mərkəzi təhsilalanların qısa və
                    uzunmüddətli kurslara və təlim proqramlarına cəlb
                    olunmasına, Karyeraya dair tədbirlərin keçirilməsinə,
                    məzunların ixtisaslarına uyğun iş imkanlarının müəyyən
                    edilməsinə və s. kimi məsələlərə dəstək göstərir.
                  </p>
                  <p className="text-gray-700">
                    Mərkəzin fəaliyyətini daha da genişləndirmək məqsədilə daima
                    yenilənən "SDU_ Karyera və Məzunlarla iş Mərkəzi" adlı
                    sosial platformalar mövcuddur. Məqsəd məzun və tələbələrin
                    iş axtarışına dəstək olmaq, müxtəlif təlimlər barədə onlara
                    məlumatları yönləndirmək, tələbələr üçün simulyasiya tipli
                    müsahibələrin keçirilməsi barədə məlumatlar ötürməkdən
                    ibarətdir.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sənədlər */}
      <section className="bg-sdu-light-blue py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Əlaqəli Sənədlər</h2>
          <p className="text-xl mb-8 max-w-4xl mx-auto">
            Əsasnamə ilə əlaqəli digər sənədlər və qanunvericilik aktları
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Təhsil Qanunu</h3>
              <p className="text-blue-100">
                Azərbaycan Respublikasının "Təhsil haqqında" Qanunu
              </p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Elmi Şura Qərarı</h3>
              <p className="text-blue-100">
                SDU Elmi Şurasının 29.05.2015-ci il tarixli qərarı
              </p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Yenilənmə Qərarı</h3>
              <p className="text-blue-100">
                Elmi Şuranın 21.12.2022-ci il tarixli iclasının qərarı
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
