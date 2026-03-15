import { Input, Avatar } from "antd";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem("token"); // remove token
  navigate("/login"); // redirect
};

  return (
    <div className="border-b bg-white sticky top-0 z-50">

      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">

        <Link to="/" className="text-2xl font-bold">
          Medium
        </Link>

        <Search
          placeholder="Search articles"
          style={{ width: 300 }}
        />

        <div className="flex items-center gap-6">
            <div className=" border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-100 transition">
                <Link to="/write">Write</Link>
            </div>
          

          <Avatar>
            <Link to="/profile">
              <span className="text-white font-bold">U</span>
            </Link>
          </Avatar>

          <Button danger onClick={handleLogout}>
  Logout
</Button>

        </div>

      </div>

    </div>
  );
}