import { useEffect, useState } from 'react'
import { dummyRecentMessagesData } from '../../assets/dummy-data'
import moment from 'moment'
import { Link } from 'react-router-dom'
const RecentMessages = () => {
    const [messages, setMessages] = useState([])
    const fetchRecentMessages = async () => {
        setMessages(dummyRecentMessagesData)
    }
    useEffect(()=> {
        fetchRecentMessages()
    }, [])
  return (
    <div className='max-w-xs min-h-20 mt-2 p-4 rounded-md bg-white text-slate-800 shadow'>
        <h3 className='mb-4 font-semibold text-slate-800'>Recent Messages</h3>
        <div className='flex flex-col max-h-56 overflow-y-scroll'>
            {
                messages.map((message, i)=> 
                    <Link to={`/messages/${message.from_user._id}`} key={i} className="flex items-start gap-3 p-2 rounded-md hover:bg-slate-100">
                        <img src={message.from_user.profile_picture} className='size-8 rounded-full'/>
                        <div className='w-full'>
                            <div className='flex justify-between'>
                                <p className='font-medium'>{message.from_user.full_name}</p>
                                <p className='text-[11px]'>{moment(message.createdAt).fromNow()}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p className='text-gray-500 text-sm'>{message.text ? message.text : "Media"}</p>
                                {
                                    !message.seen && <p className='flex items-center justify-center size-5 rounded-full bg-indigo-500 text-[10px] text-white'>1</p>
                                }
                            </div>
                        </div>
                    </Link>
                )
            }
        </div>
    </div>
  )
}

export default RecentMessages
