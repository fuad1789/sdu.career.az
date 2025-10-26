import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import LatestAnnouncements from "@/components/LatestAnnouncements";
import StatsSection from "@/components/StatsSection";
import FeaturesSection from "@/components/FeaturesSection";
import PartnersSection from "@/components/PartnersSection";
import TestimonialsSection from "@/components/TestimonialsSection";
// import NewsSection from "@/components/NewsSection";
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

    const response = await fetch(`${baseUrl}/api/elanlar`, {
      cache: "no-store", // Always fetch fresh data
    });

    if (!response.ok) {
      throw new Error("Failed to fetch announcements");
    }

    const data: AnnouncementsResponse = await response.json();

    // Filter only high priority (yüksək) announcements
    // Normalize priority to handle different variants
    const highPriorityAnnouncements = data.announcements.filter(
      (announcement) => {
        if (!announcement.priority) return false;
        const normalizedPriority = announcement.priority
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, ""); // Remove diacritics
        return normalizedPriority.includes("yuks"); // Check for yuks (yüksək)
      }
    );

    return highPriorityAnnouncements; // Return all high priority announcements
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
      <PartnersSection />
      <TestimonialsSection />
      {/* <NewsSection /> */}
      <Footer />
    </main>
  );
}
