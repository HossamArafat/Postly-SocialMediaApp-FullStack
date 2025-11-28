import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sidebar/Sidebar'
import { useContext } from 'react'
import { Post } from '../context/PostContext'
import CreatePost from '../components/post/CreatePost'
import { useSelector } from 'react-redux'
import Loading from '../components/shared/Loading'

const Layout = () => {
  const {currentUser} = useSelector((state=> state.user))
  const post = useContext(Post)

  return currentUser ? (
    <div className='flex h-screen'>
      <Sidebar />
      <div className='size-full pt-10 overflow-y-scroll bg-slate-100'>
        <Outlet/>
        {
          post.showCreate && <CreatePost setShowCreate={post.setShowCreate}/>
        }
      </div>
    </div>
  ) : (<Loading />)
}

export default Layout
