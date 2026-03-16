import { Routes, Route } from "react-router-dom";


import Layout from "./pages/dashboard/Layout";
import Overview from "./pages/dashboard/Overview";
import Users from "./pages/dashboard/Users";
import Posts from "./pages/dashboard/Posts";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/Profile";
import Comments from "./pages/dashboard/Comments";





export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/post/:id" element={<PostDetail />} />
      <Route path="/write" element={<CreatePost />} />
      <Route path="/profile" element={<Profile />} />

      <Route path="/dashboard" element={<Layout />}>
        <Route index element={<Overview />} />
        <Route path="users" element={<Users />} />
        <Route path="posts" element={<Posts />} />
        <Route path="comments" element={<Comments />} />
      </Route>
    </Routes>
  );
}
