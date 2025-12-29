import { useEffect, useState } from "react";
import adminApi from "../services/adminApi";
import ContactsTable from "../components/contacts/ContactsTable";
import ContactModal from "../components/contacts/ContactModal";
import PageTitle from "../components/ui/PageTitle";
import Loader from "../components/ui/Loader";
import { Helmet } from "react-helmet-async";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await adminApi.get("/contacts");
      setContacts(res.data.contacts);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <>
      <Helmet>
        <title>Contacts | Admin</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div>
          <PageTitle>Contact Messages</PageTitle>
          <p className="text-sm text-gray-500">
            Messages submitted through the contact form
          </p>
        </div>

        {/* Table */}
        {loading ? (
          <Loader text="Loading messages..." />
        ) : (
          <ContactsTable
            contacts={contacts}
            onView={setSelected}
            onRefresh={fetchContacts}
          />
        )}

        {/* Modal */}
        {selected && (
          <ContactModal
            contact={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </div>
    </>
  );
};

export default Contacts;
