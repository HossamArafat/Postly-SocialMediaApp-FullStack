
import { Search } from "lucide-react"

const SearchBar = ({keyword, setKeyword, handleSearch}) => {
  return (
    <div className="mb-8 border border-slate-200/60 rounded-md bg-white/80 shadow-md">
        <div className="p-6">
            <div className="relative">
                <Search onClick={handleSearch} className="size-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 active:scale-120 cursor-pointer"/>
                <input type="text" 
                placeholder="Search people by name, username, bio, or location..."
                className="pl-10 py-2 w-full border-2 border-gray-200 outline-indigo-500 rounded-md sm:pl-12 max-sm:text-sm"
                onChange={(e)=> setKeyword(e.target.value)}
                value={keyword}
                onKeyUp={(e)=> e.key == "Enter" && handleSearch()}
                />
            </div>
        </div>
    </div>
  )
}

export default SearchBar
