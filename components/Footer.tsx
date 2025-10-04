import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Logo və Haqqında */}
          <div className="col-span-1 sm:col-span-2">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 relative">
                <Image
                  src="/images/logo_b.png"
                  alt="SDU Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold">
                  Sumqayıt Dövlət Universiteti
                </h3>
                <p className="text-gray-400 text-sm sm:text-base">
                  Karyera və Məzunlarla İş Mərkəzi
                </p>
              </div>
            </div>
            <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
              Tələbələrin karyera planlaşdırmasına məsləhət və istiqamət
              verərək, onları iş dünyasına hazırlayırıq.
            </p>
          </div>

          {/* Sürətli Keçidlər */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
              Sürətli Keçidlər
            </h4>
            <ul className="space-y-1 sm:space-y-2">
              <li>
                <Link
                  href="/tecrube"
                  className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                >
                  Təcrübə İmkanları
                </Link>
              </li>
              <li>
                <Link
                  href="/karyera"
                  className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                >
                  Karyera İmkanları
                </Link>
              </li>
              <li>
                <Link
                  href="/elanlar"
                  className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                >
                  Elanlar
                </Link>
              </li>
              <li>
                <Link
                  href="/elaqe"
                  className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                >
                  Əlaqə
                </Link>
              </li>
            </ul>
          </div>

          {/* Əlaqə Məlumatları */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
              Əlaqə
            </h4>
            <div className="space-y-1 sm:space-y-2 text-gray-400 text-sm sm:text-base">
              <p>Sumqayıt şəhəri</p>
              <p>Bakı Küçəsi 1, 43-cü məhəllə</p>
              <p>AZ5008</p>
              <p>Telefon: +994-018-64-2-15-06</p>
              <p>E-Mail: info@sdu.edu.az</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400">
          <p className="text-xs sm:text-sm">
            &copy; 2025 Sumqayıt Dövlət Universiteti. Bütün hüquqlar qorunur.
          </p>
        </div>
      </div>
    </footer>
  );
}
