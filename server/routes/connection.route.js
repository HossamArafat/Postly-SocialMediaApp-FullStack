import express from "express";
import protect from "../middlewares/auth.middleware.js";
import { acceptConnection, requestConnection } from "../controllers/connection.controller.js";


const connectionRouter = express.Router()

connectionRouter.use(protect)
connectionRouter.post('/connect', requestConnection)
connectionRouter.post('/accept', acceptConnection)

export default connectionRouter