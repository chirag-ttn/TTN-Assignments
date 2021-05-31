import axios from 'axios'
// import { post } from '../../../server/routes/user/user-routes'

const api = axios.create({
    baseURL:'http://localhost:5555/api'
})

export const login = (data)=>{
    console.log(data)
    return api({
        method:'post',
        url:'/login',
        data:data
    })
}
export const signUp = (data)=>api({
    method:'post',
    url:'/signup',
    data: data
})


export const logout = ()=>api({
    method:'get',
    url:'/logout',
    
})

