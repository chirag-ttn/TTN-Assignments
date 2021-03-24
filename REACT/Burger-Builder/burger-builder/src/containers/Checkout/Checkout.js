import React,{ Component } from "react";
import Burger from '../../'
import ContactData from './ContactData/ContactData'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {Route} from 'react-router-dom'

class Checkout extends Component{
    state  = {
        ingredients:{
            salad:1,
            meat:1,
            cheese:1,
            bacon:1
        },
        totalPrice:0
    }
    componentWillMount(){
        const ingredients = {}
        const query = new URLSearchParams(this.props.location.search);
        // ingredients={}
        let price = 0
        
        
        for(let params of query.entries()){
            if(params[0]==='price')
            {
                 price = params[1];
            }
            else
            {
                ingredients[params[0]] = +      params[1]
            }
        }
        this.setState({ingredients:ingredients,totalPrice:price})
    }
    onCheckoutCancelled = ()=>{
        this.props.history.goBack();
    }
    onCheckoutContinued = ()=>{
        console.log(this.props)
        this.props.history.replace('/checkout/contact-data')
    }
    render(){
        return(
            <div>
                <CheckoutSummary ingredients = {this.state.ingredients} 
                onCheckoutCancelled={this.onCheckoutCancelled}
                onCheckoutContinued={this.onCheckoutContinued}/>
                <Route path = {this.props.match.path+'/contact-data'} render={(props)=>(<ContactData ingredients={this.state.ingredients} totalPrice = {this.state.totalPrice} {...props}/>)}/>
            </div>
        )
    }
}

export default Checkout;