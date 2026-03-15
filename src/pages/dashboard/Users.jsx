import { useEffect, useState } from "react";
import { Table, Button, Spin, Alert, Popconfirm } from "antd";
import api from "../../api/axios";

export default function Users() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await api.get("/users");

      setUsers(res.data.users);

    } catch (err) {
      console.error(err);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {

      await api.delete(`/users/${id}`);

      setUsers(users.filter((user) => user._id !== id));

    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    }
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Full Name",
      key: "fullname",
      render: (_, record) => `${record.fullname || ""} `,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Joined",
      key: "createdAt",
      render: (_, record) => new Date(record.createdAt).toLocaleDateString(),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Delete this user?"
          onConfirm={() => handleDelete(record._id)}
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  if (loading) return <Spin size="large" />;
  if (error) return <Alert message={error} type="error" showIcon />;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Users</h1>

      <Table
        columns={columns}
        dataSource={users}
        rowKey="_id"
        bordered
      />
    </div>
  );
}