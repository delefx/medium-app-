import { useEffect, useState } from "react";
import { Spin, Alert } from "antd";
import api from "../api/axios";
import PostCard from "../components/PostCard";
import Navbar from "../components/Navbar";

export default function Home() {
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

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto flex gap-10 mt-10">

        {/* POSTS */}
        <div className="flex-1">

          {loading && (
            <div className="flex justify-center mt-20">
              <Spin size="large" />
            </div>
          )}

          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
            />
          )}

          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}

        </div>

        {/* SIDEBAR */}
<div className="w-72 hidden md:block">
  <div className="sticky top-20">
    <h3 className="font-bold mb-4 text-lg">Who to follow</h3>

    <div className="space-y-4">

      {[
        {
          name: "Sarah Johnson",
          username: "sarahcodes",
          bio: "Frontend developer sharing React tips.",
        },
        {
          name: "Daniel Lee",
          username: "danlee",
          bio: "Tech writer & startup enthusiast.",
        },
        {
          name: "Maria Gomez",
          username: "mariadev",
          bio: "Full-stack dev documenting my journey.",
        },
      ].map((user, index) => (
        <div
          key={index}
          className="flex items-start gap-3 border-b pb-4"
        >
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-white">
            {user.name.charAt(0)}
          </div>

          <div className="flex-1">
            <p className="font-semibold text-sm">{user.name}</p>
            <p className="text-gray-500 text-xs">@{user.username}</p>
            <p className="text-gray-500 text-xs mt-1">{user.bio}</p>
          </div>

          <button className="text-sm border px-3 py-1 rounded-full hover:bg-gray-100">
            Follow
          </button>
        </div>
      ))}

    </div>
  </div>
</div>


      </div>
    </>
  );
}