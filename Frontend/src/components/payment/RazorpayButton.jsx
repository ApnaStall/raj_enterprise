import { useState } from "react";
import api from "../../utils/axios";
import { useNavigate } from "react-router-dom";

function RazorpayButton({ orderId, amount }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadRazorpay = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    setLoading(true);

    const loaded = await loadRazorpay();
    if (!loaded) {
      alert("Razorpay SDK failed to load");
      setLoading(false);
      return;
    }

    try {
      // 1️⃣ Create Razorpay order from backend
      const res = await api.post("/api/payment/create-order", {
        orderId,
        amount
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: res.data.amount,
        currency: "INR",
        name: "Raj Enterprise",
        description: "Order Payment",
        order_id: res.data.razorpayOrderId,

        handler: async function (response) {
          // 2️⃣ Verify payment
          await api.post("/api/payment/verify", {
            orderId,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          });

          // 3️⃣ Redirect
          navigate("/profile", {
            state: { paymentSuccess: true }
          });
        },

        theme: { color: "#03519F" }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      alert("Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="w-full bg-[#03519F] text-white py-3 rounded-lg font-semibold
                 hover:bg-[#023d78] transition disabled:opacity-60 cursor-pointer"
    >
      {loading ? "Processing..." : "Pay Now"}
    </button>
  );
}

export default RazorpayButton;
