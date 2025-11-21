import { ArrowLeft, Sparkle, TextIcon, Upload } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import api from "../../api/api"
import { useDispatch } from "react-redux"
import { fetchStories } from "../../redux/features/stories/storyThunks"

const CreateStory = ({setShowCreate}) => {
    const dispatch = useDispatch()
    const bgColors = ["#4f46e5" , "#7c3aed" , "#db2777" , "#e11d48" , "#ca8a04" , "#0d9488"]
    const [mode, setMode] = useState('text')
    const [background, setBackground] = useState(bgColors[0])
    const [txt, setTxt] = useState("text")
    const [media, setMedia] = useState()
    const [previewUrl, setPreviewUrl] = useState()
    const [disabled, setDisabled] = useState(false)

    const MAX_VIDEO_DURATION = 60
    const MAX_VIDEO_SIZE_MB = 50

    const handleUploadMedia = (e) => {
        const file = e.target.files?.[0]  //files has => name, size, type
        if(file.type.startsWith('video')) {
            if(file.size > MAX_VIDEO_SIZE_MB * 1024 * 1024) {
                toast.error(`Video file size cannt exceed ${MAX_VIDEO_SIZE_MB}MB.`)
            } else {
                const video = document.createElement("video")
                video.preload = "metadata" // video not downloaded all but only metadata(duration, width.) Not the whole video 
                video.src = URL.createObjectURL(file) // createObjectURL => to create preview of static file(url)
                video.load()
                video.onloadedmetadata = () => {
                    if(video.duration > MAX_VIDEO_DURATION * 1000) { //video element tag has => preload, src, duration, controls
                        toast.error(`Video duration cannt exceed 1 Minute.`)
                        URL.revokeObjectURL(video.src)  // cleanup
                    }
                    else {
                       setMedia(file) 
                       setPreviewUrl(video.src)
                       setMode('media')
                       setTxt('')
                    }
                }
            }  
        }else if (file.type.startsWith('image')) {
           setMedia(file)
           setPreviewUrl(URL.createObjectURL(file))
           setMode('media')
           setTxt('')
        }
    }
    const handleCreateStory = async ()=> {
        const media_type = mode == "media" ? (media.type.startsWith("image") ? "image" : "video") :"text"
        if(media_type == "text" && !txt) {
            toast.error('Please, enter some text')
            return
        }
        const storyData = new FormData()
        storyData.append("content", txt)
        storyData.append("media_type", media_type)
        mode == "text" && storyData.append("background_color", background)
        mode == "media" && storyData.append("media", media)
        try{
            setDisabled(true)
            const {data} = await api.addStory(storyData)
            setDisabled(false)
            if(data.success) {
                setShowCreate(false)
                toast.success(data.message)
                dispatch(fetchStories())
            }else {
                toast.error(data.message)
            }
        }catch(err){
            toast.error(err.message)
        }
    }

  return (
    <div className="fixed inset-0 z-100 h-screen bg-black/80 backdrop-blur text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-4 flex items-center justify-between">
            <button className="text-white p-2 cursor-pointer" onClick={()=> setShowCreate(false)}>
                <ArrowLeft/>
            </button>
            <h2 className="text-lg font-semibold">Create Story</h2>
            <span className="w-10">
            </span>
        </div>
        <div className="flex items-center justify-center relative h-96 rounded-lg" style={{backgroundColor: mode === "text" ? background : "#000"}}>
            {
                mode === "text" && (
                    <textarea className="size-full p-4 text-lg bg-transparent resize-none focus:outline-none" placeholder="what's on your mind ?" onChange={(e)=>setTxt(e.target.value)}/>
                )
            }
            {
                mode ==="media" && previewUrl && (
                    media?.type.startsWith("image") ? (
                        <img src={previewUrl} alt="" className="max-h-full object-contain"/>
                    ) : (
                        <video controls src={previewUrl} className="max-h-full object-contain"/>
                    )
                )
            }
        </div>
        <div className="flex mt-4 gap-2">
            {
                bgColors.map((color, i)=> 
                    <button key={i} className="size-6 rounded-full ring cursor-pointer" style={{backgroundColor: color}} onClick={()=> setBackground(color)}/>
                )
            }
        </div>
        <div className="flex gap-2 mt-4">
            <button onClick={()=> {setMode("text"); setMedia(null); setPreviewUrl(null)}}
                className={`flex-1 flex items-center justify-center gap-2 p-2 rounded ${mode === "text" ? "bg-white text-black" : "bg-zinc-800"}`}
            >
                <TextIcon size={18}/>
            </button>
            <label className={`flex-1 flex items-center justify-center gap-2 p-2 rounded cursor-pointer ${mode === "media" ? "bg-white text-black" : "bg-zinc-800"}`}>
                <input onChange={(e)=> {handleUploadMedia(e)}}
                    type="file" accept="image/*, video/*" className="hidden"  // accept => limit file picker to show only image and video..
                />
                <Upload size={18}/> Photo/Video
            </label>
        </div>
        <button disabled={disabled} onClick={()=> toast.promise(handleCreateStory(), {loading: 'Uploading..'})}
        className="flex items-center justify-center gap-2 mt-4 py-3 pt-4 w-full rounded bg-linear-to-tr from-indigo-500 to-purple-600 text-white transition hover:from-indigo-600 hover:to-purple-700 active:scale-95 cursor-pointer"
        >
            <Sparkle size={18}/> Create Story
        </button>
      </div>
    </div>
  )
}

export default CreateStory
