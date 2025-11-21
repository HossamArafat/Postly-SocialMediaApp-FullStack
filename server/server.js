import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/db.js'
import { inngest, functions } from "./inngest/index.js"
import {serve} from "inngest/express"
import { clerkMiddleware } from '@clerk/express'
import userRouter from './routes/user.route.js'
import postRouter from './routes/post.route.js'
import storyRouter from './routes/story.route.js'
import messageRouter from './routes/message.route.js'
import connectionRouter from './routes/connection.route.js'

connectDB()
const app = express()
app.use(express.json())
app.use(cors())
app.use("/api/inngest", serve({ client: inngest, functions }));  // serve to help express to mount the inngest functions
app.use(clerkMiddleware())


app.get("/", (req, res) => res.send("Server is running"))
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/story", storyRouter);
app.use("/api/message", messageRouter);
app.use("/api/connection", connectionRouter);
const PORT = process.env.PORT || 400
app.listen(PORT, ()=>console.log(`Server is running on http://localhost:${PORT}`))