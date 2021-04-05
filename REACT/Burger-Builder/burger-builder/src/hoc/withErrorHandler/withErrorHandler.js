import React, { Component, useEffect, useState } from 'react'
import Aux from '../Aux/Aux'
import Modal from '../../components/UI/Modal/Modal'
const withErrorHandler = (WrappingComponent,axios)=>{
    return props => {
        const [error,setError] = useState(null)
        
            const reqInterceptor = axios.interceptors.request.use(req=>{
                setError(null)
                return req;
                
            })
            const resInterceptor = axios.interceptors.response.use(res=> res,err=>{
            setError(err)                
            })
        
        useEffect(()=>{
            return()=>{
                axios.interceptors.request.eject(reqInterceptor)
                axios.interceptors.request.eject(resInterceptor)
            }
        },[reqInterceptor,resInterceptor])
        
        const errorConfirmedHandler=()=>{
            setError(null)
        }
        

            
                
                return (
                <Aux>
                <Modal show={error}
                modalClosed={errorConfirmedHandler}>
                {error?error.message:null}</Modal>
                <WrappingComponent {...props}/>
                </Aux>
                )
            
        }
            
    }
    
    


export default withErrorHandler;