import React from 'react'
class Clock extends React.Component{
    constructor(){
        super()
        this.state = {
          time:new Date().toLocaleTimeString(),
          toggleOn:true
        }
        // another way to handle this
        // this.handleClick = this.handleClick.bind(this)
    }
    
    tick = ()=>{
      this.setState({time:new Date().toLocaleTimeString()})
    }
    componentDidMount(){
        // This will run when the component gets rendered
        this.timerId = setInterval(()=>{
          this.tick()
        },1000)
        
    }
    componentWillUnmount(){
      clearInterval(this.timerId)
    }
    //this is a class field syntax and not es6 arrow function and gets handled by babel
    // handleClick = ()=>{
    //    this.setState({toggleOn:!this.state.toggleOn}) 
    // }
    handleClick(){
        this.setState({toggleOn:!this.state.toggleOn})
    }
    render()
    {
        let clock = this.state.toggleOn?<h1>Clock : {this.state.time}</h1>:null
        return(
            <>
        {clock}
        <button onClick={this.handleClick.bind(this)}>toggle</button>
        </>)    }
  }
  export default Clock