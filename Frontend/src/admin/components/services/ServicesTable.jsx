import ServiceRow from "./ServiceRow";

const ServicesTable = ({ services, onEdit, onRefresh }) => {
  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-5 py-3">Service</th>
            <th className="px-5 py-3">Location</th>
            <th className="px-5 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {services.length === 0 ? (
            <tr>
              <td colSpan="3" className="px-5 py-6 text-center text-gray-500">
                No services found
              </td>
            </tr>
          ) : (
            services.map((service) => (
              <ServiceRow
                key={service._id}
                service={service}
                onEdit={onEdit}
                onRefresh={onRefresh}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ServicesTable;
