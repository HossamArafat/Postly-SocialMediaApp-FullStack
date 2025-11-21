import { useEffect, useRef, useState } from "react"
import { dummyMessagesData, dummyUserData } from "../assets/dummy-data"
import { ImageIcon, SendHorizonal, X } from "lucide-react"

const ChatBox = () => {
    const messages = dummyMessagesData
    const [txt, setTxt] = useState("")
    const [image, setImage] = useState(null)
    const [user, setUser] = useState(dummyUserData)
    const messagesEndRef = useRef(null)

    useEffect(()=> {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
    })
    const sendMessage = async ()=> {

    }
    
  return (
    <div className="flex flex-col h-screen -mt-10">
      <div className="flex items-center gap-2 p-1.5 md:px-10 border-b border-gray-300 shadow-sm">
        <img src={ user.profile_picture } alt="" className="size-8 rounded-full"/>
        <div>
            <p className="font-medium">{user.full_name}</p>
            <p className="text-sm text-gray-500">@{user.username}</p>
        </div>
      </div>
      <div className="p-5 md:px-10 h-full overflow-y-scroll">
        <div className="w-full space-y-4 mx-auto">
            {
                messages.toSorted((a, b)=> new Date(a.createdAt) - new Date(b.createdAt)).map((message, i)=> {
                    const condition = message.to_user != user._id
                    const isImage = message.message_type == "image"
                    return <div key={i} className={`flex flex-col ${condition ? "items-start" : "items-end"}`}>
                        <div className={`max-w-sm ${isImage ? "p-1" : "p-2"} rounded-lg text-sm shadow ${condition ? "rounded-bl-none bg-white text-slate-700" : "rounded-br-none bg-indigo-500 text-white"}`}>
                            {
                                isImage && <img src={message.media_url} className="w-full max-w-sm mb-1 rounded-lg"/>
                            }
                            <p>{message.text}</p>
                        </div>
                    </div>
                })
            }
            <div ref={messagesEndRef}/>
        </div>
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
