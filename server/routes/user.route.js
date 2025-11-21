import express from "express";
import { discoverUsers, followUser, getSpecificProfile, getUserData, getUsers, removeUser, unfollowUser, updateUserData } from "../controllers/user.controller.js";
import protect from "../middlewares/auth.middleware.js";
import uploadImage from "../middlewares/image.middlware.js";

const userRouter = express.Router()

userRouter.use(protect)
userRouter.get('/data', getUserData)
userRouter.get('/all', getUsers)
userRouter.get('/:profileId', getSpecificProfile)
userRouter.put('/update', uploadImage , updateUserData)
userRouter.get('/discover/:keyword', discoverUsers)
userRouter.put('/follow', followUser)
userRouter.put('/unfollow', unfollowUser)
userRouter.put('/remove', removeUser)

export default userRouter