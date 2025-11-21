import { useState } from 'react'
import { BadgeCheck, Heart, MessageCircle, Share2 } from 'lucide-react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import api from '../../api/api'


const PostCard = ({post}) => {
    // States
    const [likes, setLikes] = useState(post.likes)
    const navigate = useNavigate()
    const {currentUser} = useSelector(state=> state.user)
    const postWithHashtags = post.content?.split(/(#\w+)/g)
    const postContent = postWithHashtags?.map((part, i)=>
        part.startsWith('#') ? (
            <span key={i} className='text-indigo-600 font-bold'>
                {part}
            </span>
        ) : ( part )
    )
    // Functions
    const handleLike = async () => {
        try{
            const {data} = await api.likePost({postId: post._id})
            if(data.success) {
                toast.success(data.message)
                setLikes(prev=> {
                    if(prev.includes(currentUser._id)) return prev.filter(id=> id != currentUser._id)
                    else return [...prev, currentUser._id]
                })
            } else toast.error(data.message)
            
        }catch(err){
            toast.error(err.message)
            console.log(err)
        }
    }

  return (
    <div className='p-4 w-full max-w-2xl rounded-xl bg-white'>
        <div className='flex gap- items-center justify-between mb-3'>
            <div className='flex space-x-3'>
                <img src={post.author?.profile_picture} onClick={()=> navigate(`/profile/${post.author?._id}`)} className='size-10 rounded-full shadow transition hover:scale-105 cursor-pointer'/>
                <div className='flex items-center space-x-1'>
                    <span onClick={()=> navigate(`/profile/${post.author?._id}`)} className='active:scale-95 cursor-pointer'>
                        { post.author?.full_name }
                    </span>
                    <BadgeCheck className='size-4 text-blue-500'/>
                </div>
            </div>
            <div className='text-gray-500 text-sm'>
                {post.author?.username} • {moment(post.createdAt).fromNow()}
            </div>
        </div>
        <div>
            {
                post.content && <div 
                    className='text-gray-800 text-md whitespace-pre-line'
                >
                { postContent }
                </div>
            }
            <div className='grid grid-cols-2 gap-2 mt-3'>
                {
                    post.image_urls.map((img, i)=> (
                        <img src={img} key={i} className={`w-full h-48 object-cover rounded-lg mt-1 ${i === 2 && post.image_urls?.length === 3 && "col-span-2"} ${post.image_urls?.length === 1 && "col-span-2 h-[360px]"}`}/>
                    ))
                }
            </div>
            <div className='flex items-center gap-4 mt-1 pt-2 border-t border-gray-300 text-gray-600 text-sm'>
                <div className='flex items-center gap-1'>
                    <Heart className={`size-5 cursor-pointer ${likes.includes(currentUser._id) && "text-red-500 fill-red-500"}`} onClick={handleLike}/>
                    <span>{likes.length}</span>
                </div>
                <div className='flex items-center gap-1'>
                    <MessageCircle className='size-5 cursor-pointer'/>
                    <span>{12}</span>
                </div>
                <div className='flex items-center gap-1'>
                    <Share2 className='size-5 cursor-pointer'/>
                    <span>{7}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostCard
