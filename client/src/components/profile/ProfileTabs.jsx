import moment from "moment"
import { useState } from "react"
import { Link } from "react-router-dom"
import PostCard from "../post/PostCard"


const ProfileTabs = ({posts, likedPosts, profileId}) => {
    const [activeTab, setActiveTab] = useState("Posts")
    let tabName = profileId ? ["Posts", "Media"] : ["Posts", "Media", "Likes"]
    const media = posts.filter((post)=> post.image_urls.length > 0 )
    const tabColors = {
        Posts: "bg-indigo-600",
        Media: "bg-teal-600",
        Likes: "bg-rose-600"
    }
    
  return (
    <div className="mt-6">
        <div className="flex p-1 max-w-md mx-auto rounded-xl bg-white shadow">
        {
            tabName.map((tab)=> {
            const isActive = activeTab == tab
            return <button key={tab} onClick={()=>setActiveTab(tab)} className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer  ${ isActive ? `${tabColors[tab]} text-white` : "text-gray-600 hover:text-gray-900"}`}>
                { tab }
            </button>
            })
        }
        </div>
        {
        activeTab === "Posts" && (
            <div className="flex flex-col items-center gap-6 mt-6">
            {
                posts.length ? posts.map((post, i)=> <PostCard key={i} post={post}/>)
                :<div className="text-center"> No posts have been published by you yet </div>
            }
            </div>
        )
        }
        {
        activeTab === "Media" && (
            <div className={`flex flex-wrap gap-6 max-w-6xl mt-6 ${!media.length && 'flex-col text-center'}`}>
            {   media.length ? media.map((post)=>
                  post.image_urls.map((url, i)=> 
                    <Link target="_blank" key={i} to={url} className="relative group">
                        <img src={url} key={i} className="w-64 aspect-video object-cover"/>
                        <p className="absolute bottom-0 right-0 p-1 px-3 backdrop-blur-xl text-xs text-white opacity-0 transition duration-300 group-hover:opacity-100">
                            Posted {moment(post.createdAt).fromNow()}
                        </p>
                    </Link>
                  )
                ):<div> No images have been published yet </div>
            }
            </div>
        )
        }
        {
        !profileId && activeTab === "Likes" && (
            <div className="flex flex-col items-center gap-6 mt-6">
            {
                likedPosts.length ? likedPosts.map((post, i)=> 
                <PostCard key={i} post={post}/>
                )
                :<div className="text-center"> No posts have been liked by you yet </div> 
            }
            </div>
        )
        }
    </div>
  )
}

export default ProfileTabs
