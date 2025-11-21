import { createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import api from '../../../api/api'


const fetchStories = createAsyncThunk(
    'story/data',
    async()=> {
        const {data} = await api.fetchStories()
        if(data.success) {
            return data.stories
        }else {
            toast.error(data.message)
            return 'failed'
        }
    }
)

export {
    fetchStories,
}