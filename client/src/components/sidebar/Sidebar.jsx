import { Link, useNavigate } from "react-router-dom"
import logo from '../../assets/images/logo.png'
import { LogOut, Menu, X } from "lucide-react"
import { useClerk, UserButton } from "@clerk/clerk-react"
import MenuItems from "./MenuItems"
import { useState } from "react"
import { useSelector } from "react-redux"

const Sidebar = () => {
  const navigate = useNavigate()
  const {currentUser} = useSelector(state => state.user)
  const { signOut } = useClerk()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const style = 'p-1 size-8 bg-white rounded-md shadow text-gray-600 sm:hidden'

  return (
    <div className="relative flex">
      <div className="absolute w-full top-1 left-[calc(100vw-45px)] z-20">
          {
            sidebarOpen ? (<X className={style} onClick={()=> setSidebarOpen(false)}/>) : (
              <Menu className={style} onClick={()=> setSidebarOpen(true)}/>
            )
          }
      </div>
      <div className={`w-65 lg:w-75 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute top-0 bottom-0 z-20 ${sidebarOpen ? "translate-x-0" : "hidden sm:flex" } transition duration-100`}>
        <div className="w-full">
          <div className="flex items-center justify-between my-2 mx-7 ">
            <img src={logo} alt="" className="w-26 py-2 cursor-pointer" onClick={()=> navigate('/')}/>
          </div>

          <hr className=" border-gray-300 mb-8"/>
          <MenuItems setSidebarOpen={setSidebarOpen}/>
        </div>
        <div className="w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between">
          <UserButton/>
          <div>
              <h1 className="text-sm font-medium">{currentUser.full_name}</h1>
              <p className="text-xs text-gray-500">{currentUser.username}</p>
          </div>
          <LogOut onClick={signOut} className="w-4.5 mb-1 text-gray-400 hover:text-gray-700 transition cursor-pointer"/>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
