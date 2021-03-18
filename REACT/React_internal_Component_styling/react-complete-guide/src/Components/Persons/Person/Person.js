import React,{Component} from 'react';
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
    
class Person extends Component{
    
    // const styles = {
    //     '@media (min-width:500px)':{
    //         width:"450px",
    //         backgroundColor:"red"
    //     }
    // };
    render(){
        console.log("person.js rendering..")

        return(
            <StyledDiv>
    
            
                <p onClick = {this.props.delete}>I'm {this.props.name} and I am {this.props.age} years old</p>
                <p>{this.props.children}</p>
                <input type = "text" onChange = {this.props.changed}/>
            
            </StyledDiv>
            
        )
    }
}

export default Person;