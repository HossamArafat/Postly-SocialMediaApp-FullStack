import { MapPin, MessageCircle, Plus, UserPlus } from "lucide-react"
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import { useState } from "react"
import toast from "react-hot-toast"
import api from "../../api/api"


const UserCard = ({user}) => {
  //States 
  const {connStatusOfDiscoveredUsers} = useSelector(state=> state.user)
  const {currentUser} = useSelector(state=> state.user)
  const [follow, setFollow]= useState(false)

  const isFollowing = currentUser?.following.includes(user._id)
  const isConnected = currentUser?.connections.includes(user._id)
  const navigate = useNavigate()
  
  const getConnStatus = () =>  connStatusOfDiscoveredUsers.find((conn) => (conn.from_user?.includes(user._id) || conn.to_user?.includes(user._id)))?.status
  const [status, setStatus] = useState(getConnStatus())
  
  // Functions
  const handleFollow = async ()=> {
    try{
      if(!isFollowing) {
        const {data} = await api.followProfile({profileId: user._id})
        if(data.success)
        setFollow(true)
      }
    }catch(err){
      toast.error(err.message)
    }
  }
  const handleConnectionRequest = async ()=> {
    if(isConnected)
      return navigate(`/messages/${user._id}`)
    try{
      const {data} = await api.requestConnection({profileId: user._id})
        if(data.success) {
            toast.success(data.message)
            setStatus(data.status)
        } else {
          toast.error(data.message)
          setStatus(data.status)
        }
    }catch(err){
      toast.error(err.message)
    }
  }

  return (
    <div className="flex flex-col justify-between p-5 pt-6 border border-gray-300 rounded-md">
      <div className="text-center">
        <img onClick={()=>navigate(`/profile/${user._id}`)} src={user.profile_picture} className="w-16 rounded-full mx-auto transition hover:scale-105 cursor-pointer"/>
        <p className='font-medium text-slate-700'>{user.full_name}</p>
        <p className='text-slate-600'>@{user.username}</p>
        <p className='text-sm text-gray-600'>{user.bio.slice(0, 30)}...</p>
      </div>
      <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-600">
        <div className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded-full">
            <MapPin className="size-5"/> {user.location}
        </div>
        <div className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded-full">
           <span> {user.followers.length} </span> Followers
        </div>
      </div>
      <div className="flex mt-4 gap-2">
        <button 
            onClick={handleFollow}
            disabled={currentUser?.following.includes(user._id)}
            className='flex items-center justify-center gap-1 w-38 p-2 rounded text-sm  text-white bg-linear-to-r from-indigo-500 to-purple-700 transition hover:from-indigo-600 hover:to-purple-700 active:scale-95 cursor-pointer'>
                {(!isFollowing && !follow) && <UserPlus className="size-5 mr-1"/>}
                {isFollowing || follow ? "Following" :  "Follow"}
        </button>
        <button 
            onClick={()=> handleConnectionRequest()} 
            className="flex items-center justify-center w-38 border rounded-md text-slate-500 hover:text-purple-700 transition active:scale-95 cursor-pointer">
            {             
              status == undefined || status == 'failed' ? 
              <> <Plus className="size-5 transition mr-1"/> Add Connection </>
              :status == 'pending' ? "Requested" 
              :<><MessageCircle className="size-5 transition mr-1"/> Message</>
            }
        </button>
      </div>
    </div>
  )
}

export default UserCard
