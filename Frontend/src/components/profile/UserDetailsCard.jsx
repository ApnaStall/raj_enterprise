import { useEffect, useState } from "react";
import api from "../../utils/axios";

function UserDetailsCard() {
  const [user, setUser] = useState(null);
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get("/api/user/profile").then(res => {
      setUser(res.data.user);
      setContact(res.data.user.contact || "");
    });
  }, []);

  const savePhone = async () => {
    setLoading(true);
    await api.put("/api/user/update-profile", { contact });
    setUser({ ...user, contact });
    setLoading(false);
  };

  if (!user) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">User Details</h2>

      <p><b>Name:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>

      <div className="mt-4">
        <label className="text-sm font-medium">Phone</label>
        <input
          value={contact}
          onChange={e => setContact(e.target.value)}
          className="w-full border p-2 rounded mt-1"
        />
      </div>

      <button
        onClick={savePhone}
        disabled={loading}
        className="mt-3 bg-[#03519F] text-white px-4 py-2 rounded"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </div>
  );
}

export default UserDetailsCard;
