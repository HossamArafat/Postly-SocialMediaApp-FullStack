import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { startLoading, stopLoading } from '../redux/features/loading/loadingSlice'
import { useDispatch } from 'react-redux'

const customAxios = axios.create({
    baseURL: import.meta.env.VITE_API_BASEURL
})

const useAxiosInterceptor = () => {    //injecting token, dispatch loading in interceptors, re-rendering app component reaching mounting component each getToken cycle
    const {getToken} = useAuth()
    const dispatch = useDispatch()
    
    useEffect(()=> {
        const reqInterceptor = customAxios.interceptors.request.use( async(config)=> {
            config.method == 'get' && dispatch(startLoading())
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