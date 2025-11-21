import { useEffect, useState } from 'react'
import { Users } from 'lucide-react'
import ConnectionsStats from '../components/connections/ConnectionsStats'
import ConnectionsTab from '../components/connections/ConnectionsTab'
import ConnectionsProfiles from '../components/connections/ConnectionsProfiles'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../redux/features/users/userThunks'
import Loading from '../components/shared/Loading'
import Failed from '../components/shared/Failed'

const Connections = () => {
  const dispatch = useDispatch()
  const {users} = useSelector(state=> state.user)
  const {isLoading} = useSelector(state=> state.loading)
  const [activeTab, setActiveTab] = useState("Followers")
  const dataArray = [
    {label: "Followers", value: users?.followers, Icon: Users},
    {label: "Following", value: users?.following, Icon: Users},
    {label: "Pending", value: users?.pendingConnections, Icon: Users},
    {label: "Connections", value: users?.connections, Icon: Users},
  ]

  useEffect(()=> {
    dispatch(fetchUsers())
  }, [dispatch])

  return isLoading || !Object.keys(users).length ? <Loading/>
  :(
    users == 'failed' ? <Failed/>
    : <div className='max-w-6xl px-6'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-slate-900 mb-2'>Connections</h1>
        <p className='text-slate-600'>Manage your network and discover new connections</p>
      </div>
      <ConnectionsStats stats={dataArray}/>
      <ConnectionsTab tabs={dataArray} activeTab={activeTab} setActiveTab={setActiveTab}/>
      <ConnectionsProfiles profiles={dataArray} activeTab={activeTab}/>        
    </div>    
  )
}

export default Connections
