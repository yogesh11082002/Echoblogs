import React, { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import CommentTableItem from "../../components/admin/CommentTableItem";

const Comments = () => {
  const { axios } = useAppContext(); // use axios from context
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Not Approved");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all comments
  const fetchComments = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/admin/comments"); // use correct route
      if (data.success) {
        setComments(data.comments);
      } else {
        alert(data.message || "Failed to load comments");
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching comments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <div className="flex justify-between items-center max-w-3xl">
        <h1 className="text-lg font-semibold">Comments</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setFilter("Approved")}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === "Approved" ? "text-primary" : "text-gray-700"
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter("Not Approved")}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === "Not Approved" ? "text-primary" : "text-gray-700"
            }`}
          >
            Not Approved
          </button>
        </div>
      </div>

      <div className="relative h-4/5 mt-4 max-w-3xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-600 text-left uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Blog Title & Comment
              </th>
              <th scope="col" className="px-6 py-3 max-sm:hidden">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="text-center py-6">
                  Loading comments...
                </td>
              </tr>
            ) : comments.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-6">
                  No comments found
                </td>
              </tr>
            ) : (
              comments
                .filter((comment) =>
                  filter === "Approved"
                    ? comment.isApproved === true
                    : comment.isApproved === false
                )
                .map((comment, index) => (
                  <CommentTableItem
                    key={comment._id}
                    comment={comment}
                    index={index + 1}
                    fetchComments={fetchComments}
                  />
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comments;
