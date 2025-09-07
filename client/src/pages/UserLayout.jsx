// import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import { assets } from "../assets/assets";
// import { useAppContext } from "../context/AppContext";
// import { useClerk } from "@clerk/clerk-react";

// const UserSidebar = () => {
//   return (
//     <div className="flex flex-col border-r border-gray-200 min-h-full w-64 bg-white pt-6">
//       <NavLink
//         end
//         to="/dashboard"
//         className={({ isActive }) =>
//           `flex items-center gap-3 py-3.5 px-4 cursor-pointer ${
//             isActive ? "bg-primary/10 border-r-4 border-primary" : ""
//           }`
//         }
//       >
//         <img src={assets.home_icon} alt="" className="w-5 h-5" />
//         <span>Dashboard</span>
//       </NavLink>

//       <NavLink
//         end
//         to="/dashboard/blogs"
//         className={({ isActive }) =>
//           `flex items-center gap-3 py-3.5 px-4 cursor-pointer ${
//             isActive ? "bg-primary/10 border-r-4 border-primary" : ""
//           }`
//         }
//       >
//         <img src={assets.home_icon} alt="" className="w-5 h-5" />
//         <span>My Blogs</span>
//       </NavLink>

//       <NavLink
//         to="/dashboard/addBlog"
//         className={({ isActive }) =>
//           `flex items-center gap-3 py-3.5 px-4 cursor-pointer ${
//             isActive ? "bg-primary/10 border-r-4 border-primary" : ""
//           }`
//         }
//       >
//         <img src={assets.add_icon} alt="" className="w-5 h-5" />
//         <span>Add Blog</span>
//       </NavLink>

//       <NavLink
//         to="/dashboard/comments"
//         className={({ isActive }) =>
//           `flex items-center gap-3 py-3.5 px-4 cursor-pointer ${
//             isActive ? "bg-primary/10 border-r-4 border-primary" : ""
//           }`
//         }
//       >
//         <img src={assets.comment_icon} alt="" className="w-5 h-5" />
//         <span>Comments</span>
//       </NavLink>
//     </div>
//   );
// };

// const UserLayout = () => {
//   const { setToken, setUser } = useAppContext();
//   const { signOut } = useClerk();
//   const navigate = useNavigate();

//   const logout = async () => {
//     try {
//       await signOut();
//       localStorage.removeItem("token");
//       if (setToken) setToken(null);
//       if (setUser) setUser(null);
//       navigate("/");
//     } catch (err) {
//       console.error("Logout failed:", err);
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="flex items-center justify-between px-6 py-3 border-b bg-white shadow-sm">
//         <img
//           onClick={() => navigate("/")}
//           src={assets.mylogo}
//           alt="logo"
//           className="w-32 sm:w-40 cursor-pointer"
//         />
//         <button
//           onClick={logout}
//           className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/90"
//         >
//           Logout
//         </button>
//       </header>

//       {/* Sidebar + Main Content */}
//       <div className="flex flex-1">
//         <UserSidebar />
//         <main className="flex-1 p-5 overflow-auto">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default UserLayout;

import { NavLink, Outlet } from "react-router-dom";
import { assets } from "../assets/assets";
import Navbar from "../components/Navbar";

const UserSidebar = () => {
  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: assets.home_icon },
    { to: "/dashboard/blogs", label: "My Blogs", icon: assets.blog_icon },
    { to: "/dashboard/addBlog", label: "Add Blog", icon: assets.add_icon },
    { to: "/dashboard/comments", label: "Comments", icon: assets.comment_icon },
  ];

  return (
    <div className="hidden md:flex flex-col border-r border-gray-200 min-h-screen w-64 bg-white pt-6">
      {navItems.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          end={to === "/dashboard"}
          to={to}
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
  );
};

const UserLayout = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top Navbar */}
      <Navbar />

      {/* Sidebar + Content */}
      <div className="flex flex-1 pt-24">
        <UserSidebar />
        <div className="flex-1 p-5 overflow-auto">
          <Outlet /> {/* ✅ Active page will render here */}
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
