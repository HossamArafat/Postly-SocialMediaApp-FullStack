import { inngest } from "../inngest/index.js"
import connectionModel from "../models/connection.model.js"
import userModel from "../models/user.model.js"


// @des    Send connection requests
// @route  POST api/connection/connect
// @access private-logged user
const requestConnection = async (req, res) => {
    try{
        const {userId} = req.auth()
        const {profileId}= req.body
        const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000)

        const connectionRequest = await connectionModel.find({from_user:userId, createdAt:{$gt:last24Hours}})
        if(connectionRequest.length >= 40) return res.status(429).json({success:false, status:"failed", message: "You have sent more than 40 connection requests in the last 24 hours."})
        
        const connection = await connectionModel.findOne({from_user:userId, to_user:profileId})
        if(!connection) {
            const newConnection =await connectionModel.create({from_user:userId, to_user:profileId})
            await inngest.send({ //  send => this method to trigger the event inside inngest to call its function
                name: "app/connection.requested",
                data:{connectionId:newConnection._id}
            })
            return res.json({success: true, status:"pending", message:"Connection request sent successfully"})
        }else if(connection && connection.status == "pending") return res.status(409).json({success: false, status:"pending", message:"Connection request already sent"})
        
        res.status(409).json({success: false, status:"accepted", message:"Connection already accepted"})

    }catch(err){
        res.status(400).json({success: false, message: err.message})
    }
}

// @des    Accept connection of user
// @route  POST api/connection/accept
// @access private-logged user
const acceptConnection = async (req, res) => {
    try{
        const {userId} = req.auth()
        const {profileId} = req.body
        const connection = await connectionModel.findOne({from_user:profileId, to_user: userId})
        if(!connection) return res.status(404).json({success: false, message:"Connection not found"})
        
        const checkExist = (user, id) => !user.includes(id) && user.push(id)

        const user = await userModel.findById(userId)
        checkExist(user.connections, profileId)
        checkExist(user.followers, profileId)
        checkExist(user.following, profileId)
        await user.save()

        const toUser = await userModel.findById(profileId)
        checkExist(toUser.connections, userId)
        checkExist(toUser.followers, userId)
        checkExist(toUser.following, userId)
        
        await toUser.save()

        connection.status = "accepted"
        await connection.save()
        res.json({success:true, message: "Connection accepted successfully"})
    }catch(err){
        res.status(400).json({success: false, message: err.message})
    }
}


export {
    requestConnection,
    acceptConnection,
}