import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaFacebookF,
  FaWhatsapp,
  FaEnvelope,
  FaInstagram,
  FaPaperPlane,
} from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import logo from "../../assets/logo.jpg";

export default function Footer() {
  const navigate = useNavigate();
  const [showTerms, setShowTerms] = useState(false);

  return (
    <>
      <footer className="mt-20 bg-white text-gray-700">
        {/* Subscribe section */}
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex flex-col gap-6 w-full">
              <div className="flex items-center gap-2 text-[#3c5f50] font-medium text-xl">
                <IoIosMail size={30} />
                Subscribe To Get An Update
              </div>

              <div className="flex flex-col md:flex-row gap-4 w-full">
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                />
                <input
                  type="text"
                  placeholder="Enter your Contact No"
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                />
                <button className="flex bg-[#3c5f50] text-white px-6 py-2 rounded-md">
                  <FaPaperPlane className="mt-1 mr-2" />
                  Subscribe
                </button>
              </div>
            </div>

            <img
              src={logo}
              className="w-60 h-60 mx-auto md:mx-0"
              alt="Raj Enterprise Logo"
            />
          </div>
        </div>

        {/* Main footer grid */}
        <div className="max-w-6xl mx-auto px-4 py-5 grid grid-cols-1 md:grid-cols-5 gap-10">
          <div>
            <h2
              onClick={() => navigate("/")}
              className="text-2xl font-semibold text-[#3c5f50] cursor-pointer"
            >
              Raj Enterprise
            </h2>

            <p className="mt-3 text-gray-600 leading-relaxed">
              "ROSE GARMENT specializes in hospital uniforms and linen, serving
              over 200 hospitals across Mumbai since 2013, covering Central,
              Western, Harbour, and Trans Harbour zones."
            </p>

            <div className="flex gap-3 mt-5">
              {[FaFacebookF, FaWhatsapp, FaEnvelope, FaInstagram].map(
                (Icon, i) => (
                  <span
                    key={i}
                    className="w-10 h-10 flex justify-center items-center bg-[#E8EFEF] rounded-full text-gray-700 hover:bg-[#3c5f50] hover:text-white cursor-pointer"
                  >
                    <Icon />
                  </span>
                )
              )}
            </div>
          </div>

          {/* Company links */}
          <div className="space-y-2">
            <p>
              <Link to="/About" className="hover:underline hover:text-gray-400">
                About us
              </Link>
            </p>
            <p>
              <Link to="/Services" className="hover:underline hover:text-gray-400">
                Services
              </Link>
            </p>
            <p>
              <Link to="/Quality" className="hover:underline hover:text-gray-400">
                Quality Assurance
              </Link>
            </p>
            <p>
              <Link to="/Contact" className="hover:underline hover:text-gray-400">
                Contact Us
              </Link>
            </p>
          </div>

          {/* Product categories */}
          <div className="space-y-2">
            <p>
              <Link
                to={`/shop?category=${encodeURIComponent("O.T. Linen")}`}
                className="hover:underline hover:text-gray-400"
              >
                O.T. Linen
              </Link>
            </p>
            <p>
              <Link
                to={`/shop?category=${encodeURIComponent("Doctor Scrub")}`}
                className="hover:underline hover:text-gray-400"
              >
                Doctor Scrub
              </Link>
            </p>
            <p>
              <Link
                to={`/shop?category=${encodeURIComponent("Staff Uniform")}`}
                className="hover:underline hover:text-gray-400"
              >
                Uniform Dress
              </Link>
            </p>
            <p>
              <Link
                to={`/shop?category=${encodeURIComponent("Patient Dress")}`}
                className="hover:underline hover:text-gray-400"
              >
                Patient Dress
              </Link>
            </p>
          </div>

          {/* Downloads & misc */}
          <div className="space-y-2">
            <p>
              <a
                href="/Rate_List.pdf"
                download
                className="hover:underline hover:text-gray-400"
              >
                Rate List
              </a>
            </p>
            <p className="hover:underline hover:text-gray-400 cursor-pointer">
              Our Team
            </p>
            <p className="hover:underline hover:text-gray-400 cursor-pointer">
              Leadership
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <p>Proprietor -</p>
            <p>Harmeet Singh, Ravindra Singh</p>
            <p className="font-semibold">
              +91 9137849641, +91 9769414402
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="bg-[#E8EFEF] py-4 text-center text-sm text-gray-700">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-3">
            <p>
              Copyright ©2025. All Rights Reserved. — Designed by{" "}
              <span className="font-semibold">
                Rudra Parekh and Dax Patel
              </span>
            </p>

            <div className="flex gap-6">
              <button
                onClick={() => setShowTerms(true)}
                className="hover:underline hover:text-gray-400 cursor-pointer bg-transparent border-none p-0"
              >
                Terms & Conditions
              </button>
              <span className="hover:underline hover:text-gray-400 cursor-pointer">
                Privacy Policy
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* TERMS MODAL */}
      {showTerms && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white max-w-lg w-full mx-4 rounded-2xl shadow-xl p-6 relative">
            <button
              onClick={() => setShowTerms(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold mb-4 text-[#003b4d]">
              Terms & Conditions
            </h2>

            <div className="text-gray-700 text-sm space-y-3 max-h-[60vh] overflow-y-auto">
              <p>
                Fast to Normal Wash.
              </p>
              <p>
                Extra charges for embroidery.
              </p>
              <p>
                No gurantee for Bleach, Chemical & Industrial Wash.
              </p>
              <p>
                At the time of AUTOCLAVE Keep Imported Cloth Inside & Normal Cloth Outside.
              </p>
              <p>
                Delivery against Payment.
              </p>
              <p>
                Please Send us the P. O. After the Confirmation of Order.
              </p>
              <p>
                Good Once Sold will not be Taken Back.
              </p>
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={() => setShowTerms(false)}
                className="bg-[#003b4d] text-white px-6 py-2 rounded-lg hover:bg-[#002733]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
