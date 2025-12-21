import adminApi from "../../services/adminApi";
import RoleBadge from "./RoleBadge";
import RoleSelect from "./RoleSelect";

const UserRow = ({ user, onRefresh }) => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const isSelf = loggedInUser?._id === user._id;

  const changeRole = async (role) => {
    if (isSelf) {
      alert("You cannot change your own role");
      return;
    }

    try {
      await adminApi.patch(`/users/${user._id}/role`, { role });
      onRefresh();
    } catch (error) {
      alert("Failed to update role");
    }
  };

  const deleteUser = async () => {
    if (isSelf) {
      alert("You cannot delete your own account");
      return;
    }

    if (!window.confirm("Delete this user?")) return;

    try {
      await adminApi.delete(`/users/${user._id}`);
      onRefresh();
    } catch (error) {
      alert("Failed to delete user");
    }
  };

  return (
    <tr className="border-b hover:bg-gray-50 transition">
      <td className="p-3 flex items-center gap-3">
        <img
          src={user.profilePhoto || "/avatar.png"}
          alt=""
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="font-medium">{user.name}</span>
      </td>

      <td className="p-3">{user.email}</td>
      <td className="p-3">{user.contact}</td>
      <td className="p-3 capitalize">{user.provider}</td>

      <td className="p-3">
        <RoleBadge role={user.role} />
      </td>

      <td className="p-3 text-right flex gap-2 justify-end">
        <RoleSelect
          currentRole={user.role}
          onChange={changeRole}
          disabled={isSelf}
        />

        <button
          onClick={deleteUser}
          className={`hover:underline ${
            isSelf ? "text-gray-400 cursor-not-allowed" : "text-red-600"
          }`}
          disabled={isSelf}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
