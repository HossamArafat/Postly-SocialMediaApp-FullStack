import { Calendar, MapPin, PenBox, Verified } from "lucide-react"
import moment from "moment"

const ProfileInfo = ({user, posts, profileId, setShowEdit}) => {
  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow">
        <div className="h-40 md:h-56 bg-linear-to-r from-indigo-200 via-purple-200 to-pink-200">
            { user.cover_photo && <img src={user.cover_photo} className="size-full object-cover"/> }
        </div>
        <div className="relative py-4 px-6 md:px-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="absolute -top-16 size-32 border-4 border-white rounded-full overflow-hidden shadow-lg">
                   { user.profile_picture && <img src={user.profile_picture} alt=""/> }
                </div>
                <div className="w-full pt-16 md:pt-0 md:pl-36">
                    <div className="flex flex-col gap-3 md:flex-row items-start justify-between">
                        <div className="mb-3 md:mb-0">
                            <div className="flex items-center gap-5">
                                <h1 className="text-2xl font-bold text-gray-900">{user.full_name}</h1>
                                <Verified className="text-blue-500"/>
                            </div>
                            <p>{user.username ? `@${user.username}` : "Add username"}</p>
                        </div>
                        {
                            !profileId && <button onClick={()=> setShowEdit(true)} className="flex items-center gap-2 py-2 px-4 border border-gray-300 rounded-lg font-medium transition-colors hover:bg-gray-50 cursor-pointer">
                                <PenBox/>
                                Edit
                            </button>
                        }
                    </div>
                    <p className="max-w-md mt-4 text-gray-700 text-sm">{user.bio}</p>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5">
                            <MapPin className="size-5"/>
                            {
                                user.location ? user.location : "Add location"
                            }
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Calendar className="size-5"/>
                            Joined <span>{moment(user.createdAt).fromNow()}</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-6 mt-6 pt-4 border-t border-gray-200">
                        {
                        [[posts, 'Posts'], [user.followers, "Followers"], [user.following, "Following"]].map((item, i)=> 
                        <div key={i}>
                            <span className="sm:text-xl font-bold text-gray-900">
                                {item[0].length}
                            </span>
                            <span className="text-xs sm:text-sm text-gray-500 ml-1.5">{item[1]}</span>
                        </div>
                        )}
                    </div>
                </div>
            </div>      
        </div>
    </div>
  )
}

export default ProfileInfo
