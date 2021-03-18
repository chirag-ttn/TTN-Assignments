import React from "react";

const fruit = (props)=>{
    return(
        <tr>
            <td>{props.name}</td>
            <td>{props.price}</td>
            <td onClick={props.delete}><button>X</button></td>
        </tr>
    
    
    )
}

export default fruit;