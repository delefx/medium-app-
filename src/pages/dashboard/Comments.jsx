import { useEffect, useState } from "react";
import { Table, Spin, Alert } from "antd";
import api from "../../api/axios";

export default function Comments() {

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchComments = async () => {
    try {

      setLoading(true);

      const res = await api.get("/comments");

      setComments(res.data.comments);

    } catch (err) {

      console.error(err);
      setError("Failed to load comments");

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const columns = [

    {
      title: "Comment",
      dataIndex: "text",
      key: "text",
    },

    {
      title: "User",
      key: "user",
      render: (_, record) =>
        record.user?.username || "Unknown",
    },

    {
      title: "Post",
      key: "post",
      render: (_, record) =>
        record.post?.title || "Deleted Post",
    },

    {
      title: "Created",
      key: "createdAt",
      render: (_, record) =>
        new Date(record.createdAt).toLocaleDateString(),
    },

  ];

  if (loading) return <Spin size="large" />;
  if (error) return <Alert message={error} type="error" showIcon />;

  return (
    <div>

      <h1 className="text-2xl font-semibold mb-6">
        Comments
      </h1>

      <Table
        columns={columns}
        dataSource={comments}
        rowKey="_id"
        bordered
      />

    </div>
  );
}
