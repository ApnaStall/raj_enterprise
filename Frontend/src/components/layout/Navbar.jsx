import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { logout } from "../../utils/auth";

import {
  FaHome,
  FaTrophy,
  FaInfoCircle,
  FaShoppingCart,
  FaUserCircle,
  FaSignOutAlt,
  FaBoxOpen
} from "react-icons/fa";

import { BsShopWindow } from "react-icons/bs";
import { PiPackageFill } from "react-icons/pi";
import { RiWechatLine } from "react-icons/ri";

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const isLoggedIn = !!localStorage.getItem("token");

  // ✅ USER STATE (for avatar auto-update)
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  useEffect(() => {
    const syncUser = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("auth-change", syncUser);
    return () => window.removeEventListener("auth-change", syncUser);
  }, []);

  const { cart } = useCart();

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const handleLogout = () => {
    logout(); // removes token + user
    window.dispatchEvent(new Event("auth-change"));
    setOpen(false);
    navigate("/login");
  };

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-full transition hover:text-white
     ${isActive ? "bg-white text-[#03519f]" : "text-[#b3c7d2]"}`;

  const buttonClasses =
    "flex items-center gap-2 px-4 py-2 text-[#b3c7d2] hover:bg-white hover:text-[#03519f] rounded-full transition";

    const getInitials = (name = "") => {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0]?.toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  return (
    <nav className="w-full bg-linear-to-r from-[#00e0e8] to-[#03519f]
                    text-white fixed top-0 left-0 z-50">

      <div className="max-w-10xl mx-auto flex items-center justify-between px-4 py-6">

        {/* LOGO */}
        <div
          className="flex items-center justify-between w-full md:w-auto cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <img src={logo} alt="Logo" className="w-10 h-10 rounded-full mr-3" />
          <h1 className="text-2xl font-bold tracking-wide">
            Raj Enterprice
          </h1>
          <span className="md:hidden text-white text-3xl ml-4 mr-5">
            ☰
          </span>
        </div>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex gap-2u text-lg font-medium items-center">

          <NavLink to="/" className={linkClasses}><FaHome /> Home</NavLink>
          <NavLink to="/shop" className={linkClasses}><BsShopWindow /> Shop</NavLink>
          <NavLink to="/services" className={linkClasses}><PiPackageFill /> Services</NavLink>
          <NavLink to="/quality" className={linkClasses}><FaTrophy /> Quality</NavLink>
          <NavLink to="/about" className={linkClasses}><FaInfoCircle /> About Us</NavLink>
          <NavLink to="/contact" className={linkClasses}><RiWechatLine /> Contact Us</NavLink>

          {/* CART */}
          <NavLink to="/cart" className={linkClasses}>
            <div className="relative flex items-center gap-2">
              <FaShoppingCart /> Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-white text-blue-600
                                 text-xs w-5 h-5 flex items-center justify-center
                                 rounded-full">
                  {cartCount}
                </span>
              )}
            </div>
          </NavLink>

          {/* AUTH AREA */}
          {isLoggedIn ? (
            <div className="relative">

              {/* PROFILE BUTTON */}
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full
                           text-[#b3c7d2] hover:bg-white hover:text-[#03519f]
                           transition"
              >
                {/* ✅ AVATAR */}
                {user?.profilePhoto ? (
                  <img
                    src={user.profilePhoto}
                    alt="Avatar"
                    className="w-7 h-7 rounded-full object-cover"
                  />
                ) : user?.name ? (
                  <div className="w-7 h-7 rounded-full bg-white text-[#03519f]
                                  flex items-center justify-center font-semibold text-xs">
                    {getInitials(user.name)}
                  </div>
                ) : (
                  <FaUserCircle size={22} />
                )}

                <span>{user?.name || "Profile"}</span>
              </button>

              {/* DROPDOWN */}
              {profileOpen && (
                <div className="absolute right-0 mt-3 w-44 bg-white
                                rounded-xl shadow-lg overflow-hidden z-50">

                  <NavLink
                    to="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-3
                               hover:bg-gray-100 text-gray-700"
                  >
                    <FaUserCircle /> Profile
                  </NavLink>

                  <NavLink
                    to="/orders"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-3
                               hover:bg-gray-100 text-gray-700"
                  >
                    <FaBoxOpen /> My Orders
                  </NavLink>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-3
                               hover:bg-red-50 text-red-600"
                  >
                    <FaSignOutAlt /> Logout
                  </button>

                </div>
              )}
            </div>
          ) : (
            <NavLink to="/login" className={buttonClasses}>
              Login
            </NavLink>
          )}
        </ul>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <ul className="md:hidden flex flex-col gap-4 py-4 px-6 text-lg font-medium">

          <NavLink to="/" onClick={() => setOpen(false)} className={linkClasses}><FaHome /> Home</NavLink>
          <NavLink to="/shop" onClick={() => setOpen(false)} className={linkClasses}><BsShopWindow /> Shop</NavLink>
          <NavLink to="/services" onClick={() => setOpen(false)} className={linkClasses}><PiPackageFill /> Services</NavLink>
          <NavLink to="/quality" onClick={() => setOpen(false)} className={linkClasses}><FaTrophy /> Quality</NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)} className={linkClasses}><FaInfoCircle /> About Us</NavLink>
          <NavLink to="/contact" onClick={() => setOpen(false)} className={linkClasses}><RiWechatLine /> Contact Us</NavLink>

          <NavLink to="/cart" onClick={() => setOpen(false)} className={linkClasses}>
            <FaShoppingCart /> Cart ({cartCount})
          </NavLink>

          {isLoggedIn ? (
            <>
              <NavLink to="/profile" onClick={() => setOpen(false)} className={linkClasses}>
                <FaUserCircle /> Profile
              </NavLink>

              <NavLink to="/orders" onClick={() => setOpen(false)} className={linkClasses}>
                <FaBoxOpen /> My Orders
              </NavLink>

              <button onClick={handleLogout} className={buttonClasses}>
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" onClick={() => setOpen(false)} className={buttonClasses}>
              Login
            </NavLink>
          )}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
