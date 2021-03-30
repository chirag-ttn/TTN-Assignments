import React, {Component } from 'react';
import {connect} from 'react-redux'
import * as actions from './store/actions/index'
import Layout from './containers/Layout/Layout'
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import burger from './components/Burger/Burger';
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/logout/logout'
class App extends Component{
  componentDidMount(){
    this.props.onCheckAuthState()
  }
  render(){
    
    return(
      <div>
      <Layout>
        <Switch>
          <Route path='/checkout' component={Checkout}/>
          <Route path='/orders' component={Orders}/>
          <Route path='/auth' component={Auth}/>
          <Route path='/' exact component={BurgerBuilder} />
          <Route path='/logout' component={Logout}/>
        </Switch>
      </Layout>
      </div>
    );
  }
}
const mapStateToProps = state =>{
  return{
    isAuthenticated:state.auth.isAuthenticated
  }
}
const mapDispatchToProps = dispatch =>{
  return{
    onCheckAuthState: ()=> dispatch(actions.authCheckState())
  }
}
export default connect(null,mapDispatchToProps)(App);
