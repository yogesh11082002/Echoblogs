// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useUser } from "@clerk/clerk-react";

// const UserDashboard = () => {
//   const { user, isSignedIn, getToken } = useUser();
//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       if (!isSignedIn || !user) return;

//       try {
//         const token = await getToken({ template: "default" });

//         const res = await axios.get("/api/blog/my-blogs", {
//           headers: { Authorization: token },
//         });

//         setBlogs(res.data || []);
//       } catch (err) {
//         console.error("Error fetching user blogs:", err);
//       }
//     };

//     fetchBlogs();
//   }, [isSignedIn, user, getToken]);

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

//       {/* Stats */}
//       <div className="flex gap-4 mb-6">
//         <div className="flex-1 bg-white shadow rounded p-4 text-center">
//           <h3 className="text-lg font-semibold">{blogs.length}</h3>
//           <p className="text-gray-500">My Blogs</p>
//         </div>
//         <div className="flex-1 bg-white shadow rounded p-4 text-center">
//           <h3 className="text-lg font-semibold">
//             {blogs.filter((b) => b.published).length}
//           </h3>
//           <p className="text-gray-500">Published</p>
//         </div>
//         <div className="flex-1 bg-white shadow rounded p-4 text-center">
//           <h3 className="text-lg font-semibold">
//             {blogs.filter((b) => !b.published).length}
//           </h3>
//           <p className="text-gray-500">Drafts</p>
//         </div>
//       </div>

//       {/* Recent Blogs */}
//       <div className="bg-white shadow rounded p-4">
//         <h3 className="text-lg font-semibold mb-4">Recent Blogs</h3>
//         {blogs.length === 0 && <p className="text-gray-500">No blogs yet.</p>}
//         <ul>
//           {blogs.slice(0, 5).map((blog) => (
//             <li
//               key={blog._id}
//               className="mb-2 border-b last:border-none pb-2 text-gray-700"
//             >
//               <span className="font-medium">{blog.title}</span> —{" "}
//               <span className="text-gray-500">
//                 {blog.published ? "Published" : "Draft"}
//               </span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useUser } from "@clerk/clerk-react";
// const UserDashboard = () => {
//   const { user, isSignedIn, getToken } = useUser();
//   const [blogs, setBlogs] = useState([]);
//   useEffect(() => {
//     const fetchBlogs = async () => {
//       if (!isSignedIn || !user) return;
//       try {
//         const token = await getToken({ template: "default" });
//         const res = await axios.get("/api/blog/my-blogs", {
//           headers: { Authorization: token },
//         });
//         setBlogs(res.data || []);
//       } catch (err) {
//         console.error("Error fetching user blogs:", err);
//       }
//     };
//     fetchBlogs();
//   }, [isSignedIn, user, getToken]);
//   return (
//     <div>
//       {" "}
//       <h2 className="text-2xl font-bold mb-4">Dashboard</h2> {/* Stats */}{" "}
//       <div className="flex gap-4 mb-6">
//         {" "}
//         <div className="flex-1 bg-white shadow rounded p-4 text-center">
//           {" "}
//           <h3 className="text-lg font-semibold">{blogs.length}</h3>{" "}
//           <p className="text-gray-500">My Blogs</p>{" "}
//         </div>{" "}
//         <div className="flex-1 bg-white shadow rounded p-4 text-center">
//           {" "}
//           <h3 className="text-lg font-semibold">
//             {" "}
//             {blogs.filter((b) => b.published).length}{" "}
//           </h3>{" "}
//           <p className="text-gray-500">Published</p>{" "}
//         </div>{" "}
//         <div className="flex-1 bg-white shadow rounded p-4 text-center">
//           {" "}
//           <h3 className="text-lg font-semibold">
//             {" "}
//             {blogs.filter((b) => !b.published).length}{" "}
//           </h3>{" "}
//           <p className="text-gray-500">Drafts</p>{" "}
//         </div>{" "}
//       </div>{" "}
//       {/* Recent Blogs */}{" "}
//       <div className="bg-white shadow rounded p-4">
//         {" "}
//         <h3 className="text-lg font-semibold mb-4">Recent Blogs</h3>{" "}
//         {blogs.length === 0 && <p className="text-gray-500">No blogs yet.</p>}{" "}
//         <ul>
//           {" "}
//           {blogs.slice(0, 5).map((blog) => (
//             <li
//               key={blog._id}
//               className="mb-2 border-b last:border-none pb-2 text-gray-700"
//             >
//               {" "}
//               <span className="font-medium">{blog.title}</span> —{" "}
//               <span className="text-gray-500">
//                 {" "}
//                 {blog.published ? "Published" : "Draft"}{" "}
//               </span>{" "}
//             </li>
//           ))}{" "}
//         </ul>{" "}
//       </div>{" "}
//     </div>
//   );
// };
// export default UserDashboard;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser, useAuth } from "@clerk/clerk-react";

const UserDashboard = () => {
  const { user, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      if (!isSignedIn || !user) {
        setLoading(false);
        return;
      }

      try {
        const token = await getToken();

        const res = await axios.get("/api/blog/my-blogs", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // ✅ Adjust depending on your backend response
        setBlogs(res.data.blogs || []);
      } catch (err) {
        console.error("Error fetching user blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [isSignedIn, user, getToken]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      {/* Stats */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 bg-white shadow rounded p-4 text-center">
          <h3 className="text-lg font-semibold">{blogs.length}</h3>
          <p className="text-gray-500">My Blogs</p>
        </div>
        <div className="flex-1 bg-white shadow rounded p-4 text-center">
          <h3 className="text-lg font-semibold">
            {blogs.filter((b) => b.published).length}
          </h3>
          <p className="text-gray-500">Published</p>
        </div>
        <div className="flex-1 bg-white shadow rounded p-4 text-center">
          <h3 className="text-lg font-semibold">
            {blogs.filter((b) => !b.published).length}
          </h3>
          <p className="text-gray-500">Drafts</p>
        </div>
      </div>

      {/* Recent Blogs */}
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-lg font-semibold mb-4">Recent Blogs</h3>

        {loading ? (
          <p className="text-gray-500">Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p className="text-gray-500">No blogs yet.</p>
        ) : (
          <ul>
            {blogs.slice(0, 5).map((blog) => (
              <li
                key={blog._id}
                className="mb-2 border-b last:border-none pb-2 text-gray-700"
              >
                <span className="font-medium">{blog.title}</span> —{" "}
                <span className="text-gray-500">
                  {blog.published ? "Published" : "Draft"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
