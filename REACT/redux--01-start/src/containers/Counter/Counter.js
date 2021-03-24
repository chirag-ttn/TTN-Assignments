import React, { Component } from 'react';
import * as actions from '../../store/reducer/actions'
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import {connect} from 'react-redux'
// console.log(1);
class Counter extends Component {
    
    
    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
        }
    }
    
    render () {
        return (
            <div>
            <div>
                {console.log('props',this.props)}
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={()=>this.props.onIncrementCounter()}/>
                <CounterControl label="Decrement" clicked={() => this.props.onDecrementCounter()}  />
                <CounterControl label="Add 5" clicked={() => this.props.onAddFive()}  />
                <CounterControl label="Subtract 5" clicked={() => this.props.onSubFive()}  />
                
            </div>
            <button onClick = {()=>this.props.onStoreResults(this.props.ctr)}>Store Results</button>
            <ul>
                {this.props.res.map(result=>{
 
                    return(<li key={result.id} onClick={()=>this.props.onClickResult(result.id)}>{result.ctr}</li>)
                })}
            </ul>
        
            </div>
        );
    }
}
const mapStateToProps = state =>{
    
    return{
        
        ctr: state.ctr.counter,
        res: state.res.results

    }
}
const mapDispatchToProps = dispatch =>{
    
   return({
       onIncrementCounter: ()=>dispatch({type:actions.INCREMENT}),
       onDecrementCounter: ()=>dispatch({type:actions.DECREMENT}),
       onAddFive:          ()=>dispatch({type:actions.ADDFIVE,val:5}),
       onSubFive:          ()=>dispatch({type:actions.SUBFIVE,val:5}),
       onStoreResults:     (result)=>dispatch({type:actions.STORE_RESULT,result:result}),
       onClickResult:      (id)=>dispatch({type:actions.DELETE_RESULT,val:id})
        
   }) 
}
export default connect(mapStateToProps,mapDispatchToProps)(Counter);