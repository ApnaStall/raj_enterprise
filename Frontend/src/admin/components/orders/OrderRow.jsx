import { useState } from "react";
import adminApi from "../../services/adminApi";
import StatusSelect from "./StatusSelect";
import PaymentBadge from "./PaymentBadge";
import OrderModal from "./OrderModal";

const OrderRow = ({ order, onRefresh }) => {
  const [open, setOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  const updateStatus = async (order_status) => {
    setUpdating(true);
    try {
      await adminApi.patch(`/orders/${order._id}/status`, { order_status });
      onRefresh();
    } catch {
      alert("Failed to update order status");
    } finally {
      setUpdating(false);
    }
  };

  const updatePayment = async (payment_status) => {
    setUpdating(true);
    try {
      await adminApi.patch(`/orders/${order._id}/payment`, { payment_status });
      onRefresh();
    } catch {
      alert("Failed to update payment status");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <>
      <tr className="border-t hover:bg-gray-50 transition">
        <td className="px-5 py-4 text-xs text-gray-500">
          #{order._id.slice(-6)}
        </td>

        <td className="px-5 py-4">{order.customer_name}</td>

        <td className="px-5 py-4 font-medium">
          ₹{order.total_amount}
        </td>

        <td className="px-5 py-4">
          <PaymentBadge
            status={order.payment_status}
            onChange={updatePayment}
            disabled={updating}
          />
        </td>

        <td className="px-5 py-4">
          <StatusSelect
            current={order.order_status}
            onChange={updateStatus}
            disabled={updating}
          />
        </td>

        <td className="px-5 py-4 text-right">
          <button
            onClick={() => setOpen(true)}
            className="text-blue-600 hover:underline"
          >
            View
          </button>
        </td>
      </tr>

      {open && <OrderModal order={order} onClose={() => setOpen(false)} />}
    </>
  );
};

export default OrderRow;
