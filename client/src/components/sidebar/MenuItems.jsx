import { CirclePlus, Home, MessageCircle, Search, UserIcon, Users } from 'lucide-react'
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import CreatePost from '../post/CreatePost';
import { Post } from '../../context/PostContext';

const MenuItems = ({setSidebarOpen}) => {
const post = useContext(Post)

const menuItemsData = [
    { to: '/', label: 'Feed', Icon: Home },
    { to: '/connections', label: 'Connections', Icon: Users },
    { to: '/messages', label: 'Messages', Icon: MessageCircle },
    { to: '/discover', label: 'Discover', Icon: Search },
    { to: '/profile', label: 'Profile', Icon: UserIcon },
];
  return (
    <div className="px-6 text-gray-600 space-y-1 font-medium">
      {
        menuItemsData.map(({to, label, Icon}, i)=> 
            <NavLink key={i} to={to} end onClick={()=> setSidebarOpen(false)}
             className={({ isActive }) =>`px-3.5 py-2 flex items-center gap-3 rounded-xl ${ isActive ? "bg-indigo-50 text-indigo-700" : "hover:bg-gray-100"}`}
            >
                <Icon className='size-5' />
                <span>{label}</span>
            </NavLink>
        )
      }
      <button onClick={()=> post.setShowCreate(true)} className="flex items-center justify-center w-full gap-2 py-2.5 mt-6 rounded-lg bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-700 hover:to-purple-800 text-white transition active:scale-95 cursor-pointer">
              <CirclePlus className="size-5"/>
              <span className="hidden sm:block">Create Post</span>
      </button>
    </div>
  )
}

export default MenuItems
