import { createContext, useState } from "react";

const Post = createContext()
function PostProvider({children}) {
    const [showCreate, setShowCreate] = useState(false)

    return <Post.Provider value={{showCreate, setShowCreate}}>{children}</Post.Provider>
}

export {
    Post,
    PostProvider
}
