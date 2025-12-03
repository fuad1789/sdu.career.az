import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Şəhid Məzunlar | Sumqayıt Dövlət Universiteti",
  description:
    "Sumqayıt Dövlət Universitetinin şəhid məzunlarının əziz xatirəsinə həsr olunmuş səhifə.",
};

interface Martyr {
  id: number;
  name: string;
  years: string;
  faculty: string;
  bio: string;
  image: string;
}

const martyrs: Martyr[] = [
  {
    id: 1,
    name: "Məmmədov Əli Vəli oğlu",
    years: "1995 – 2020",
    faculty: "Tarix və Coğrafiya fakültəsi, Tarix müəllimliyi",
    bio: "Vətən müharibəsində Füzuli istiqamətində gedən döyüşlərdə qəhrəmancasına şəhid olmuşdur.",
    image: "/images/martyr-placeholder.jpg", // Placeholder, needs actual image or generic placeholder
  },
  // Add more martyrs here as needed
];

export default function SehidMezunlarPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800 font-sans">
      <Header />
      <Navigation />

      {/* Hero Section */}
      <section className="w-full h-[70vh] relative overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-0">
          <Image
            src="/images/SAB_0897.JPG"
            alt="Şəhidlər Abidəsi"
            fill
            className="object-cover object-center"
            priority
          />
          <Image
            src="/images/78763.jpg"
            alt="Şəhidlər Abidəsi"
            fill
            className="object-cover opacity-30 object-center absolute top-0 left-0"
            priority
          />
        </div>

        {/* Gradient Overlay - Refined and balanced */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-transparent to-green-900/10" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6 space-y-6 max-w-4xl">
            {/* Decorative Top Line */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/50" />
              <div className="w-2 h-2 bg-white/70 rotate-45" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/50" />
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl text-white font-bold tracking-wider uppercase">
              <span className="inline-block drop-shadow-2xl">
                Şəhid Məzunlar
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-white/90 font-light tracking-wide max-w-2xl mx-auto drop-shadow-lg">
              Vətənimizin azadlığı uğrunda canlarından keçən qəhrəmanlarımızın əziz xatirəsinə
            </p>

            {/* Decorative Bottom Line */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-white/40" />
              <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
              <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
              <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-white/40" />
            </div>
          </div>
        </div>

        {/* Bottom Fade - Very subtle */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white via-white/50 to-transparent" />
      </section>

      {/* Intro Text Section */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center space-y-8">
        <div className="space-y-6 text-lg leading-relaxed text-gray-700">
          <p>
            Sumqayıt Dövlət Universiteti, vətənimizin bütövlüyü uğrunda
            canlarından keçən məzunları ilə qürur duyur. Onlar təkcə
            auditoriyalarda deyil, döyüş meydanlarında da öz sözlərini dedilər.
            Tarix yazan bu qəhrəmanlar, universitetimizin adını əbədi olaraq
            şərəf lövhəsinə həkk etdilər.
          </p>
          <p>
            &quot;Yaddaşlara yazılan talelər&quot; kitabı, bu qəhrəmanların
            həyat yoluna, onların arzularına və yarımçıq qalmış gələcəklərinə
            işıq tutur. Kitabda hər bir şəhid məzunun tələbəlik illəri,
            müəllimlərinin və tələbə yoldaşlarının xatirələri yer alıb.
          </p>
          <p>
            Bu səhifənin və kitabın əsas məqsədi şəhidlərimizin əziz xatirəsini
            yaşatmaq, onların qəhrəmanlığını gələcək nəsillərə ötürməkdir. Onlar
            bizim qürur mənbəyimiz, and yerimizdir.
          </p>
        </div>
      </section>

      {/* PDF Download Section */}
      <section className="bg-gray-50 py-20 mt-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            &quot;Yaddaşlara yazılan talelər&quot;
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Kitabın tam elektron versiyasını aşağıdakı düymədən yükləyə
            bilərsiniz.
          </p>
          <a
            href="/SDU Sehidler_Yaddaslara yazilan taleler_cap_curves (1) 4 (1).pdf"
            download
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 transition-colors duration-300 shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M12 12.75l-3-3m0 0l3-3m-3 3h7.5"
              />
            </svg>
            PDF Yüklə
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
