// const UserComments = () => {
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold mb-4">My Comments</h1>
//       <p className="text-gray-600">
//         See all comments you've made on blogs.
//       </p>
//       {/* TODO: Fetch and display user's comments */}
//     </div>
//   );
// };

// export default UserComments;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const UserComments = () => {
  const { user, isSignedIn, getToken } = useUser();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      if (!isSignedIn || !user) return;

      try {
        const token = await getToken({ template: "default" });

        const res = await axios.get("/api/comments/my-blogs", {
          headers: { Authorization: token },
        });

        setComments(res.data || []);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };

    fetchComments();
  }, [isSignedIn, user, getToken]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Comments on My Blogs</h2>

      {comments.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c._id} className="bg-white shadow rounded p-4">
              <p className="font-medium">{c.name}</p>
              <p className="text-gray-600">{c.content}</p>
              <p className="text-sm text-gray-400">
                Blog: {c.blog?.title || "Deleted"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserComments;
