const OrderModal = ({ order, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Order Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        <div className="text-sm space-y-1">
          <p><strong>Name:</strong> {order.customer_name}</p>
          <p><strong>Email:</strong> {order.customer_email}</p>
          <p><strong>Phone:</strong> {order.customer_phone}</p>
          <p><strong>Address:</strong> {order.customer_address}</p>
        </div>

        <div>
          <h3 className="font-medium mb-2">Items</h3>
          <ul className="space-y-1 text-sm">
            {order.items.map((item, i) => (
              <li key={i}>
                {item.name} × {item.quantity} — ₹{item.price}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <span className="font-semibold">
            Total: ₹{order.total_amount}
          </span>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
