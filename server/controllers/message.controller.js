import messageModel from "../models/message.model.js"
import uploadImg from "../utils/uploadImg.js"
const connections = {}  //store streams of all users

// @des    Create story
// @route  POST api/message/sse-stream
// @access private-logged user
const createSSEstream = async (req, res) => {
    try{
        const {userId} = req.auth()
        console.log("New client connected : ", userId)

        // Set SEE headers of connection
        res.setHeader("Content-Type", "text/event-stream")
        res.setHeader("Cache-Control", "no-cache")
        res.setHeader("Connection", "keep-alive")
        res.setHeader("Access-Control-Allow-Origin", "*")

        // Add the clients response object(actual connection) to the connections object
        connections[userId] = res
        res.write(`data: Connected to SEE stream for ${userId}\n\n`) //send message to client without closing connection
        res.on("close", ()=> {
            // Remove the clients response object from the clients object
            delete connections[userId]
            res.end()
            console.log(`Client disconnected: ${userId}`)
        })
    }catch(err){
        console.error("SSE Error:", err.message)
    }
}

// @des    Send message
// @route  POST api/message/send
// @access private-logged user
const sendChatMessage = async (req, res) => {
    try{
        const {userId} = req.auth()
        const {to_user} = req.body
        console.log(req.file)
        const image = req.file
        if(image) {
            const url = uploadImg(image, "messages")
            req.message.image_url = url
        }
        // Save to db
        const message = await messageModel.create({from_user:userId, ...req.body})
        res.json({success: true, message})

        // Send message to to_user using SSE
        const messageWithUserData = await messageModel.findById(message._id).populate("from_user")
        if(connections[to_user])
            connections[to_user].write(`data: ${JSON.stringify(messageWithUserData)}\n\n`)  // to send any message as string even if its content is object then parsing in client
        
    }catch(err){
        res.status(400).json({success: false, message: err.message})
    }
}

// @des    Get message
// @route  GET api/message/receive
// @access private-logged user
const receiveChatMessage = async (req, res) => {
    try{
        const {userId} = req.auth()
        const {from_user} = req.body
        
        const messages = await messageModel.find({$or:[
            {from_user: from_user, to_user: userId},
            {from_user: userId, to_user: from_user},
        ]}).sort("-createdAt")
        await messageModel.updateMany({from_user: from_user, to_user: userId}, {seen: true})
        res.json({success: true, messages})
        
    }catch(err){
        res.status(400).json({success: false, message: err.message})
    }
}

// @des    Get message
// @route  GET api/message/recent-message
// @access private-logged user
const getRecentMessages = async (req, res) => {
    try{
        const {userId} = req.auth()
        
        const messages = await messageModel.find({to_user: userId}).populate("from_user to_user").sort("-createdAt") // get recent received message
        res.json({success: true, messages})
        
    }catch(err){
        res.status(400).json({success: false, message: err.message})
    }
}

export {
    createSSEstream,
    sendChatMessage,
    receiveChatMessage,
    getRecentMessages
}