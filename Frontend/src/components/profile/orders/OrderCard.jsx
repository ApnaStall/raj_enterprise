import { useNavigate } from "react-router-dom";
import api from "../../../utils/axios";

function OrderCard({ order }) {
  const navigate = useNavigate();

  const canRetryPayment =
    order.payment_method === "ONLINE" &&
    order.payment_status === "pending";

  const downloadInvoice = async () => {
    try {
      const res = await api.get(
        `/api/invoice/${order._id}`,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(
        new Blob([res.data])
      );

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `invoice-${order._id}.pdf`
      );

      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert("Failed to download invoice");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">
          Order #{order._id.slice(-6)}
        </h3>

        <span
          className={`text-xs px-2 py-1 rounded-full ${
            order.payment_status === "paid"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {order.payment_status.toUpperCase()}
        </span>
      </div>

      {/* ITEMS */}
      <div className="space-y-1 text-sm">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex justify-between">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div className="flex justify-between mt-3 font-semibold text-sm">
        <span>Total</span>
        <span>₹{order.total_amount}</span>
      </div>

      <p className="text-xs text-gray-500 mt-1">
        Payment Method: {order.payment_method}
      </p>

      {/* ACTIONS */}
      {canRetryPayment && (
        <button
          onClick={() =>
            navigate("/payment", {
              state: {
                orderId: order._id,
                amount: order.total_amount
              }
            })
          }
          className="mt-4 w-full bg-[#03519F] text-white py-2 rounded-lg
                     hover:bg-[#023d78] transition text-sm font-semibold"
        >
          Retry Payment
        </button>
      )}

      {order.payment_status === "paid" && (
        <button
          onClick={downloadInvoice}
          className="mt-3 w-full border border-[#03519F]
                     text-[#03519F] py-2 rounded-lg
                     hover:bg-[#03519F] hover:text-white
                     transition text-sm font-semibold"
        >
          Download Invoice
        </button>
      )}
    </div>
  );
}

export default OrderCard;
