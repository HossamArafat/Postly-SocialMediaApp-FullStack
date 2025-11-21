import express from "express";
import protect from "../middlewares/auth.middleware.js";
import uploadImage from "../middlewares/image.middlware.js";
import { addStory, getStories } from "../controllers/story.controller.js";


const storyRouter = express.Router()

storyRouter.use(protect)
storyRouter.post('/add', uploadImage , addStory)
storyRouter.get('/data', getStories)

export default storyRouter