import userModel from "../models/user.model.js"
import postModel from "../models/post.model.js"
import uploadImg from "../utils/uploadImg.js"
import connectionModel from "../models/connection.model.js"

// @des    Get the user data
// @route  GET api/user/data
// @access private-logged user
const getUserData = async(req, res)=> {
    try{
        const {userId} = req.auth()
        const user = await userModel.findById(userId)
        if(!user) return res.status(404).json({sucess: false, message: "User not found"})
        res.json({success: true, user})

    }catch(err){
        res.status(400).json({success: false, message: err.message})
    }
}

// @des    Update the user data
// @route  PUT api/user/update
// @access private-logged user
const updateUserData = async(req, res)=> {
    try{
       const {userId} = req.auth()
       const profile = req.files?.profile?.[0]
       const cover = req.files?.cover?.[0]
        
       // Profile
       if(profile) {  // async may repeat with many await, may be in try or if condtion(or any block scope)...but not function scope
            const  url = await uploadImg(profile, "users")
            req.body.profile_picture = url
       }
        // Cover
        if(cover) {
            const url = await uploadImg(cover, "users")
            req.body.cover_photo = url
       }
       const user = await userModel.findByIdAndUpdate(userId, req.body, {new: true})
       res.json({success: true, user, message:"Profile updated successfully"})

    }catch(err){
        res.status(400).json({success: false, message: err.message})
    }
}

// @des    Get all users of logged user
// @route  GET api/user/all
// @access private-logged user
const getUsers = async (req, res) => {
    try{
        const {userId} = req.auth()
        const user = await userModel.findById(userId).populate("connections followers following")
        const { followers, following, connections } = user
        const pendingConnections = (await connectionModel.find({to_user: userId, status: "pending"}).populate("from_user")).map((connection)=> connection.from_user) //return the user that i'm waiting the acceptence of their connections
        const users = {connections, followers, following, pendingConnections}
        res.json({success: true, users})
        
    }catch(err){
        res.status(400).json({success: false, message: err.message})
        console.log(err)
    }
}

// @des    Get the profile of specific user
// @route  GET api/user/:profileId
// @access public-logged user
const getSpecificProfile = async(req, res)=> {
    try{
        const {userId} = req.auth()
        const {profileId} = req.params
        let likedPosts = []

        const profile = await userModel.findById(profileId)
        if(!profile) return res.status(404).json({sucess: false, message: "Profile not found"})

        const posts = await postModel.find({author: profileId}).sort("-createdAt").populate('author')
        
        if(profileId == userId) {
            likedPosts = await postModel.find({likes: userId}).populate('author')
        }
        res.json({success: true, profile, posts, likedPosts})
    }catch(err){
        res.status(400).json({success: false, message: err.message})
    }
}

// @des    Find users using username, email, location, and name
// @route  GET api/user/discover
// @access private-logged user
const discoverUsers = async (req, res) => {
    try{
      const {userId} = req.auth()
      const {keyword} = req.params
      const allUsers = await userModel.find({
        $or: [
            {username: new RegExp(keyword, 'i')},
            {email: new RegExp(keyword, 'i')},
            {full_name: new RegExp(keyword, 'i')},
            {location: new RegExp(keyword, 'i')},
        ]
      }) 
      const filteredUsers = allUsers.filter(user=> user._id !== userId)
      res.json({success: true, users: filteredUsers})
    }catch(err){
        res.status(400).json({success: false, message: err.message})
        console.log(err)
    }
}

// @des    Follow user
// @route  GET api/user/follow
// @access private-logged user
const followUser = async (req, res) => {
    try{
        const {userId} = req.auth()
        const {profileId} = req.body
        const user = await userModel.findById(userId)

        if(user.following.includes(profileId))
           return res.status(409).json({success: false, message: "You are already following this user"})
        
        user.following.push(profileId)
        await user.save()
        
        const toUser = await userModel.findById(profileId)
        toUser.followers.push(userId)
        await toUser.save()

        res.json({success: true, message: "Now You are following this user"})

    }catch(err){
        res.status(400).json({success: false, message: err.message})
    }
}

// @des    Unfollow user from following list
// @route  PUT api/user/unfollow
// @access private-logged user
const unfollowUser = async (req, res) => {
    try{
        const {userId} = req.auth()
        const {profileId} = req.body

        const user = await userModel.findById(userId)
        user.following = user.following.filter(user=> user != profileId)
        await user.save()
        
        const toUser = await userModel.findById(profileId)
        toUser.followers = toUser.followers.filter(user=> user != userId)
        await toUser.save()
        
        res.json({success: true, message: "You are no longer following this user"})

    }catch(err){
        res.status(400).json({success: false, message: err.message})
    }
}

// @des    Remove user from followers list
// @route  PUT api/user/remove
// @access private-logged user
const removeUser = async (req, res) => {
    try{
        const {userId} = req.auth()
        const {profileId} = req.body

        const user = await userModel.findById(profileId)
        user.followers = user.followers.filter(user=> user != profileId)
        await user.save()
        
        const toUser = await userModel.findById(userId)
        toUser.following = toUser.following.filter(user=> user != userId)
        await toUser.save()
        
        res.json({success: true, message: "You are no longer following this user"})

    }catch(err){
        res.status(400).json({success: false, message: err.message})
    }
}

export {
    getUserData,
    getUsers,
    getSpecificProfile,
    updateUserData,
    discoverUsers,
    followUser,
    unfollowUser,
    removeUser,
}
