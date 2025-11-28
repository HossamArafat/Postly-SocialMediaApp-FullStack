import { useDispatch, useSelector } from "react-redux"
import MessageCard from "../components/messages/MessageCard"
import { useEffect } from "react"
import { fetchUsers } from "../redux/features/users/userThunks"

const Messages = () => {
  const dispatch = useDispatch()
  const {users} = useSelector(state=> state.user)

  useEffect(()=> {
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <div className="max-w-6xl px-6">
      <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Messages</h1>
          <p className="text-slate-600">Talk to your friends and family</p>
      </div>
      <div className="flex flex-col gap-3">
        {
          users.connections?.map((user, i)=> <MessageCard key={i} user={user}/> )
        }
      </div>
    </div>
  )
}

export default Messages
