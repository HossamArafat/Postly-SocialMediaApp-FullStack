import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    content:{type:String, trim:true},
    image_urls:[String],
    post_type:{type:String, enum:["text", "image", "text_with_image"], required:true},   
    author:{type:String, ref:"user", required:true},
    likes:[{type:String, ref:"user"}],
    
}, {timestamps:true, minimize:false})

const postModel = mongoose.model("post", postSchema)
export default postModel