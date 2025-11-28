import { useEffect, useState } from "react"
import UserCard from "../components/discover/UserCard"
import Loading from "../components/shared/Loading"
import SearchBar from "../components/discover/SearchBar"
import { useDispatch, useSelector } from "react-redux"
import { discoverProfiles, fetchUserData } from "../redux/features/users/userThunks"
import { resetDiscoveredUsers } from "../redux/features/users/userSlice"

const Discover = () => {
  // States
  const dispatch = useDispatch()
  const [keyword, setKeyword] = useState("")
  const {discoveredUsers} = useSelector(state=> state.user)
  const {isLoading} = useSelector(state=> state.loading)

  useEffect(()=> {
    dispatch(resetDiscoveredUsers())
    dispatch(fetchUserData())
  }, [dispatch])

  // Functions
  const handleSearch = ()=> dispatch(discoverProfiles(keyword))
  console.log(discoveredUsers)

  return (
      <div className="max-w-6xl px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Discover People</h1>
          <p className="text-slate-600">
            Connect with amazing people and grow your network
          </p>
        </div>
        <SearchBar keyword={keyword} setKeyword={setKeyword} handleSearch={handleSearch}/>
        <div className="flex flex-wrap gap-6">
          {
            discoveredUsers?.map((user, i)=> <UserCard key={i} user={user} /> )
          }
        </div>
        { isLoading && <Loading height="60vh"/> }
      </div>
  )
}

export default Discover
