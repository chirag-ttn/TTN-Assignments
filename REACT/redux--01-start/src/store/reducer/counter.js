import * as actions from './actions'
const initialState = {
    counter:0,
    results:[]
}

const reducer = (state = initialState, action)=>{
    
    switch(action.type){
        case(actions.INCREMENT):{
            return{
                ...state,
                counter:state.counter+1
            }
        }
        case(actions.DECREMENT):{
            return{
                ...state,
                counter:state.counter-1
            }
        }
        case(actions.ADDFIVE):{
            return{
                ...state,
                counter:state.counter+action.val
            }
        }
        case(actions.SUBFIVE):{
            return{
                ...state,
                counter:state.counter-action.val
            }   
        }
    
    }    
    
    return state;
}
export default reducer;