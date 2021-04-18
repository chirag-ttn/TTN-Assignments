import React from 'react'
import Display from '../Display/Display'
import Classes from './App.module.css'
import ButtonPanel from '../Button_Panel/ButtonPanel'
import {handleDisplayText} from '../../logic/display'
class App extends React.Component{
  state={
    text:''
  }
  handleClick = (button)=>{
    const displayText = handleDisplayText(button,this.state.text)
    this.setState({text:displayText})
  }
  render(){
    return(
      <div className={Classes.calculator_container}>
        <Display text={this.state.text}/>
        <ButtonPanel clickHandler={this.handleClick}/>
      </div>
    )
  }
}
export default App