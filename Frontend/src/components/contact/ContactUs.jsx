import React, { useState } from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import cu1 from '../../assets/cu1.png';

function ContactUs() {

  const [toast, setToast] = useState(null);

  // Simple reusable function for showing toast
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000); // Hide after 2s
  };

  return (
    <>
      <div className="w-full bg-white py-16 px-6 md:px-16 mt-20">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-5xl font-bold mb-6">Contact Us</h2>

            <p className="text-lg leading-relaxed text-gray-800 mb-8">
              Thank you for considering Raj Enterprise for your hospital linen needs.
              We are dedicated to hygiene and comfort care. If you have any questions, need assistance
              with your order, or would like to discuss custom solutions, please feel
              free to contact us. Your satisfaction is our priority, and we look
              forward to serving you with excellence. Reach out to us today – We're
              here to help!
            </p>

            <div className="flex gap-4">
              {/* CALL BUTTON */}
              <a
                href="tel:+919137849641"
                className="px-6 py-2 border-2 border-[#234c54] bg-[#004152] text-white rounded-md font-semibold"
                onClick={() => showToast("Calling… (number copied)") }
              >
                Call Us
              </a>

              {/* MAIL BUTTON */}
              <a
                href="mailto:rosegarment2013@gmail.com"
                className="px-6 py-2 border-2 border-[#234c54] text-[#004152] rounded-md font-semibold"
                onClick={() => showToast("Email copied!") }
              >
                Mail Us
              </a>
            </div>
          </div>

          <div className="flex justify-center md:justify-center">
            <img
              src={cu1}
              alt="10 Years Badge"
              className="w-80 md:w-96 object-contain"
            />
          </div>
        </div>

        <div className="my-20"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-lg text-gray-800 md:ml-30">

          <div className="flex items-center gap-4">
            <div className="bg-[#3B5D50] p-3 rounded-lg text-white">
              <FaMapMarkerAlt size={24} />
            </div>
            <p>
              Vikroli Park Site,
              Ghatkopar, Mumbai
              Maharashtra - 400079 (MH.)
            </p>
          </div>

          <div className="flex items-center gap-4 md:ml-12">
            <div className="bg-[#3B5D50] p-3 rounded-lg text-white">
              <FaEnvelope size={22} />
            </div>
            <p
              className="cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText("rajenterprise04117@gmail.com");
                showToast("Email copied!");
              }}
            >
              rajenterprise04117@gmail.com
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-[#3B5D50] p-3 rounded-lg text-white rotate-90">
              <FaPhone size={22} />
            </div>
            <p
              className="cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText("+919137849641");
                showToast("Phone number copied!");
              }}
            >
              +91 91378 49641
            </p>
          </div>
        </div>
      </div>

      {/* 🔥 Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-lg shadow-lg animate-fade">
          {toast}
        </div>
      )}
    </>
  );
}

export default ContactUs;
