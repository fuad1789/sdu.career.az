import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-sdu-blue to-sdu-light-blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Karyera və Məzunlarla İş Mərkəzi
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Sumqayıt Dövlət Universiteti
          </p>
          <p className="text-lg mb-12 max-w-3xl mx-auto text-blue-100">
            Tələbələrin karyera planlaşdırmasına məsləhət və istiqamət verərək,
            onları iş dünyasına hazırlayırıq. Məzunlarla əlaqəni gücləndirərək,
            yeni imkanlar yaradırıq.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tecrube"
              className="bg-white text-sdu-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Təcrübə İmkanları
            </Link>
            <Link
              href="/karyera"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-sdu-blue transition-colors"
            >
              Karyera İmkanları
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

