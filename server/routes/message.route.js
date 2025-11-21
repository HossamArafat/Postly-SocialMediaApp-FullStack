import express from "express";
import protect from "../middlewares/auth.middleware.js";
import uploadImage from "../middlewares/image.middlware.js";
import { createSSEstream, getRecentMessages, receiveChatMessage, sendChatMessage } from "../controllers/message.controller.js";


const messageRouter = express.Router()

messageRouter.use(protect)
messageRouter.post('/sse-stream', createSSEstream)
messageRouter.post('/send', uploadImage , sendChatMessage)
messageRouter.get('/receive', receiveChatMessage)
messageRouter.get('/recent-message', getRecentMessages)

export default messageRouter