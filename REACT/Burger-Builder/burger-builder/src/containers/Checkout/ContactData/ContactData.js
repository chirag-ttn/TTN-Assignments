import React, {Component} from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Input from '../../../components/UI/Input/Input'
import Spinner from '../../../components/UI/Spinner/Spinner'
import {connect} from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'
const ContactData = props => {
    const 
    state = {
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'YourName'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            zipcode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'ZipCode'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your Mail'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest', displayValue:'Fastest'},
                        {value:'cheapest', displayValue:'Cheapest'}
                    ]
                },
                value:'',
                valid:true
                
            }
        },
        formIsValid:false,
        error:false
    } 
    const checkValidity = (value,rules)=>{
        let isValid = false;
        if(rules.required)
        {
            isValid=value.trim()!==''
        }
        return isValid;

    }
    const inputChangedHandler = (event,formIdentifier)=>{
        const updatedForm = {
            ...this.state.orderForm
        }
        const updatedFormSelected = {
            ...updatedForm[formIdentifier]
        }
        
        updatedFormSelected.value = event.target.value
        updatedFormSelected.touched=true
        if(updatedFormSelected.validation)
        updatedFormSelected.valid = this.checkValidity(updatedFormSelected.value,updatedFormSelected.validation)
        updatedForm[formIdentifier]=updatedFormSelected
        
        let formIsValid = true;
        for(let inputId in updatedForm){
            formIsValid = updatedForm[inputId].valid && formIsValid
        }
        this.setState({
            orderForm:updatedForm,
            formIsValid:formIsValid
        })
        // console.log('formId',formIsValid)
    }
    orderHandler=(event)=>{
        event.preventDefault();
        const formData={}
        for(let formIdentifier in this.state.orderForm)
        {
            formData[formIdentifier] = this.state.orderForm[formIdentifier].value
        }
        // console.log(this.props)
        const order = {
            ingredient:this.props.ingredients,
            price:this.props.totalPrice,
            orderData:formData,
            userId:this.props.userId
            
        }
        this.props.onOrderBurger(order,this.props.token)
    }
    
        // console.log('valid',this.state.formIsValid)
        const formElements = [];
        for(let key in this.state.orderForm)
        {
            formElements.push({
                id:key,
                config:this.state.orderForm[key]})
        }
        // console.log(formElements)
        let form = (<form>
            {formElements.map(ele=>{
                return(<Input 
                    key={ele.id}
                    elementType={ele.config.elementType} 
                    elementConfig={ele.config.elementConfig} 
                    value={ele.config.value}
                    Invalid={!ele.config.valid}
                    shouldValidate={ele.config.validation?true:false}
                    touched={ele.config.touched}
                    changed={(event)=>this.inputChangedHandler(event,ele.id)}
                    />
                    
                    )
            })}
            
            <Button disabled={!this.state.formIsValid} clicked = {this.orderHandler}btnType="Success">ORDER</Button>
        </form>);
        if(this.props.loading)
        {
            form = (<Spinner />);
        }
        
        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact Data</h4>
                {form}
            </div>
        )
    }

const mapStateToProps = state =>{
    return{
        ingredients:state.burgerBuilder.ingredients,
        totalPrice:state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        userId:state.auth.userId,
        token:state.auth.token
    }
}
const mapDispatchToProps = dispatch=>{
    return{
        onOrderBurger:(orderData,token)=>dispatch(actions.purchaseBurger(orderData,token))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));