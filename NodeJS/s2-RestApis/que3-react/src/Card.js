import React from 'react'
import ReactDOM from 'react-dom';
const callApi = (event)=>{
    console.log('clicked',event)
}
function Card(props){
    return(
        <div style={{height:'100px',width:'30%',border:'1px solid black'}}>
            <button onClick={(event)=>callApi(event)}>{props.value}</button>
        </div>
    )
}

export default Card;