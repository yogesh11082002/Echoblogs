// const UserBlogs = () => {
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold mb-4">My Blogs</h1>
//       <p className="text-gray-600">
//         Here you can view and manage your own blogs.
//       </p>
//       {/* TODO: Fetch only blogs by logged-in user */}
//     </div>
//   );
// };

// export default UserBlogs;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { Pencil, Trash2 } from "lucide-react";

const UserBlogs = () => {
  const { user, isSignedIn, getToken } = useUser();
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    if (!isSignedIn || !user) return;

    try {
      const token = await getToken({ template: "default" });

      const res = await axios.get("/api/blog/my-blogs", {
        headers: { Authorization: token },
      });

      setBlogs(res.data || []);
    } catch (err) {
      console.error("Error fetching user blogs:", err);
    }
  };

  const deleteBlog = async (id) => {
    try {
      const token = await getToken({ template: "default" });

      await axios.delete(`/api/blog/${id}`, {
        headers: { Authorization: token },
      });

      setBlogs(blogs.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [isSignedIn, user, getToken]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Blogs</h2>

      {blogs.length === 0 ? (
        <p className="text-gray-500">You haven’t created any blogs yet.</p>
      ) : (
        <table className="w-full bg-white shadow rounded overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-3 px-4">Title</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id} className="border-t">
                <td className="py-3 px-4">{blog.title}</td>
                <td className="py-3 px-4">
                  {blog.published ? (
                    <span className="text-green-600">Published</span>
                  ) : (
                    <span className="text-yellow-600">Draft</span>
                  )}
                </td>
                <td className="py-3 px-4 flex gap-3">
                  <button className="text-blue-600 hover:underline flex items-center gap-1">
                    <Pencil size={16} /> Edit
                  </button>
                  <button
                    onClick={() => deleteBlog(blog._id)}
                    className="text-red-600 hover:underline flex items-center gap-1"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserBlogs;
