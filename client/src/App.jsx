import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Layout from "./pages/admin/Layout";
import UserLayout from "./pages/UserLayout"; // adjust path if needed

import Dashboard from "./pages/admin/Dashboard";
import UserDashboard from "./pages/UserDashboard";
import AddBlog from "./pages/admin/AddBlog";
import ListBlog from "./pages/admin/ListBlog";
import Comments from "./pages/admin/Comments";
import Login from "./components/admin/Login";
import 'quill/dist/quill.snow.css';
import { Toaster } from 'react-hot-toast';
import { useAppContext } from "./context/AppContext";
import { SignedIn, useUser } from "@clerk/clerk-react";

const App = () => {
  const { token } = useAppContext();
  const { user } = useUser(); 

  const adminEmails = ["yogesh@gmail.com"];

  return (
    <div>
      <Toaster />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />

        {/* Admin panel */}
        <Route path="/admin" element={token && user && adminEmails.includes(user.primaryEmailAddress?.emailAddress) ? <Layout /> : <Login />}>
          <Route index element={<Dashboard />} />
          <Route path="addBlog" element={<AddBlog />} />
          <Route path="listBlog" element={<ListBlog />} />
          <Route path="comments" element={<Comments />} />
        </Route>

        {/* User dashboard with nested routes */}
        <Route path="/dashboard" element={<SignedIn>{user && <UserLayout />}</SignedIn>}>
          <Route index element={<Dashboard />} />          {/* /dashboard */}
          <Route path="blogs" element={<ListBlog />} />        {/* /dashboard/blogs */}
          <Route path="addBlog" element={<AddBlog />} />       {/* /dashboard/addBlog */}
          <Route path="comments" element={<Comments />} />    {/* /dashboard/comments */}
        </Route>
      </Routes>
    </div>
  );
};

export default App;
