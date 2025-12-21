import ContactRow from "./ContactRow";

const ContactsTable = ({ contacts, onView, onRefresh }) => {
  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-5 py-3">Name</th>
            <th className="px-5 py-3">Email</th>
            <th className="px-5 py-3">Phone</th>
            <th className="px-5 py-3">Message</th>
            <th className="px-5 py-3">Date</th>
            <th className="px-5 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {contacts.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                className="px-5 py-6 text-center text-gray-500"
              >
                No contact messages found
              </td>
            </tr>
          ) : (
            contacts.map((contact) => (
              <ContactRow
                key={contact._id}
                contact={contact}
                onView={onView}
                onRefresh={onRefresh}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContactsTable;
