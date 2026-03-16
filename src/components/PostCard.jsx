// import { Link } from "react-router-dom";

// export default function PostCard({ post }) {
//   return (
//     <Link to={`/post/${post._id}`}>
//       <div className="border-b border-gray-200 py-6 cursor-pointer hover:bg-gray-50 transition flex justify-between gap-6">

//         {/* LEFT SIDE */}
//         <div className="flex-1">

//           {/* Author */}
//           <div className="flex items-center gap-2 text-sm text-gray-600">
//             <img
//               src={post.author?.avatar || "https://i.pravatar.cc/40"}
//               alt=""
//               className="w-6 h-6 rounded-full"
//             />

//             <span className="font-medium">
//               {post.author?.username || "Unknown"}
//             </span>
//           </div>

//           {/* Title */}
//           <h2 className="text-2xl font-bold mt-2 text-gray-900">
//             {post.title}
//           </h2>

//           {/* Preview */}
//           <p className="text-gray-600 mt-2 line-clamp-2">
//             {post.content}
//           </p>

//           {/* Footer */}
//           <div className="text-sm text-gray-400 mt-3">
//             {new Date(post.createdAt).toDateString()}
//           </div>

//         </div>

//         {/* RIGHT SIDE IMAGE */}

//         {post.backCover && (
//           <img
//             src={post.backCover}
//             alt="post cover"
//             className="w-40 h-28 object-cover rounded-lg"
//           />
//         )}

//       </div>
//     </Link>
//   );
// }

import { Link } from "react-router-dom";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import { useState } from "react";
import api from "../api/axios";

export default function PostCard({ post, currentUserId }) {
  const initialLikes = Array.isArray(post.likes) ? post.likes : [];
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(currentUserId ? initialLikes.includes(currentUserId) : false);

  const handleLike = async (e) => {
    e.preventDefault(); // prevent link navigation
    try {
      const res = await api.post(`/posts/${liked ? "dislike" : "like"}/${post._id}`);
      setLikes(res.data.likes || []);
      setLiked(!liked);
    } catch (err) {
      console.error("Failed to like post:", err);
    }
  };

  return (
    <Link to={`/post/${post._id}`}>
      <div className="border-b border-gray-200 py-6 cursor-pointer hover:bg-gray-50 transition flex justify-between gap-6">

        {/* LEFT SIDE */}
        <div className="flex-1">

          {/* Author */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <img
              src={post.author?.avatar || "https://i.pravatar.cc/40"}
              alt=""
              className="w-6 h-6 rounded-full"
            />
            <span className="font-medium">
              {post.author?.username || "Unknown"}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold mt-2 text-gray-900">
            {post.title}
          </h2>

          {/* Preview */}
          <p className="text-gray-600 mt-2 line-clamp-2">
            {post.content}
          </p>

          {/* Footer */}
          <div className="text-sm text-gray-400 mt-3">
            {new Date(post.createdAt).toDateString()}
          </div>

          {/* Likes */}
          <div className="flex items-center gap-2 mt-2">
            <span onClick={handleLike} className="text-lg cursor-pointer">
              {liked ? <LikeFilled className="text-blue-500" /> : <LikeOutlined />}
            </span>
            <span className="text-sm text-gray-600">{likes.length}</span>
          </div>

        </div>

        {/* RIGHT SIDE IMAGE */}
        {post.backCover && (
          <img
            src={post.backCover}
            alt="post cover"
            className="w-40 h-28 object-cover rounded-lg"
          />
        )}

      </div>
    </Link>
  );
}