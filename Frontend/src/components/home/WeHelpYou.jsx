import React from 'react'
import { useNavigate } from "react-router-dom";
import h1 from "../../assets/h1.png";
import h2 from "../../assets/h2.png";
import h3 from "../../assets/h3.png";

function WeHelpYou() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <section className="w-full py-15 px-6 md:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* LEFT IMAGES */}
            <div className="relative flex justify-center">

              <img
                src={h2}
                alt="Fabric Chart"
                className="w-80 md:w-96 rounded-2xl shadow-lg relative z-10"
              />

              <img
                src={h3}
                alt="Labels"
                className="w-40 mt-6 mr-3 absolute -top-6 right-0 rounded-xl shadow-lg z-20"
              />

              <img
                src={h1}
                alt="Medical Design"
                className="w-70 h-100 mr-5 md:ml-70 absolute -bottom-10 left-20 rounded-3xl shadow-xl z-30"
              />
            </div>

            {/* RIGHT TEXT */}
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-semibold text-[#003049] leading-snug">
                "We Help You Make <br /> Your Ideal Medical <br /> Professions Design" :
              </h2>

              <p className="mt-5 text-gray-700 leading-relaxed">
                At <span className="font-bold">ROSE GARMENT</span>, our dedicated team
                provides personalized advice and recommendations on our range of hospital
                linen products. We take the time to understand your needs and preferences
                to offer tailored solutions, whether it's scrubs, patient gowns, or other
                hospital apparel.
              </p>

              <p className="mt-4 font-semibold text-gray-800">
                ROSE GARMENT Provides Its Services Majorly To:
              </p>

              <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-3 text-gray-700 text-sm">
                <p>• Super-Speciality Hospital</p>
                <p>• Multi-Speciality Hospital</p>
                <p>• Eye Hospitals & Day Care Centres</p>
                <p>• Nursing & Maternity Homes</p>
                <p>• Diagnostic Labs</p>
                <p>• Health Care Centres Etc.</p>
              </div>

              <button
                onClick={() => navigate("/services")}
                className="mt-6 bg-[#003049] text-[#f2a900] font-semibold py-3 px-8 rounded-xl shadow-md hover:bg-[#000000] hover:text-white transition"
              >
                Explore
              </button>
            </div>

          </div>
        </section>
      </div>
    </>
  )
}

export default WeHelpYou
