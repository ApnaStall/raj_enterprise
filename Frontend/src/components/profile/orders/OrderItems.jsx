function OrderItems({ items }) {
  return (
    <div className="space-y-1 text-sm">
      {items.map((item, idx) => (
        <div key={idx} className="flex justify-between">
          <span>
            {item.name} × {item.quantity}
          </span>
          <span>₹{item.price * item.quantity}</span>
        </div>
      ))}
    </div>
  );
}

export default OrderItems;
