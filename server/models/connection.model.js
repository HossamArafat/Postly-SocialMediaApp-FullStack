import mongoose from "mongoose";

const connectionSchema = mongoose.Schema({
    from_user: [{type:String, ref:"user", required: true}],
    to_user: [{type:String, ref:"user", required: true}],
    status: {type:String, enum:["pending", "accepted"], default:"pending"},

}, {timestamps:true, minimize:false})

const connectionModel = mongoose.model("connection", connectionSchema)
export default connectionModel