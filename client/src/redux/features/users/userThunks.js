import { createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import api from '../../../api/api'

const fetchUserData = createAsyncThunk(
    'user/data',
    async()=> {
        const { data } = await api.fetchUserData()
        if(data.success) {
            return data.user
        }else {
            toast.error(data.message)
            return null
        }
    }
)

const updateUserData = createAsyncThunk(
    'user/update',
    async(updatedData)=> {
        const { data } = await api.updateUserData(updatedData)
        if(data.success) {
            toast.success(data.message)
            return data.user           
        }else {
            toast.error(data.message)
            return null
        }
    }
)

const fetchProfile = createAsyncThunk(
    'user/profile',
    async(profileId)=> {
        const { data } = await api.fetchProfile(profileId)
        if(data.success) {
            return {profile: data.profile, posts: data.posts, likedPosts: data.likedPosts}
        }else {
            toast.error(data.message)
            return null
        }
    }
)

const fetchUsers = createAsyncThunk(
    'user/fetchUsers',
    async()=> {
        const { data } = await api.fetchUsers()
        if(data.success) {
            return data.users            
        }else {
            toast.error(data.message)
            return 'failed'
        }
    }
)
const discoverProfiles = createAsyncThunk(
    'user/discover',
    async(keyword)=> {
        const { data } = await api.discoverProfiles(keyword)
        if(data.success) {
            return data.users            
        }else {
            toast.error(data.message)
            return 'failed'
        }
    }
)

export {
    fetchUserData,
    updateUserData,
    fetchProfile,
    discoverProfiles,
    fetchUsers
}