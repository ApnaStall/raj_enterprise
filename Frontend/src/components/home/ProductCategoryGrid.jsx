import { useNavigate } from "react-router-dom";
import cc1 from "../../assets/cc1.png";
import cc2 from "../../assets/cc2.png";
import cc3 from "../../assets/cc3.png";
import cc4 from "../../assets/cc4.png";

export default function ProductCategoryGrid() {
  const navigate = useNavigate();

  const categories = [
    {
      title: "O.T. Linen",
      image: cc1,
    },
    {
      title: "Staff Uniform",
      image: cc2,
    },
    {
      title: "Doctor Scrub",
      image: cc3,
    },
    {
      title: "Patient Dress",
      image: cc4,
    },
  ];

  const handleNavigate = (category) => {
    navigate(`/shop?category=${encodeURIComponent(category)}`);
  };

  return (
    <section className="py-16 px-6 md:px-20">
      <h2 className="text-3xl font-semibold text-center mb-12 text-[#003049]">
        Browse by Category
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => handleNavigate(cat.title)}
            className="cursor-pointer w-full max-w-xs mx-auto"
          >
            {/* SAME STRUCTURE AS ProductCard */}
            <div
              className="group relative rounded-2xl p-5 pb-14
                         transition-all duration-300
                         hover:bg-linear-to-b from-[#00DFE7] to-white
                         shadow-md flex flex-col items-center"
            >
              {/* IMAGE */}
              <img
                src={cat.image}
                alt={cat.title}
                className="h-60 object-contain mb-4 z-10
                           translate-y-4 group-hover:translate-y-0
                           transition-all duration-300"
              />

              {/* TITLE */}
              <h2 className="text-lg font-medium text-gray-800 text-center">
                {cat.title}
              </h2>

              {/* CTA BUTTON (instead of price/cart) */}
              <div
                className="absolute left-1/2 bottom-5
                           -translate-x-1/2
                           px-6 py-2 rounded-full
                           bg-black text-white text-sm font-semibold
                           opacity-0 translate-y-3
                           group-hover:opacity-100 group-hover:translate-y-0
                           transition-all duration-300 z-20"
              >
                Explore
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
