const colors = {
  paid: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  failed: "bg-red-100 text-red-700",
  refunded: "bg-gray-200 text-gray-700"
};

const PaymentBadge = ({ status, onChange, disabled }) => {
  return (
    <select
      value={status}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      className={`px-2 py-1 text-xs rounded border ${
        colors[status]
      } ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
    >
      <option value="pending">pending</option>
      <option value="paid">paid</option>
      <option value="failed">failed</option>
      <option value="refunded">refunded</option>
    </select>
  );
};

export default PaymentBadge;
