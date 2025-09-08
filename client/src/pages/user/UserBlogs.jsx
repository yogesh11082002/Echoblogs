// import React, { useEffect, useState } from "react";
// import { useUser, useAuth } from "@clerk/clerk-react";
// import { toast } from "react-hot-toast";
// import UserBlogTable from "./UserBlogTable"; // ✅ Row component (like BlogTableItem)

// const UserBlogs = ({ refreshTrigger }) => {
//   const { isSignedIn } = useUser();
//   const { getToken } = useAuth();
//   const [blogs, setBlogs] = useState([]);

//   const fetchBlogs = async () => {
//     if (!isSignedIn) return;

//     try {
//       const token = await getToken();
//       const res = await fetch("/api/user/blog/my-blogs", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const data = await res.json();
//       if (res.ok && data.success) {
//         setBlogs(data.blogs);
//       } else {
//         toast.error(data.message || "Failed to fetch blogs");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch blogs");
//     }
//   };

//   useEffect(() => {
//     fetchBlogs();
//   }, [refreshTrigger, isSignedIn]);

//   return (
//     <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
//       <h1 className="text-primary text-2xl">My Blogs</h1>

//       <div className="relative h-4/5 mt-4 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
//         <table className="w-full text-sm text-gray-500">
//           <thead className="text-xs text-gray-600 text-left uppercase">
//             <tr>
//               <th scope="col" className="px-2 py-4 xl:px-6">#</th>
//               <th scope="col" className="px-2 py-4">Blog Title</th>
//               <th scope="col" className="px-2 py-4 max-sm:hidden">Date</th>
//               <th scope="col" className="px-2 py-4 max-sm:hidden">Status</th>
//               <th scope="col" className="px-2 py-4">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {blogs.length > 0 ? (
//               blogs.map((blog, index) => (
//                 <UserBlogTable
//                   key={blog._id}
//                   blog={blog}
//                   fetchBlogs={fetchBlogs}
//                   index={index + 1}
//                 />
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="text-center py-6 text-gray-500">
//                   No blogs yet.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UserBlogs;

import React, { useEffect, useState } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";
import UserBlogTable from "./UserBlogTable"; // Row component

// ✅ Backend base URL from environment variable
const API_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

const UserBlogs = ({ refreshTrigger }) => {
  const { isSignedIn } = useUser();
  const { getToken } = useAuth();
  const [blogs, setBlogs] = useState([]);

  // ✅ Fetch blogs of logged-in user
  const fetchBlogs = async () => {
    if (!isSignedIn) return;

    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/api/user/blog/my-blogs`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error(data.message || "Failed to fetch blogs");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [refreshTrigger, isSignedIn]);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <h1 className="text-primary text-2xl">My Blogs</h1>

      <div className="relative h-4/5 mt-4 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
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
            {blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <UserBlogTable
                  key={blog._id}
                  blog={blog}
                  fetchBlogs={fetchBlogs}
                  index={index + 1}
                />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No blogs yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserBlogs;
