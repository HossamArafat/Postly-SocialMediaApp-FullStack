import { useNavigate } from "react-router-dom"
import { Eye, MessageSquare } from "lucide-react"

const MessageCard = ({user}) => {
  const navigate = useNavigate()
  const btnStyle = "size-12 flex items-center justify-center gap-1 rounded bg-slate-100 text-slate-800 text-sm transition hover:bg-slate-200 active:scale-95 cursor-pointer"

  return (
    <div className="max-w-xl flex flex-wrap gap-5 p-6 rounded-md bg-white shadow">
        <img src={user.profile_picture} className="rounded-full size-12 mx-auto"/>
        <div className="flex-1">
            <p className="font-medium text-slate-700">{user.full_name}</p>
            <p className="text-slate-500">@{user.username}</p>
            <p className="text-sm text-gray-600">{user.bio}</p>
        </div>
        <div className="flex flex-col gap-2">
            <button onClick={()=> navigate(`/messages/${user._id}`)} className={btnStyle}>
                <MessageSquare className="size-5"/>
            </button>
            <button onClick={()=> navigate(`/profile/${user._id}`)} className={btnStyle}>
                <Eye className="size-5"/>
            </button>
        </div>
    </div>
  )
}

export default MessageCard
