import React from 'react';
import { useNavigate } from "react-router-dom";

function CraftedWith() {

  const navigate = useNavigate();

  return (
    <>
      <div  className="mt-30">
        <section className="w-full py-10 px-6 md:px-20">
          <div className="items-center mx-auto text-start">
            
            <h2 className="text-3xl md:text-4xl font-semibold text-[#003049] mb-4">
              Crafted with excellent material.
            </h2>

            <p className="text-gray-700 leading-relaxed text-lg">
              "At <span className="font-bold">Raj Enterprise</span>, we specialize in crafting hospital linen clothes 
              with exceptional attention to quality and durability. Each garment is meticulously crafted 
              using premium materials to ensure comfort, longevity, and hygienic performance in healthcare 
              environments. Our commitment to excellence extends to every stitch, providing healthcare 
              professionals with attire they can trust."
            </p>

            <button
              onClick={() => navigate("/Shop")}
              className="mt-6 bg-[#003049] text-[#f2a900] font-semibold py-3 px-8 rounded-xl shadow-md hover:bg-[#000000] hover:text-white transition"
            >
              Explore
            </button>

          </div>
        </section>
      </div>
    </>
  );
}

export default CraftedWith;
