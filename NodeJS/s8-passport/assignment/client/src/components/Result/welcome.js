import React from 'react'
import Button from '../Button/Button'
import {logout} from '../../api/api'
const handler =()=>{
console.log('logout')
logout().then(()=>{
    console.log('Succes logout')
})
.catch(err=>{
    console.log(err)
})
}
const Welcome = (props)=>{
    return(
        <>
        <div>You are authenticated</div>
        <Button handler = {handler}>Logout</Button>
        </>
    )
}
export default Welcome