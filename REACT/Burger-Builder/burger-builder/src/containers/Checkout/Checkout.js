import React,{ Component } from "react";
import Burger from '../../'
import ContactData from './ContactData/ContactData'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'

class Checkout extends Component{
   
    onCheckoutCancelled = ()=>{
        this.props.history.goBack();
    }
    onCheckoutContinued = ()=>{
        
        this.props.history.replace('/checkout/contact-data')
    }
    render(){
        return(
            <div>
                <CheckoutSummary ingredients = {this.props.ingredients} 
                onCheckoutCancelled={this.onCheckoutCancelled}
                onCheckoutContinued={this.onCheckoutContinued}/>
                <Route path = {this.props.match.path+'/contact-data'} render={(props)=>(<ContactData ingredients={this.props.ingredients} totalPrice = {this.props.totalPrice} {...props}/>)}/>
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return{
        ingredients:state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);