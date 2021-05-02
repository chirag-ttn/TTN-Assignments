import React, {Component, Suspense, useEffect } from 'react';
import {connect} from 'react-redux'
import * as actions from './store/actions/index'
import Layout from './containers/Layout/Layout'
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'

import Logout from './containers/Auth/logout/logout'
const Checkout = React.lazy(()=>{
  return import('./containers/Checkout/Checkout')
})
const Orders = React.lazy(()=>{
  return import('./containers/Orders/Orders')
})
const Auth = React.lazy(()=>{
  return import('./containers/Auth/Auth')
})
const App = (props)=>{
  // componentDidMount(){
  //   this.props.onCheckAuthState()
  // }
  
    useEffect(()=>{
          props.onCheckAuthState()
    },[])
    return(
      <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route path='/checkout' render={()=><Checkout />}/>
          <Route path='/orders' render={()=><Orders />}/>
          <Route path='/auth' render={()=><Auth />}/>
          <Route path='/' exact component={BurgerBuilder} />
          <Route path='/logout' component={Logout}/>
        </Switch>
      </Suspense>
      </Layout>
      </div>
    );
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
export default connect(mapStateToProps,mapDispatchToProps)(App);
