import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../../api/api'

const fetchChatMessages = createAsyncThunk(
    'message/chat',
    async(from_user)=> {
        const  {data} = await api.fetchChatMessages(from_user)
        return data.success? data.messages : 'failed'
    }
)

const fetchRecentMessages = createAsyncThunk(
    'message/recent',
    async()=> {
        const  {data} = await api.fetchRecentMessages()
        return data.success? data.messages : 'failed'
    }
)

export {
    fetchChatMessages,
    fetchRecentMessages
}