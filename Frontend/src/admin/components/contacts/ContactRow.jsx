import adminApi from "../../services/adminApi";

const ContactRow = ({ contact, onView, onRefresh }) => {
  const deleteContact = async () => {
    if (!window.confirm("Delete this message?")) return;

    try {
      await adminApi.delete(`/contacts/${contact._id}`);
      onRefresh();
    } catch {
      alert("Failed to delete message");
    }
  };

  return (
    <tr className="border-t hover:bg-gray-50 transition">
      <td className="px-5 py-4 font-medium">
        {contact.name}
      </td>

      <td className="px-5 py-4">
        {contact.email}
      </td>

      <td className="px-5 py-4">
        {contact.phone}
      </td>

      <td className="px-5 py-4 max-w-xs">
        <p className="truncate text-gray-700">
          {contact.message}
        </p>
      </td>

      <td className="px-5 py-4 text-xs text-gray-500">
        {new Date(contact.created_at).toLocaleDateString()}
      </td>

      <td className="px-5 py-4 text-right space-x-3">
        <button
          onClick={() => onView(contact)}
          className="text-blue-600 hover:underline"
        >
          View
        </button>

        <button
          onClick={deleteContact}
          className="text-red-600 hover:underline"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ContactRow;
