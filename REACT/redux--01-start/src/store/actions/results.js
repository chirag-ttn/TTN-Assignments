import * as actionTypes from './actionTypes'
const saveResult = (result)=>{
    return {
        type:actionTypes.STORE_RESULT,
        result:result
    }
}
export const storeResult = (result) =>{
    // thunk provides us the functionality to return a function rather than an action, -> this is not a pure function so we can run side-effects
    // In this function it gives the ability to dispatch the actions 
    // setTimeout is used to fake an api call
    return dispatch=>{
        setTimeout(()=>{
                dispatch(saveResult(result))
            },2000)
    }
}
export const deleteResult = (id) =>{
    return {
        type:actionTypes.DELETE_RESULT,
        id:id
    }
}