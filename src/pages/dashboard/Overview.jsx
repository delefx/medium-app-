import { useEffect, useState } from "react";
import { Spin, Alert } from "antd";
import api from "../../api/axios"; // adjust path to your axios instance

export default function Overview() {
  const [stats, setStats] = useState({
    users: 0,
    posts: 0,
    comments: 0,
  });
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        // fetch users
        const usersRes = await api.get("/users");
        const postsRes = await api.get("/posts");
        const commentsRes = await api.get("/comments");

        setStats({
          users: usersRes.data.users.length,
          posts: postsRes.data.posts.length,
          comments: commentsRes.data.comments.length,
        });

        // get latest 5 posts for recent activity
        const sortedPosts = postsRes.data.posts
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);
        setRecentPosts(sortedPosts);

      } catch (err) {
        console.error(err);
        setError("Failed to load stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="flex justify-center mt-20"><Spin size="large" /></div>;
  if (error) return <Alert title={error} type="error" showIcon />;

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Overview</h1>
        <p className="mt-1 text-neutral-600">Monitor activity and manage content.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-neutral-200 p-5">
          <p className="text-sm text-neutral-600">Total Users</p>
          <p className="mt-2 text-3xl font-semibold">{stats.users}</p>
        </div>
        <div className="rounded-2xl border border-neutral-200 p-5">
          <p className="text-sm text-neutral-600">Total Posts</p>
          <p className="mt-2 text-3xl font-semibold">{stats.posts}</p>
        </div>
        <div className="rounded-2xl border border-neutral-200 p-5">
          <p className="text-sm text-neutral-600">Total Comments</p>
          <p className="mt-2 text-3xl font-semibold">{stats.comments}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-200 p-5">
        <h2 className="text-lg font-semibold">Recent Posts</h2>
        <p className="mt-1 text-sm text-neutral-600">Latest posts from your platform.</p>

        <div className="mt-4 space-y-3">
          {recentPosts.length > 0 ? (
            recentPosts.map((post) => (
              <div key={post._id} className="h-12 flex items-center justify-between px-3 rounded-lg bg-neutral-50">
                <span className="font-medium">{post.title}</span>
                <span className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No recent posts</p>
          )}
        </div>
      </div>
    </section>
  );
}