import { useContext, createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

 const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [blogs, setBlogs] = useState([]); // fixed typo: blogs instead of blog
  const [input, setInput] = useState("");

  const fetchBlogs = async()=>{
    try {
       const   {data}  =await axios.get('/api/blog/all');
       data.success ? setBlogs(data.blogs):toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
  fetchBlogs();
  const savedToken = localStorage.getItem('token');
  if (savedToken) {
    setToken(savedToken);
    axios.defaults.headers.common['Authorization'] = savedToken;
  }
}, []);


  const value = {
    axios,
    token,
    setToken,
    blogs,
    setBlogs,
    input,
    setInput,
    navigate, // expose navigate if you want to use it globally
  };

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
