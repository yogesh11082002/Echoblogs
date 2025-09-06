import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

const CommentTableItem = ({ comment, fetchComments }) => {
  const { axios, token } = useAppContext();
  if (!comment) return null;

  const { blog, createdAt, name, content, isApproved, _id } = comment;
  const BlogDate = new Date(createdAt);

  // ✅ Approve comment
  const handleApprove = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/admin/approve-comment`,
        { id: _id },
        { headers: { Authorization: token } } // ❌ Removed Bearer
      );

      if (data.success) {
        fetchComments();
        toast.success(data.message);
      } else {
        alert(data.message || "Failed to approve comment");
      }
    } catch (err) {
      console.error("Approve comment error:", err);
      alert("Error approving comment");
    }
  };

  // ✅ Delete comment
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/admin/delete-comment`,
        { id: _id },
        { headers: { Authorization: token } } // ❌ Removed Bearer
      );

      if (data.success) {
        fetchComments();
        toast.success(data.message);
      } else {
        alert(data.message || "Failed to delete comment");
      }
    } catch (err) {
      console.error("Delete comment error:", err);
      alert("Error deleting comment");
    }
  };

  return (
    <tr className="border-y border-gray-300">
      <td className="px-6 py-4">
        <b className="font-medium text-gray-600">Blog</b>: {blog?.title || "N/A"}
        <br />
        <br />
        <b className="font-medium text-gray-600">Name</b>: {name}
        <br />
        <b className="font-medium text-gray-600">Comment</b>: {content}
      </td>
      <td className="px-6 py-4 max-sm:hidden">{BlogDate.toLocaleDateString()}</td>
      <td className="px-6 py-4">
        <div className="inline-flex gap-4 items-center">
          {!isApproved ? (
            <img
              src={assets.tick_icon}
              alt="approve"
              className="w-5 hover:scale-110 transition-all cursor-pointer"
              onClick={handleApprove}
            />
          ) : (
            <p className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">
              Approved
            </p>
          )}

          <img
            className="w-5 hover:scale-110 transition-all cursor-pointer"
            src={assets.bin_icon}
            alt="delete"
            onClick={handleDelete}
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;
