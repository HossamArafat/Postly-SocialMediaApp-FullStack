import moment from "moment"

const StoryCard = ({story, setShowStory}) => {

   const mediaStyle = "size-full object-cover opacity-70 transition duration-200 hover:scale-110 hover:opacity-80"

  return (
    <div onClick={()=> setShowStory(story)} className={`relative rounded-lg shadow min-w-30 bg-linear-to-b from-indigo-500 to-purple-600 cursor-pointer transition hover:shadow-2xl hover:from-indigo-700 hover:to-purple-800 active:scale-90`}>
        <img src={story.user.profile_picture} alt="" className="absolute size-8 top-3 left-3 z-15 rounded-full ring ring-gray-100 shadow"/>
        {
            story.media_type == "text" ? 
            <p className="absolute top-18 left-3 z-10 max-w-24 text-white/60 text-sm truncate">
                {story.content}
            </p>
            :<div className="absolute inset-0 z-10 rounded-lg bg-black overflow-hidden">
                {
                    story.media_type === "image" ?
                    <img src={story.media_url} alt="" className={mediaStyle}/>
                    :<video src={story.media_url} className={mediaStyle}/>
                }
            </div>
        }
        <p className="text-white absolute bottom-1 right-2 z-15 text-xs">
            {moment(story.createdAt).fromNow()}
        </p>
    </div>
  )
}

export default StoryCard
