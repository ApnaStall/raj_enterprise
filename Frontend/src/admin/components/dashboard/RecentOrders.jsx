const RecentOrders = ({ orders }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-gray-500 border-b">
          <tr>
            <th className="py-2 text-left">Customer</th>
            <th className="py-2 text-left">Amount</th>
            <th className="py-2">Status</th>
            <th className="py-2">Payment</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id} className="border-b last:border-0">
              <td className="py-2">{o.customer_name}</td>
              <td className="py-2">₹{o.total_amount}</td>
              <td className="py-2">
                <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                  {o.order_status}
                </span>
              </td>
              <td className="py-2 capitalize">{o.payment_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrders;
