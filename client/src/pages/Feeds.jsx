import { useEffect, useState } from 'react'
import StoriesBar from '../components/story/StoriesBar'
import PostCard from '../components/post/PostCard'
import Sponsored from '../components/messages/Sponsored'
import RecentMessages from '../components/messages/RecentMessages'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFeeds } from '../redux/features/posts/postThunks'
import Failed from '../components/shared/Failed'
import {MessageSquareText} from 'lucide-react'

const Feeds = () => {
  const dispatch = useDispatch()
  const {feeds} = useSelector(state=> state.post)
  const {isLoading} = useSelector(state=> state.loading)
  const [open, setOpen] = useState(false)
     
  useEffect(()=> {
    dispatch(fetchFeeds())
  }, [dispatch])

  return (
    <div className='flex items-start justify-center h-full overflow-y-scroll 2xl:pr-10 xl:gap-8'>
      <div>
        <StoriesBar/>
        <div className='p-4 space-y-6'>
          {
            isLoading ?
            <div> Loading feeds... </div>
            :feeds == 'failed' ? <Failed/>
            :feeds?.length ? feeds.map((post, i)=> <PostCard key={i} post={post}/>)
            :<div className='text-center'> No posts have been published yet. </div>
          }
        </div>
      </div>

      <div className='fixed right-5 bottom-2 z-5 xl:sticky xl:top-0 '>
        <div className='max-xl:hidden'>
          <Sponsored/>
        </div>
        <RecentMessages setOpen={setOpen} open={open}/>
        <MessageSquareText onClick={()=> setOpen(true)} className={`mb-10 cursor-pointer p-3 size-12 rounded-full bg-indigo-500 text-white ${open && 'hidden'} xl:hidden`}/>
      </div>
    </div>
  )
}

export default Feeds
