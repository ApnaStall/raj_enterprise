import React, { useState } from "react";
import api from "../../utils/axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();

  // fallback is home page
  const redirectPath = location.state?.from || "/";

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    let newErrors = {};
    if (!formData.identifier.trim())
      newErrors.identifier = "Email or phone is required";
    if (!formData.password.trim())
      newErrors.password = "Password is required";
    return newErrors;
  };

  const handleRedirect = (user) => {
    if (user?.role === "admin") {
      navigate("/admin/dashboard", { replace: true });
    } else {
      navigate(redirectPath, { replace: true });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length !== 0) return;

    try {
      setLoading(true);

      const res = await api.post("/api/user/login", formData);

      // ✅ Save token + user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // 🔔 notify app
      window.dispatchEvent(new Event("auth-change"));

      // ✅ Role-based redirect
      handleRedirect(res.data.user);
    } catch (err) {
      setServerError(
        err.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
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

        // ✅ Role-based redirect
        handleRedirect(res.data.user);
      } catch (err) {
        setServerError("Google login failed");
      } finally {
        setLoading(false);
      }
    },
    onError: () => setServerError("Google login failed"),
  });

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* IDENTIFIER */}
        <div>
          <label className="text-sm font-semibold text-gray-700">
            Email or Phone
          </label>
          <input
            type="text"
            name="identifier"
            onChange={handleChange}
            className={`w-full mt-1 p-3 border rounded-lg outline-none
              ${errors.identifier ? "border-red-500" : "focus:ring-2 focus:ring-[#03519F]"}`}
          />
          {errors.identifier && (
            <p className="text-red-500 text-sm">{errors.identifier}</p>
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
            className={`w-full mt-1 p-3 border rounded-lg outline-none
              ${errors.password ? "border-red-500" : "focus:ring-2 focus:ring-[#03519F]"}`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        {/* SERVER ERROR */}
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
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="relative my-3 text-center text-sm text-gray-500">
          <span className="px-2">OR</span>
        </div>

        {/* GOOGLE LOGIN */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => googleLogin()}
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

export default LoginForm;
