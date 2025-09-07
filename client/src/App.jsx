// import { Route, Routes } from "react-router-dom";
// import Home from "./pages/Home";
// import Blog from "./pages/Blog";
// import Layout from "./pages/admin/Layout";
// import UserLayout from "./pages/UserLayout";

// import AdminDashboard from "./pages/admin/Dashboard";  // ✅ renamed import
// import UserDashboard from "./pages/UserDashboard";
// import AddBlog from "./pages/admin/AddBlog";
// import ListBlog from "./pages/admin/ListBlog";
// import Comments from "./pages/admin/Comments";
// import Login from "./components/admin/Login";

// import 'quill/dist/quill.snow.css';
// import { Toaster } from 'react-hot-toast';
// import { useAppContext } from "./context/AppContext";
// import { SignedIn, useUser } from "@clerk/clerk-react";

// const App = () => {
//   const { token } = useAppContext();
//   const { user } = useUser();

//   return (
//     <div>
//       <Toaster />
//       <Routes>
//         {/* Public routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/blog/:id" element={<Blog />} />

//         {/* Admin panel - only depends on token */}
//         <Route
//           path="/admin"
//           element={token ? <Layout /> : <Login />}
//         >
//           <Route index element={<AdminDashboard />} />
//           <Route path="addBlog" element={<AddBlog />} />
//           <Route path="listBlog" element={<ListBlog />} />
//           <Route path="comments" element={<Comments />} />
//         </Route>

//         {/* User dashboard - depends on Clerk user */}
//         <Route
//           path="/dashboard"
//           element={<SignedIn>{user && <UserLayout />}</SignedIn>}
//         >
//           <Route index element={<UserDashboard />} />   {/* ✅ now uses separate component */}
//           <Route path="blogs" element={<ListBlog />} />
//           <Route path="addBlog" element={<AddBlog />} />
//           <Route path="comments" element={<Comments />} />
//         </Route>
//       </Routes>
//     </div>
//   );
// };

// export default App;

import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Layout from "./pages/admin/Layout";
import UserLayout from "./pages/UserLayout";

import AdminDashboard from "./pages/admin/Dashboard";  
import UserDashboard from "./pages/UserDashboard";

import AddBlog from "./pages/admin/AddBlog";
import ListBlog from "./pages/admin/ListBlog";
import Comments from "./pages/admin/Comments";

import UserBlogs from "./pages/user/UserBlogs";
import UserAddBlog from "./pages/user/UserAddBlog";
import UserComments from "./pages/user/UserComments";

import Login from "./components/admin/Login";

import 'quill/dist/quill.snow.css';
import { Toaster } from 'react-hot-toast';
import { useAppContext } from "./context/AppContext";
import { SignedIn, useUser } from "@clerk/clerk-react";

const App = () => {
  const { token } = useAppContext();
  const { user } = useUser();

  return (
    <div>
      <Toaster />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />

        {/* Admin panel */}
        <Route
          path="/admin"
          element={token ? <Layout /> : <Login />}
        >
          <Route index element={<AdminDashboard />} />
          <Route path="addBlog" element={<AddBlog />} />
          <Route path="listBlog" element={<ListBlog />} />
          <Route path="comments" element={<Comments />} />
        </Route>

        {/* User dashboard */}
        <Route
          path="/dashboard"
          element={<SignedIn>{user && <UserLayout />}</SignedIn>}
        >
          <Route index element={<UserDashboard />} />
          <Route path="blogs" element={<UserBlogs />} />
          <Route path="addBlog" element={<UserAddBlog />} />
          <Route path="comments" element={<UserComments />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
