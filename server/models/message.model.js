import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    from_user:{type:String, ref:"user", required:true},
    to_user:{type:String, ref:"user", required:true},
    text:{type:String, trim:true},
    image_url:String,
    message_type:{type:String, enum:["text", "image"], required:true},   
    seen:{type:Boolean, default:false},

}, {timestamps:true, minimize:false})

const messageModel = mongoose.model("message", messageSchema)
export default messageModel