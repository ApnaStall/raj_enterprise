import { useNavigate, Link } from 'react-router-dom';
import { FaFacebookF, FaWhatsapp, FaEnvelope, FaInstagram, FaPaperPlane,  } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import logo from "../../assets/logo.jpg";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <>
    <footer className="mt-20 bg-white text-gray-700">

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
                <FaPaperPlane className="mt-1 mr-2" />Subscribe
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


      <div className="max-w-6xl mx-auto px-4 py-5 grid grid-cols-1 md:grid-cols-5 gap-10">

        <div>
          <a href="#"><h2 onClick={() => navigate("/")} className="text-2xl font-semibold text-[#3c5f50]">Raj Enterprise</h2></a>
          <p className="mt-3 text-gray-600 leading-relaxed">
            "ROSE GARMENT specializes in hospital uniforms and linen, serving over 200 hospitals across Mumbai since 2013, covering Central, Western, Harbour, and Trans Harbour zones."
          </p>

          <div className="flex gap-3 mt-5">
            <a href="#"><span className="w-10 h-10 flex justify-center items-center bg-[#E8EFEF] rounded-full text-gray-700 hover:bg-[#3c5f50] hover:text-white">
              <FaFacebookF />
            </span></a>
            <a href="#"><span className="w-10 h-10 flex justify-center items-center bg-[#E8EFEF] rounded-full text-gray-700 hover:bg-[#3c5f50] hover:text-white">
              <FaWhatsapp />
            </span></a>
            <a href="#"><span className="w-10 h-10 flex justify-center items-center bg-[#E8EFEF] rounded-full text-gray-700 hover:bg-[#3c5f50] hover:text-white">
              <FaEnvelope />
            </span></a>
            <a href="#"><span className="w-10 h-10 flex justify-center items-center bg-[#E8EFEF] rounded-full text-gray-700 hover:bg-[#3c5f50] hover:text-white">
              <FaInstagram />
            </span></a>
          </div>
        </div>

        <div className="space-y-2">
          <br /><br />
          <p><Link to="/About" className="hover:underline hover:text-gray-400 curson-pointer">About us</Link></p>
          <p><Link to="/Services" className="hover:underline hover:text-gray-400 curson-pointer">Services</Link></p>
          <p><Link to="/Quality" className="hover:underline hover:text-gray-400 curson-pointer">Quality Assurance</Link></p>
          <p><Link to="/Contact" className="hover:underline hover:text-gray-400 curson-pointer">Contact Us</Link></p>
        </div>

        <div className="space-y-2">
          <br /><br />
          <p><Link to="" className="hover:underline hover:text-gray-400 curson-pointer">Brochure</Link></p>
          <p><Link to="" className="hover:underline hover:text-gray-400 curson-pointer">Our team</Link></p>
          <p><Link to="" className="hover:underline hover:text-gray-400 curson-pointer">Leadership</Link></p>
          <p><Link to="" className="hover:underline hover:text-gray-400 curson-pointer">Privacy Policy</Link></p>
        </div>

        <div className="space-y-2">
          <br /><br />
          <p><Link to="" className="hover:underline hover:text-gray-400 curson-pointer">O.T. Linen</Link></p>
          <p><Link to="" className="hover:underline hover:text-gray-400 curson-pointer">Doctor Scrub</Link></p>
          <p><Link to="" className="hover:underline hover:text-gray-400 curson-pointer">Uniform Dress</Link></p>
          <p><Link to="" className="hover:underline hover:text-gray-400 curson-pointer">Patient Dress</Link></p>
        </div>

        <div className="space-y-2">
          <br /><br />
          <p>Proprietor -</p>
          <p>Harmeet Singh</p>
          <p className="font-semibold">+91 9137849641</p>
        </div>
      </div>

      <div className="bg-[#E8EFEF] py-4 text-center text-sm text-gray-700">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row 
                        justify-between items-center gap-3">

          <p>Copyright ©2025. All Rights Reserved. — Designed with love by
            <span className="font-semibold"> Rudra Parekh and Dax Patel</span>
          </p>

          <div className="flex gap-6">
            <Link to="" className="hover:underline hover:text-gray-400 curson-pointer">Terms & Conditions</Link>
            <Link to="" className="hover:underline hover:text-gray-400 curson-pointer">Privacy Policy</Link>
          </div>
        </div>
      </div>

    </footer>
    </>
  );
}
