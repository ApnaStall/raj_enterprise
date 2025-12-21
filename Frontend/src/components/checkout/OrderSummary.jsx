import { useNavigate } from "react-router-dom";
import api from "../../utils/axios";
import { useCart } from "../../context/CartContext";
import { useState } from "react";

function OrderSummary({ address }) {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const safeCart = Array.isArray(cart) ? cart : [];

  const totalAmount = safeCart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    setError("");

    // ✅ Validation
    if (!address || address.trim().length < 5) {
      setError("Please enter a delivery address");
      return;
    }

    if (safeCart.length === 0) {
      setError("Your cart is empty");
      return;
    }

    // ✅ Convert cart → backend format
    const items = safeCart.map((item) => ({
      product_id: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }));

    try {
      setLoading(true);

      const res = await api.post("/api/checkout", {
        customer_address: address,
        items,
        total_amount: totalAmount,
        payment_method: paymentMethod
      });

      // ✅ Clear cart
      safeCart.forEach((item) => removeFromCart(item._id));

      // 🔀 Redirect based on payment method
      if (paymentMethod === "COD") {
        navigate("/orders", {
          state: { orderPlaced: true }
        });
      } else {
        navigate("/payment", {
          state: {
            orderId: res.data.orderId,
            amount: totalAmount
          }
        });
      }

    } catch (err) {
      if (err.response?.data?.code === "PROFILE_INCOMPLETE") {
        navigate("/profile", {
          state: { fromCheckout: true }
        });
      } else {
        setError(err.response?.data?.message || "Checkout failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h2 className="text-xl font-semibold text-[#03519F] mb-4">
        Order Summary
      </h2>

      {safeCart.map((item) => (
        <div key={item._id} className="flex justify-between mb-2 text-sm">
          <span>
            {item.name} × {item.quantity}
          </span>
          <span>₹{item.price * item.quantity}</span>
        </div>
      ))}

      <hr className="my-3" />

      <div className="flex justify-between font-semibold mb-3">
        <span>Total</span>
        <span>₹{totalAmount}</span>
      </div>

      {error && (
        <p className="text-red-600 text-sm mb-2">{error}</p>
      )}

      {/* PAYMENT METHOD */}
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Payment Method</h4>

        <label className="flex items-center gap-2 mb-2 cursor-pointer">
          <input
            type="radio"
            name="paymentMethod"
            value="COD"
            checked={paymentMethod === "COD"}
            onChange={() => setPaymentMethod("COD")}
          />
          <span>Cash on Delivery</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="paymentMethod"
            value="ONLINE"
            checked={paymentMethod === "ONLINE"}
            onChange={() => setPaymentMethod("ONLINE")}
          />
          <span>Online Payment</span>
        </label>
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={loading}
        className="w-full bg-[#03519F] text-white py-3 rounded-lg font-semibold
                   hover:bg-[#023d78] transition disabled:opacity-60"
      >
        {loading
          ? "Placing Order..."
          : paymentMethod === "COD"
          ? "Place Order"
          : "Proceed to Payment"}
      </button>

      <p className="text-xs text-gray-500 mt-2 text-center">
        Selected Payment: <b>{paymentMethod === "COD" ? "Cash on Delivery" : "Online Payment"}</b>
      </p>
    </div>
  );
}

export default OrderSummary;
