import { useEffect } from 'react'
import StoriesBar from '../components/story/StoriesBar'
import PostCard from '../components/post/PostCard'
import Sponsored from '../components/messages/Sponsored'
import RecentMessages from '../components/messages/RecentMessages'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFeeds } from '../redux/features/posts/postThunks'
import Failed from '../components/shared/Failed'

const Feeds = () => {
  const dispatch = useDispatch()
  const {feeds} = useSelector(state=> state.post)
  const {isLoading} = useSelector(state=> state.loading)
   
  useEffect(()=> {
    dispatch(fetchFeeds())
  }, [dispatch])

  return (
    <div className='flex items-start justify-center h-full overflow-y-scroll xl:pr-5 xl:gap-8'>
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

      <div className='max-xl:hidden sticky top-0'>
        <Sponsored/>
        <RecentMessages/>
      </div>
    </div>
  )
}

export default Feeds
