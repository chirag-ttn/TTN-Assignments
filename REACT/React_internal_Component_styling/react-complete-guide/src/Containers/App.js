// states in classBased Components

import React, { Component } from 'react';
import Cockpit from '../Components/Cockpit/Cockpit'
import styles from './App.module.css';
import Person from '../Components/Persons/Person/Person'
import Persons from '../Components/Persons/Persons'

// import styled from 'styled-components'
// import Radium ,{StyleRoot}from 'radium'

class App extends Component {
  // state property only works with classes that extends Component not with functions
  constructor(props){
      super(props)//its important to call super to initialise component correctly
      console.log("App.js constructor")
     this.state = {
      persons : [
        {name:"chirag",age:"22"},
        {name:"saksham",age:"19"},
        {name:"Taruna",age:"22"}
      ],
      showPersons:false
     }
  }
  static getDerivedStateFromProps(props,state)
  {
    console.log('App.js getDerivedStateFromProps',props)
    return state;
  }
  componentDidMount(){
    console.log('App.js componentDidmount')
  }
  shouldComponentUpdate(nextProps,nextState)
  {
    console.log('App.js shouldComponentUpdate')
    return true;
  }
  componentDidUpdate(prevProps,prevState){
    console.log('App.js ComponentDidUpdate')
  }
  // state = {
    
  // }
  // Its a good practice to name handler at the end of functions that are event based
  // switchNameHandler = (newName)=>{


  //   // console.log('WasClicked');
  //   this.setState({
  //     persons : [
  //       {name:newName,age:"22"},
  //       {name:"saksham",age:"19"},
  //       {name:"Taruna",age:"23"}
  //     ]
  //   })
  // }
  nameChangeHandler = (event,index)=>{
      const person = this.state.persons[index]
      person.name = event.target.value;
      const persons = [...this.state.persons]
      persons[index] = person
      this.setState({persons:persons})
  }  
  deletePersonHandler = (personIndex)=>{
    const persons = [...this.state.persons];
    persons.splice(personIndex,1)
    this.setState({persons:persons})
  }
  togglePersonsHandler = ()=>{
    const doesShow = this.state.showPersons;
    this.setState({showPersons:!doesShow  })
  }
  render() {
    console.log('App.js render')
    // const style = {
    //   backgroundColor:'green',
    //   border:"1px solid black",
    //   padding:"8px",
    //   cursor:"pointer",
    //   ':hover':{
    //     backgroundColor:"lightgreen",
    //     color:"white"
    //   }
    // }
    let persons = null;
    // const classes = []
    // if(this.state.persons.length<=2)
    // {
    //   classes.push('red');
    // }
    // if(this.state.persons.length<=1)
    // {
    //   classes.push('bold')
    // }
    if(this.state.showPersons)
    {
      persons = (
        <div>
          <Persons persons={this.state.persons}
          clicked = {this.deletePersonHandler}
          changed = {this.nameChangeHandler} />
        </div>
      )
      
    }
    return (
      
      
        <div className={styles.App}>
        
        <Cockpit persons={this.state.persons}
                 showPersons ={this.state.showPersons}
                 clicked = {this.togglePersonsHandler}
        />
        {persons}
      </div>
      
    );
    // return React.createElement('div',{className:'App'},React.createElement('h1',null,"This works"));
  }
}

export default App;

// States in Function based components

// import React, { useState } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import Person from './Person/Person'
// const app = ()=> {
//   // state property only works with classes that extends Component not with functions
//   const [personState,setPersonState] = useState({
//     persons : [
//       {name:"chirag",age:"22"},
//       {name:"saksham",age:"19"},
//       {name:"Taruna",age:"22"}
//     ]
//   })
//   // Its a good practice to name handler at the end of functions that are event based
//   const switchNameHandler = ()=>{


    
//     setPersonState({
//       persons : [
//         {name:"chirag gandhi",age:"22"},
//         {name:"saksham",age:"19"},
//         {name:"Taruna",age:"23"}
//       ] 
//     })
//     // This will overwrite and not merge
//   }
  
//     return (
//       <div className="App">
//         <h1>Hi I am react app</h1>
//         <button onClick = {switchNameHandler}>SwitchName</button>
//         <Person name = {personState.persons[0].name} age={personState.persons[0].age}/>
//         <Person name = {personState.persons[1].name} age={personState.persons[1].age}/>
//         <Person name = {personState.persons[2].name} age={personState.persons[2].age}/>
        
//       </div>
//     );
//     // return React.createElement('div',{className:'App'},React.createElement('h1',null,"This works"));
//   }


// export default app;
