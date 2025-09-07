// import React, { useState, useRef, useEffect } from "react";
// import { motion } from "framer-motion";
// import gsap from "gsap";
// import "react-quill/dist/quill.snow.css";
// import ReactQuill from "react-quill";
// import { assets } from "../../assets/assets";
// import { useAppContext } from "../../context/AppContext";
// import { useUser } from "@clerk/clerk-react";
// import { toast } from "react-hot-toast";

// const UserAddBlog = () => {
//   const { axios } = useAppContext();
//   const { getToken } = useUser();

//   const [isAdding, setIsAdding] = useState(false);
//   const [isGenerating, setIsGenerating] = useState(false);

//   const [image, setImage] = useState(null);
//   const [title, setTitle] = useState("");
//   const [subTitle, setSubTitle] = useState("");
//   const [category, setCategory] = useState("Select Category");
//   const [isPublished, setIsPublished] = useState(false);
//   const [content, setContent] = useState("");

//   const formRef = useRef(null);

//   useEffect(() => {
//     if (formRef.current) {
//       gsap.from(formRef.current, {
//         opacity: 0,
//         y: 30,
//         duration: 0.8,
//         ease: "power3.out",
//       });
//     }
//   }, []);

//   // ✅ Submit blog (User’s blog)
//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       setIsAdding(true);

//       const token = await getToken({ template: "default" });

//       const blog = {
//         title,
//         subTitle,
//         description: content,
//         category,
//         isPublished,
//       };

//       const formData = new FormData();
//       formData.append("blog", JSON.stringify(blog));
//       formData.append("image", image);

//       const { data } = await axios.post("/api/blog", formData, {
//         headers: { Authorization: token },
//       });

//       if (data.success) {
//         toast.success(data.message || "Blog created!");
//         // Reset form
//         setImage(null);
//         setTitle("");
//         setSubTitle("");
//         setContent("");
//         setCategory("Select Category");
//         setIsPublished(false);
//       } else {
//         toast.error(data.message || "Failed to add blog");
//       }
//     } catch (error) {
//       toast.error(error.message || "Something went wrong");
//     } finally {
//       setIsAdding(false);
//     }
//   };

//   // ✅ Generate AI blog content
//   const generateContent = async () => {
//     if (!title) {
//       toast.error("Please enter a blog title first");
//       return;
//     }

//     try {
//       setIsGenerating(true);

//       const token = await getToken({ template: "default" });

//       const prompt = `
// Write a detailed blog on the topic: "${title}".
// - Include an introduction.
// - Use bold headings and subheadings (<h1>, <h2>, <h3>).
// - Use lists (<ul><li>) for steps, tips, or examples.
// - Add *italic* or **bold** tips where useful.
// - End with a conclusion.
//       `;

//       const { data } = await axios.post(
//         "/api/blog/generate",
//         { prompt },
//         { headers: { Authorization: token } }
//       );

//       if (data.success) {
//         let cleanedContent = data.content
//           .replace(/<\s*html[^>]*>/gi, "")
//           .replace(/<\s*\/\s*html>/gi, "")
//           .replace(/<\s*head[^>]*>.*?<\s*\/\s*head>/gis, "")
//           .replace(/<\s*body[^>]*>/gi, "")
//           .replace(/<\s*\/\s*body>/gi, "")
//           .replace(/<\s*meta[^>]*>/gi, "")
//           .replace(/<\s*title[^>]*>.*?<\s*\/\s*title>/gis, "")
//           .replace(/\n\s*\n/g, "\n")
//           .trim();

//         setContent(cleanedContent);
//         toast.success("Blog content generated!");
//       } else {
//         toast.error(data.message || "Failed to generate content");
//       }
//     } catch (error) {
//       console.error("AI generation error:", error);
//       toast.error(error.message || "Error generating blog content");
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   return (
//     <form
//       ref={formRef}
//       onSubmit={onSubmitHandler}
//       className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll p-4"
//     >
//       <div className="bg-white w-full max-w-3xl p-6 md:p-10 sm:m-10 shadow rounded space-y-6">
//         {/* Thumbnail */}
//         <div>
//           <p className="font-semibold mb-2">Upload thumbnail</p>
//           <label htmlFor="image">
//             <img
//               alt="thumbnail"
//               className="mt-2 h-16 rounded cursor-pointer border border-gray-300 object-cover"
//               src={image ? URL.createObjectURL(image) : assets.upload_area}
//             />
//             <input
//               onChange={(e) => setImage(e.target.files[0])}
//               id="image"
//               hidden
//               required
//               type="file"
//             />
//           </label>
//         </div>

//         {/* Title & SubTitle */}
//         <div className="space-y-4">
//           <div>
//             <p className="font-semibold mb-1">Blog title</p>
//             <input
//               placeholder="Type here"
//               required
//               className="w-full max-w-lg mt-1 p-2 border border-gray-300 outline-none rounded"
//               type="text"
//               onChange={(e) => setTitle(e.target.value)}
//               value={title}
//             />
//           </div>
//           <div>
//             <p className="font-semibold mb-1">Sub title</p>
//             <input
//               placeholder="Type here"
//               required
//               className="w-full max-w-lg mt-1 p-2 border border-gray-300 outline-none rounded"
//               type="text"
//               onChange={(e) => setSubTitle(e.target.value)}
//               value={subTitle}
//             />
//           </div>
//         </div>

//         {/* Blog Description */}
//         <div className="space-y-2 relative">
//           <p className="font-semibold mb-1">Blog Description</p>
//           <div className="max-w-lg h-80 pb-16 pt-2 relative border border-gray-300 rounded">
//             <ReactQuill
//               value={content}
//               onChange={setContent}
//               theme="snow"
//               className="h-full"
//             />

//             {isGenerating && (
//               <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center z-10 rounded">
//                 <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
//                 <p className="text-white font-semibold text-sm animate-pulse">
//                   AI is writing your blog...
//                 </p>
//               </div>
//             )}

//             <button
//               type="button"
//               onClick={generateContent}
//               disabled={isGenerating}
//               className="absolute bottom-2 right-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded cursor-pointer"
//             >
//               {isGenerating ? "Generating..." : "Generate with AI"}
//             </button>
//           </div>
//         </div>

//         {/* Blog Category */}
//         <div className="space-y-2 mt-12">
//           <p className="font-semibold mb-1">Blog category</p>
//           <select
//             name="category"
//             className="mt-1 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded w-48"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <option value="">Select Category</option>
//             <option value="Technology">Technology</option>
//             <option value="Startup">Startup</option>
//             <option value="Lifestyle">Lifestyle</option>
//             <option value="Finance">Finance</option>
//           </select>
//         </div>

//         {/* Publish toggle */}
//         <div className="flex gap-2 mt-2 items-center">
//           <p className="font-semibold">Publish Now</p>
//           <input
//             className="scale-125 cursor-pointer"
//             type="checkbox"
//             checked={isPublished}
//             onChange={() => setIsPublished(!isPublished)}
//           />
//         </div>

//         {/* Submit button */}
//         <motion.button
//           disabled={isAdding || isGenerating}
//           whileHover={{ scale: 1.05, backgroundColor: "#2563EB" }}
//           transition={{ type: "spring", stiffness: 300 }}
//           type="submit"
//           className="mt-6 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm"
//         >
//           {isAdding ? "Adding..." : "Add Blog"}
//         </motion.button>
//       </div>
//     </form>
//   );
// };

// export default UserAddBlog;

// import React, { useState, useRef, useEffect } from "react";
// import { motion } from "framer-motion";
// import gsap from "gsap";
// import "react-quill/dist/quill.snow.css";
// import ReactQuill from "react-quill";
// import { assets } from "../../assets/assets";
// import { useAppContext } from "../../context/AppContext";
// import { useUser } from "@clerk/clerk-react";
// import { toast } from "react-hot-toast";

// const UserAddBlog = () => {
//   const { axios } = useAppContext();
//   const { getToken } = useUser();

//   const [isAdding, setIsAdding] = useState(false);
//   const [isGenerating, setIsGenerating] = useState(false);

//   const [image, setImage] = useState(null);
//   const [title, setTitle] = useState("");
//   const [subTitle, setSubTitle] = useState("");
//   const [category, setCategory] = useState("Select Category");
//   const [isPublished, setIsPublished] = useState(false);
//   const [content, setContent] = useState("");

//   const formRef = useRef(null);

//   useEffect(() => {
//     if (formRef.current) {
//       gsap.from(formRef.current, {
//         opacity: 0,
//         y: 30,
//         duration: 0.8,
//         ease: "power3.out",
//       });
//     }
//   }, []);

//   // ✅ Submit blog
//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       setIsAdding(true);

//       const token = await getToken();

//       const blog = {
//         title,
//         subTitle,
//         description: content,
//         category,
//         isPublished,
//       };

//       const formData = new FormData();
//       formData.append("blog", JSON.stringify(blog));
//       if (image) formData.append("image", image);

//       const { data } = await axios.post("/api/blog", formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (data.success) {
//         toast.success(data.message || "Blog created!");
//         // Reset form
//         setImage(null);
//         setTitle("");
//         setSubTitle("");
//         setContent("");
//         setCategory("Select Category");
//         setIsPublished(false);
//       } else {
//         toast.error(data.message || "Failed to add blog");
//       }
//     } catch (error) {
//       console.error("Blog submit error:", error);
//       toast.error(error.response?.data?.message || error.message);
//     } finally {
//       setIsAdding(false);
//     }
//   };

//   // ✅ Generate AI blog content
//   const generateContent = async () => {
//     if (!title) {
//       toast.error("Please enter a blog title first");
//       return;
//     }

//     try {
//       setIsGenerating(true);

//       const token = await getToken();

//       const prompt = `
// Write a detailed blog on the topic: "${title}".
// - Include an introduction.
// - Use bold headings and subheadings (<h1>, <h2>, <h3>).
// - Use lists (<ul><li>) for steps, tips, or examples.
// - Add *italic* or **bold** tips where useful.
// - End with a conclusion.
//       `;

//       const { data } = await axios.post(
//         "/api/blog/generate",
//         { prompt },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (data.success && data.content) {
//         let cleanedContent = data.content
//           .replace(/<\s*html[^>]*>/gi, "")
//           .replace(/<\s*\/\s*html>/gi, "")
//           .replace(/<\s*head[^>]*>.*?<\s*\/\s*head>/gis, "")
//           .replace(/<\s*body[^>]*>/gi, "")
//           .replace(/<\s*\/\s*body>/gi, "")
//           .replace(/<\s*meta[^>]*>/gi, "")
//           .replace(/<\s*title[^>]*>.*?<\s*\/\s*title>/gis, "")
//           .replace(/\n\s*\n/g, "\n")
//           .trim();

//         setContent(cleanedContent);
//         toast.success("Blog content generated!");
//       } else {
//         toast.error(data.message || "Failed to generate content");
//       }
//     } catch (error) {
//       console.error("AI generation error:", error);
//       toast.error(error.response?.data?.message || error.message);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   return (
//     <form
//       ref={formRef}
//       onSubmit={onSubmitHandler}
//       className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll p-4"
//     >
//       <div className="bg-white w-full max-w-3xl p-6 md:p-10 sm:m-10 shadow rounded space-y-6">
//         {/* Thumbnail */}
//         <div>
//           <p className="font-semibold mb-2">Upload thumbnail</p>
//           <label htmlFor="image">
//             <img
//               alt="thumbnail"
//               className="mt-2 h-16 rounded cursor-pointer border border-gray-300 object-cover"
//               src={image ? URL.createObjectURL(image) : assets.upload_area}
//             />
//             <input
//               onChange={(e) => setImage(e.target.files[0])}
//               id="image"
//               hidden
//               type="file"
//               required
//             />
//           </label>
//         </div>

//         {/* Title & SubTitle */}
//         <div className="space-y-4">
//           <div>
//             <p className="font-semibold mb-1">Blog title</p>
//             <input
//               placeholder="Type here"
//               required
//               className="w-full max-w-lg mt-1 p-2 border border-gray-300 outline-none rounded"
//               type="text"
//               onChange={(e) => setTitle(e.target.value)}
//               value={title}
//             />
//           </div>
//           <div>
//             <p className="font-semibold mb-1">Sub title</p>
//             <input
//               placeholder="Type here"
//               required
//               className="w-full max-w-lg mt-1 p-2 border border-gray-300 outline-none rounded"
//               type="text"
//               onChange={(e) => setSubTitle(e.target.value)}
//               value={subTitle}
//             />
//           </div>
//         </div>

//         {/* Blog Description */}
//         <div className="space-y-2 relative">
//           <p className="font-semibold mb-1">Blog Description</p>
//           <div className="max-w-lg h-80 pb-16 pt-2 relative border border-gray-300 rounded">
//             <ReactQuill
//               value={content}
//               onChange={setContent}
//               theme="snow"
//               className="h-full"
//             />

//             {isGenerating && (
//               <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center z-10 rounded">
//                 <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
//                 <p className="text-white font-semibold text-sm animate-pulse">
//                   AI is writing your blog...
//                 </p>
//               </div>
//             )}

//             <button
//               type="button"
//               onClick={generateContent}
//               disabled={isGenerating}
//               className="absolute bottom-2 right-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded cursor-pointer"
//             >
//               {isGenerating ? "Generating..." : "Generate with AI"}
//             </button>
//           </div>
//         </div>

//         {/* Blog Category */}
//         <div className="space-y-2 mt-12">
//           <p className="font-semibold mb-1">Blog category</p>
//           <select
//             name="category"
//             className="mt-1 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded w-48"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <option value="">Select Category</option>
//             <option value="Technology">Technology</option>
//             <option value="Startup">Startup</option>
//             <option value="Lifestyle">Lifestyle</option>
//             <option value="Finance">Finance</option>
//           </select>
//         </div>

//         {/* Publish toggle */}
//         <div className="flex gap-2 mt-2 items-center">
//           <p className="font-semibold">Publish Now</p>
//           <input
//             className="scale-125 cursor-pointer"
//             type="checkbox"
//             checked={isPublished}
//             onChange={() => setIsPublished(!isPublished)}
//           />
//         </div>

//         {/* Submit button */}
//         <motion.button
//           disabled={isAdding || isGenerating}
//           whileHover={{ scale: 1.05, backgroundColor: "#2563EB" }}
//           transition={{ type: "spring", stiffness: 300 }}
//           type="submit"
//           className="mt-6 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm"
//         >
//           {isAdding ? "Adding..." : "Add Blog"}
//         </motion.button>
//       </div>
//     </form>
//   );
// };

// export default UserAddBlog;

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { useAuth, useUser } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";

const UserAddBlog = () => {
  const { axios } = useAppContext();
  
const { getToken } = useAuth();
const { isSignedIn } = useUser();
 // ✅ make sure getToken exists

  const [isAdding, setIsAdding] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("Select Category");
  const [isPublished, setIsPublished] = useState(false);
  const [content, setContent] = useState("");

  const formRef = useRef(null);

  useEffect(() => {
    if (formRef.current) {
      gsap.from(formRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });
    }
  }, []);

  // ✅ Get Clerk token safely
  const fetchToken = async () => {
    if (!isSignedIn) {
      toast.error("Please sign in first!");
      throw new Error("User not signed in");
    }
    if (typeof getToken !== "function") {
      toast.error("Authentication function not available!");
      throw new Error("getToken is not a function");
    }
    try {
      const token = await getToken();
      if (!token) throw new Error("No token returned");
      return token;
    } catch (err) {
      toast.error("Failed to get token");
      throw err;
    }
  };

  // ✅ Submit blog
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsAdding(true);
      const token = await fetchToken();

      const blog = { title, subTitle, description: content, category, isPublished };
      const formData = new FormData();
      formData.append("blog", JSON.stringify(blog));
      if (image) formData.append("image", image);

      const { data } = await axios.post("/api/blog", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        toast.success(data.message || "Blog created!");
        setTitle(""); setSubTitle(""); setContent(""); setCategory("Select Category"); setIsPublished(false); setImage(null);
      } else {
        toast.error(data.message || "Failed to add blog");
      }
    } catch (err) {
      console.error("Blog submit error:", err);
      toast.error(err.message);
    } finally {
      setIsAdding(false);
    }
  };

  // ✅ Generate AI content
 const generateContent = async () => {
     if (!title) {
       toast.error("Please enter a blog title first");
       return;
     }
 
     try {
       setIsGenerating(true);
 
       const prompt = `
 Write a detailed blog on the topic: "${title}".
 - Include an introduction paragraph.
 - Use bold headings and subheadings (<h1>, <h2>, <h3>) for sections.
 - Include lists (<ul><li>) for steps, tips, and examples.
 - Include tips or examples in italic or bold where appropriate.
 - Use clear, simple language.
 - End with a conclusion.
 - Do NOT include outer <html>, <body>, or metadata tags.
 - Output clean HTML suitable for ReactQuill with correct heading and list formatting.
       `;
 
       const { data } = await axios.post("/api/blog/generate", { prompt });
 
       if (data.success) {
         let cleanedContent = data.content
           .replace(/<\s*html[^>]*>/gi, "")
           .replace(/<\s*\/\s*html>/gi, "")
           .replace(/<\s*head[^>]*>.*?<\s*\/\s*head>/gis, "")
           .replace(/<\s*body[^>]*>/gi, "")
           .replace(/<\s*\/\s*body>/gi, "")
           .replace(/<\s*meta[^>]*>/gi, "")
           .replace(/<\s*title[^>]*>.*?<\s*\/\s*title>/gis, "")
           .replace(/\n\s*\n/g, "\n")
           .trim();
 
         setContent(cleanedContent);
         toast.success("Blog content generated successfully!");
       } else {
         toast.error(data.message || "Failed to generate blog content");
       }
     } catch (error) {
       console.error("AI generation error:", error);
       toast.error(error.message || "Error generating blog content");
     } finally {
       setIsGenerating(false);
     }
   };


  return (
    <form ref={formRef} onSubmit={onSubmitHandler} className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll p-4">
      <div className="bg-white w-full max-w-3xl p-6 md:p-10 sm:m-10 shadow rounded space-y-6">
        {/* Thumbnail */}
        <div>
          <p className="font-semibold mb-2">Upload thumbnail</p>
          <label htmlFor="image">
            <img
              alt="thumbnail"
              className="mt-2 h-16 rounded cursor-pointer border border-gray-300 object-cover"
              src={image ? URL.createObjectURL(image) : assets.upload_area}
            />
            <input type="file" id="image" hidden required onChange={(e) => setImage(e.target.files[0])} />
          </label>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-4">
          <input type="text" placeholder="Blog title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full max-w-lg mt-1 p-2 border border-gray-300 rounded" required />
          <input type="text" placeholder="Sub title" value={subTitle} onChange={(e) => setSubTitle(e.target.value)} className="w-full max-w-lg mt-1 p-2 border border-gray-300 rounded" required />
        </div>

        {/* Content */}
        <div className="space-y-2 relative">
          <ReactQuill value={content} onChange={setContent} theme="snow" className="h-80" />
          {isGenerating && <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-10 rounded"><div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div></div>}
          <button type="button" onClick={generateContentHandler} disabled={isGenerating} className="absolute bottom-2 right-2 px-4 py-1.5 bg-black/70 text-white rounded text-xs">{isGenerating ? "Generating..." : "Generate with AI"}</button>
        </div>

        {/* Category */}
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 px-3 py-2 border text-gray-500 border-gray-300 rounded w-48">
          <option value="">Select Category</option>
          <option value="Technology">Technology</option>
          <option value="Startup">Startup</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Finance">Finance</option>
        </select>

        {/* Publish */}
        <div className="flex items-center gap-2 mt-2">
          <p className="font-semibold">Publish Now</p>
          <input type="checkbox" checked={isPublished} onChange={() => setIsPublished(!isPublished)} className="scale-125 cursor-pointer" />
        </div>

        <motion.button type="submit" disabled={isAdding || isGenerating} whileHover={{ scale: 1.05 }} className="mt-6 w-40 h-10 bg-primary text-white rounded text-sm">{isAdding ? "Adding..." : "Add Blog"}</motion.button>
      </div>
    </form>
  );
};

export default UserAddBlog;
