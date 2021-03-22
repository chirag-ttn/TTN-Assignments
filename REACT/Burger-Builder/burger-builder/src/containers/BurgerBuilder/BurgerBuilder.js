import { Component } from "react";
import axios from '../../axios-orders'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/UI/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
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
        ingredients:null,
        totalPrice:4,
        purchasable:false,
        purchasing:false,
        loading:false
    }
    componentDidMount(){
        axios.get('ingredients.json')
        .then(response=>{
            console.log(response.data)
            this.setState({
                ingredients:response.data
            })
        })
        .catch(err=>err)
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
        this.setState({purchasing:true})
    }
    purchaseCancelledHandler=()=>{
        this.setState({
            purchasing:false
        })
    }
    purchaseContinuedHandler = ()=>{
        
        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push("price="+this.state.totalPrice)
        const queryStrings = queryParams.join('&')
        this.props.history.push({
            pathname: '/checkout',
            search:'?'+queryStrings
        })
    }
    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo)
        {
            disabledInfo[key] = disabledInfo[key]<=0
        }
        let orderSummary = <OrderSummary ingredients={this.state.ingredients}
        cancelled = {this.purchaseCancelledHandler}
        continued = {this.purchaseContinuedHandler}
        price = {this.state.totalPrice.toFixed(2)}
        />

        if(this.state.loading || !this.state.ingredients)
        {
            orderSummary = <Spinner />
        }
        let burger = <div><Burger ingredients={this.state.ingredients}/></div>
        if(!this.state.ingredients)
        {
            burger = <Spinner />
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelledHandler}>
                    {orderSummary}
                </Modal>
                {burger}
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
export default withErrorHandler(BurgerBuilder,axios);