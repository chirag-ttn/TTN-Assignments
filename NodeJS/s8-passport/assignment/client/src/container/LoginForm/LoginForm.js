import React, { useEffect, useState } from 'react'
import Welcome from '../../components/Result/welcome'
import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route,
    Redirect
} from 'react-router-dom'
import TextInput from '../../components/TextInput/TextInput'
import Button from '../../components/Button/Button'
import './style.css'

import { login, signUp } from '../../api/api'
const LoginForm = () => {
    const [userData, setUserData] = useState({
        username: '',
        password: ''
    })
    const [loggedIn,setLoggedIn] = useState(false)
    const handleChange = (event) => {
        const { target: { name, value } } = event;

        setUserData({ ...userData, [name]: value })
    }
    const handleLogin = () => {
        
        
        login(userData).then((data) => {
            console.log('login',data)
            setLoggedIn(true)
        }).catch(err => {
            console.log(err)
        })
    }
    const handleSignup = () => {
        const { username, password } = userData;
        signUp({ username, password }).then((data) => {
            console.log("Success Signup", data)
            
            
        })
            .catch((err) => {
                console.log("err",err)
                
            })
    }
    useEffect(()=>{
        handleLogin();
        handleSignup();
    },[])
    const Form = ()=>{
        return(<div className="parent-div">
        <div className="Form-container">
    
            <div className="heading">Login Form</div>
            <br />
            <div>
                <TextInput
                    name="username"
                    placeholder="username"
                    value={userData.username}
                    handleChange={handleChange}
                />
                <TextInput
                    name="password"
                    placeholder="password"
                    value={userData.password}
                    handleChange={handleChange}
                />
            </div>
    
            <Link className="button" to='/api/login'>
                <Button handler={handleLogin}>Login</Button>
            </Link>
            <Link className='button' to='/api/signup'>
                <Button handler={handleSignup}>Signup</Button>
            </Link>
            
            
        </div>
    </div>)
    }
    
   if(!loggedIn){
       return <Form />
   }
   else{
       return <Redirect to='/success-login' />
   }

   
}


export default LoginForm;

