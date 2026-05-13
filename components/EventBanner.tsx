import Image from "next/image";

export default function EventBanner() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-sdu-blue via-sdu-light-blue to-indigo-600 text-white"
      aria-labelledby="event-banner-title"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-yellow-300/20 blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-sdu-blue font-semibold text-xs sm:text-sm px-3 py-1.5 rounded-full mb-4 shadow-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600" />
              </span>
              YENİ TƏDBİR · 21 MAY 2026
            </div>

            <h2
              id="event-banner-title"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-3"
            >
              Karyera Körpüsü:{" "}
              <span className="text-yellow-300">
                Diplomdan Peşəkarlığa İlk Addım
              </span>
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-blue-100 mb-6 leading-relaxed">
              Sumqayıt Dövlət Universitetinin tələbə və məzunlarının
              diqqətinə! 60-dan çox şirkət, dövlət qurumu və bankın iştirak
              edəcəyi karyera sərgisinə qoşulun.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2.5 border border-white/15">
                <span className="text-xl" aria-hidden="true">📅</span>
                <div className="text-xs sm:text-sm">
                  <div className="font-semibold">21 May 2026</div>
                  <div className="text-blue-200">Tarix</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2.5 border border-white/15">
                <span className="text-xl" aria-hidden="true">⏰</span>
                <div className="text-xs sm:text-sm">
                  <div className="font-semibold">10:00 – 13:00</div>
                  <div className="text-blue-200">Saat</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2.5 border border-white/15">
                <span className="text-xl" aria-hidden="true">📍</span>
                <div className="text-xs sm:text-sm">
                  <div className="font-semibold">SDU</div>
                  <div className="text-blue-200">Məkan</div>
                </div>
              </div>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mb-6 text-sm sm:text-base">
              <li className="flex items-start gap-2">
                <span className="text-yellow-300 mt-0.5" aria-hidden="true">✅</span>
                <span>60-dan çox şirkətin vakansiyaları</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-300 mt-0.5" aria-hidden="true">✅</span>
                <span>Təcrübə və iş imkanları</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-300 mt-0.5" aria-hidden="true">✅</span>
                <span>Peşəkar əlaqələr qurmaq fürsəti</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-300 mt-0.5" aria-hidden="true">✅</span>
                <span>Əmək bazarını yaxından tanımaq</span>
              </li>
              <li className="flex items-start gap-2 sm:col-span-2">
                <span className="text-yellow-300 mt-0.5" aria-hidden="true">✅</span>
                <span>Gələcək karyeranızı düzgün istiqamətləndirmək</span>
              </li>
            </ul>

            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <div className="inline-flex items-center justify-center gap-2 bg-green-500 text-white font-semibold px-4 py-2.5 rounded-lg text-sm sm:text-base shadow-lg">
                <span aria-hidden="true">☑️</span> Giriş sərbəstdir
              </div>
              <a
                href="mailto:sdu.karyera@sdu.edu.az"
                className="inline-flex items-center justify-center gap-2 bg-white text-sdu-blue px-4 py-2.5 rounded-lg text-sm sm:text-base font-semibold hover:bg-blue-50 transition-colors shadow-md"
              >
                <span aria-hidden="true">📧</span>
                sdu.karyera@sdu.edu.az
              </a>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute -inset-2 sm:-inset-3 bg-gradient-to-br from-yellow-300/40 to-pink-400/30 rounded-3xl blur-2xl"
              />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20">
                <Image
                  src="/images/karyera-korpusu-2026.jpeg"
                  alt="Karyera Körpüsü: Diplomdan Peşəkarlığa İlk Addım — 21 May 2026"
                  width={1200}
                  height={1200}
                  priority
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
