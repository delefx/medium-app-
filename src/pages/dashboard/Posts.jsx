import { useEffect, useState } from "react";
import { Table, Button, Spin, Alert, Popconfirm } from "antd";
import api from "../../api/axios";

export default function Posts() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    try {

      setLoading(true);

      const res = await api.get("/posts");

      setPosts(res.data.posts);

    } catch (err) {

      console.error(err);
      setError("Failed to load posts");

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {

    try {

      await api.delete(`/posts/${id}`);

      setPosts(posts.filter((post) => post._id !== id));

    } catch (err) {

      console.error(err);
      alert("Failed to delete post");

    }

  };

  const columns = [

    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },

    {
      title: "Author",
      key: "author",
      render: (_, record) =>
        record.author?.username || "Unknown",
    },

    {
      title: "Created",
      key: "createdAt",
      render: (_, record) =>
        new Date(record.createdAt).toLocaleDateString(),
    },

  ];

  if (loading) return <Spin size="large" />;
  if (error) return <Alert title="Error" type="error" showIcon />;

  return (
    <div>

      <h1 className="text-2xl font-semibold mb-6">
        Posts
      </h1>

      <Table
        columns={columns}
        dataSource={posts}
        rowKey="_id"
        bordered
      />

    </div>
  );
}