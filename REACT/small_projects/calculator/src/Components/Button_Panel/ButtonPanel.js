import React from 'react'
import classes from './ButtonPanel.module.css'
import Button from '../Button/Button'
class ButtonPanel extends React.Component{
    handleClick = button=>{
        this.props.clickHandler(button)
        
    }
    render(){
        return(
        <div className={classes.ButtonPanel}>
            <Button text="(" clickHandler={this.handleClick} corner={true} />
            <Button text=')' clickHandler={this.handleClick} corner={true} />
            <Button text='%' clickHandler={this.handleClick} corner={true} />
            <Button text='CE' clickHandler={this.handleClick} corner={true} />
            <Button text='7' clickHandler={this.handleClick} />
            <Button text='8' clickHandler={this.handleClick} />
            <Button text='9' clickHandler={this.handleClick} />
            <Button text='/'clickHandler={this.handleClick}  corner={true} />
            <Button text='4' clickHandler={this.handleClick} />
            <Button text='5' clickHandler={this.handleClick} />
            <Button text='6' clickHandler={this.handleClick} />
            <Button text='X' clickHandler={this.handleClick} corner={true} />
            <Button text='1' clickHandler={this.handleClick} />
            <Button text='2' clickHandler={this.handleClick} />
            <Button text='3' clickHandler={this.handleClick} />
            <Button text='-'clickHandler={this.handleClick} corner={true} />
            <Button text='0'clickHandler={this.handleClick}  />
            <Button text='.'clickHandler={this.handleClick}  />
            <Button text='=' clickHandler={this.handleClick} equal={true}/>
            <Button text='+' clickHandler={this.handleClick} />
        </div>
        )
    }
}
export default ButtonPanel;