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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Logo və Haqqında */}
          <div className="lg:col-span-1">
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-12 h-12 relative flex-shrink-0">
                <Image
                  src="/images/logo_b.png"
                  alt="SDU Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1">
                  Sumqayıt Dövlət Universiteti
                </h3>
                <p className="text-gray-300 text-sm">
                  Karyera və Məzunlarla İş Mərkəzi
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Tələbələrin karyera planlaşdırmasına məsləhət və istiqamət
              verərək, onları iş dünyasına hazırlayırıq.
            </p>
          </div>

          {/* Sürətli Keçidlər */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4">
              Sürətli Keçidlər
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/tecrube"
                  className="text-gray-400 hover:text-white transition-colors text-sm block py-1"
                >
                  Təcrübə İmkanları
                </Link>
              </li>
              <li>
                <Link
                  href="/karyera"
                  className="text-gray-400 hover:text-white transition-colors text-sm block py-1"
                >
                  Karyera İmkanları
                </Link>
              </li>
              <li>
                <Link
                  href="/xeberler"
                  className="text-gray-400 hover:text-white transition-colors text-sm block py-1"
                >
                  Xəbərlər
                </Link>
              </li>
              <li>
                <Link
                  href="/elaqe"
                  className="text-gray-400 hover:text-white transition-colors text-sm block py-1"
                >
                  Əlaqə
                </Link>
              </li>
            </ul>
          </div>

          {/* KEÇİDLƏR */}
          <div className="md:col-span-2 lg:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
              <div className="w-1 h-5 bg-red-500 mr-3"></div>
              KEÇİDLƏR
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              <a
                href="https://azerbaijan.az"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors text-sm flex items-center py-1"
              >
                <div className="w-1.5 h-1.5 bg-gray-500 mr-2 flex-shrink-0 rounded-sm"></div>
                azerbaijan.az
              </a>
              <a
                href="https://heydar-aliyev.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors text-sm flex items-center py-1"
              >
                <div className="w-1.5 h-1.5 bg-gray-500 mr-2 flex-shrink-0 rounded-sm"></div>
                heydar-aliyev.org
              </a>
              <a
                href="https://president.az"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors text-sm flex items-center py-1"
              >
                <div className="w-1.5 h-1.5 bg-gray-500 mr-2 flex-shrink-0 rounded-sm"></div>
                president.az
              </a>
              <a
                href="https://amea-pmi.az"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors text-sm flex items-center py-1"
              >
                <div className="w-1.5 h-1.5 bg-gray-500 mr-2 flex-shrink-0 rounded-sm"></div>
                amea-pmi.az
              </a>
              <a
                href="https://nkpi.az"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors text-sm flex items-center py-1"
              >
                <div className="w-1.5 h-1.5 bg-gray-500 mr-2 flex-shrink-0 rounded-sm"></div>
                nkpi.az
              </a>
              <a
                href="https://edu.e-cbar.az"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors text-sm flex items-center py-1"
              >
                <div className="w-1.5 h-1.5 bg-gray-500 mr-2 flex-shrink-0 rounded-sm"></div>
                edu.e-cbar.az
              </a>
              <a
                href="https://refresh-erasmus.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors text-sm flex items-center py-1"
              >
                <div className="w-1.5 h-1.5 bg-gray-500 mr-2 flex-shrink-0 rounded-sm"></div>
                refresh-erasmus.com
              </a>
              <a
                href="https://virtualkarabakh.az"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors text-sm flex items-center py-1"
              >
                <div className="w-1.5 h-1.5 bg-gray-500 mr-2 flex-shrink-0 rounded-sm"></div>
                virtualkarabakh.az
              </a>
              <a
                href="https://sesremo.eu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors text-sm flex items-center py-1"
              >
                <div className="w-1.5 h-1.5 bg-gray-500 mr-2 flex-shrink-0 rounded-sm"></div>
                sesremo.eu
              </a>
              <a
                href="https://sws.bsu.by"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors text-sm flex items-center py-1"
              >
                <div className="w-1.5 h-1.5 bg-gray-500 mr-2 flex-shrink-0 rounded-sm"></div>
                sws.bsu.by
              </a>
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
