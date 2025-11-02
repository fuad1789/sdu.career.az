import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnnouncementsSection from "@/components/AnnouncementsSection";
import StatsSection from "@/components/StatsSection";
import FeaturesSection from "@/components/FeaturesSection";
import PartnersSection from "@/components/PartnersSection";
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

// Force dynamic rendering since API routes are dynamic
export const dynamic = "force-dynamic";

async function getAllAnnouncements(): Promise<Announcement[]> {
  try {
    // Use environment variable or default to localhost for server-side rendering
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const response = await fetch(`${baseUrl}/api/elanlar`, {
      cache: "no-store", // Always fetch fresh data for dynamic pages
    });

    if (!response.ok) {
      throw new Error("Failed to fetch announcements");
    }

    const data: AnnouncementsResponse = await response.json();

    return data.announcements; // Return all announcements (not just high priority)
  } catch (error) {
    console.error("Error fetching announcements:", error);
    // Return empty array as fallback
    return [];
  }
}

export default async function Home() {
  const allAnnouncements = await getAllAnnouncements();

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />
      <Hero />
      <GraduateSearch />
      <AnnouncementsSection announcements={allAnnouncements} />
      <StatsSection />
      <FeaturesSection />
      <PartnersSection />
      <TestimonialsSection />
      <NewsSection />
      <Footer />
    </main>
  );
}
