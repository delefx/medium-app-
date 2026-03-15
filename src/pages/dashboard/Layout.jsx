import { NavLink, Outlet } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `block rounded-lg px-3 py-2 text-sm font-medium transition ${
    isActive
      ? "bg-neutral-100 text-black"
      : "text-neutral-600 hover:bg-neutral-50 hover:text-black"
  }`;

export default function Layout() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-neutral-200">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <h1 className="text-xl font-extrabold tracking-tight">Medium Admin</h1>
          <div className="h-9 w-9 rounded-full bg-neutral-200" />
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto grid max-w-6xl grid-cols-12 gap-6 px-4 py-8">
        {/* Sidebar */}
        <aside className="col-span-12 md:col-span-3 lg:col-span-2">
          <nav className="space-y-1">
            <NavLink to="/dashboard" end className={linkClass}>
              Overview
            </NavLink>
            <NavLink to="/dashboard/users" className={linkClass}>
              Users
            </NavLink>
            <NavLink to="/dashboard/posts" className={linkClass}>
              Posts
            </NavLink>
            <NavLink to="/dashboard/comments" className={linkClass}>
              Comments
            </NavLink>
          </nav>
        </aside>

        {/* Content */}
        <main className="col-span-12 md:col-span-9 lg:col-span-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}