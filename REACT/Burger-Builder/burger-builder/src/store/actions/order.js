import * as actionTypes from '../actions/actionTypes'
import axios from '../../axios-orders'
export const purchaseBurgerSuccess = (id,orderData)=>{
     return{
          type:actionTypes.PURCHASE_BURGER_SUCCESS,
          orderId:id,
          orderData:orderData
     }
}
export const purchaseBurgerFail = (error)=>{
    return{
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    }
}
export const purchaseBurgerStart = ()=>{
    return{
        type:actionTypes.PURCHASE_BURGER_START
    }
}
// ASYNC FUNCTIONS
export const purchaseBurger = (orderData)=>{
    return dispatch =>{
        axios.post('/orders.json',orderData)
        .then(response=>{
            console.log(response.data)
            dispatch(purchaseBurgerSuccess(response.data,orderData))
        })
        .catch(err=>{
            dispatch(purchaseBurgerFail(err))
        })
    }
}
export const purchaseInit = ()=>{
    return{
        type:actionTypes.PURCHASE_INIT
    }
}
export const fetchOrdersSuccess = (orders)=>{
    return{
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        orders:orders
    }
}
export const fetchOrdersFail = (error)=>{
    return{
        type:actionTypes.FETCH_ORDERS_FAIL,
        error:error
    }
}
export const fetchOrdersStart = (orders)=>{
    return{
        type:actionTypes.FETCH_ORDERS_START,
        
    }
}

// ASYNC */

export const fetchOrders = ()=>{
    return dispatch =>{
        dispatch(fetchOrdersStart())
        axios.get('/orders.json')
        .then(res=>{
            
            const fetchedOrders=[]
            for(let key in res.data){
                fetchedOrders.push(
                    {
                        ...res.data[key],
                        id:key
                    })

                }
            dispatch(fetchOrdersSuccess(fetchedOrders))
        }).catch(
            err=>{
                dispatch(fetchOrdersFail(err))
            }
        )
    }
}