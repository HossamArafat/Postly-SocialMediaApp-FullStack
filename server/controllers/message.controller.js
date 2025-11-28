import messageModel from "../models/message.model.js"
import uploadImg from "../utils/uploadImg.js"
import {getAuth} from '@clerk/express'
const connections = {}  //store streams of all users


// @des    Create sse connection and send to user
// @route  GET api/message/sse-stream
// @access private-logged user
const getSSEstream = async (req, res) => {
    try{
        const {userId} = getAuth(req)
        console.log("New client connected : ", userId)

        // Set SEE headers of connection
        res.setHeader("Content-Type", "text/event-stream")
        res.setHeader("Cache-Control", "no-cache")
        res.setHeader("Connection", "keep-alive")
        res.setHeader("Access-Control-Allow-Origin", `${process.env.FRONTEND_URL}`)
        res.setHeader("Access-Control-Allow-Credentials", "true")

        // Add the clients response object(actual connection) to the connections object
        connections[userId] = res
        res.write(`data: ${JSON.stringify({type: "connected", message: `Connected to SEE stream for ${userId}` })} \n\n`) //send message to client without closing connection
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
        const image = req.file
        if(image) {
            const url = await uploadImg(image, "messages")
            req.body.image_url = url
        }
        // Save to db
        const data = await messageModel.create({from_user:userId, ...req.body})
        const message = await data.populate('from_user')
        res.json({success: true, message})

        // Send message to to_user using SSE
        if(connections[to_user])
            connections[to_user].write(`data: ${JSON.stringify({type: 'message', message})}\n\n`)  // to send any message as string even if its content is object then parsing in client
        
    }catch(err){
        res.status(400).json({success: false, message: err.message})
    }
}

// @des    Get message
// @route  GET api/message/:from_user
// @access private-logged user
const getChatMessages = async (req, res) => {
    try{
        const {userId} = req.auth()
        const {from_user} = req.params
        
        const messages = await messageModel.find({$or:[
            {from_user: from_user, to_user: userId},
            {from_user: userId, to_user: from_user},
        ]}).populate('to_user').sort("-createdAt")
        await messageModel.updateMany({from_user: from_user, to_user: userId}, {seen: true})
        res.json({success: true, messages})
        
    }catch(err){
        res.status(400).json({success: false, message: err.message})
    }
}

// @des    Get message
// @route  GET api/message/recent
// @access private-logged user
const getRecentMessages = async (req, res) => {
    try{
        const {userId} = req.auth()

        const recentSeenMessage = await messageModel.aggregate([
            { $match: {$or: [{ to_user: userId, seen:true }, { from_user: userId }] }},
            {
                $group: {
                _id: "$from_user",
                lastMessage: {
                    $top: {
                    output: "$$ROOT",
                    sortBy: { createdAt: -1 }
                    }
                }
                }
            },
            { $replaceRoot: { newRoot: "$lastMessage" } },
            { $sort: { createdAt: -1 } }
        ])
        const recentUnseenMessages = await messageModel.find({to_user: userId, seen:false})
        const allMessages = [...recentSeenMessage, ...recentUnseenMessages]
        const messages = await messageModel.populate(allMessages, [{path:'from_user'}, {path:'to_user'}])
        res.json({success: true, messages})
        
    }catch(err){
        res.status(400).json({success: false, message: err.message})
    }
}

export {
    getSSEstream,
    sendChatMessage,
    getChatMessages,
    getRecentMessages
}