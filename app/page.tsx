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

export default function Home() {
  const announcements = [
    {
      title:
        "SDU-nun tələbələri Karyera və Psixologiya Mərkəzinin sertifikatlarına layiq görüldülər",
      date: "2024-12-15",
      category: "Sertifikat",
      description:
        "Tələbələrimiz karyera və psixologiya sahəsində əldə etdikləri uğurlar nəticəsində sertifikatlara layiq görülmüşdür.",
      href: "/elanlar",
    },
    {
      title:
        'Tələbələrimiz "Azərtexnolayn" istehsalat müəssisəsində təcrübə keçəcək',
      date: "2024-12-10",
      category: "Təcrübə",
      description:
        'Müxtəlif fakültələrdən tələbələrimiz "Azərtexnolayn" istehsalat müəssisəsində təcrübə keçmək imkanı əldə edəcəklər.',
      href: "/elanlar",
    },
    {
      title:
        'SDU ilə "Gilan Tekstil Parkı" MMC tələbələrə yeni imkanların yaradılması üçün birgə fəaliyyət göstərəcəklər',
      date: "2024-12-05",
      category: "Əməkdaşlıq",
      description:
        'Universitetimiz "Gilan Tekstil Parkı" MMC ilə tələbələrə yeni imkanların yaradılması üçün birgə fəaliyyət göstərəcək.',
      href: "/elanlar",
    },
  ];

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
