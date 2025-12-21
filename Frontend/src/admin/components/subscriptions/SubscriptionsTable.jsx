import SubscriptionRow from "./SubscriptionRow";

const SubscriptionsTable = ({ subscriptions, onRefresh }) => {
  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-5 py-3">Name</th>
            <th className="px-5 py-3">Contact</th>
            <th className="px-5 py-3">Date</th>
            <th className="px-5 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {subscriptions.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                className="px-5 py-6 text-center text-gray-500"
              >
                No subscriptions found
              </td>
            </tr>
          ) : (
            subscriptions.map((sub) => (
              <SubscriptionRow
                key={sub._id}
                subscription={sub}
                onRefresh={onRefresh}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SubscriptionsTable;
