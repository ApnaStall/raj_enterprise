import { useNavigate } from "react-router-dom";
import cc1 from "../../assets/cc1.png";
import cc2 from "../../assets/cc2.png";
import cc3 from "../../assets/cc3.png";
import cc4 from "../../assets/cc4.png";

export default function CategoryCard() {
  const navigate = useNavigate();

  const categories = [
    {
      image: cc1,
      title: "O.T. Linen",
      desc: "Efficiently outfitting hospitals with high-quality surgical attire.",
    },
    {
      image: cc2,
      title: "Staff Uniform",
      desc: "Functional and professional uniforms for hospital staff members.",
    },
    {
      image: cc3,
      title: "Doctor Scrub",
      desc: "Medical Professionals scrubs for doctors, designed for comfort.",
    },
    {
      image: cc4,
      title: "Patient Dress",
      desc: "Comfortable and practical patient attire for optimal recovery.",
    },
  ];

  const handleReadMore = (title) => {
    navigate(`/shop?category=${encodeURIComponent(title)}`);
  };

  return (
    <section className="w-full py-16 px-6 md:px-20">
      <div className="flex flex-wrap justify-center gap-15">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="flex flex-row items-center mr-20 md:mr-0 text-center w-full max-w-65 gap-8"
          >
            <div className="relative">
              <div className="absolute top-6 left-4 w-20 h-20 mt-10 bg-gray-200 rounded-3xl opacity-50"></div>

              <img
                src={cat.image}
                alt={cat.title}
                className="relative ml-5 z-10 w-30 h-50 object-cover"
              />
            </div>

            <div className="flex flex-col w-50 text-start ml-5">
              <h3 className="mt-3 text-lg font-semibold text-[#003049]">
                {cat.title}
              </h3>

              <p className="text-gray-600 mt-1 text-sm leading-relaxed">
                {cat.desc}
              </p>

              <button
                onClick={() => handleReadMore(cat.title)}
                className="mt-2 text-[#003049] font-semibold hover:text-gray-400 text-sm text-left"
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
