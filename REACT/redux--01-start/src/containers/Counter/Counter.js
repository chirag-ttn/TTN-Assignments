import React, { Component } from 'react';
import * as actionCounter from '../../store/actions/counter'
import * as actionResults from '../../store/actions/results'
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import {connect} from 'react-redux'

// console.log(1);
class Counter extends Component {
    
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
       onIncrementCounter: ()=>dispatch(actionCounter.increment()),
       onDecrementCounter: ()=>dispatch(actionCounter.decrement()),
       onAddFive:          ()=>dispatch(actionCounter.addFive(5)),
       onSubFive:          ()=>dispatch(actionCounter.subFive(5)),
       onStoreResults:     (result)=>dispatch(actionResults.storeResult(result)),
       onClickResult:      (id)=>dispatch(actionResults.deleteResult(id))
        
   }) 
}
export default connect(mapStateToProps,mapDispatchToProps)(Counter);