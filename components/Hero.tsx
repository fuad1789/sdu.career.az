import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-sdu-blue to-sdu-light-blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            Karyera və Məzunlarla İş Mərkəzi
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-blue-100">
            Sumqayıt Dövlət Universiteti
          </p>
          <p className="text-base sm:text-lg mb-8 sm:mb-12 max-w-3xl mx-auto text-blue-100 leading-relaxed px-4">
            Tələbələrin karyera planlaşdırmasına məsləhət və istiqamət verərək,
            onları iş dünyasına hazırlayırıq. Məzunlarla əlaqəni gücləndirərək,
            yeni imkanlar yaradırıq.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
            <Link
              href="/tecrube"
              className="bg-white text-sdu-blue px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors w-full sm:w-auto text-center"
            >
              Təcrübə İmkanları
            </Link>
            <Link
              href="/karyera"
              className="border-2 border-white text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-sdu-blue transition-colors w-full sm:w-auto text-center"
            >
              Karyera İmkanları
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
