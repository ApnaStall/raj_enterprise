import React from "react";
import { FaShippingFast } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import { AiOutlineCustomerService } from "react-icons/ai";
import { IoTimeOutline } from "react-icons/io5";
import h1 from "../../assets/h1.png";

export function WhyChooseUsTiles() {
  const items = [
    {
      icon: <FaShippingFast size={32} className="text-[#003049]" />,
      title: "Fast & Free Shipping",
      desc: "Enjoy lightning-fast delivery with our complimentary shipping service, ensuring your order reaches you promptly and hassle-free.",
    },
    {
      icon: <MdOutlineShoppingBag size={32} className="text-[#003049]" />,
      title: "Easy to Shop",
      desc: "Shop effortlessly with our user-friendly platform, offering a seamless browsing experience and hassle-free checkout.",
    },
    {
      icon: <AiOutlineCustomerService size={32} className="text-[#003049]" />,
      title: "24/7 Support",
      desc: "We're here for you anytime. Need help? Reach out day or night, and we'll assist you right away.",
    },
    {
      icon: <IoTimeOutline size={32} className="text-[#003049]" />,
      title: "48 hours*",
      desc: "All O.T. Cloth Item Will Be Delivered Within 36 Hours*.",
    },
  ];

  return (
    <>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 m-20">
      {items.map((item, index) => (
        <div key={index} className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shadow-sm">
              {item.icon}
            </div>
          </div>
          <h3 className="font-semibold text-lg text-[#003049]">{item.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
    </>
  );
}

export default function WhyChooseUs() {
  return (
    <>
    <section className="w-full py-16 px-6 md:px-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

        <div>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#003049]">
            Why Choose Us
          </h2>

          <ul className="list-disc ml-5 mt-3 mb-10">
            <li>
              Commitment to Quality and Compliance:<br />
              At <b>Raj Enterprise</b>, we prioritize quality control and strict adherence to industry regulations.
              Our dedication to producing linen garments that meet the highest standards of hygiene, durability, and safety is unwavering.
              You can trust us to provide you with products that uphold the integrity of your healthcare environment.
            </li>
          </ul>
          <WhyChooseUsTiles />
        </div>

        <div className="relative flex justify-center">

          <img
            src={h1}
            alt="Why Choose Us"
            className="rounded-3xl shadow-lg w-full max-w-md ml-20 z-10"
          />
        </div>

      </div>
    </section>
    </>
  );
}
