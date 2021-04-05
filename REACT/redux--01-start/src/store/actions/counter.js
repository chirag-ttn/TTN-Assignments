import * as actionTypes from './actionTypes'
export const increment = () =>{
    return {
        type:actionTypes.INCREMENT
    }
}
export const decrement = () =>{
    return {
        type:actionTypes.DECREMENT
    }
}
export const addFive = (val) =>{
    return {
        type:actionTypes.ADDFIVE,
        val:val
    }
}
export const subFive = (val) =>{
    return {
        type:actionTypes.SUBFIVE,
        val:val
    }
}