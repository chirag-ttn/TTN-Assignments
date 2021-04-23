import React from 'react'
import './style.css'
const TextInput = ({name,value,handleChange})=>{
    return(
        <>
        <label className="label" for={name}>{name}</label>
        <br/>
        <input className="input"name={name}
        
        value={value}
        onChange={handleChange}
        />
        <br/>
        </>
    )
}

export default TextInput;