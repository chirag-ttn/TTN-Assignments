import React from 'react';
// import './Person.css'
// import Radium from 'radium'
import styled from 'styled-components'
const StyledDiv = styled.div`    
    width:60%;
    margin: auto;
    border:1px solid #eee;
    box-shadow: 0 2px 3px #ccc;
    padding: 15px;
    text-align: center;
    
    
    @media (min-width:500px){
        width:450px;
        background-color:red;
    }
    `;
    
const person = (props)=>{
    // const styles = {
    //     '@media (min-width:500px)':{
    //         width:"450px",
    //         backgroundColor:"red"
    //     }
    // };
    
    return(
        <StyledDiv>

        
            <p onClick = {props.delete}>I'm {props.name} and I am {props.age} years old</p>
            <p>{props.children}</p>
            <input type = "text" onChange = {props.changed}/>
        
        </StyledDiv>
        
    )
}

export default person;