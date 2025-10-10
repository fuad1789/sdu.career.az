import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import LatestAnnouncements from "@/components/LatestAnnouncements";
import StatsSection from "@/components/StatsSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import NewsSection from "@/components/NewsSection";
import GraduateSearch from "@/components/GraduateSearch";

interface Announcement {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  status: string;
  priority: string;
}

interface AnnouncementsResponse {
  announcements: Announcement[];
  total: number;
  lastUpdated: string;
}

async function getLatestAnnouncements(): Promise<Announcement[]> {
  try {
    // Use full URL for both production and local development
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.NODE_ENV === "production"
        ? "https://sdu-career-az.vercel.app"
        : "http://localhost:3000");

    const response = await fetch(`${baseUrl}/api/elanlar?limit=3`, {
      cache: "no-store", // Always fetch fresh data
    });

    if (!response.ok) {
      throw new Error("Failed to fetch announcements");
    }

    const data: AnnouncementsResponse = await response.json();
    return data.announcements.slice(0, 3); // Get only first 3 for homepage
  } catch (error) {
    console.error("Error fetching announcements:", error);
    // Return empty array as fallback
    return [];
  }
}

export default async function Home() {
  const announcements = await getLatestAnnouncements();

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />
      <Hero />
      <GraduateSearch />
      <LatestAnnouncements announcements={announcements} />
      <StatsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <NewsSection />
      <Footer />
    </main>
  );
}
