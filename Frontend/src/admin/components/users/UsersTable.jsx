import UserRow from "./UserRow";

const UsersTable = ({ users, onRefresh }) => {
  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="p-4">User</th>
            <th className="p-4">Email</th>
            <th className="p-4">Contact</th>
            <th className="p-4">Provider</th>
            <th className="p-4">Role</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <UserRow key={user._id} user={user} onRefresh={onRefresh} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
