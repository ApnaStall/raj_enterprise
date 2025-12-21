const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Processing: "bg-blue-100 text-blue-700",
  Shipped: "bg-purple-100 text-purple-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700"
};

const StatusSelect = ({ current, onChange, disabled }) => {
  return (
    <select
      value={current}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      className={`px-2 py-1 text-xs rounded border ${
        statusColors[current]
      } ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
    >
      {Object.keys(statusColors).map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
};

export default StatusSelect;
