import { useNavigate } from 'react-router-dom'
import { MessageSquare } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../api/api'
import { useState } from 'react'

const ConnectionsProfiles = ({profiles, activeTab}) => {
    const navigate = useNavigate()
    const navToUserProfile = (id) => navigate(`/profile/${id}`)
    const activeTabStyle = 'w-full p-2 rounded bg-slate-100 text-sm text-black transition hover:bg-slate-200 active:scale-95 cursor-pointer'
    const [filteredProfiles, setFilteredProfiles] = useState(profiles)

    const filterProfiles = (selectedId) => {
      let findData = profiles.find((users)=>users.label == activeTab).value
      let updated = findData.filter((user)=> user._id != selectedId)  //filter or find => for selecting item
      setFilteredProfiles(prev=> prev.map((users)=> users.label == activeTab ? {...users, value: updated} : users)) // map for transforming object
    }

    const handleRemove = async (id) => {
      try{
        await api.removeProfile({profileId: id})
        filterProfiles(id)
      }catch(err){
        toast.error(err.message)
      }
    }
    const handleUnfollow = async (id) => {
      try{
        await api.unfollowProfile({profileId: id})
        filterProfiles(id)
      }catch(err){
        toast.error(err.message)
      }
    }
    const handleAccept = async (id) => {
      try{
        await api.acceptConnection({profileId: id})
        filterProfiles(id)
      }catch(err){
        toast.error(err.message)
      }
    }
  return (
    <div className='flex flex-wrap gap-6 mt-6'>
      {
        filteredProfiles.find((item)=>item.label === activeTab).value.map((user, i)=> 
        <div key={i} className='flex gap-5 w-full max-w-88 p-6 rounded-md bg-white shadow'>
          <img src={user.profile_picture} onClick={()=> navToUserProfile(user._id)} className='size-12 rounded-full shadow-md transition hover:scale-105 cursor-pointer'/>
          <div className='flex-1'>
            <p className='font-medium text-slate-700 cursor-pointer' onClick={()=> navToUserProfile(user._id)} >{user.full_name}</p>
            <p className='text-slate-600'>@{user.username}</p>
            <p className='text-sm text-gray-600'>{user.bio.slice(0, 30)}...</p>
            <div className='flex max-sm:flex-col gap-2 mt-4'>
              {
                <button onClick={()=> navToUserProfile(user._id)} 
                className='w-full p-2 text-sm rounded text-white bg-linear-to-r from-indigo-500 to-purple-700 transition hover:from-indigo-600 hover:to-purple-700 active:scale-95 cursor-pointer'>
                  View Profile
                </button>
              }
              {
                activeTab === "Followers" && (
                  <button onClick={()=> handleRemove(user._id)} className={activeTabStyle}>Remove</button>
                )
              }
              {
                activeTab === "Following" && (
                  <button onClick={()=> handleUnfollow(user._id)} className={activeTabStyle}>Unfollow</button>
                )
              }
              {
                activeTab === "Pending" && (
                  <button onClick={()=> handleAccept(user._id)} className={activeTabStyle}>Accept</button>
                )
              }
              {
                activeTab === "Connections" && (
                  <button onClick={()=> navigate(`/messages/${user._id}`)} className={`${activeTabStyle} flex items-center justify-center`}>
                    <MessageSquare className='size-5'/>
                  </button>
                )
              }
            </div>
          </div>
        </div>)
      }
    </div>
  )
}

export default ConnectionsProfiles
