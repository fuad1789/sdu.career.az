"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function PartnersSection() {
  const partners = [
    {
      name: "ALCO LLC",
      logo: "/images/logo/alco_llc_logo.jpg",
      alt: "ALCO LLC Logo",
    },
    {
      name: "BP Helios",
      logo: "/images/logo/BP_Helios_logo.svg.png",
      alt: "BP Helios Logo",
    },
    {
      name: "Holcim",
      logo: "/images/logo/Holcim_Logo_2021_sRGB.png",
      alt: "Holcim Logo",
    },
    {
      name: "Kapital Bank",
      logo: "/images/logo/Kapital_Bank_logo.svg.png",
      alt: "Kapital Bank Logo",
    },
    {
      name: "SCF",
      logo: "/images/logo/scf3bkqx.501.jpg",
      alt: "SCF Logo",
    },
    {
      name: "Download",
      logo: "/images/logo/download1.png",
      alt: "Download Logo",
    },
    {
      name: "Images",
      logo: "/images/logo/images.png",
      alt: "Images Logo",
    },
    {
      name: "Logo Footer",
      logo: "/images/logo/logo-footerr.png",
      alt: "Logo Footer",
    },
    {
      name: "SDU Logo",
      logo: "/images/logo/logo.svg",
      alt: "SDU Logo",
    },
    {
      name: "IYDE Logo",
      logo: "/images/logo/iyde.svg",
      alt: "IYDE Logo",
    },
     {
      name: "Qartal Logo",
      logo: "/images/logo/QARTAL-LOGO-241.png",
      alt: "IYDE Logo",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Tərəfdaşlarımız
          </h2>
          <p className="text-lg text-gray-600">
            Karyera inkişafında bizimlə əməkdaşlıq edən aparıcı şirkətlər
          </p>
        </div>

        <div className="w-full">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={6}
            autoplay={{
              delay: 700,
              disableOnInteraction: false,
            }}
            loop={true}
            speed={1000}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 6,
                spaceBetween: 20,
              },
            }}
            className="partners-swiper"
          >
            {partners.map((partner, index) => (
              <SwiperSlide key={index}>
                <div className="flex items-center justify-center h-20">
                  <div className="relative w-32 h-16 flex items-center justify-center">
                    <Image
                      src={partner.logo}
                      alt={partner.alt}
                      fill
                      className="object-contain"
                      sizes="128px"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
