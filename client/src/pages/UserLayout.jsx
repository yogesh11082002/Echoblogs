// import { NavLink, Outlet } from "react-router-dom";
// import { assets } from "../assets/assets";
// import Navbar from "../components/Navbar";

// const UserSidebar = () => {
//   const navItems = [
//     { to: "/dashboard", label: "Dashboard", icon: assets.home_icon },
//     { to: "/dashboard/blogs", label: "My Blogs", icon: assets.blog_icon },
//     { to: "/dashboard/addBlog", label: "Add Blog", icon: assets.add_icon },
//     { to: "/dashboard/comments", label: "Comments", icon: assets.comment_icon },
//   ];

//   return (
//     <div className="hidden md:flex flex-col border-r border-gray-200 min-h-screen w-64 bg-white pt-6">
//       {navItems.map(({ to, label, icon }) => (
//         <NavLink
//           key={to}
//           end={to === "/dashboard"}
//           to={to}
//           className={({ isActive }) =>
//             `flex items-center gap-3 py-3.5 px-4 cursor-pointer transition-colors ${
//               isActive
//                 ? "bg-primary/10 border-r-4 border-primary font-semibold text-primary"
//                 : "text-gray-700 hover:bg-gray-100"
//             }`
//           }
//         >
//           <img src={icon} alt="" className="w-5 h-5" />
//           <span>{label}</span>
//         </NavLink>
//       ))}
//     </div>
//   );
// };

// const UserLayout = () => {
//   return (
//     <div className="flex flex-col h-screen bg-gray-50">
//       {/* Top Navbar */}
//       <Navbar />

//       {/* Sidebar + Content */}
//       <div className="flex flex-1 pt-24">
//         <UserSidebar />
//         <div className="flex-1 p-5 overflow-auto">
//           <Outlet /> {/* ✅ Active page will render here */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserLayout;

import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { assets } from "../assets/assets";
import Navbar from "../components/Navbar";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: assets.home_icon },
  { to: "/dashboard/blogs", label: "My Blogs", icon: assets.blog_icon },
  { to: "/dashboard/addBlog", label: "Add Blog", icon: assets.add_icon },
  { to: "/dashboard/comments", label: "Comments", icon: assets.comment_icon },
];

const UserSidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black/30 z-20 md:hidden transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleSidebar}
      ></div>

      <div
        className={`fixed top-0 left-0 z-30 h-full w-64 bg-white border-r border-gray-200 pt-6 transform transition-transform duration-300 md:relative md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {navItems.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            end={to === "/dashboard"}
            to={to}
            onClick={toggleSidebar} // close sidebar on mobile
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-4 cursor-pointer transition-colors ${
                isActive
                  ? "bg-primary/10 border-r-4 border-primary font-semibold text-primary"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <img src={icon} alt="" className="w-5 h-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </>
  );
};

const UserLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top Navbar */}
      <Navbar>
        {/* Mobile menu button inside Navbar */}
        <button
          className="md:hidden p-2 rounded-md focus:outline-none"
          onClick={toggleSidebar}
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </Navbar>

      {/* Sidebar + Content */}
      <div className="flex flex-1 pt-24 relative">
        <UserSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-1 p-5 overflow-auto">
          <Outlet /> {/* Active page will render here */}
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
