import React,{ Component } from "react";
import Burger from '../../'
import ContactData from './ContactData/ContactData'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {Redirect, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'

const Checkout = props=>{
   
    
    const onCheckoutCancelled = ()=>{
        props.history.goBack();
    }
    const onCheckoutContinued = ()=>{
        
        props.history.replace('/checkout/contact-data')
    }
    
        let summary = <Redirect to='/' />
        if(props.ingredients)
        {
            const purchasedRedirect = props.purchased?<Redirect to='/'/>:null
            summary = (<div>
            {purchasedRedirect}
            {/* purchasestart - purchased->false */}
            {/* purchaseSuccess-purchased ->true page will be redirected*/}
            {/* again clicking continue it will remount the page */}
            <CheckoutSummary ingredients = {props.ingredients} 
            onCheckoutCancelled={onCheckoutCancelled}
            onCheckoutContinued={onCheckoutContinued}/>
            <Route path = {props.match.path+'/contact-data'} 
            render={(props)=>(<ContactData 
            ingredients={props.ingredients} 
            totalPrice = {props.totalPrice} 
            {...props}/>)}/>
            </div>)
        }
        return summary
    }

const mapStateToProps = state =>{
    return{
        ingredients:state.burgerBuilder.ingredients,
        purchased:state.order.purchased
    }
}
export default connect(mapStateToProps)(Checkout);