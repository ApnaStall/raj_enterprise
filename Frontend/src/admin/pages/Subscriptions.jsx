import { useEffect, useState } from "react";
import adminApi from "../services/adminApi";
import SubscriptionsTable from "../components/subscriptions/SubscriptionsTable";
import PageTitle from "../components/ui/PageTitle";
import Loader from "../components/ui/Loader";

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const res = await adminApi.get("/subscriptions");
      setSubscriptions(res.data.subscriptions);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <PageTitle>Subscriptions</PageTitle>
        <p className="text-sm text-gray-500">
          Users subscribed for updates and notifications
        </p>
      </div>

      {/* Table */}
      {loading ? (
        <Loader text="Loading subscriptions..." />
      ) : (
        <SubscriptionsTable
          subscriptions={subscriptions}
          onRefresh={fetchSubscriptions}
        />
      )}
    </div>
  );
};

export default Subscriptions;
