import React,{Component, useEffect} from 'react'
import './style.css'

const Button = (props)=>{
    
    return(
        <button onClick={props.handler} className="button">{props.children}</button>
    )
}

export default Button