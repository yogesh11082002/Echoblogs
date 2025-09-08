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

import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const UserSidebar = () => {
  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: assets.home_icon },
    { to: "/dashboard/blogs", label: "My Blogs", icon: assets.blog_icon },
    { to: "/dashboard/addBlog", label: "Add Blog", icon: assets.add_icon },
    { to: "/dashboard/comments", label: "Comments", icon: assets.comment_icon },
  ];

  return (
    <div className="flex flex-col border-r border-gray-200 min-h-screen w-16 md:w-64 bg-white pt-6">
      {navItems.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          end={to === "/dashboard"}
          to={to}
          className={({ isActive }) =>
            `flex items-center gap-3 py-3.5 px-4 justify-center md:justify-start cursor-pointer transition-colors ${
              isActive
                ? "bg-primary/10 border-r-4 border-primary font-semibold text-primary"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <img src={icon} alt={label} className="w-5 h-5" />
          <span className="hidden md:inline">{label}</span> {/* hide text on small screens */}
        </NavLink>
      ))}
    </div>
  );
};

export default UserSidebar;
