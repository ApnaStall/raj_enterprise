import React from "react";
import { useCart } from "../../context/CartContext";

function CartItemsCard({
  items = [],
  onIncrease,
  onDecrease,
  onRemove,
  readonly = false
}) {
  return (
    <div className="border rounded-2xl p-6 shadow-sm bg-white">
      <h2 className="text-xl font-semibold text-[#03519F] mb-4">
        Shopping Cart
      </h2>

      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        items.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between border rounded-xl p-4 mb-4"
          >
            {/* LEFT: IMAGE + INFO */}
            <div className="flex items-center gap-4">
              <img
                src={item.image || "/placeholder.png"}
                alt={item.name}
                className="w-20 h-24 object-contain"
              />

              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">₹{item.price}</p>
              </div>
            </div>

            {/* RIGHT: QUANTITY + REMOVE */}
            <div className="flex items-center gap-6">
              {!readonly && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onDecrease(item._id)}
                    className="w-8 h-8 rounded-full border text-lg"
                  >
                    −
                  </button>

                  <span className="w-6 text-center">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => onIncrease(item._id)}
                    className="w-8 h-8 rounded-full border text-lg"
                  >
                    +
                  </button>
                </div>
              )}

              {!readonly && (
                <button
                  onClick={() => onRemove(item._id)}
                  className="text-red-500 text-sm font-medium"
                >
                  Remove
                </button>
              )}

              {readonly && (
                <span className="font-medium">
                  × {item.quantity}
                </span>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default CartItemsCard;
