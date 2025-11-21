import { dummyConnectionsData } from "../../src/assets/dummy-data"
import MessageCard from "../components/messages/MessageCard"

const Messages = () => {
  return (
    <div className="max-w-6xl px-6">
      <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Messages</h1>
          <p className="text-slate-600">Talk to your friends and family</p>
      </div>
      <div className="flex flex-col gap-3">
        {
          dummyConnectionsData.map((user, i)=> <MessageCard key={i} user={user}/> )
        }
      </div>
    </div>
  )
}

export default Messages
