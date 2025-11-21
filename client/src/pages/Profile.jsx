import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loading from '../components/shared/Loading'
import ProfileInfo from "../components/profile/ProfileInfo"
import EditProfile from "../components/profile/EditProfile"
import ProfileTabs from "../components/profile/ProfileTabs"
import { useDispatch, useSelector } from 'react-redux'
import { fetchProfile } from "../redux/features/users/userThunks"

const Profile = () => {
  const { id } = useParams()
  const [showEdit, setShowEdit] = useState(false)
  
  const dispatch = useDispatch()
  const {currentUser} = useSelector(state=> state.user)
  const { profile, posts, likedPosts } = useSelector(state=> state.user)

  useEffect(()=> {
    dispatch(fetchProfile(id ?? currentUser._id))
  }, [dispatch, id, currentUser])

  return profile ? (
    <div className="calc(min-h-screen - 1.5rem) px-6">
      <div className="max-w-4xl mx-auto mb-8">
        <ProfileInfo user={profile} posts={posts} profileId={id} setShowEdit={setShowEdit}/>
        <ProfileTabs posts={posts} likedPosts={likedPosts} profileId={id}/>     
      </div>
      { showEdit && <EditProfile setShowEdit={setShowEdit}/>}
    </div>
  ) : <Loading/>
}

export default Profile
