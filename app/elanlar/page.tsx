import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface Announcement {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  status: string;
  priority: string;
  link_url?: string;
}

interface AnnouncementsResponse {
  announcements: Announcement[];
  total: number;
  lastUpdated: string;
}

async function getAnnouncements(): Promise<Announcement[]> {
  try {
    // Use full URL for both production and local development
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.NODE_ENV === "production"
        ? "https://sdu-career-az.vercel.app"
        : "http://localhost:3000");

    const response = await fetch(`${baseUrl}/api/elanlar`, {
      cache: "no-store", // Always fetch fresh data
    });

    if (!response.ok) {
      throw new Error("Failed to fetch announcements");
    }

    const data: AnnouncementsResponse = await response.json();
    return data.announcements;
  } catch (error) {
    console.error("Error fetching announcements:", error);
    // Return empty array as fallback
    return [];
  }
}

export default async function ElanlarPage() {
  const elanlar = await getAnnouncements();

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />

      {/* Hero Section */}
      <section className="bg-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
              Xəbərlər
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Karyera və Məzunlarla İş Mərkəzinin ən son elanları və xəbərləri
            </p>
          </div>
        </div>
      </section>

      {/* Elanlar Siyahısı */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 sm:space-y-8">
            {elanlar.map((elan, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 sm:p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-3">
                      <span className="bg-sdu-blue text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium w-fit">
                        {elan.category}
                      </span>
                      <span className="text-gray-500 text-xs sm:text-sm">
                        {new Date(elan.date).toLocaleDateString("az-AZ")}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 leading-tight">
                      {elan.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      {elan.description}
                    </p>
                    {elan.link_url && (
                      <a
                        href={elan.link_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 text-sm sm:text-base leading-relaxed mt-2 block hover:underline hover:text-blue-700 text-right"
                      >
                        Ətraflı oxu →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Əlavə Məlumat */}
      <section className="bg-sdu-light-blue py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
            Elanlar Haqqında
          </h2>
          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-4xl mx-auto px-4">
            Karyera və Məzunlarla İş Mərkəzi müntəzəm olaraq tələbələr və
            məzunlar üçün vacib elanlar və xəbərlər yayımlayır. Bu elanlar
            təcrübə imkanları, karyera günləri, təlimlər və digər fəaliyyətlər
            haqqında məlumat verir.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12">
            <div className="bg-white bg-opacity-10 rounded-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                Təcrübə Elanları
              </h3>
              <p className="text-blue-100 text-sm sm:text-base">
                Müxtəlif sahələrdə təcrübə imkanları və istehsalat təcrübəsi
                elanları
              </p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                Karyera Tədbirləri
              </h3>
              <p className="text-blue-100 text-sm sm:text-base">
                Karyera günləri, seminarlar və peşəkar inkişaf tədbirləri
              </p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                Vakansiyalar
              </h3>
              <p className="text-blue-100 text-sm sm:text-base">
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
