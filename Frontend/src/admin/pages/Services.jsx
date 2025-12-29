import { useEffect, useState } from "react";
import adminApi from "../services/adminApi";
import ServicesTable from "../components/services/ServicesTable";
import ServiceModal from "../components/services/ServiceModal";
import PageTitle from "../components/ui/PageTitle";
import Loader from "../components/ui/Loader";

const Services = () => {
  const [services, setServices] = useState([]);
  const [open, setOpen] = useState(false);
  const [editService, setEditService] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await adminApi.get("/services");
      setServices(res.data.services);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <>
      <Helmet>
        <title>Services | Admin</title>
      </Helmet>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <PageTitle>Services</PageTitle>
            <p className="text-sm text-gray-500">
              Manage services and locations
            </p>
          </div>

          <button
            onClick={() => {
              setEditService(null);
              setOpen(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            + Add Service
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <Loader text="Loading services..." />
        ) : (
          <ServicesTable
            services={services}
            onEdit={(s) => {
              setEditService(s);
              setOpen(true);
            }}
            onRefresh={fetchServices}
          />
        )}

        {/* Modal */}
        {open && (
          <ServiceModal
            service={editService}
            onClose={() => setOpen(false)}
            onSaved={fetchServices}
          />
        )}
      </div>
    </>
  );
};

export default Services;
