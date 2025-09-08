// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useUser, useAuth } from "@clerk/clerk-react";
// import { toast } from "react-hot-toast";

// const UserComments = ({ refreshTrigger }) => {
//   const { isSignedIn } = useUser();
//   const { getToken } = useAuth();
//   const [comments, setComments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchComments = async () => {
//     if (!isSignedIn) {
//       setLoading(false);
//       return;
//     }

//     try {
//       const token = await getToken();
//       const res = await axios.get("/api/user/comments/my-blogs", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (res.data.success) setComments(res.data.comments);
//       else toast.error(res.data.message || "Failed to fetch comments");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch comments");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchComments();
//   }, [refreshTrigger, isSignedIn]);

//   if (loading) return <p>Loading comments...</p>;
//   if (!comments.length) return <p>No comments yet.</p>;

//   return (
//     <div className="space-y-2">
//       {comments.map((c) => (
//         <div key={c._id} className="border p-2 rounded bg-gray-50">
//           <p className="font-semibold">{c.name}</p>
//           <p>{c.content}</p>
//           <p className="text-sm text-gray-500">
//             Blog: {c.blog?.title || "Deleted"}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default UserComments;

//file


import React, { useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";
import UserCommentTableItem from "./UserCommentTableItem"; // ✅ Row component like CommentTableItem
import { useAppContext } from "../../context/AppContext";

const UserComments = ({ refreshTrigger }) => {
  const { isSignedIn } = useUser();
  const { getToken } = useAuth();
  const { axios } = useAppContext();

  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Not Approved");
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    if (!isSignedIn) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/user/comments/my-blogs", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setComments(data.comments);
      } else {
        toast.error(data.message || "Failed to fetch comments");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch comments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [refreshTrigger, isSignedIn]);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <div className="flex justify-between items-center max-w-3xl">
        <h1 className="text-lg font-semibold">My Comments</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setFilter("Approved")}
            className={`shadow-custom-sm border rounded-full px-2 sm:px-4 py-1 cursor-pointer text-xs ${
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
                Blog & Comment
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
                  <UserCommentTableItem
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

export default UserComments;
