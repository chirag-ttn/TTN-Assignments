import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'
export const setIngredients = (ingredients)=>{
    return{
        
        type:actionTypes.SET_INGREDIENTS,
        ingredients:ingredients
    }
}
export const fetchIngredientsFailed = ()=>{
    return{
        type:actionTypes.FETCH_INGREDIENTS
    }
}
export const initIngredients = ()=>{
    return dispatch => {
        axios.get('ingredients.json')
        .then(response=>{
            dispatch(setIngredients(response.data))
        })
        .catch(
            err=>{
                dispatch(fetchIngredientsFailed())
            }
            )
    }
}