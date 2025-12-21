import adminApi from "../../services/adminApi";

const ServiceRow = ({ service, onEdit, onRefresh }) => {
  const deleteService = async () => {
    if (!window.confirm("Delete this service?")) return;

    try {
      await adminApi.delete(`/services/${service._id}`);
      onRefresh();
    } catch {
      alert("Failed to delete service");
    }
  };

  return (
    <tr className="border-t hover:bg-gray-50 transition">
      <td className="px-5 py-4 flex items-center gap-4">
        <img
          src={service.service_logo || "/placeholder.png"}
          alt={service.service_name}
          className="w-12 h-12 rounded-lg object-cover border"
        />

        <div>
          <p className="font-medium">{service.service_name}</p>
          <p className="text-xs text-gray-500">
            ID: {service._id.slice(-6)}
          </p>
        </div>
      </td>

      <td className="px-5 py-4">
        {service.service_location || "-"}
      </td>

      <td className="px-5 py-4 text-right space-x-3">
        <button
          onClick={() => onEdit(service)}
          className="text-blue-600 hover:underline"
        >
          Edit
        </button>

        <button
          onClick={deleteService}
          className="text-red-600 hover:underline"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ServiceRow;
