import { useState } from "react";
import { Upload, Button, Input, Spin, Alert } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleUploadChange = ({ file }) => {
    // file is from AntD Upload component
    setFile(file.originFileObj);
  };

  const handleSubmit = async () => {
    if (!title || !content) {
      setError("Title and content are required!");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (file) formData.append("backCover", file);

      const res = await api.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Post created successfully!");
      setTitle("");
      setContent("");
      setFile(null);
      console.log(res.data.post);
      // navigate('/home')
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto mt-10 px-4">
        <h1 className="text-3xl font-bold mb-6">Create a New Post</h1>

        {error && <Alert message={error} type="error" className="mb-4" />}
        {success && <Alert message={success} type="success" className="mb-4" />}
        {loading && (
          <div className="flex justify-center my-4">
            <Spin size="large" />
          </div>
        )}

        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4"
        />

        <Input.TextArea
          placeholder="Write your post..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          className="mb-4"
        />

        <Upload
          beforeUpload={() => false} // prevent auto upload
          onChange={handleUploadChange}
          maxCount={1}
          accept="image/*"
          showUploadList={{ showRemoveIcon: true }}
        >
          <Button icon={<UploadOutlined />}>Upload Back Cover Image</Button>
        </Upload>

        <Button
          type="primary"
          className="mt-4"
          onClick={handleSubmit}
          disabled={loading}
        >
          Create Post
        </Button>
      </div>
    </>
  );
}