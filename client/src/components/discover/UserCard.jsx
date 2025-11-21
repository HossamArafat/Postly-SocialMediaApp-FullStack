import { MapPin, MessageCircle, Plus, UserPlus } from "lucide-react"
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import api from "../../api/api"
import toast from "react-hot-toast"

const UserCard = ({user}) => {
  //States 
  const currentUser = useSelector(state=> state.user)
  const navigate = useNavigate()

  // Functions
  const handleFollow = async ()=> {
    try{
      await api.followProfile({profileId: user._id})
    }catch(err){
      toast.error(err.message)
    }
  }
  const handleConnectionRequest = async ()=> {
    if(currentUser?.connections.includes(user._id))
      return navigate(`/messages/${user._id}`)

    try{
      await api.requestConnection({profileId: user._id})
    }catch(err){
      toast.error(err.message)
    }
  }

  return (
    <div className="flex flex-col justify-between p-4 pt-6 border border-gray-200 rounded-md">
      <div className="text-center">
        <img src={user.profile_picture} className="w-16 rounded-full mx-auto"/>
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
            className='flex items-center justify-center gap-1 w-full p-2 rounded text-sm  text-white bg-linear-to-r from-indigo-500 to-purple-700 transition hover:from-indigo-600 hover:to-purple-700 active:scale-95 cursor-pointer'>
                <UserPlus className="size-5"/>
                {currentUser?.following.includes(user._id) ? "Following" : "Follow"}
        </button>
        <button 
            onClick={()=> handleConnectionRequest} 
            className="flex items-center justify-center w-16 border rounded-md text-slate-500 group transition active:scale-95 cursor-pointer"> {/* group => for selected  hover */}
            {
              currentUser?.connections.includes(user._id) ?
              <MessageCircle className="size-5 transition group-hover:scale-110"/>
              :<Plus className="size-5 transition group-hover:scale-110"/>
            }
        </button>
      </div>
    </div>
  )
}

export default UserCard
