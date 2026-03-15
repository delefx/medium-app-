import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spin, Alert, Input, Button } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import api from "../api/axios";
import Navbar from "../components/Navbar";

const { TextArea } = Input;

export default function PostDetail() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loadingPost, setLoadingPost] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [error, setError] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  // Fetch single post
  const fetchPost = async () => {
    try {
      setLoadingPost(true);
      const res = await api.get(`/posts/${id}`);
      setPost(res.data.post);
    } catch (err) {
      console.error(err);
      setError("Failed to load post");
    } finally {
      setLoadingPost(false);
    }
  };

  // Fetch comments separately
  const fetchComments = async () => {
    try {
      setLoadingComments(true);
      const res = await api.get(`/comments/${id}`);
      setComments(res.data.comments);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingComments(false);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  // Add a new comment
  const handleAddComment = async () => {
    if (!comment.trim()) return;

    try {
      const res = await api.post("/comments", {
        postId: id,
        text: comment,
      });

      setComments((prev) => [...prev, res.data.comment]);
      setComment("");
    } catch (err) {
      console.error(err);
      alert("Failed to add comment");
    }
  };

  if (loadingPost) {
    return (
      <div className="flex justify-center mt-20">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <Alert message={error} type="error" showIcon />;
  }

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto mt-10 px-4">

        {/* Post Title */}
        <h1 className="text-4xl font-bold mb-6">{post?.title}</h1>

        {/* Author Info */}
        <div className="flex items-center gap-3 mb-6">
          <img
            src={post?.author?.avatar || "https://i.pravatar.cc/40"}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-medium">{post?.author?.username}</p>
            <p className="text-gray-500 text-sm">
              {new Date(post?.createdAt).toDateString()}
            </p>
          </div>
        </div>

        {/* Post Content */}
        <div className="prose max-w-none text-lg">{post?.content}</div>

        {/* Comments Header */}
        <div className="flex items-center gap-2 mt-10 border-t pt-6 text-gray-600">
          <MessageOutlined />
          <span>{comments.length} responses</span>
        </div>

        {/* Add Comment */}
        <div className="mt-4 flex flex-col gap-2">
          <TextArea
            rows={3}
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            type="primary"
            onClick={handleAddComment}
            disabled={!comment.trim()}
          >
            Post Comment
          </Button>
        </div>

        {/* Comment List */}
        {loadingComments ? (
          <div className="flex justify-center mt-4">
            <Spin />
          </div>
        ) : (
          <div className="mt-6 flex flex-col gap-4">
            {comments.map((c, idx) => (
              <div key={idx} className="border rounded p-3 bg-gray-50">
                <p className="font-medium">{c.user?.username || "Anonymous"}</p>
                <p className="text-gray-700">{c.text}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </>
  );
}