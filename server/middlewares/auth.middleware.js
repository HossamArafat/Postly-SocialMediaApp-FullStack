const protect = async (req, res, next)=> {
    try{
        const {userId} = req.auth()
        if(!userId) return res.status(401).json({success: false, message: "not authenticated"})
        next()
    }catch(err){
        res.status(400).json({success: false, message:err.message})
    }
}

export default protect