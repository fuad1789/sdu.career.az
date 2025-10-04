import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-sdu-blue to-sdu-light-blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
            Karyera və Məzunlarla İş Mərkəzi
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 text-blue-100">
            Sumqayıt Dövlət Universiteti
          </p>
          <p className="text-sm sm:text-base mb-6 sm:mb-8 max-w-2xl mx-auto text-blue-100 leading-relaxed px-4">
            Tələbələrin karyera planlaşdırmasına məsləhət və istiqamət verərək,
            onları iş dünyasına hazırlayırıq. Məzunlarla əlaqəni gücləndirərək,
            yeni imkanlar yaradırıq.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
            <Link
              href="/tecrube"
              className="bg-white text-sdu-blue px-5 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors w-full sm:w-auto text-center text-sm sm:text-base"
            >
              Təcrübə İmkanları
            </Link>
            <Link
              href="/karyera"
              className="border-2 border-white text-white px-5 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-white hover:text-sdu-blue transition-colors w-full sm:w-auto text-center text-sm sm:text-base"
            >
              Karyera İmkanları
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
