import express from "express";
import protect from "../middlewares/auth.middleware.js";
import uploadImage from "../middlewares/image.middlware.js";
import { getChatMessages, getRecentMessages, getSSEstream, sendChatMessage } from "../controllers/message.controller.js";


const messageRouter = express.Router()

messageRouter.get('/sse-stream', getSSEstream)
messageRouter.use(protect)
messageRouter.post('/send', uploadImage , sendChatMessage)
messageRouter.get('/recent', getRecentMessages)
messageRouter.get('/:from_user', getChatMessages)

export default messageRouter