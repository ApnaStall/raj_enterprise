import adminApi from "../../services/adminApi";

const SubscriptionRow = ({ subscription, onRefresh }) => {
  const deleteSubscription = async () => {
    if (!window.confirm("Delete this subscription?")) return;

    try {
      await adminApi.delete(`/subscriptions/${subscription._id}`);
      onRefresh();
    } catch {
      alert("Failed to delete subscription");
    }
  };

  return (
    <tr className="border-t hover:bg-gray-50 transition">
      <td className="px-5 py-4 font-medium">
        {subscription.name || "-"}
      </td>

      <td className="px-5 py-4">
        {subscription.contact}
      </td>

      <td className="px-5 py-4 text-xs text-gray-500">
        {new Date(subscription.createdAt).toLocaleDateString()}
      </td>

      <td className="px-5 py-4 text-right">
        <button
          onClick={deleteSubscription}
          className="text-red-600 hover:underline"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default SubscriptionRow;
