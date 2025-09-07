// import React, { useEffect, useState } from "react";
// import UserLayout from "./UserLayout";
// import axios from "axios";
// import { useUser } from "@clerk/clerk-react";

// const UserDashboard = () => {
//   const { user } = useUser();
//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     if (user) {
//       axios
//         .get(`/api/blogs?author=${user.id}`) // only user's blogs
//         .then(res => setBlogs(res.data))
//         .catch(err => console.log(err));
//     }
//   }, [user]);

//   return (
//     <UserLayout>
//       <div>
//         <h2 className="text-2xl font-bold mb-4">My Blogs</h2>
//         {blogs.length === 0 && <p>No blogs yet.</p>}
//         <ul>
//           {blogs.map(blog => (
//             <li key={blog._id}>
//               <h3>{blog.title}</h3>
//               <p>Status: {blog.published ? "Published" : "Draft"}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </UserLayout>
//   );
// };

// export default UserDashboard;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const UserDashboard = () => {
  const { user, isSignedIn, getToken } = useUser();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    if (!isSignedIn || !user) return;

    try {
      setLoading(true);
      // Get Clerk session token
      const token = await getToken({ template: "default" });

      // Call backend user route (must use your userAuth middleware)
      const res = await axios.get("/api/blog/my-blogs", {
        headers: {
          Authorization: token, // raw Clerk token
        },
      });

      setBlogs(res.data.blogs || []); // assuming backend returns { blogs: [] }
    } catch (err) {
      console.error("Error fetching user blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [isSignedIn, user, getToken]);

  if (loading) {
    return (
      <div className="p-5 flex justify-center items-center">
        <p className="text-gray-500">Loading your blogs...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 md:p-8 bg-gray-50 min-h-full">
      {/* Stats */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-4 bg-white p-4 min-w-[150px] rounded shadow hover:shadow-md transition">
          <p className="text-2xl font-semibold text-gray-700">{blogs.length}</p>
          <p className="text-gray-500">Total Blogs</p>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 min-w-[150px] rounded shadow hover:shadow-md transition">
          <p className="text-2xl font-semibold text-green-600">
            {blogs.filter((b) => b.published).length}
          </p>
          <p className="text-gray-500">Published</p>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 min-w-[150px] rounded shadow hover:shadow-md transition">
          <p className="text-2xl font-semibold text-yellow-600">
            {blogs.filter((b) => !b.published).length}
          </p>
          <p className="text-gray-500">Drafts</p>
        </div>
      </div>

      {/* Blog Table */}
      <div className="mt-8 bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-gray-600 uppercase bg-gray-100">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No blogs found.
                </td>
              </tr>
            )}

            {blogs.map((blog, index) => (
              <tr
                key={blog._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3 font-medium">{blog.title}</td>
                <td className="px-4 py-3">
                  {blog.published ? (
                    <span className="text-green-600 font-semibold">Published</span>
                  ) : (
                    <span className="text-yellow-600 font-semibold">Draft</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboard;
