// import { Link } from "react-router-dom";

// export default function PostCard({ post }) {
//   return (
//     <Link to={`/post/${post._id}`}>
//       <div className="border-b border-gray-200 py-6 cursor-pointer hover:bg-gray-50 transition">

//         {/* Author */}
//         <div className="flex items-center gap-2 text-sm text-gray-600">
//           <img
//             src={post.author?.avatar || "https://i.pravatar.cc/40"}
//             alt=""
//             className="w-6 h-6 rounded-full"
//           />

//           <span className="font-medium">
//             {post.author?.username || "Unknown"}
//           </span>
//         </div>

//         {/* Title */}
//         <h2 className="text-2xl font-bold mt-2 text-gray-900">
//           {post.title}
//         </h2>

//         {/* Preview */}
//         <p className="text-gray-600 mt-2 line-clamp-2">
//           {post.content}
//         </p>

//         {/* Footer */}
//         <div className="text-sm text-gray-400 mt-3">
//           {new Date(post.createdAt).toDateString()}
//         </div>

//       </div>
//     </Link>
//   );
// }







import { Link } from "react-router-dom";

export default function PostCard({ post }) {
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