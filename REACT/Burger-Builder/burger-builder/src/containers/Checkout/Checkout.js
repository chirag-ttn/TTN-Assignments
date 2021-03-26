import React,{ Component } from "react";
import Burger from '../../'
import ContactData from './ContactData/ContactData'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {Redirect, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'

class Checkout extends Component{
   
    
    onCheckoutCancelled = ()=>{
        this.props.history.goBack();
    }
    onCheckoutContinued = ()=>{
        
        this.props.history.replace('/checkout/contact-data')
    }
    render(){
        let summary = <Redirect to='/' />
        if(this.props.ingredients)
        {
            const purchasedRedirect = this.props.purchased?<Redirect to='/'/>:null
            summary = (<div>
            {purchasedRedirect}
            {/* purchasestart - purchased->false */}
            {/* purchaseSuccess-purchased ->true page will be redirected*/}
            {/* again clicking continue it will remount the page */}
            <CheckoutSummary ingredients = {this.props.ingredients} 
            onCheckoutCancelled={this.onCheckoutCancelled}
            onCheckoutContinued={this.onCheckoutContinued}/>
            <Route path = {this.props.match.path+'/contact-data'} 
            render={(props)=>(<ContactData 
            ingredients={this.props.ingredients} 
            totalPrice = {this.props.totalPrice} 
            {...props}/>)}/>
            </div>)
        }
        return summary
    }
}
const mapStateToProps = state =>{
    return{
        ingredients:state.burgerBuilder.ingredients,
        purchased:state.order.purchased
    }
}
export default connect(mapStateToProps)(Checkout);