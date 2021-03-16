import React,{Component} from 'react'
import Person from './Person/Person'

class Persons extends Component
    {
        // static getDerivedStateFromProps(props,state){
        //     console.log('Persons.js getDerivedStateFromProps')
        //     return state;

        // }
        shouldComponentUpdate(nextProps,nextState){
            console.log('Persons.js shouldComponentUpdate')
            if(nextProps.persons!== this.props.persons)
            {
                return true;
            }
            else
            {
                return false;
            }
            
        }
        getSnapshotBeforeUpdate(prevProps,prevState)
        {
            console.log('Persons.js getSnapshotsBeforeUpdate')
            return {message:'Snapshot'}
        }
        // componentWillReceiveProps(props)
        // {
        //     console.log('Deprecated')
        // }
        componentDidUpdate(prevProps,prevState,snapshot){
            console.log('Persons.js componentDidUpdate')
            console.log(snapshot )
        } 
        render(){

            console.log("Persons.js rendering...")
            return this.props.persons.map((person,index)=>{
            return (
                <Person 
                key={index} 
                name = {person.name} 
                age = {person.age} 
                delete={()=> this.props.clicked(index)}
                changed = {(event)=>{this.props.changed(event,index)}}
                />   
            )
          })
        }
    }
  export default Persons;