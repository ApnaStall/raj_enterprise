import { useEffect, useState } from "react";
import adminApi from "../services/adminApi";
import Loader from "../components/ui/Loader";

/* Charts */
import RevenueChart from "../components/dashboard/RevenueChart";
import OrderStatusChart from "../components/dashboard/OrderStatusChart";
import StatCard from "../components/dashboard/StatCard";
import RecentOrders from "../components/dashboard/RecentOrders";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await adminApi.get("/dashboard");

        setStats(res.data.stats);
        setMonthlyRevenue(res.data.charts.monthlyRevenue);
        setOrderStatus(res.data.charts.orderStatus);
        setRecentOrders(res.data.recentOrders);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <Loader text="Loading dashboard..." />;

  return (
    <>
      <Helmet>
        <title>Dashboard | Admin</title>
      </Helmet>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Business overview & analytics
          </p>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard title="Users" value={stats.totalUsers} icon="👤" />
          <StatCard title="Orders" value={stats.totalOrders} icon="📦" />
          <StatCard
            title="Revenue"
            value={`₹${stats.totalRevenue}`}
            icon="💰"
            highlight
          />
          <StatCard title="Products" value={stats.totalProducts} icon="🛒" />
        </div>

        {/* MAIN ANALYTICS */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Revenue Chart (BIG) */}
          <div className="xl:col-span-2 bg-white rounded-xl border shadow-sm p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              Revenue Trend
            </h3>
            <div className="bg-white rounded-xl border shadow-sm p-6 h-80">
              <RevenueChart
                key={monthlyRevenue.length}
                data={monthlyRevenue}
              />
            </div>

          </div>

          {/* Order Status */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              Order Status
            </h3>
            <div className="bg-white rounded-xl border shadow-sm p-6 h-80">
              <OrderStatusChart
                key={orderStatus.length}
                data={orderStatus}
              />
            </div>

          </div>
        </div>

        {/* RECENT ORDERS */}
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Recent Orders
          </h3>
          <RecentOrders orders={recentOrders} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
