const RoleBadge = ({ role }) => {
  const styles =
    role === "admin"
      ? "bg-blue-100 text-blue-700"
      : "bg-gray-100 text-gray-700";

  return (
    <span className={`px-2 py-1 text-xs rounded ${styles}`}>
      {role}
    </span>
  );
};

export default RoleBadge;
