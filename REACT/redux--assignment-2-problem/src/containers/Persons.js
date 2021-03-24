import React, { Component } from 'react';

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';
import {connect} from 'react-redux'

class Persons extends Component {
    
    
    render () {
        
        return (
            <div>
                {console.log('props',this.props.abc)}
                <AddPerson personAdded={this.props.personAddedHandler} />
                {this.props.prs.map(person => (
                    <Person 
                        key={person.id}
                        name={person.name} 
                        age={person.age} 
                        clicked={() => this.props.personDeletedHandler(person.id)}/>
                ))}
            </div>
        );
        
    }
    
}
const mapStateToProps = (state) =>{

    // Not works in this config
    //
    // return
    // {
    //     prs:state.persons
    // }
    return{
        prs:state.persons
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        personAddedHandler: ()=>dispatch({type:"ADDPERSON"}),
        personDeletedHandler:(id)=>dispatch({type:"DELPERSON",personId:id})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Persons);