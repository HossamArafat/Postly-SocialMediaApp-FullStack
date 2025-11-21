import { createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import api from '../../../api/api'


const fetchFeeds = createAsyncThunk(
    'post/feeds',
    async()=> {
        const { data } = await api.fetchFeeds()
        if(data.success) {
            return data.feeds
        }else {
            toast.error(data.message)
            return 'failed'
        }
    }
)

export {
    fetchFeeds,
}