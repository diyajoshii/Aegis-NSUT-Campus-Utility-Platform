import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link"; // If you're using Next.js

const HeroComponent: React.FC = () => {
  const heroSlides = [
    {
      title: "SkillX",
      description:
        "Experience fair and focused assessments with SkillX's secure platform. Real-time proctoring and test scores for efficient performance tracking and a seamless test-taking experience.",
      img: "SkillX.png",
      link: "/SkillX",
    },
    {
      title: "ScholarAid",
      description: "Discover your ideal scholarships with ScholarAid. Get personalized recommendations and easily access the resources you need to fund your education.",
      img: "ScholarAid.png",
      link: "/ScholarAid",
    },
    {
      title: "Reclaimr",
      description: "Lost something on campus? Reclaimr is your simple college lost and found. Easily report lost items and connect with found objects to get your belongings back quickly.",
      img: "Reclaimr.png",
      link: "/Reclaimr",
    },
  ];

  return (
    <div className="bg-background w-full relative text-foreground">
      <section className="pt-8 pb-12 relative">
        <div className="w-full max-w-none px-6 md:px-10 relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            className="w-full"
          >
            {heroSlides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 text-center lg:text-left w-full">
                  {/* Text Section */}
                  <div className="px-4 md:px-6 lg:px-10">
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                      {slide.title}
                    </h1>
                    <p className="mt-4 text-lg sm:mt-6 sm:text-xl">
                      {slide.description}
                    </p>
                    <div className="mt-6">
                      <Link
                        href={slide.link}
                        className="inline-block px-5 py-2 text-sm font-medium text-white bg-primary rounded-full shadow-md hover:bg-opacity-90 transition"
                      >
                        Learn More →
                      </Link>
                    </div>
                  </div>

                  {/* Image Section */}
                  <div className="flex justify-center lg:justify-end">
                    <img
                      className="w-4/5 md:w-full max-w-sm sm:max-w-md lg:max-w-lg drop-shadow-lg rounded-lg"
                      src={slide.img}
                      alt={slide.title}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <style>{`
            .swiper-pagination {
              bottom: -5px !important;
            }
          `}</style>
        </div>
      </section>
    </div>
  );
};

export default HeroComponent;
