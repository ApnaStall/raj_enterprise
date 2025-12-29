import { useEffect, useState } from "react";
import adminApi from "../services/adminApi";
import UsersTable from "../components/users/UsersTable";
import PageTitle from "../components/ui/PageTitle";
import Loader from "../components/ui/Loader";
import { log, error } from "../utils/logger";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await adminApi.get("/users");
      setUsers(res.data.users);
    } catch (err) {
      error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Helmet>
        <title>Users | Admin</title>
      </Helmet>
      <div className="space-y-6">
        <div>
          <PageTitle>Users</PageTitle>
          <p className="text-sm text-gray-500">
            Manage platform users and roles
          </p>
        </div>

        {loading ? (
          <Loader text="Loading users..." />
        ) : (
          <UsersTable users={users} onRefresh={fetchUsers} />
        )}
      </div>
    </>
  );
};

export default Users;
