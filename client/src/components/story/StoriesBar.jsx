import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import ViewStory from "./ViewStory"
import { useDispatch, useSelector } from "react-redux"
import { fetchStories } from "../../redux/features/stories/storyThunks"
import CreateStory from "./CreateStory"
import StoryCard from "./StoryCard"


const StoriesBar = () => {
    const dispatch = useDispatch()
    const {isLoading} = useSelector(state=> state.loading)
    const {stories} = useSelector(state=> state.story)
    const [showCreate, setShowCreate] = useState(false)
    const [showStory, setShowStory] = useState()
    useEffect(()=> {
        dispatch(fetchStories())
    }, [dispatch])

  return (
    <div className="w-screen overflow-x-auto px-4 sm:w-[calc(100vw-240px)] lg:max-w-2xl text-center">
        <div className="flex gap-4 pb-5">
            <div onClick={()=> setShowCreate(true)} className="rounded-lg shadow-sm min-w-30 max-w-30 max-h-40 aspect-3/4 border-2 border-dashed border-indigo-300 bg-linear-to-b from-indigo-300 to-white cursor-pointer transition duration-200 hover:shadow-lg">
                <div className="h-full flex flex-col items-center justify-center p-4">
                    <div className="size-10 bg-indigo-500 rounded-full flex items-center justify-center mb-3">
                        <Plus className="size-5 text-white"/>
                    </div>
                    <p className="text-sm font-medium text-slate-700 text-center">Create Story</p>
                </div>
            </div>
            {
                isLoading ?
                <div className="flex items-center"> Loading stories... </div>
                :stories == 'failed' ? <Failed/>
                :stories?.length ?  stories.map((story, i)=> <StoryCard key={i} story={story} setShowStory={setShowStory}/>)
                :<div className="flex items-center"> No stories have been published yet. </div>
            }
        </div>
      {showCreate && <CreateStory setShowCreate={setShowCreate}/>}
      {showStory && <ViewStory setShowStory={setShowStory} showStory={showStory}/>}
    </div>
  )
}

export default StoriesBar
