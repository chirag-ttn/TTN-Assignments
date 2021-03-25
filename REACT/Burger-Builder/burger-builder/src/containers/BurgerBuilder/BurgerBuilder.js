import { Component } from "react";
import axios from '../../axios-orders'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/UI/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux'
import * as actionType from '../../store/actions'
// Create a mapping of prices vs ingredients


class BurgerBuilder extends Component{
    constructor(props){
        super(props)

        
    }
    state = {
        
        totalPrice:10,
        purchasing:false,
        loading:false
    }
    componentDidMount(){
        axios.get('ingredients.json')
        .then(response=>{
            
            this.setState({
                ingredients:response.data
            })
        })
        .catch(err=>err)
    }
    updatePurchase = (ingredients)=>{
        console.log('ings',ingredients)
        const sum = Object.keys(ingredients)
        .map(igKey=>{
            return ingredients[igKey]
        })
        .reduce((sum,el)=>{
            return sum+el;
        },0)
        return sum>0

    }
    addIngredientHandler=(type)=>{
        
        const oldCount = this.props.ings[type];
        const updatedCount = oldCount+1;
        const updatedIngredients = {
            ...this.props.ings
        }
        updatedIngredients[type] = updatedCount;
        // const priceAddition  = INGREDIENT_PRICES[type]
        // const oldPrice = this.props.tp;
        // const newPrice = oldPrice + priceAddition;
        // this.setState({
        //     totalPrice:newPrice,
        //     ingredients:updatedIngredients
        // })
        this.updatePurchase(updatedIngredients)
        

    }
    deleteIngredientHandler=(type)=>{
        const oldCount = this.props.ings[type];
        let updatedCount = oldCount-1;
        if(updatedCount<0) {
            updatedCount=0;
        }
        const updatedIngredients = {
            ...this.props.ings
        }
        updatedIngredients[type] = updatedCount;
        // const priceDeduction  = INGREDIENT_PRICES[type]
        const oldPrice = this.props.tp;
        // const newPrice = oldPrice - priceDeduction;
        // this.setState({
        //     totalPrice:newPrice,
        //     ingredients:updatedIngredients
        // })
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
        for(let i in this.props.ings){
            queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.props.ings[i]))
        }
        queryParams.push("price="+this.props.tp)
        const queryStrings = queryParams.join('&')
        this.props.history.push({
            pathname: '/checkout',
            search:'?'+queryStrings
        })
    }
    render(){
        const disabledInfo = {
            ...this.props.ings
        }
        for(let key in disabledInfo)
        {
            disabledInfo[key] = disabledInfo[key]<=0
        }
        let orderSummary = <OrderSummary ingredients={this.props.ings}
        cancelled = {this.purchaseCancelledHandler}
        continued = {this.purchaseContinuedHandler}
        price = {this.props.tp}
        />

        if(this.state.loading || !this.props.ings)
        {
            orderSummary = <Spinner />
        }
        
        let burger = <div><Burger ingredients={this.props.ings}/></div>
        if(!this.props.ings)
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
                ingredientAdded = {this.props.onIngredientAdded}
                ingredientRemoves = {this.props.onIngredientRemoved}
                disabledInfo = {disabledInfo}
                price = {this.props.tp}
                purchasable = {this.updatePurchase(this.props.ings)}
                ordered = {this.updatePurchasing}
                
                />
                </div>
            </Aux>
        );
    }
}
const mapStateToProps = state =>{
    return{
        ings: state.ingredients,
        tp: state.totalPrice
    }
}
const mapDispatchToProps = dispatch=>{
    return{
        onIngredientAdded:(ingName)=> dispatch({type:actionType.ADD_INGREDIENT, ingredientName:ingName}),
        onIngredientRemoved:(ingName)=> dispatch({type:actionType.REMOVE_INGREDIENT, ingredientName:ingName})
        
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));