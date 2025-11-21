import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { startLoading, stopLoading } from '../redux/features/loading/loadingSlice'

const customAxios = axios.create({
    baseURL: import.meta.env.VITE_API_BASEURL
})

const useAxiosInterceptor = (dispatch) => {    //inject token, dispatch loading in interceptors
    const {getToken} = useAuth()
    useEffect(()=> {
        const reqInterceptor = customAxios.interceptors.request.use( async(config)=> {
            dispatch(startLoading())
            const token = await getToken()
            if(token) config.headers.Authorization = `Bearer ${token}`
            return config
        })
        const resInterceptor = customAxios.interceptors.response.use( async(res)=> {
            dispatch(stopLoading())
            return res
        })
        return ()=> {
            customAxios.interceptors.request.eject(reqInterceptor)
            customAxios.interceptors.request.eject(resInterceptor)
        }
    }, [dispatch, getToken])

    return customAxios
}

export {
    customAxios,
    useAxiosInterceptor
} 