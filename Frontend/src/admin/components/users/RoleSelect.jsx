const RoleSelect = ({ currentRole, onChange, disabled }) => {
  return (
    <select
      value={currentRole}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`border rounded px-2 py-1 text-sm ${
        disabled
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : "bg-white"
      }`}
    >
      <option value="user">User</option>
      <option value="admin">Admin</option>
    </select>
  );
};

export default RoleSelect;
