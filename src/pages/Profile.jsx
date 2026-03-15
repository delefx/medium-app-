// import { useEffect, useState } from "react";
// import { Spin, Alert, Avatar, Popconfirm, message } from "antd";
// import api from "../api/axios";
// import Navbar from "../components/Navbar";

// export default function Profile() {

//   const [user, setUser] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const [comments, setComments] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const fetchProfileData = async () => {
//     try {
//       setLoading(true);

//       const userRes = await api.get("/users/me");
//       const postRes = await api.get("/posts/my-posts");
//       const commentRes = await api.get("/comments/me");

//       setUser(userRes.data.user);
//       setPosts(postRes.data.posts || []);
//       setComments(commentRes.data.comments || []);

//     } catch (err) {
//       console.error(err);
//       setError("Failed to load profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProfileData();
//   }, []);

//   const handleDelete = async (postId) => {
//     try {
//       await api.delete(`/posts/${postId}`);
//       setPosts(posts.filter(post => post._id !== postId));
//       message.success("Post deleted");
//     } catch (err) {
//       console.error(err);
//       message.error("Failed to delete post");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center mt-20">
//         <Spin size="large" />
//       </div>
//     );
//   }

//   if (error) {
//     return <Alert message={error} type="error" showIcon />;
//   }

//   return (
//     <>
//       <Navbar />

//       <div className="max-w-4xl mx-auto mt-10 px-4">

//         {/* USER INFO */}
//         <div className="flex items-center gap-4 mb-10">
//           <Avatar size={70} src={user?.avatar || "https://i.pravatar.cc/150"} />
//           <div>
//             <h1 className="text-2xl font-bold">{user?.fullname}</h1>
//             <p className="text-gray-500">@{user?.username}</p>
//           </div>
//         </div>

//         {/* POSTS */}
//         <h2 className="text-xl font-semibold mb-4">My Posts</h2>

//         {posts.length === 0 ? (
//           <p className="text-gray-500">You haven't written any posts yet.</p>
//         ) : (
//           <div className="space-y-4">
//             {posts.map((post) => (
//               <div
//                 key={post._id}
//                 className="border rounded p-4 hover:bg-gray-50 flex justify-between items-center"
//               >
//                 <div>
//                   <h3 className="font-semibold text-lg">{post.title}</h3>
//                   <p className="text-sm text-gray-500">
//                     {new Date(post.createdAt).toDateString()}
//                   </p>
//                 </div>

//                 <Popconfirm
//                   title="Delete post?"
//                   description="Are you sure you want to delete this post?"
//                   onConfirm={() => handleDelete(post._id)}
//                   okText="Yes"
//                   cancelText="No"
//                 >
//                   <button className="text-red-500 text-sm border border-red-500 px-3 py-1 rounded hover:bg-red-50">
//                     Delete
//                   </button>
//                 </Popconfirm>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* COMMENTS */}
//         <h2 className="text-xl font-semibold mt-10 mb-4">My Comments</h2>

//         {comments.length === 0 ? (
//           <p className="text-gray-500">You haven't commented yet.</p>
//         ) : (
//           <div className="space-y-4">
//             {comments.map((comment) => (
//               <div key={comment._id} className="border rounded p-4 bg-gray-50">
//                 <p className="text-gray-700">{comment.text}</p>
//                 <p className="text-sm text-gray-500 mt-1">
//                   On post: {comment.post?.title}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}

//       </div>
//     </>
//   );
// }




import { useEffect, useState } from "react";
import { Spin, Alert, Avatar, Popconfirm, message } from "antd";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Profile() {

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProfileData = async () => {
    try {

      setLoading(true);

      const userRes = await api.get("/users/me");
      const postRes = await api.get("/posts/my-posts");
      const commentRes = await api.get("/comments/me");

      setUser(userRes.data.user);
      setPosts(postRes.data.posts || []);
      setComments(commentRes.data.comments || []);

    } catch (err) {

      console.error(err);
      setError("Failed to load profile");

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleDeletePost = async (postId) => {

    try {

      await api.delete(`/posts/${postId}`);

      setPosts(posts.filter(post => post._id !== postId));

      // remove comments related to the deleted post from UI
      setComments(comments.filter(comment => comment.post?._id !== postId));

      message.success("Post and its comments deleted");

    } catch (err) {

      console.error(err);

      message.error("Failed to delete post");

    }

  };

  const handleDeleteComment = async (commentId) => {

    try {

      await api.delete(`/comments/${commentId}`);

      setComments(comments.filter(comment => comment._id !== commentId));

      message.success("Comment deleted");

    } catch (err) {

      console.error(err);

      message.error("Failed to delete comment");

    }

  };

  if (loading) {
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

      <div className="max-w-4xl mx-auto mt-10 px-4">

        {/* USER INFO */}

        <div className="flex items-center gap-4 mb-10">

          <Avatar
            size={70}
            src={user?.avatar || "https://i.pravatar.cc/150"}
          />

          <div>

            <h1 className="text-2xl font-bold">
              {user?.fullname}
            </h1>

            <p className="text-gray-500">
              @{user?.username}
            </p>

          </div>

        </div>


        {/* POSTS */}

        <h2 className="text-xl font-semibold mb-4">My Posts</h2>

        {posts.length === 0 ? (
          <p className="text-gray-500">You haven't written any posts yet.</p>
        ) : (

          <div className="space-y-4">

            {posts.map((post) => (

              <div
                key={post._id}
                className="border rounded p-4 hover:bg-gray-50 flex justify-between items-center"
              >

                <div>

                  <h3 className="font-semibold text-lg">
                    {post.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {new Date(post.createdAt).toDateString()}
                  </p>

                </div>

                <Popconfirm
                  title="Delete post?"
                  description="This will delete the post and its comments"
                  onConfirm={() => handleDeletePost(post._id)}
                  okText="Yes"
                  cancelText="No"
                >

                  <button className="text-red-500 text-sm border border-red-500 px-3 py-1 rounded hover:bg-red-50">
                    Delete
                  </button>

                </Popconfirm>

              </div>

            ))}

          </div>

        )}


        {/* COMMENTS */}

        <h2 className="text-xl font-semibold mt-10 mb-4">My Comments</h2>

        {comments.length === 0 ? (
          <p className="text-gray-500">You haven't commented yet.</p>
        ) : (

          <div className="space-y-4">

            {comments.map((comment) => (

              <div
                key={comment._id}
                className="border rounded p-4 bg-gray-50 flex justify-between items-center"
              >

                <div>

                  <p className="text-gray-700">
                    {comment.text}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    On post: {comment.post?.title}
                  </p>

                </div>

                <Popconfirm
                  title="Delete comment?"
                  onConfirm={() => handleDeleteComment(comment._id)}
                  okText="Yes"
                  cancelText="No"
                >

                  <button className="text-red-500 text-sm border border-red-500 px-3 py-1 rounded hover:bg-red-50">
                    Delete
                  </button>

                </Popconfirm>

              </div>

            ))}

          </div>

        )}

      </div>

    </>
  );
}
