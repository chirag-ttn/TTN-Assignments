import React,{Component} from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index'
import {connect} from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router';
class Auth extends Component{
    state={
        controls:{
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Mail Address'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'PassWord'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            }
        },
        isSignUp:true,
        
        
    }
    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirectPath!=='/')
        this.props.onSetAuthRedirectPath('/')
    }
    checkValidity = (value,rules)=>{
        let isValid = false;
        if(rules.required)
        { 
            isValid=value.trim()!==''
        }
        return isValid;

    }
    inputChangedHandler = (event, controlName)=>{
        const updatedControls = {
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value:event.target.value,
                valid: this.checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched:true
            }
        }
        this.setState({controls:updatedControls})
    }
    submitHandler = (event)=>{
        event.preventDefault();
        
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value,this.state.isSignUp)
    }
    switchAuthModeHandler = ()=>{
        this.setState({isSignUp:!this.state.isSignUp})
    }
    render(){
        const formElements = [];
        for(let key in this.state.controls)
        {
            formElements.push({
                id:key,
                config:this.state.controls[key]})
        }
        let form = formElements.map(ele=>{
            return(
                <Input 
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
        })
        if(this.props.loading){
            form = <Spinner />
        }
        let errorMessage = null;
        if(this.props.error){
            errorMessage = <p>{this.props.error.message}</p>
        }
        let authRedirect = null;
        if(this.props.isAuthenticated)
        {
            
            // if you are authenticated then redirect to /checkout
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }
        return(
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                <Button btnType="Success">Submit</Button>
                <Button 
                clicked={this.switchAuthModeHandler}
                btnType="Danger">SWITCH TO {this.state.isSignUp ? 'SIGN IN':'SIGN UP'}</Button>
                </form>
                
                
            </div>
        )
    }
};
const mapStateToProps = state =>{
    return{
        loading:state.auth.loading,
        error:state.auth.error,
        isAuthenticated:state.auth.token!==null,
        authRedirectPath:state.auth.authRedirectPath,
        buildingBurger:state.burgerBuilder.building
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        onAuth:(email,password,method)=>dispatch(actions.auth(email,password,method)),
        onSetAuthRedirectPath:(path)=>dispatch(actions.authRedirectPath('/'))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth);