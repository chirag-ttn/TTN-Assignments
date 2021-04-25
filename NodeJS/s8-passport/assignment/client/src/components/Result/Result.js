import React from 'react'

const Result = (props)=>{
    console.log("props",props)
    if(props.err)
    {
        return(<div>{`${props.err.response.status}-${props.err.response.statusText}`}</div>)
    }
    else if(!props.err)
    {
        if(props.auth)
        return(<div>{`You are authenticated`}</div>)
        else
        return(<div>{`User Created`}</div>)
    }
    else
    {
        return(<div>{`Login/Signup`}</div>)
    }
    
}
export default Result;