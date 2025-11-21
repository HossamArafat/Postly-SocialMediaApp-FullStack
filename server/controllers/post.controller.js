import postModel from "../models/post.model.js"
import userModel from "../models/user.model.js"
import uploadImg from "../utils/uploadImg.js"

// @des    Create post
// @route  POST api/post/add
// @access private-logged user
const addPost = async (req, res) => {
    try{
        const {userId} = req.auth()
        const images = req.files
        if(images.length) {
            let urls = await Promise.all(
                images.map(image=> uploadImg(image, "posts"))
            )
            req.body.image_urls = urls
        }
        await postModel.create({author: userId, ...req.body})
        res.json({success: true, message: "Post added successfully"})
        
    }catch(err){
        res.status(400).json({success: false, message: err.message})
    }
}

// @des    Get all posts
// @route  GET api/post/feeds
// @access private-logged user
const getFeeds = async (req, res) => {
    try{
        const {userId} = req.auth()
        const user = await userModel.findById(userId)
        const userIds = [userId, ...user.connections, ...user.following]
        const feeds = await postModel.find({author: {$in: userIds}}).populate("author").sort("-createdAt")
        res.json({success: true, feeds})
        
    }catch(err){
        res.status(400).json({success: false, message: err.message})

    }
}


// @des    Like post
// @route  PUT api/post/like
// @access private-logged user
const likePost = async (req, res) => {
    try{
        const {userId} = req.auth()
        const {postId} = req.body
        
        const post = await postModel.findById(postId)
        if(post.likes.includes(userId)) {
            post.likes = post.likes.filter(user=> user != userId)
            res.json({success:true, message: "Post unliked"})
        } 
        else {
            post.likes.push(userId)
            res.json({success:true, message: "Post liked"})
        }
        await post.save()
        
    }catch(err){
        res.status(400).json({success: false, message: err.message})
    }
}

export {
    addPost,
    getFeeds,
    likePost,
}