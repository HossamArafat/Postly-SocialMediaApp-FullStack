
import {configureStore} from '@reduxjs/toolkit'
import userReducer from './features/users/userSlice'
import postReducer from './features/posts/postSlice'
import storyReducer from './features/stories/storySlice'
import messageReducer from './features/messages/messageSlice'
import loadingReducer from './features/loading/loadingSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        post: postReducer,
        story: storyReducer,
        message: messageReducer,
        loading: loadingReducer,
    }
})

export default store