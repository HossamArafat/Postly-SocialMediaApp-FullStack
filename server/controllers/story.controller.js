import { inngest } from "../inngest/index.js"
import storyModel from "../models/story.model.js"
import userModel from "../models/user.model.js"
import uploadImg from "../utils/uploadImg.js"


// @des    Create story
// @route  POST api/story/add
// @access private-logged user
const addStory = async (req, res) => {
    try{
        const {userId} = req.auth()
        const media = req.file
        if(media) {
            const url = await uploadImg(media, "storeis")
            req.body.media_url = url
        }
        const story = await storyModel.create({user: userId, ...req.body})
        await inngest.send({  // to delete story after 24 hours
            name: "app/story.deleted",
            data:{storyId:story._id}
        })
        res.json({success: true, message: "Story added successfully"})
                
    }catch(err){
        res.status(400).json({success: false, message: err.message})
    }
}

// @des    Get all stories
// @route  GET api/story/data
// @access private-logged user
const getStories = async (req, res) => {
    try{
        const {userId} = req.auth()
        const user = await userModel.findById(userId)
        const userIds = [userId, ...user.connections, ...user.following]
        const stories = await storyModel.find({user: {$in: userIds}}).populate("user").sort("-createdAt")
        res.json({success: true, stories})
        
    }catch(err){
        res.status(400).json({success: false, message: err.message})
    }
}

export {
    addStory,
    getStories,
}