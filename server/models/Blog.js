// import mongoose from "mongoose";

// const blogSchema = new mongoose.Schema({

// title:{type:String, required: true},
// subTitle:{type:String},
// description:{type:String, required: true},
// category:{type:String, required: true},
// image:{type:String, required: true},
// isPublished:{type:Boolean, required: true},
// // author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
//  author: { type: String, required: true }  
// }, {timestamps:true });

// const Blog = mongoose.model('Blog', blogSchema);
// export  default Blog;

import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subTitle: { type: String },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    isPublished: { type: Boolean, default: false },
    author: { type: String, required: true }, // you can later change to ObjectId if you have a User model
  },
  { timestamps: true }
);

// Use PascalCase for the model name
const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
