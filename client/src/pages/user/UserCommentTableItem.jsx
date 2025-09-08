import React from "react";
import { assets } from "../../assets/assets";
import { useAuth } from "@clerk/clerk-react";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

const UserCommentTableItem = ({ comment, fetchComments, index }) => {
  const { axios } = useAppContext();
  const { getToken } = useAuth();
  if (!comment) return null;

  const { blog, createdAt, name, content, isApproved, _id } = comment;
  const BlogDate = new Date(createdAt);

  // ✅ Approve comment (for user, if allowed)
  const handleApprove = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        "/api/user/approve-comment",
        { id: _id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        fetchComments();
        toast.success(data.message || "Comment approved!");
      } else {
        toast.error(data.message || "Failed to approve comment");
      }
    } catch (err) {
      console.error("Approve comment error:", err);
      toast.error("Error approving comment");
    }
  };

  // ✅ Delete comment
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;

    try {
      const token = await getToken();
      const { data } = await axios.post(
        "/api/user/delete-comment",
        { id: _id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        fetchComments();
        toast.success(data.message || "Comment deleted!");
      } else {
        toast.error(data.message || "Failed to delete comment");
      }
    } catch (err) {
      console.error("Delete comment error:", err);
      toast.error("Error deleting comment");
    }
  };

  return (
    <tr className="border-y border-gray-300">
      <td className="px-6 py-4">
        <b className="font-medium text-gray-600">#{index}</b>
        <br />
        <b className="font-medium text-gray-600">Blog:</b> {blog?.title || "Deleted"}
        <br />
        <b className="font-medium text-gray-600">Name:</b> {name}
        <br />
        <b className="font-medium text-gray-600">Comment:</b> {content}
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

export default UserCommentTableItem;
