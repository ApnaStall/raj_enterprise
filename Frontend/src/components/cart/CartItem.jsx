import { useCart } from "../../context/CartContext";

function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <>
    <div className="flex gap-6 items-center bg-white rounded-2xl shadow-md p-6 border">
      {item.image && (
        <img
          src={item.image}
          alt={item.name}
          className="w-24 h-24 object-contain rounded-lg"
        />
      )}

      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">
          {item.name}
        </h3>
        <p className="text-gray-600 mt-1">
          ₹{item.price}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() =>
            updateQuantity(item._id, Math.max(1, item.quantity - 1))
          }
          className="w-9 h-9 rounded-full border text-lg font-semibold hover:bg-gray-100"
        >
          −
        </button>

        <span className="min-w-[30px] text-center font-medium">
          {item.quantity}
        </span>

        <button
          onClick={() =>
            updateQuantity(item._id, item.quantity + 1)
          }
          className="w-9 h-9 rounded-full border text-lg font-semibold hover:bg-gray-100"
        >
          +
        </button>
      </div>

      <button
        onClick={() => removeFromCart(item._id)}
        className="text-red-500 hover:text-red-700 font-medium"
      >
        Remove
      </button>
    </div>
    </>
  );
}

export default CartItem;
