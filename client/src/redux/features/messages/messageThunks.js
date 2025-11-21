import { createAsyncThunk } from '@reduxjs/toolkit'
// import toast from 'react-hot-toast'
import api from '../../../api/api'

// const successToast = (data) => 
//     data.success ? toast.success(data.message) : toast.error(data.message)

// Thunks
const createSSEstream = createAsyncThunk(
    'message/data',
    async()=> {
        const res = api.createSSEstream()
        console.log(res)
    }
)

const sendMessage = createAsyncThunk(
    'message/send',
    async(to_user)=> {
        const  res = api.sendMessage(to_user)
        console.log(res)
    }
)

const receiveMessage = createAsyncThunk(
    'message/receive',
    async(from_user)=> {
        const  res = api.receiveMessage(from_user)
        console.log(res)
    }
)

const fetchRecentMessages = createAsyncThunk(
    'message/recent-message',
    async()=> {
        const  res = api.fetchRecentMessage()
        console.log(res)
    }
)


export {
    createSSEstream,
    sendMessage,
    receiveMessage,
    fetchRecentMessages
}