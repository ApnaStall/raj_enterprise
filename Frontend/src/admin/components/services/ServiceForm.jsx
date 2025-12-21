import { useState } from "react";
import adminApi from "../../services/adminApi";

const ServiceForm = ({ service, onSaved }) => {
  const [name, setName] = useState(service?.service_name || "");
  const [logo, setLogo] = useState(service?.service_logo || "");
  const [location, setLocation] = useState(service?.service_location || "");
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      service_name: name,
      service_logo: logo,
      service_location: location
    };

    try {
      if (service) {
        await adminApi.put(`/services/${service._id}`, payload);
      } else {
        await adminApi.post("/services", payload);
      }
      onSaved();
    } catch {
      alert("Failed to save service");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="text-sm text-gray-600">Service Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mt-1"
          required
        />
      </div>

      <div>
        <label className="text-sm text-gray-600">Location</label>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mt-1"
          placeholder="Optional"
        />
      </div>

      <div>
        <label className="text-sm text-gray-600">Logo URL</label>
        <input
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mt-1"
          placeholder="https://..."
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save Service"}
      </button>
    </form>
  );
};

export default ServiceForm;
