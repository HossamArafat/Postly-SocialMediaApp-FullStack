import { useState } from "react"
import { Pencil, X } from "lucide-react"
import { useDispatch, useSelector } from 'react-redux'
import { updateUserData } from '../../redux/features/users/userThunks'

const EditProfile = ({setShowEdit}) => {
  const {currentUser} = useSelector(state=> state.user)
  const dispatch = useDispatch()
  const [editForm, setEditForm] = useState({
    username: currentUser.username,
    full_name: currentUser.full_name,
    bio: currentUser.bio,
    location: currentUser.location,
    profile_picture:null,
    cover_photo:null,
  })

  const handleSaveProfile = async (e)=> {
    e.preventDefault()
    const updatedData = new FormData()
    updatedData.append("username", editForm.username)
    updatedData.append("full_name", editForm.full_name)
    updatedData.append("bio", editForm.bio)
    updatedData.append("location", editForm.location)
    editForm.profile_picture && updatedData.append("profile", editForm.profile_picture)
    editForm.cover_photo && updatedData.append("cover", editForm.cover_photo)
    dispatch(updateUserData(updatedData))
    setShowEdit(false)
  }

  return (
    <div className="fixed inset-0 left-0 z-100 h-screen overflow-y-scroll bg-black/50">
      <div className="max-w-2xl mx-auto sm:py-6">
        <div className="relative p-6 rounded-lg bg-white shadow">
            <button onClick={()=>setShowEdit(false)} className="absolute top-6 right-5 text-xl">
              <X className="size-7 transition hover:scale-110 cursor-pointer"/>
            </button>
            <h1 className="mb-6 text-2xl font-bold text-gray-900">Edit Profile</h1>
            <form className="space-y-4" onSubmit={handleSaveProfile}>
              <div className="flex flex-col items-start gap-3">
                {[["Profile Picture", "profile_picture", 'size-24', 'rounded-full'], ["Cover Photo", "cover_photo", 'w-80 h-40', 'rounded-lg']].map((item, i) => 
                    <label htmlFor={`${item[1]}`} key={i} className="text-sm font-medium text-gray-700">
                        {item[0]}
                        <input hidden type="file" accept="image/*" id={`${item[1]}`}
                            onChange={e=>setEditForm({...editForm, [item[1]]:e.target.files[0]})}
                        />
                        <div className="group relative">
                            <img src={editForm[item[1]] ? URL.createObjectURL(editForm[item[1]]) : currentUser[item[1]]} alt="" className={`${item[2]} ${item[3]} mt-2 object-cover bg-linear-to-r from-indigo-200 via-purple-200 to-pink-200`}/>
                            <div className={`absolute inset-0 hidden group-hover:flex items-center justify-center bg-black/20 ${item[3]}`}>
                              <Pencil className="size-5 text-white"/>
                            </div>
                        </div>
                    </label>
                    )
                }
              </div>
              {
                [['Name', 'your name', 'full_name'], ['Username', 'your username', 'username'], ['Bio', 'a short bio', 'bio'], ['Location','your location', 'location']].map((item, i)=> 
                  <div key={i}>
                    <label htmlFor={`${item[0]}`}  className="block mb-1 text-sm font-medium text-gray-700"> {item[0]} </label>
                    <input type="text" id={`${item[0]}`} className="w-full p-3 border border-gray-300 outline-indigo-500 rounded-lg" 
                      placeholder={`Please enter ${item[1]}...`}
                      onChange={e=> setEditForm({...editForm, [item[2]]: e.target.value})}
                      value={editForm[item[2]]}
                    />
                  </div>
                )
              }
              <div className="flex justify-end space-x-3 pt-6">
                <button onClick={()=> setShowEdit(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg text-white bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 cursor-pointer">Save Changes</button>
              </div>                
            </form>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
