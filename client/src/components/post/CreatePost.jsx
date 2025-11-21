import { useState } from "react"
import { Image, X } from "lucide-react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import api from "../../api/api"
import { useNavigate } from "react-router-dom"
import { fetchFeeds } from "../../redux/features/posts/postThunks"

const CreatePost = ({setShowCreate}) => {
  // States
  const [content, setContent] = useState("")
  const [images, setImages] = useState([])
  const [disabled, setDisabled] = useState(false)
  const navigate = useNavigate()
  const { currentUser } = useSelector(state=> state.user)
  const dispatch = useDispatch()

  // Functions
  const handleSubmit = async () => {
    try{
      if(!content && !images.length) return toast.error("Please add at least one image or text")
      const post_type = content && images.length ? "text_with_image" : content ? "text" : "image"

      const postData = new FormData()
      postData.append('post_type', post_type)
      content && postData.append('content', content)
      images.length && images.map((image)=>  postData.append('images', image))

      setDisabled(true)
      const {data} = await api.addPost(postData)
      setDisabled(false)
      if(data.success) {
        setShowCreate(false)
        dispatch(fetchFeeds())
        navigate("/")
      }  else {
        toast.error(data.message)
      }
    }catch(err){
      toast.error(err.message)
    }
  }

  return (
      <div className="fixed inset-0 left-0 z-100 h-screen overflow-y-scroll bg-black/50">
        <div className="max-w-2xl mx-auto sm:py-6">
        <div className="rounded-lg bg-white shadow">
          <div className="relative p-6">
              <button onClick={()=>setShowCreate(false)} className="absolute top-6 right-5 text-xl">
                <X className="size-7 transition hover:scale-110 cursor-pointer"/>
              </button>
            <h1 className="mb-6 text-2xl font-bold text-gray-900">Create Post</h1>
            <p className="text-slate-600">Share your thoughts with the world</p>
          </div>
          <div className="max-w-3xl space-y-4 p-4 sm:p-8">
            <div className="flex items-center gap-3">
              <img src={currentUser.profile_picture} className="size-12"/>
              <div>
                <h2 className="font-semibold">{currentUser.full_name}</h2>
                <p>@{currentUser.username}</p>
              </div>
            </div>
            <textarea className="w-full max-h-20 resize-none outline-none mt-4 text-sm placeholder-gray-400"
            placeholder="What's happening ?"
            onChange={(e)=> setContent(e.target.value)} value={content}/>
            {
              images.length > 0 && <div className="flex flex-wrap gap-2 mt-4">
                {
                  images.map((image, i)=> 
                  <div key={i} className="relative group">
                    <img src={URL.createObjectURL(image)} className="h-20 rounded-md"/>
                    <div onClick={()=>setImages(images.filter((_, index)=> index != i))}
                      className="absolute inset-0 hidden group-hover:flex justify-center items-center rounded-md bg-black/40 cursor-pointer"
                    >
                      <X className="size-6 text-white"/>
                    </div>
                  </div>
                  )
                }
              </div>
            }
            <div className="flex items-center justify-between border-t pt-3 text-gray-300">
              <label htmlFor="images" className="flex items-center gap-2 text-sm text-gray-500 transition hover:text-gray-700 cursor-pointer">
                <Image className="size-6"/>
              </label>
              <input type="file" id="images" accept="image/*" hidden multiple onChange={(e)=> setImages([...images, ...e.target.files])}/>
              <button onClick={()=>toast.promise(handleSubmit(), {loading:"Uploading"})}
                disabled={disabled} className="px-8 py-2 rounded-md text-sm bg-linear-to-r from-indigo-500 to-purple-600 transition hover:from-indigo-600 hover:to-purple-700 active:scale-95 cursor-pointer">
                Publish Post
              </button>
            </div>
          </div>
        </div>
        </div>
    </div>
  )
}

export default CreatePost
