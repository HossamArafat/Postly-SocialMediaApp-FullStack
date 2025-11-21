import mongoose from "mongoose";

const storySchema = mongoose.Schema({
    user:{type:String, ref:"user", required:true},
    views:[{type:String, ref:"story"}],
    content:{type:String, trim:true},
    media_url:String,
    media_type:{type:String, enum:["text", "image", "video"], required:true},   
    background_color:String,
        
}, {timestamps:true, minimize:false})

const storyModel = mongoose.model("story", storySchema)
export default storyModel