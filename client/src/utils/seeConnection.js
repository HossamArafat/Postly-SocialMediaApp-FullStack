import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { addMessage, addRecentMessage } from "../redux/features/messages/messageSlice"

const useSEEconnection = () => {
    const dispatch = useDispatch()

    useEffect(()=> {
        const eventSource = new EventSource(`${import.meta.env.VITE_API_BASEURL}/message/sse-stream`, { withCredentials: true })
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data)
            if(data.type == 'message') {
                dispatch(addMessage(data.message))
                dispatch(addRecentMessage(data.message))
            }
        }
        eventSource.onerror = () =>  eventSource.close()
        return ()=> eventSource.close()
    }, [dispatch])
}


export default useSEEconnection
