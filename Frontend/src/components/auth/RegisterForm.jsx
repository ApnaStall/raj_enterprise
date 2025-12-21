import React, { useState } from "react";
import api from "../../utils/axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

function RegisterForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from || "/";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim())
      newErrors.name = "Full name is required";

    if (!formData.email.trim())
      newErrors.email = "Email is required";

    if (!formData.contact.trim())
      newErrors.contact = "Phone number is required";

    if (!formData.password.trim())
      newErrors.password = "Password is required";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length !== 0) return;

    try {
      setLoading(true);

      const res = await api.post("/api/user/register", formData);

      // ✅ AUTO LOGIN
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // 🔔 notify app
      window.dispatchEvent(new Event("auth-change"));

      navigate(redirectPath, { replace: true });
    } catch (err) {
      setServerError(
        err.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const googleRegister = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);
        setServerError("");

        const res = await api.post("/api/user/google-login", {
          access_token: tokenResponse.access_token,
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        window.dispatchEvent(new Event("auth-change"));
        navigate(redirectPath, { replace: true });

      } catch (err) {
        setServerError("Google sign up failed");
      } finally {
        setLoading(false);
      }
    },
    onError: () => setServerError("Google sign up failed"),
  });

  return (
    <>
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* NAME */}
      <div>
        <label className="text-sm font-semibold text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          className="w-full mt-1 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#03519F]"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      {/* EMAIL */}
      <div>
        <label className="text-sm font-semibold text-gray-700">
          Email
        </label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          className="w-full mt-1 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#03519F]"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      {/* PHONE */}
      <div>
        <label className="text-sm font-semibold text-gray-700">
          Phone Number
        </label>
        <input
          type="text"
          name="contact"
          onChange={handleChange}
          className="w-full mt-1 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#03519F]"
        />
        {errors.contact && (
          <p className="text-red-500 text-sm">{errors.contact}</p>
        )}
      </div>

      {/* PASSWORD */}
      <div>
        <label className="text-sm font-semibold text-gray-700">
          Password
        </label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          className="w-full mt-1 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#03519F]"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
      </div>

      {serverError && (
        <p className="text-red-600 text-center">{serverError}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-[#03519F] text-white rounded-lg 
          font-semibold hover:bg-[#023d78] transition shadow-md
          disabled:opacity-60 cursor-pointer"
      >
        {loading ? "Creating account..." : "Register"}
      </button>
      
      <div className="relative my-3 text-center text-sm text-gray-500">
        <span className="px-2">OR</span>
      </div>

      {/* GOOGLE REGISTER */}
      <div className="flex justify-center">
        <button
        type="button"
        onClick={() => googleRegister()}
        disabled={loading}
        className="w-full py-3 border border-gray-300 rounded-lg 
                  flex items-center justify-center gap-3
                  hover:bg-gray-50 transition shadow-sm
                  disabled:opacity-60"
      >
        <img
          src="https://developers.google.com/identity/images/g-logo.png"
          alt="Google"
          className="w-5 h-5"
        />
        <span className="font-medium text-gray-700">
          Continue with Google
        </span>
      </button>

      </div>

    </form>
    </>
  );
}

export default RegisterForm;
