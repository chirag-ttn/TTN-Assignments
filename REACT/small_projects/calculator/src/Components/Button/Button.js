import React from 'react'
import classes from './Button.module.css'
class Button extends React.Component{
    handleClick = () =>{
        this.props.clickHandler(this.props.text)
    }
    render(){
        
        const all_classes = [classes.button]    
        if(this.props.corner)
        {
            all_classes.push(classes.buttonColor)
        }
        if(this.props.equal)
        {
            all_classes.push(classes.equalButton)
        }
        
        return(
            
            <button onClick={this.handleClick} className={all_classes.join(' ')}>{this.props.text}</button>
        )
    }
}
export default Button;