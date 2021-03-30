import * as actionTypes from './actionTypes'
import axios from 'axios'
export const authStart = ()=>{
    return{
        type:actionTypes.AUTH_START
    }
}
export const authRedirectPath = (path)=>{
    return{
        type:actionTypes.AUTH_REDIRECT_PATH,
        path:path
    }
}
export const authSuccess = (token, userId)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        token:token,
        userId:userId
    }
}

export const authFail = (error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}
export const logout = ()=>{
            localStorage.removeItem('token')
            localStorage.removeItem('expirationDate')
            localStorage.removeItem('userId')
    return{
        type:actionTypes.AUTH_LOGOUT
    }
}
// ASYNC
export const authLogout = (expirationTime)=>{
    
    return dispatch=>{
        setTimeout(()=>{
            localStorage.removeItem('token')
            localStorage.removeItem('expirationDate')
            localStorage.removeItem('userId')
            dispatch(logout())
        },expirationTime*1000)
    }
}
export const auth = (email, password, isSignUp)=>{
    return dispatch =>{
        const authdata = {
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBTlwS0RaUnFnr3zWSZnQ6keIAHWdEv1hU'
        
        if(isSignUp)
        {
            // user is signed up make him sign in
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBTlwS0RaUnFnr3zWSZnQ6keIAHWdEv1hU'

        }
        dispatch(authStart())
        axios.post(url,authdata)
        .then(response=>{
            console.log(response)
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
            
            localStorage.setItem('token',response.data.idToken)
            localStorage.setItem('expirationDate',expirationDate)
            localStorage.setItem('userId',response.data.localId)
            
            dispatch(authLogout(response.data.expiresIn))
            dispatch(authSuccess(response.data.idToken,response.data.localId))
        })
        .catch(err=>{
            console.log(err)
            dispatch(authFail(err.response.data.error))
        })
    }
}

export const authCheckState = ()=>{
    return dispatch=>{
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')
        if(!token){
            dispatch(authLogout())
        }
        else
        {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if(new Date()>expirationDate)
            {
               dispatch(authLogout())
            }
            else{
               dispatch(authSuccess(token,userId))
               dispatch(authLogout(-new Date().getSeconds()+expirationDate.getSeconds()))
            }

        }
    }
}