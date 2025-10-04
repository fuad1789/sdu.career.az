import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo və Haqqında */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 relative">
                <Image
                  src="/images/logo_b.png"
                  alt="SDU Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold">
                  Sumqayıt Dövlət Universiteti
                </h3>
                <p className="text-gray-400">
                  Karyera və Məzunlarla İş Mərkəzi
                </p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Tələbələrin karyera planlaşdırmasına məsləhət və istiqamət
              verərək, onları iş dünyasına hazırlayırıq.
            </p>
          </div>

          {/* Sürətli Keçidlər */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Sürətli Keçidlər</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/tecrube"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Təcrübə İmkanları
                </Link>
              </li>
              <li>
                <Link
                  href="/karyera"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Karyera İmkanları
                </Link>
              </li>
              <li>
                <Link
                  href="/elanlar"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Elanlar
                </Link>
              </li>
              <li>
                <Link
                  href="/elaqe"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Əlaqə
                </Link>
              </li>
            </ul>
          </div>

          {/* Əlaqə Məlumatları */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Əlaqə</h4>
            <div className="space-y-2 text-gray-400">
              <p>Sumqayıt şəhəri</p>
              <p>Bakı Küçəsi 1, 43-cü məhəllə</p>
              <p>AZ5008</p>
              <p>Telefon: +994-018-64-2-15-06</p>
              <p>E-Mail: info@sdu.edu.az</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; 2025 Sumqayıt Dövlət Universiteti. Bütün hüquqlar qorunur.
          </p>
        </div>
      </div>
    </footer>
  );
}
