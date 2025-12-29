import { useEffect, useState } from "react";
import adminApi from "../services/adminApi";
import OrdersTable from "../components/orders/OrdersTable";
import PageTitle from "../components/ui/PageTitle";
import Loader from "../components/ui/Loader";
import { log, error } from "../utils/logger";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await adminApi.get("/orders");
      setOrders(res.data.orders);
    } catch (err) {
      error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((o) => {
    const statusOk =
      statusFilter === "all" || o.order_status === statusFilter;
    const paymentOk =
      paymentFilter === "all" || o.payment_status === paymentFilter;
    return statusOk && paymentOk;
  });

  return (
    <>
      <Helmet>
        <title>Orders | Admin</title>
      </Helmet>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <PageTitle>Orders</PageTitle>
          <p className="text-sm text-gray-500">
            Manage customer orders and payments
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All Payments</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>

        {/* Table */}
        {loading ? (
          <Loader text="Loading orders..." />
        ) : (
          <OrdersTable orders={filteredOrders} onRefresh={fetchOrders} />
        )}
      </div>
    </>
  );
};

export default Orders;
