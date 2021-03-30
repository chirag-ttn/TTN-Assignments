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
import * as burgerBuilderActions from '../../store/actions/index'
// Create a mapping of prices vs ingredients


export class BurgerBuilder extends Component{
    constructor(props){
        super(props)

        
    }
    state = {
        
        totalPrice:10,
        purchasing:false,
        loading:false,
        
    }
    componentDidMount(){
        // can do side effects like fetching data from api
        this.props.onInitIngredients();
        
    }
    updatePurchase = (ingredients)=>{
        // console.log('ings',ingredients)
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
        
        const oldPrice = this.props.tp;
        
        this.updatePurchase(updatedIngredients)
    }
    updatePurchasing = ()=>{
        if(this.props.isAuthenticated)
        {
            this.setState({purchasing:true})
            
        }
        else
        {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
    }
    purchaseCancelledHandler=()=>{
        this.setState({
            purchasing:false
        })
    }
    purchaseContinuedHandler = ()=>{
        this.props.onInitPurchase();
        // purchased->false,
        // on success purchased:true
        // so this function will change state of purchased to false before the mopunting of checkout component
        
        this.props.history.push('/checkout')
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
        
        let burger = this.props.error?<p>Ingredients can't be loaded</p>:<Spinner />
        if(this.props.ings){
            burger = (
            <div>
            <Burger ingredients={this.props.ings}/>
            <BuildControls 
            ingredientAdded = {this.props.onIngredientAdded}
            ingredientRemoves = {this.props.onIngredientRemoved}
            disabledInfo = {disabledInfo}
            price = {this.props.tp}
            purchasable = {this.updatePurchase(this.props.ings)}
            ordered = {this.updatePurchasing}
            isAuth={this.props.isAuthenticated}
            />
            </div>
        )
        }
        return(
            <Aux>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelledHandler}>
                {orderSummary}
            </Modal>
            {burger}
            </Aux>
        );
    }
}
const mapStateToProps = state =>{
    return{
        ings: state.burgerBuilder.ingredients,
        tp: state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        isAuthenticated:state.auth.token!==null,
        
    }
}
const mapDispatchToProps = dispatch=>{
    return{
        onIngredientAdded:(ingName)=> dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved:(ingName)=> dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients:(err)=>dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: ()=>dispatch(burgerBuilderActions.purchaseInit()),
        onSetAuthRedirectPath: (path)=> dispatch(burgerBuilderActions.authRedirectPath(path))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));