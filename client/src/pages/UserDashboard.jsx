import React, { useEffect, useState } from "react";
import UserLayout from "./UserLayout";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const UserDashboard = () => {
  const { user } = useUser();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (user) {
      axios
        .get(`/api/blogs?author=${user.id}`) // only user's blogs
        .then(res => setBlogs(res.data))
        .catch(err => console.log(err));
    }
  }, [user]);

  return (
    <UserLayout>
      <div>
        <h2 className="text-2xl font-bold mb-4">My Blogs</h2>
        {blogs.length === 0 && <p>No blogs yet.</p>}
        <ul>
          {blogs.map(blog => (
            <li key={blog._id}>
              <h3>{blog.title}</h3>
              <p>Status: {blog.published ? "Published" : "Draft"}</p>
            </li>
          ))}
        </ul>
      </div>
    </UserLayout>
  );
};

export default UserDashboard;
