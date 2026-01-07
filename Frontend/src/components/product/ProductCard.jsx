import React from "react";
import { useCart } from "../../context/CartContext";

const ProductCard = ({ _id, image, title, price }) => {
  const { addToCart } = useCart();

  return (
    <div className="w-full max-w-xs mx-auto">
      {/* GROUP */}
      <div
        className="group relative rounded-2xl p-5 pb-20
                   transition-all duration-300
                   hover:bg-linear-to-b from-[#00DFE7] to-white
                   shadow-md flex flex-col items-center"
      >
        {/* PRODUCT IMAGE */}
        <img
          src={image}
          alt={title}
          className="h-80 object-contain mb-4 z-10
                     translate-y-4 group-hover:translate-y-0
                     transition-all duration-300"
        />

        {/* TEXT */}
        <h2 className="text-lg font-medium text-gray-800 text-center">
          {title}
        </h2>

        <p className="text-xl font-semibold text-gray-900 mt-1">
          ₹{price}/-
        </p>

        {/* ADD TO CART BUTTON */}
        <button
          onClick={() =>
            addToCart({ _id, image, name: title, price })
          }
          className="
            absolute left-1/2 bottom-5
            -translate-x-1/2
            w-12 h-12 rounded-full
            bg-black text-white text-2xl
            z-20 cursor-pointer

            /* MOBILE (default): visible */
            opacity-100 translate-y-0

            /* DESKTOP ONLY: hover behavior */
            md:opacity-0 md:translate-y-3
            md:group-hover:opacity-100
            md:group-hover:translate-y-0

            transition-all duration-300
          "
          aria-label="Add to cart"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
