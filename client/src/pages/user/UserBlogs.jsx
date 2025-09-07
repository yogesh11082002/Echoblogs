const UserBlogs = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">My Blogs</h1>
      <p className="text-gray-600">
        Here you can view and manage your own blogs.
      </p>
      {/* TODO: Fetch only blogs by logged-in user */}
    </div>
  );
};

export default UserBlogs;
