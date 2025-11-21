import { BadgeCheck, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"


const ViewStory = ({showStory, setShowStory}) => {
    // States
    const [progress, setProgress] = useState(0)
    const vidDuration = useRef(0)
    useEffect(()=> {
        return showProgress()
    }, [])

    // Functions
    const handleClose = () => {
        setShowStory(null)
    }

    const showProgress = () => {
        setProgress(0)
        let interval = 100, elapsed = 0, calcProgress = 0, timeout
        const startProgress = () => {
            let progressInterval = setInterval(() => {
                elapsed += interval
                calcProgress = (elapsed / timeout) * 100
                setProgress(calcProgress)
            }, interval);
            
            let progressTimer = setTimeout(() => {
                setShowStory(null)
            }, timeout);
            
            return ()=> {
                clearTimeout(progressTimer)
                clearInterval(progressInterval)
            }
        }

        if(showStory.media_type == "video") {
            vidDuration.current.onloadedmetadata = () => {
                timeout = vidDuration.current.duration * 1000
                startProgress()
            }
        }else {
            timeout = 10000
            startProgress()
        }
        
    }

    const renderContent = () => {
        switch(showStory.media_type) {
            case 'image':
            return(
                <img src={showStory.media_url} className="max-x-full max-h-screen object-contain"/>
            )
            case 'video':
            return(
                <video src={showStory.media_url} ref={vidDuration} onEnded={()=> setShowStory(null)} autoPlay className="max-h-screen"/>
            )
            case 'text':
            return(
                <div className="flex items-center justify-center size-full p-8 text-2xl text-center text-white">
                    {showStory.content}
                </div>
            ) 
            default:
            return null  
        }
    }

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center h-screen bg-black bg-opacity-90"
     style={{backgroundColor: showStory.media_type === "text" ? showStory.background_color : '#000'}}
    >
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-700">
            <div className="h-full bg-white transition duration-100" style={{width: `${progress}%`}}></div>
        </div> 

        <div className="absolute top-4 left-4 flex items-center space-x-3 px-4 p-2 rounded bg-black/50 sm:p-4 sm:px-8 backdrop-blur-2xl">
            <img src={showStory.user.profile_picture} alt="" className="size-7 rounded-full object-cover ring ring-gray-100 sm:size-8"/>
            <div className="flex items-center gap-1.5 text-white font-medium">
                <span>{showStory.user.full_name}</span>
                <BadgeCheck className="size-5"/>
            </div>
        </div>
        <button onClick={handleClose} className="absolute top-4 right-4 text-white text-3xl font-bold focus:outline-none">
            <X className="size-8 transition hover:scale-110 cursor-pointer"/>
        </button>
        <div className="flex items-center justify-center max-w-[90vw] max-h-[90vh]">
            {renderContent()}
        </div>
    </div>
  )
}

export default ViewStory
