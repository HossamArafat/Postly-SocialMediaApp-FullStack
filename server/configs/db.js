import mongoose from "mongoose"

const connectDB = async ()=> {
    try{
        console.log("Connecting...")
        mongoose.connection.on("connected", ()=> console.log("Database connected successfully."))
        await mongoose.connect(process.env.DB_URL)
    } catch (err){
        console.log("Database failed: ", err)
    }
}

export default connectDB