function UserInfoCard({ user }) {
  if (!user) {
    return (
      <div className="border rounded-xl p-4 bg-white">
        <h2 className="text-xl font-semibold text-[#03519F] mb-4">
          Customer Details
        </h2>
        <p className="text-gray-500 text-sm">Loading user details...</p>
      </div>
    );
  }

  return (
    <div className="border rounded-xl p-4 bg-white">
      <h2 className="text-xl font-semibold text-[#03519F] mb-4">
        Customer Details
      </h2>
      <p><b>Name:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Phone:</b> {user.contact}</p>
    </div>
  );
}

export default UserInfoCard;
