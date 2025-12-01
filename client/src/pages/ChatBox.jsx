import { useEffect, useRef, useState } from "react"
import { ImageIcon, SendHorizonal, X } from "lucide-react"
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from "../api/api"
import { addMessage, addRecentMessage, resetMessages } from "../redux/features/messages/messageSlice"
import { fetchChatMessages } from "../redux/features/messages/messageThunks"
import { fetchUsers } from "../redux/features/users/userThunks"
import useSEEconnection from "../utils/seeConnection"

const ChatBox = () => {
    const {chatMessages} = useSelector(state=> state.message)
    const {users} = useSelector(state=> state.user)
    const dispatch = useDispatch()
    const {id} = useParams()
    const messagesEndRef = useRef(null)

    const [txt, setTxt] = useState("")
    const [image, setImage] = useState(null)
    const [user, setUser] = useState({})

    useSEEconnection()

    useEffect(()=> {
        const scroll = setTimeout(() => { // to scroll after downloading all messages
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 0);
        return ()=> clearTimeout(scroll)
    }, [chatMessages])

    useEffect(()=> {
        dispatch(fetchUsers())
        dispatch(fetchChatMessages(id))
        setUser()
        return ()=> dispatch(resetMessages())
    }, [dispatch, id])

    useEffect(()=> {
        const conn = users.connections?.find(conn=> conn._id == id)
        setUser(conn??chatMessages[0]?.to_user)
    }, [chatMessages, id, users.connections])

    const sendMessage = async ()=> {
        try{
            if(!txt && !image) return
            const messageData = new FormData()
            messageData.append('to_user', id)
            messageData.append('message_type', image ? 'image' : 'text' )
            txt && messageData.append('text', txt)
            image && messageData.append('image', image)
            const {data} = await api.sendMessage(messageData)
            if(data.success) {
                setTxt('')
                setImage(null)
                dispatch(addMessage(data.message))
                dispatch(addRecentMessage(data.message))
            } else {
                toast.error(data.message)
            }
        }catch(err){
            toast.error(err.message)
        }
    }
 
  return (
    <div className="flex flex-col h-screen -mt-10">
      <div className="flex items-center gap-2 p-1.5 md:px-10 border-b border-gray-300 shadow-sm">
        <img src={ user?.profile_picture } alt="" className="size-8 rounded-full"/>
        <div>
            <p className="font-medium">{user?.full_name}</p>
            <p className="text-sm text-gray-500">@{user?.username}</p>
        </div>
      </div>
      <div className="p-5 md:px-10 w-full h-full space-y-4 overflow-y-scroll">
        {
            chatMessages.toSorted((a, b)=> new Date(a.createdAt) - new Date(b.createdAt)).map((message, i)=> {
                const condition = message.to_user._id != user?._id
                const isIext = message.message_type == "text"
                return <div key={i} className={`flex flex-col ${condition ? "items-start" : "items-end"}`}>
                    <div className={`max-w-sm overflow-x-scroll ${isIext ? "p-2" : "p-1"} rounded-lg text-sm shadow ${condition ? "rounded-bl-none bg-white text-slate-700" : "rounded-br-none bg-indigo-500 text-white"}`}>
                        {
                            !isIext && <img src={message.image_url} className={`w-full max-w-sm max-h-[380px] mb-1 rounded-lg`}/>
                        }
                        {message.text}
                    </div>
                </div>
            })
        }
        <div ref={messagesEndRef}/>
       </div>
       <div className="px-4">
            <div className="flex items-center gap-3 w-full max-w-xl mx-auto mb-5 pl-5 p-1.5 border border-gray-200 rounded-full bg-white shadow">
                <input type="text" className="flex-1 outline-none text-slate-700"
                    placeholder="Type a message..."
                    onKeyDown={e=>e.key == 'Enter' && sendMessage()}
                    onChange={e => setTxt(e.target.value)}
                    value={txt}
                />
                {
                    image ?
                    <div className="relative group">
                        <img className="h-8 rounded" src={URL.createObjectURL(image)} alt=""/>
                        <div onClick={()=>setImage(null)}
                        className="absolute inset-0 hidden group-hover:flex justify-center items-center rounded-md bg-black/40 cursor-pointer"
                        >
                            <X className="size-6 text-white"/>
                        </div>
                    </div> 
                    :<label htmlFor="image" >
                        <ImageIcon className="size-7 text-gray-400 cursor-pointer"/> 
                    </label>
                }
                <input type="file" id="image" accept="image/*" hidden onChange={e=>setImage(e.target.files[0])}/>
                <button onClick={sendMessage} className="p-2 rounded-full text-white bg-linear-to-br from-indigo-500 to-purple-600 transition hover:from-indigo-700 hover:to-purple-800 active:scale-95 cursor-pointer">
                    <SendHorizonal/>
                </button>
            </div>
      </div>
    </div>
  )
}

export default ChatBox
