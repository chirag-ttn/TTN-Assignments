import * as actions from '../actions/actionTypes'
const initialState = {
    results:[]
}
const reducer = (state = initialState, action)=>{
    // console.log(action)
    switch(action.type){
        
        case(actions.STORE_RESULT):{
            // console.log(action.val)?
            return{
                ...state,
                results:state.results.concat(
                    {   id:new Date(),
                        ctr:action.result
                    }
                    )
                // we use concat instead of push because push mutates the array and concat returns a new array  
            }
        }
        case(actions.DELETE_RESULT):{
            
            // console.log(state.results[0].id,action.val)
            const updatedResult = state.results.filter( result=> result.id!==action.val)
            console.log(updatedResult)
            return{
                ...state,
                results:updatedResult   
            }
        }
    }    
    
    return state;
}
export default reducer;