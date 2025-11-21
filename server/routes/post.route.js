import express from "express";
import protect from "../middlewares/auth.middleware.js";
import uploadImage from "../middlewares/image.middlware.js";
import { addPost, getFeeds, likePost } from "../controllers/post.controller.js";


const postRouter = express.Router()

postRouter.use(protect)
postRouter.post('/add', uploadImage , addPost)
postRouter.get('/feeds', getFeeds)
postRouter.put('/like', likePost)

export default postRouter