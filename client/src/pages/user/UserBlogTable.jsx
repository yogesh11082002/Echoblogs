import { assets } from "../../assets/assets";
import { toast } from "react-hot-toast";

// ✅ Base URL from .env
const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

const UserBlogTable = ({ blog, fetchBlogs, index }) => {
  const { title, createdAt } = blog;
  const BlogDate = new Date(createdAt);

  // ✅ Helper to safely parse JSON
  const safeJson = async (res) => {
    try {
      return await res.json();
    } catch {
      return {};
    }
  };

  // ✅ Toggle publish/unpublish (User API route)
  const handleTogglePublish = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found. Please login again.");
        return;
      }

      const res = await fetch(`${BASE_URL}/api/user/blog/toggle-publish`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Clerk uses Bearer token
        },
        body: JSON.stringify({ id: blog._id }),
      });

      const data = await safeJson(res);

      if (res.ok && data.success) {
        fetchBlogs();
        toast.success(data.message);
      } else {
        alert(data.message || "Failed to update blog status");
      }
    } catch (err) {
      console.error("Toggle publish error:", err);
      alert("Error while updating blog status");
    }
  };

  // ✅ Delete blog (User API route)
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found. Please login again.");
        return;
      }

      const res = await fetch(`${BASE_URL}/api/user/blog/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: blog._id }),
      });

      const data = await safeJson(res);

      if (res.ok && data.success) {
        fetchBlogs();
        toast.success(data.message);
      } else {
        alert(data.message || "Failed to delete blog");
      }
    } catch (err) {
      console.error("Delete blog error:", err);
      alert("Error while deleting blog");
    }
  };

  return (
    <tr className="border-y border-gray-300">
      <th className="px-2 py-4">{index}</th>
      <td className="px-2 py-4">{title}</td>
      <td className="px-2 py-4 max-sm:hidden">{BlogDate.toDateString()}</td>
      <td className="px-2 py-4 max-sm:hidden">
        <p
          className={`${
            blog.isPublished ? "text-green-600" : "text-orange-700"
          }`}
        >
          {blog.isPublished ? "Published" : "Unpublished"}
        </p>
      </td>
      <td className="px-2 py-4 flex text-xs gap-3">
        <button
          onClick={handleTogglePublish}
          className="border px-2 py-0.5 mt-1 rounded cursor-pointer hover:bg-gray-200"
        >
          {blog.isPublished ? "Unpublish" : "Publish"}
        </button>
        <img
          onClick={handleDelete}
          className="w-8 hover:scale-110 transition-all cursor-pointer"
          alt="delete"
          src={assets.cross_icon}
        />
      </td>
    </tr>
  );
};

export default UserBlogTable;
