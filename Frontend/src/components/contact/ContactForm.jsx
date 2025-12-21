import React, { useState } from "react";
import axios from "axios";
import { log, error } from "../../utils/logger";

function ContactForm() {
  const [formData, setFormData] = useState({
    f_name: "",
    l_name: "",
    email: "",
    contact: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  // Helpers
  const isEmail = (value) => /\S+@\S+\.\S+/.test(value);
  const isPhone = (value) => /^[0-9]{10}$/.test(value);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validation
  const validateForm = () => {
    let newErrors = {};

    if (!formData.f_name.trim())
      newErrors.f_name = "First name is required.";

    if (!formData.l_name.trim())
      newErrors.l_name = "Last name is required.";

    if (!formData.email.trim())
      newErrors.email = "Email is required.";
    else if (!isEmail(formData.email))
      newErrors.email = "Enter a valid email.";

    if (!formData.contact.trim())
      newErrors.contact = "Contact number is required.";
    else if (!isPhone(formData.contact))
      newErrors.contact = "Enter a valid 10-digit phone number.";

    if (!formData.message.trim())
      newErrors.message = "Message cannot be empty.";
    else if (formData.message.length < 10)
      newErrors.message = "Message must be at least 10 characters.";

    return newErrors;
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    // If no errors → send to backend
    if (Object.keys(validationErrors).length === 0) {
      const fullName = `${formData.f_name} ${formData.l_name}`;

      const payload = {
        name: fullName,
        email: formData.email,
        phone: formData.contact,
        message: formData.message,
      };

      try {
        await axios.post("http://localhost:5000/api/contact", payload);

        alert("Message sent successfully!");

        // Reset Form
        setFormData({
          f_name: "",
          l_name: "",
          email: "",
          contact: "",
          message: "",
        });

      } catch (err) {
        error(err);
        alert("Something went wrong! Try again.");
      }
    }
  };

  return (
    <>
    <div>
      <section className="w-full px-6 md:px-20 py-16">

        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">

          {/* FIRST + LAST NAME */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* FIRST NAME */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                First name
              </label>
              <input
                type="text"
                name="f_name"
                value={formData.f_name}
                onChange={handleChange}
                placeholder="First Name"
                className={`w-full border rounded-md px-4 py-3 
                  ${errors.f_name ? "border-red-500" : "border-gray-300 focus:ring-2 focus:ring-blue-400"}
                `}
              />
              {errors.f_name && (
                <p className="text-red-500 text-sm mt-1">{errors.f_name}</p>
              )}
            </div>

            {/* LAST NAME */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Last name
              </label>
              <input
                type="text"
                name="l_name"
                value={formData.l_name}
                onChange={handleChange}
                placeholder="Last Name"
                className={`w-full border rounded-md px-4 py-3 
                  ${errors.l_name ? "border-red-500" : "border-gray-300 focus:ring-2 focus:ring-blue-400"}
                `}
              />
              {errors.l_name && (
                <p className="text-red-500 text-sm mt-1">{errors.l_name}</p>
              )}
            </div>

          </div>

          {/* EMAIL */}
          <div className="mt-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className={`w-full border rounded-md px-4 py-3 
                ${errors.email ? "border-red-500" : "border-gray-300 focus:ring-2 focus:ring-blue-400"}
              `}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* CONTACT */}
          <div className="mt-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Contact No
            </label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="10-digit contact number"
              className={`w-full border rounded-md px-4 py-3 
                ${errors.contact ? "border-red-500" : "border-gray-300 focus:ring-2 focus:ring-blue-400"}
              `}
            />
            {errors.contact && (
              <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
            )}
          </div>

          {/* MESSAGE */}
          <div className="mt-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write anything..."
              rows={6}
              className={`w-full border rounded-md px-4 py-3 
                ${errors.message ? "border-red-500" : "border-gray-300 focus:ring-2 focus:ring-blue-400"}
              `}
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <div className="mt-10">
            <button
              type="submit"
              className="bg-[#003049] text-[#f2a900] font-medium px-10 py-3 rounded-xl shadow-md hover:bg-black hover:text-white transition"
            >
              Send Message
            </button>
          </div>

        </form>
      </section>
    </div>
    </>
  );
}

export default ContactForm;
