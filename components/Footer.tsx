import Link from "next/link";
import Image from "next/image";
import {
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Logo və Haqqında */}
          <div>
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
              <p>Telefon: +994 (018)-646-20-33</p>
              <p>E-Mail: sdu.karyera@sdu.edu.az</p>
            </div>
          </div>
        </div>

        {/* Sosial Medya - Ayrı sətir */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-0">
                Sosial Medya
              </h4>
              <p className="text-gray-400 text-sm">
                Bizi sosial mediada izləyin və yeniliklərdən xəbərdar olun
              </p>
            </div>
            <div className="flex space-x-4 mt-3 sm:mt-0">
              <a
                href="https://www.linkedin.com/company/sdu-karyera-v%C9%99-m%C9%99zunlarla-i%CC%87%C5%9F-m%C9%99rk%C9%99zi/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61578289313321"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/sdu.karyera"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a
                href="https://wa.me/+994705663888"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="w-6 h-6" />
              </a>
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
