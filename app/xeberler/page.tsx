import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";
import { getBaseUrl } from "@/lib/get-base-url";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  status: string;
  priority?: string;
  link_url?: string;
  photo_uri?: string;
}

interface NewsResponse {
  news: NewsItem[];
  total: number;
  lastUpdated: string;
}

// Force dynamic rendering since API routes are dynamic
export const dynamic = "force-dynamic";

async function getNews(): Promise<NewsItem[]> {
  try {
    // Get base URL using utility function
    const baseUrl = getBaseUrl();
    // If baseUrl is empty, use relative URL (works in Next.js server components)
    const apiUrl = baseUrl
      ? `${baseUrl}/api/xeberler?status=Aktiv`
      : "/api/xeberler?status=Aktiv";

    const response = await fetch(apiUrl, {
      cache: "no-store", // Always fetch fresh data for dynamic pages
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch news");
    }

    const data: NewsResponse = await response.json();
    return data.news;
  } catch (error) {
    console.error("Error fetching news:", error);
    // Return empty array as fallback
    return [];
  }
}

export default async function XeberlerPage() {
  const xeberler = await getNews();

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />

      {/* Hero Section */}
      <section className="bg-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
              Karyera Xəbərləri
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Universitet və karyera sahəsindəki ən son inkişaflar
            </p>
          </div>
        </div>
      </section>

      {/* Xəbərlər Siyahısı */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 sm:space-y-8">
            {xeberler.map((xeber, index) => (
              <div
                key={xeber.id || index}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Şəkil */}
                  {xeber.photo_uri && (
                    <div className="md:w-1/3 h-48 md:h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
                      <Image
                        src={xeber.photo_uri}
                        alt={xeber.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    </div>
                  )}

                  {/* Məzmun */}
                  <div
                    className={`p-4 sm:p-6 ${
                      xeber.photo_uri ? "md:w-2/3" : "w-full"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-3">
                      <span className="bg-sdu-blue text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium w-fit">
                        {xeber.category}
                      </span>
                      <div className="flex items-center text-gray-500 text-xs sm:text-sm">
                        <FaCalendarAlt className="w-3 h-3 mr-2" />
                        {new Date(xeber.date).toLocaleDateString("az-AZ")}
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 leading-tight">
                      {xeber.title}
                    </h3>

                    {xeber.description && (
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                        {xeber.description}
                      </p>
                    )}

                    {xeber.link_url && (
                      <a
                        href={xeber.link_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 text-sm sm:text-base hover:underline hover:text-blue-700"
                      >
                        Ətraflı oxu →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {xeberler.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">Hazırda xəbər yoxdur.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Əlavə Məlumat */}
      <section className="bg-sdu-light-blue py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
            Xəbərlər Haqqında
          </h2>
          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-4xl mx-auto px-4">
            Karyera və Məzunlarla İş Mərkəzi müntəzəm olaraq tələbələr və
            məzunlar üçün vacib xəbərlər yayımlayır. Bu xəbərlər təcrübə
            imkanları, karyera günləri, təlimlər və digər fəaliyyətlər haqqında
            məlumat verir.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12">
            <div className="bg-white bg-opacity-10 rounded-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                Təcrübə Xəbərləri
              </h3>
              <p className="text-blue-100 text-sm sm:text-base">
                Müxtəlif sahələrdə təcrübə imkanları və istehsalat təcrübəsi
                xəbərləri
              </p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                Karyera Tədbirləri
              </h3>
              <p className="text-blue-100 text-sm sm:text-base">
                Karyera günləri, seminarlar və peşəkar inkişaf tədbirləri
                xəbərləri
              </p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                Əməkdaşlıq Xəbərləri
              </h3>
              <p className="text-blue-100 text-sm sm:text-base">
                Yerli və beynəlxalq şirkətlərlə əməkdaşlıq xəbərləri
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
