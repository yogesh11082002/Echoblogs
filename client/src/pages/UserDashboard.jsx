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
import UserLayout from "./UserLayout";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const UserDashboard = () => {
  const { user, isSignedIn, getToken } = useUser();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      if (!isSignedIn || !user) return;

      try {
        // Get Clerk session token
        const token = await getToken({ template: "default" });

        // Call backend user route (make sure backend has /api/blog/my-blogs using userAuth middleware)
        const res = await axios.get("/api/blog/all", {
          headers: {
            Authorization: token, // raw Clerk token
          },
        });

        setBlogs(res.data);
      } catch (err) {
        console.error("Error fetching user blogs:", err);
      }
    };

    fetchBlogs();
  }, [isSignedIn, user, getToken]);

  return (
    <UserLayout>
      {/* Add top margin so it doesn't collide with navbar */}
      <div className="mt-[100px] p-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">My Blogs</h2>
        {blogs.length === 0 && <p>No blogs yet.</p>}
        <ul>
          {blogs.map((blog) => (
            <li
              key={blog._id}
              className="mb-4 p-4 bg-white rounded shadow hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg">{blog.title}</h3>
              <p className="text-gray-500">
                Status: {blog.published ? "Published" : "Draft"}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </UserLayout>
  );
};

export default UserDashboard;
