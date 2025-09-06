// 
import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { useAppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { axios } = useAppContext();

  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  // ✅ Fetch dashboard data from backend
  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found. Please login again.");
        return;
      }

      const { data } = await axios.get("/api/admin/dashboard", {
        headers: { Authorization: token }, // send raw token
      });

      if (data.success) {
        setDashboardData({
          blogs: data.dashboardData.blogs,
          comments: data.dashboardData.comments,
          drafts: data.dashboardData.draft,
          recentBlogs: data.dashboardData.recentBlogs,
        });
      } else {
        alert(data.message || "Failed to load dashboard");
      }
    } catch (error) {
      console.error("Dashboard fetch error:", error);
      alert("Error while fetching dashboard data");
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50">
      {/* Stats Cards */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-4 bg-white p-4 min-w-[58px] rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img alt="" src={assets.dashboard_icon_1} />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.blogs}
            </p>
            <p className="text-gray-400 font-light">Blogs</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 min-w-[58px] rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img alt="" src={assets.dashboard_icon_2} />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.comments}
            </p>
            <p className="text-gray-400 font-light">Comments</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 min-w-[58px] rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img alt="" src={assets.dashboard_icon_3} />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.drafts}
            </p>
            <p className="text-gray-400 font-light">Drafts</p>
          </div>
        </div>
      </div>

      {/* Latest Blogs Table */}
      <div className="mt-6">
        <div className="flex items-center gap-3 m-4 text-gray-600">
          <img alt="" src={assets.dashboard_icon_4} />
          <p>Latest Blogs</p>
        </div>

        <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-600 text-left uppercase">
              <tr>
                <th scope="col" className="px-2 py-4 xl:px-6">
                  #
                </th>
                <th scope="col" className="px-2 py-4">
                  Blog Title
                </th>
                <th scope="col" className="px-2 py-4 max-sm:hidden">
                  Date
                </th>
                <th scope="col" className="px-2 py-4 max-sm:hidden">
                  Status
                </th>
                <th scope="col" className="px-2 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentBlogs.map((blog, index) => (
                <BlogTableItem
                  key={blog._id}
                  blog={blog}
                  fetchBlogs={fetchDashboard}
                  index={index + 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
