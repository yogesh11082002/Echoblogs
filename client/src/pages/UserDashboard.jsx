// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useUser, useAuth } from "@clerk/clerk-react";
// import { toast } from "react-hot-toast";

// const UserDashboard = () => {
//   const { isSignedIn } = useUser();
//   const { getToken } = useAuth();
//   const [dashboardData, setDashboardData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchDashboard = async () => {
//     if (!isSignedIn) {
//       setLoading(false);
//       return;
//     }

//     try {
//       const token = await getToken();
//       const res = await axios.get("/api/user/dashboard", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (res.data.success) {
//         setDashboardData(res.data.dashboardData);
//       } else {
//         toast.error(res.data.message || "Failed to fetch dashboard");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Error fetching dashboard");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDashboard();
//   }, [isSignedIn]);

//   if (loading) return <p>Loading dashboard...</p>;
//   if (!dashboardData) return <p>No data available.</p>;

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold mb-4">My Dashboard</h2>

//       {/* Stats */}
//       <div className="flex flex-wrap gap-4 mb-6">
//         <div className="flex-1 bg-white shadow rounded p-4 text-center min-w-[150px]">
//           <h3 className="text-lg font-semibold">{dashboardData.totalBlogs}</h3>
//           <p className="text-gray-500">My Blogs</p>
//         </div>
//         <div className="flex-1 bg-white shadow rounded p-4 text-center min-w-[150px]">
//           <h3 className="text-lg font-semibold">{dashboardData.publishedBlogs}</h3>
//           <p className="text-gray-500">Published</p>
//         </div>
//         <div className="flex-1 bg-white shadow rounded p-4 text-center min-w-[150px]">
//           <h3 className="text-lg font-semibold">{dashboardData.draftBlogs}</h3>
//           <p className="text-gray-500">Drafts</p>
//         </div>
//         <div className="flex-1 bg-white shadow rounded p-4 text-center min-w-[150px]">
//           <h3 className="text-lg font-semibold">{dashboardData.totalComments}</h3>
//           <p className="text-gray-500">Comments</p>
//         </div>
//       </div>

//       {/* Recent Blogs */}
//       <div className="bg-white shadow rounded p-4">
//         <h3 className="text-lg font-semibold mb-4">Recent Blogs</h3>
//         {dashboardData.recentBlogs.length === 0 ? (
//           <p className="text-gray-500">No blogs yet.</p>
//         ) : (
//           <ul className="space-y-2">
//             {dashboardData.recentBlogs.map((blog) => (
//               <li
//                 key={blog._id}
//                 className="border-b last:border-none pb-2 flex justify-between"
//               >
//                 <span className="font-medium">{blog.title}</span>
//                 <span className="text-gray-500">
//                   {blog.isPublished ? "Published" : "Draft"}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useUser, useAuth } from "@clerk/clerk-react";
// import { toast } from "react-hot-toast";
// import { assets } from "../assets/assets"; // ✅ using same assets for icons

// const UserDashboard = () => {
//   const { isSignedIn } = useUser();
//   const { getToken } = useAuth();
//   const [dashboardData, setDashboardData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchDashboard = async () => {
//     if (!isSignedIn) {
//       setLoading(false);
//       return;
//     }

//     try {
//       const token = await getToken();
//       const res = await axios.get("/api/user/dashboard", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (res.data.success) {
//         setDashboardData(res.data.dashboardData);
//       } else {
//         toast.error(res.data.message || "Failed to fetch dashboard");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Error fetching dashboard");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDashboard();
//   }, [isSignedIn]);

//   if (loading) return <p className="p-6 text-gray-500">Loading dashboard...</p>;
//   if (!dashboardData) return <p className="p-6 text-gray-500">No data available.</p>;

//   return (
//     <div className="flex-1 p-4 md:p-10 bg-blue-50/50">
//       {/* Stats Cards */}
//       <div className="flex flex-wrap gap-4">
//         <div className="flex items-center gap-4 bg-white p-4 min-w-[150px] rounded shadow cursor-pointer hover:scale-105 transition-all">
//           <img alt="" src={assets.dashboard_icon_1} />
//           <div>
//             <p className="text-xl font-semibold text-gray-600">
//               {dashboardData.totalBlogs}
//             </p>
//             <p className="text-gray-400 font-light">My Blogs</p>
//           </div>
//         </div>

//         <div className="flex items-center gap-4 bg-white p-4 min-w-[150px] rounded shadow cursor-pointer hover:scale-105 transition-all">
//           <img alt="" src={assets.dashboard_icon_4} />
//           <div>
//             <p className="text-xl font-semibold text-gray-600">
//               {dashboardData.publishedBlogs}
//             </p>
//             <p className="text-gray-400 font-light">Published</p>
//           </div>
//         </div>

//         <div className="flex items-center gap-4 bg-white p-4 min-w-[150px] rounded shadow cursor-pointer hover:scale-105 transition-all">
//           <img alt="" src={assets.dashboard_icon_3} />
//           <div>
//             <p className="text-xl font-semibold text-gray-600">
//               {dashboardData.draftBlogs}
//             </p>
//             <p className="text-gray-400 font-light">Drafts</p>
//           </div>
//         </div>

//         <div className="flex items-center gap-4 bg-white p-4 min-w-[150px] rounded shadow cursor-pointer hover:scale-105 transition-all">
//           <img alt="" src={assets.dashboard_icon_2} />
//           <div>
//             <p className="text-xl font-semibold text-gray-600">
//               {dashboardData.totalComments}
//             </p>
//             <p className="text-gray-400 font-light">Comments</p>
//           </div>
//         </div>
//       </div>

//       {/* Latest Blogs Table */}
//       <div className="mt-6">
//         <div className="flex items-center gap-3 m-4 text-gray-600">
//           <img alt="" src={assets.dashboard_icon_1} />
//           <p>Latest Blogs</p>
//         </div>

//         <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
//           {dashboardData.recentBlogs.length === 0 ? (
//             <p className="p-6 text-gray-500">No blogs yet.</p>
//           ) : (
//             <table className="w-full text-sm text-gray-500">
//               <thead className="text-xs text-gray-600 text-left uppercase bg-gray-50">
//                 <tr>
//                   <th scope="col" className="px-2 py-4 xl:px-6">#</th>
//                   <th scope="col" className="px-2 py-4">Blog Title</th>
//                   <th scope="col" className="px-2 py-4 max-sm:hidden">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {dashboardData.recentBlogs.map((blog, index) => (
//                   <tr
//                     key={blog._id}
//                     className="border-b last:border-none hover:bg-gray-50 transition"
//                   >
//                     <td className="px-2 py-3 text-gray-700">{index + 1}</td>
//                     <td className="px-2 py-3 font-medium text-gray-800">
//                       {blog.title}
//                     </td>
//                     <td className="px-2 py-3">
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-medium ${
//                           blog.isPublished
//                             ? "bg-green-100 text-green-700"
//                             : "bg-yellow-100 text-yellow-700"
//                         }`}
//                       >
//                         {blog.isPublished ? "Published" : "Draft"}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser, useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";
import { assets } from "../assets/assets";
import UserBlogTable from "./user/UserBlogTable";
const UserDashboard = () => {
  const { isSignedIn } = useUser();
  const { getToken } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    if (!isSignedIn) {
      setLoading(false);
      return;
    }

    try {
      const token = await getToken();
      const res = await axios.get("/api/user/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setDashboardData(res.data.dashboardData);
      } else {
        toast.error(res.data.message || "Failed to fetch dashboard");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [isSignedIn]);

  if (loading) return <p className="p-6 text-gray-500">Loading dashboard...</p>;
  if (!dashboardData) return <p className="p-6 text-gray-500">No data available.</p>;

  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50">
      {/* Stats Cards */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-4 bg-white p-4 min-w-[150px] rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img alt="" src={assets.dashboard_icon_1} />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.totalBlogs}
            </p>
            <p className="text-gray-400 font-light">My Blogs</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 min-w-[150px] rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img alt="" src={assets.dashboard_icon_4} />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.publishedBlogs}
            </p>
            <p className="text-gray-400 font-light">Published</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 min-w-[150px] rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img alt="" src={assets.dashboard_icon_3} />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.draftBlogs}
            </p>
            <p className="text-gray-400 font-light">Drafts</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 min-w-[150px] rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img alt="" src={assets.dashboard_icon_2} />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.totalComments}
            </p>
            <p className="text-gray-400 font-light">Comments</p>
          </div>
        </div>
      </div>

      {/* Latest Blogs Table */}
      <div className="mt-6">
        <div className="flex items-center gap-3 m-4 text-gray-600">
          <img alt="" src={assets.dashboard_icon_4} />
          <p>Latest Blogs</p>
        </div>

        <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
          {dashboardData.recentBlogs.length === 0 ? (
            <p className="p-6 text-gray-500">No blogs yet.</p>
          ) : (
            <table className="w-full text-sm text-gray-500">
              <thead className="text-xs text-gray-600 text-left uppercase">
                <tr>
                  <th scope="col" className="px-2 py-4 xl:px-6">#</th>
                  <th scope="col" className="px-2 py-4">Blog Title</th>
                  <th scope="col" className="px-2 py-4 max-sm:hidden">Date</th>
                  <th scope="col" className="px-2 py-4 max-sm:hidden">Status</th>
                  <th scope="col" className="px-2 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.recentBlogs.map((blog, index) => (
                  <UserBlogTable
                    key={blog._id}
                    blog={blog}
                    fetchBlogs={fetchDashboard}
                    index={index + 1}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
