import { Component } from "react";
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/UI/OrderSummary/OrderSummary'
// Create a mapping of prices vs ingredients

const INGREDIENT_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
}
class BurgerBuilder extends Component{
    constructor(props){
        super(props)

        
    }
    state = {
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice:4,
        purchasable:false,
        purchaing:false
    }
    updatePurchase = (ingredients)=>{
        
        const sum = Object.keys(ingredients)
        .map(igKey=>{
            return ingredients[igKey]
        })
        .reduce((sum,el)=>{
            return sum+el;
        },0)
        this.setState({purchasable:sum>0})

    }
    addIngredientHandler=(type)=>{
        
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount+1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceAddition  = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice:newPrice,
            ingredients:updatedIngredients
        })
        this.updatePurchase(updatedIngredients)
        // console.log(newPrice,updatedIngredients)

    }
    deleteIngredientHandler=(type)=>{
        const oldCount = this.state.ingredients[type];
        let updatedCount = oldCount-1;
        if(updatedCount<0) {
            updatedCount=0;
        }
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceDeduction  = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            totalPrice:newPrice,
            ingredients:updatedIngredients
        })
        this.updatePurchase(updatedIngredients)
    }
    updatePurchasing = ()=>{
        this.setState({purchaing:true})
    }
    purchaseCancelledHandler=()=>{
        this.setState({
            purchaing:false
        })
    }
    purchaseContinuedHandler = ()=>{
        alert("Your purchase Continued")
    }
    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo)
        {
            disabledInfo[key] = disabledInfo[key]<=0
        }
        
        return(
            <Aux>
                <Modal show={this.state.purchaing} modalClosed={this.purchaseCancelledHandler}>
                    <OrderSummary ingredients={this.state.ingredients}
                    cancelled = {this.purchaseCancelledHandler}
                    continued = {this.purchaseContinuedHandler}
                    price = {this.state.totalPrice.toFixed(2)}
                    />
                </Modal>
                <div><Burger ingredients={this.state.ingredients}/></div>
                <div><BuildControls 
                ingredientAdded = {this.addIngredientHandler}
                ingredientRemoves = {this.deleteIngredientHandler}
                disabledInfo = {disabledInfo}
                price = {this.state.totalPrice}
                purchasable = {this.state.purchasable}
                ordered = {this.updatePurchasing}
                
                />
                </div>
            </Aux>
        );
    }
}
export default BurgerBuilder;