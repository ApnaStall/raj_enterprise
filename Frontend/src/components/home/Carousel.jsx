import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import "./carousel.css";
import c1 from '../../assets/c1.png';
import c2 from '../../assets/c2.png';
import c3 from '../../assets/c3.png';

export default function Carousel() {
  return (
    <>
    <Swiper
      modules={[Navigation]}
      navigation={true}
      spaceBetween={20}
      slidesPerView={1}
      autoplay={{ delay: 2500 }}
      loop={true}
      className="mySwiper mt-30"
    >
      <SwiperSlide>
        <img src={c1} className="w-full h-50 sm:h-65 md:h-80 lg:h-160 object-cover rounded-xl" />
      </SwiperSlide>

      <SwiperSlide>
        <img src={c2} className="w-full h-50 sm:h-65 md:h-80 lg:h-160 object-cover rounded-xl" />
      </SwiperSlide>

      <SwiperSlide>
        <img src={c3} className="w-full h-50 sm:h-65 md:h-80 lg:h-160 object-cover rounded-xl" />
      </SwiperSlide>
    </Swiper>
    </>
  );
}
