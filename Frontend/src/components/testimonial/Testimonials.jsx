import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "./Testimonials.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import t1 from '../../assets/t1.jpg';
import t2 from '../../assets/t2.jpeg';
import t3 from '../../assets/t3.png';
import t4 from '../../assets/t4.png';
import t5 from '../../assets/t5.png';
import t6 from '../../assets/t6.png';
import t7 from '../../assets/t7.png';

export default function Testimonials() {
  const reviews = [
    {
      text: `Raj Enterprise provides impeccable hospital linen that is durable, comfortable, and essential for infection control. Their service is reliable and highly recommended for healthcare institutions.`,
      logo: t1,
      name: "Medford Hospital",
      location: "Mumbra / Maharashtra"
    },
    {
        text: `Raj Enterprise has been our trusted partner for years, supplying high-quality hospital linen. The materials are durable, comfortable, and maintain quality through multiple washes, crucial for infection control. Their timely deliveries and responsive customer service make them a reliable choice. We highly recommend Raj Enterprise for their outstanding products and services.`,
        logo: t2,
        city: "AIMS Hospital",
        location: "Mumbai / Maharashtra"
    },
    {
      text: `Nipun Hospital relies on Raj Enterprise for top-notch hospital linen that meets our stringent standards. Their products ensure patient comfort and support our infection control measures effectively.`,
      logo: t3,
      name: "Nipun Hospital",
      location: "Thane / Maharashtra"
    },
    {
      text: `StemRx Hospital values Raj Enterprise for providing premium hospital linen that promotes patient comfort and adheres to stringent hygiene protocols. Their consistent quality and reliable service make them an indispensable partner in our healthcare delivery.`,
      logo: t4,
      name: "StemRx Hospital",
      location: "Rabale / Maharashtra"
    },
    {
      text: `Burhani Hospital appreciates Raj Enterprise for supplying top-quality hospital linen that enhances patient comfort and upholds rigorous hygiene standards. Their reliable deliveries and exceptional customer service demonstrate a commitment to excellence, making them a trusted partner in our healthcare environment.`,
      logo: t5,
      name: "Burhani Hospital",
      location: "Mumbra / Maharashtra"
    },
    {
      text: `Upasani Hospital trusts Raj Enterprise for delivering high-quality hospital linen that ensures patient comfort and meets strict hygiene standards. Their consistent reliability and dedication to service excellence make them a valued partner in our healthcare provision.`,
      logo: t6,
      name: "Upasani Hospital",
      location: "Mulund / Maharashtra"
    },
    {
      text: `Laxmi Eye Hospital values Raj Enterprise for their exceptional hospital linen, ensuring patient comfort and meeting stringent hygiene standards. Their reliable service and high-quality products contribute significantly to our operational excellence in healthcare.`,
      logo: t7,
      name: "Laxmi Eye Hospital",
      location: "Panvel / Maharashtra"
    }
  ];

  return (
    <>
    <div className="w-full max-w-5xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center text-[#005a7a] mb-10">
        Testimonials
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        slidesPerView={1}
        className="testimonials-swiper"
      >
        {reviews.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="text-center max-w-3xl mx-auto px-4">

              <p className="text-gray-700 text-lg leading-relaxed">
                “{item.text}”
              </p>

              <img
                src={item.logo}
                alt="logo"
                className="w-20 mx-auto mt-8"
              />

              <h3 className="mt-3 font-bold text-gray-900">{item.name}</h3>
              <p className="text-gray-500 text-sm pb-5">{item.location}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </>
  );
}
