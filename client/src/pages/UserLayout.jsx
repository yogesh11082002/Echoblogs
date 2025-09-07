// import React from "react";
// import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import { assets } from "../assets/assets"; // adjust path
// import { useAppContext } from "../context/AppContext";

// const UserSidebar = () => {
//   return (
//     <div className="flex flex-col border-r border-gray-200 min-h-full pt-6">
//       <NavLink
//         end={true}
//         to="/dashboard"
//         className={({ isActive }) =>
//           `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
//             isActive && "bg-primary/10 border-r-4 border-primary"
//           }`
//         }
//       >
//         <img src={assets.home_icon} alt="" className="min-w-4 w-5" />
//         <p className="hidden md:inline-block">My Blogs</p>
//       </NavLink>

//       <NavLink
//         to="/dashboard/addBlog"
//         className={({ isActive }) =>
//           `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
//             isActive && "bg-primary/10 border-r-4 border-primary"
//           }`
//         }
//       >
//         <img src={assets.add_icon} alt="" className="min-w-4 w-5" />
//         <p className="hidden md:inline-block">Add Blog</p>
//       </NavLink>

//       <NavLink
//         to="/dashboard/comments"
//         className={({ isActive }) =>
//           `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
//             isActive && "bg-primary/10 border-r-4 border-primary"
//           }`
//         }
//       >
//         <img src={assets.comment_icon} alt="" className="min-w-4 w-5" />
//         <p className="hidden md:inline-block">Comments</p>
//       </NavLink>
//     </div>
//   );
// };

// const UserLayout = () => {
//   const { setToken, setUser } = useAppContext();
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem("token");
//     if (setToken) setToken(null);
//     if (setUser) setUser(null);
//     navigate("/");
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Header */}
//       <div className="flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200">
//         <img
//           onClick={() => navigate("/")}
//           src={assets.mylogo}
//           alt="logo"
//           className="w-40 cursor-pointer"
//         />
//         <button
//           onClick={logout}
//           className="text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer"
//         >
//           Logout
//         </button>
//       </div>

//       {/* Body */}
//       <div className="flex h-[calc(100vh-70px)]">
//         <UserSidebar />
//         <div className="flex-1 p-5 overflow-auto">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserLayout;

import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets"; // adjust path
import { useAppContext } from "../context/AppContext";
import { useClerk } from "@clerk/clerk-react"; // 👈 import Clerk

const UserSidebar = () => {
  return (
    <div className="flex flex-col border-r border-gray-200 min-h-full pt-6">
        <NavLink end={true} to='/dashboard' className={({isActive})=>`flex items-center gap-3 py-3.5 px-3  md:px-9 md:min-w-64 cursor-pointer ${isActive && 'bg-primary/10 border-r-4 border-primary'}`}>
                <img src={assets.home_icon} alt=""  className='min-w-4 w-5'/>
                <p className='hidden md:inline-block'>Dashboard</p>
              </NavLink>
      <NavLink
        end={true}
        to="/dashboard/blogs"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive && "bg-primary/10 border-r-4 border-primary"
          }`
        }
      >
        <img src={assets.home_icon} alt="" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">My Blogs</p>
      </NavLink>

      <NavLink
        to="/dashboard/addBlog"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive && "bg-primary/10 border-r-4 border-primary"
          }`
        }
      >
        <img src={assets.add_icon} alt="" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Add Blog</p>
      </NavLink>

      <NavLink
        to="/dashboard/comments"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive && "bg-primary/10 border-r-4 border-primary"
          }`
        }
      >
        <img src={assets.comment_icon} alt="" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Comments</p>
      </NavLink>
    </div>
  );
};

const UserLayout = () => {
  const { setToken, setUser } = useAppContext();
  const navigate = useNavigate();
  const { signOut } = useClerk(); // 👈 Clerk signOut function

  const logout = async () => {
    try {
      // Logout from Clerk
      await signOut();

      // Clear local token and context
      localStorage.removeItem("token");
      if (setToken) setToken(null);
      if (setUser) setUser(null);

      // Redirect to home page
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200">
        <img
          onClick={() => navigate("/")}
          src={assets.mylogo}
          alt="logo"
          className="w-40 cursor-pointer"
        />
        <button
          onClick={logout}
          className="text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer"
        >
          Logout
        </button>
      </div>

      {/* Body */}
      <div className="flex h-[calc(100vh-70px)]">
        <UserSidebar />
        <div className="flex-1 p-5 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
