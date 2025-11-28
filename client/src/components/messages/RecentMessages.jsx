import { useEffect } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRecentMessages } from '../../redux/features/messages/messageThunks'
import { resetRecentMessages } from '../../redux/features/messages/messageSlice'
import useSEEconnection from "../../utils/seeConnection"

const RecentMessages = ({open, setOpen}) => {
    const {recentMessages} = useSelector(state=> state.message)
    const {isLoading} = useSelector(state=> state.loading)
    const { currentUser } = useSelector(state=> state.user)

    const dispatch = useDispatch()
    
    useSEEconnection()

    useEffect(()=> {
        dispatch(fetchRecentMessages())
        return ()=> dispatch(resetRecentMessages())
    }, [dispatch])
    
    const messages = Object.values(  //get the latest message and put the recent something in first 
        recentMessages.reduce((acc, msg)=> {
            const userId = msg.from_user
            if(!acc[userId]) {
                acc[userId] =  { latest: msg, count: 1 }
            }
            else {
                const isSeen = acc[userId].latest.seen
                isSeen && (acc[userId].count = 0)

                acc[userId].count +=1
                const isNewMsg = new Date(msg.createdAt) > new Date(acc[userId].latest.createdAt)
                isNewMsg && (acc[userId].latest = msg) 
            }
            return acc
        }, {})
    ).toSorted((a, b)=> new Date(a.latest.createdAt) - new Date(b.latest.createdAt))


    return (
    <div className={`min-w-[290px] h-[290px] mt-2 p-4 rounded-xl bg-white max-xl:bg-gray-50 text-slate-800 shadow ${open ? 'block' : 'hidden'} xl:block`}>
        <div className='flex justify-between mb-4'>
            <h3 className='font-semibold text-slate-800'>Recent Messages</h3>
            <X onClick={()=>setOpen(false)} className={`cursor-pointer p-2 size-8 rounded-full bg-gray-200 hover:bg-gray-300 xl:hidden`}/>
        </div>
        <div className={`flex flex-col max-h-56 overflow-y-scroll ${messages.length > 5 && 'scroll-show'}`}>
            {   !isLoading ?              
                messages.length ? 
                messages.map((message, i)=> {
                    const latest = message.latest;
                    const count = message.count;
                    const areYou = latest.from_user?._id == currentUser._id
                    if(latest.from_user == null || latest.to_user == null) return 
                    return <Link to={`/messages/${ areYou ? latest.to_user._id : latest.from_user._id}`} key={i} className="flex items-start gap-3 p-2 rounded-md hover:bg-slate-100">
                        <img src={areYou ? latest.to_user.profile_picture : latest.from_user.profile_picture} className='size-8 rounded-full'/>
                        <div className='w-full'>
                            <div className='flex justify-between items-center'>
                                <p className='font-medium text-[15px] mr-1.5'>{areYou ? latest.to_user.full_name : latest.from_user.full_name}</p>
                                <p className='text-[11px] w-25'>{moment(latest.createdAt).fromNow()}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p className='text-gray-500 text-sm'>{latest.text ? latest.text.length < 35 ? latest.text : `${latest.text.slice(0, 35)}...`: "Media"}</p>
                                {
                                    areYou ? <p className='text-[14px]'>(You)</p>
                                    :(count > 0 && !latest.seen) && <p className='flex items-center justify-center size-5 rounded-full bg-indigo-500 text-[10px] text-white'>{count}</p>
                                }
                            </div>
                        </div>
                    </Link>
                }
                ): <div className='pt-18 text-center'>No messages yet!</div>
                : <div className='pt-18 text-center'>Loading recent messages...</div>
            }
        </div>
    </div>
  )
}

export default RecentMessages
