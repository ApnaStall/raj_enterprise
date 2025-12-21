import { useEffect, useState } from "react";
import api from "../../utils/axios";

function ResetPasswordCard() {
  const [user, setUser] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get("/api/user/profile").then(res => {
      setUser(res.data.user);
    });
  }, []);

  const handleReset = async () => {
    setLoading(true);
    await api.post("/api/user/reset-password", {
      oldPassword: user.provider === "google" ? null : oldPassword,
      newPassword
    });
    setLoading(false);
    alert("Password updated");
  };

  if (!user) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Reset Password</h2>

      <input
        type="password"
        placeholder="Old Password"
        disabled={user.provider === "google"}
        value={user.provider === "google" ? "********" : oldPassword}
        onChange={e => setOldPassword(e.target.value)}
        className="w-full border p-2 rounded mb-3"
      />

      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={e => setNewPassword(e.target.value)}
        className="w-full border p-2 rounded mb-3"
      />

      <button
        onClick={handleReset}
        disabled={loading}
        className="bg-[#03519F] text-white px-4 py-2 rounded"
      >
        {loading ? "Updating..." : "Update Password"}
      </button>
    </div>
  );
}

export default ResetPasswordCard;
