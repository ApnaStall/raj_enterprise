import RazorpayButton from "./RazorpayButton";

function OrderPaymentCard({ orderId, amount }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h1 className="text-2xl font-bold text-[#03519F] mb-4">
        Complete Payment
      </h1>

      <div className="space-y-2 text-sm mb-6">
        <p><b>Order ID:</b> {orderId}</p>
        <p><b>Total Amount:</b> ₹{amount}</p>
      </div>

      <RazorpayButton
        orderId={orderId}
        amount={amount}
      />

      <p className="text-xs text-gray-500 mt-4 text-center">
        Secure payment powered by Razorpay
      </p>
    </div>
  );
}

export default OrderPaymentCard;
