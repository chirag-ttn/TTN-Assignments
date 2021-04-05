import React, { Component, useState } from 'react';
import Aux from '../../hoc/Aux/Aux'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import {connect} from 'react-redux'
const Layout = (props)=> {
    
    const [showSideDrawer,setShowSideDrawer] = useState(false)
    const SideDrawerClosedHandler=()=>{
        // this.setState({showSideDrawer:false})
        setShowSideDrawer(true)
    }
    const toggleSideBar=()=>{
        // this.setState({showSideDrawer:true})
        setShowSideDrawer(true)
    }

    return(<Aux>
        <Toolbar clicked={toggleSideBar} isAuthenticated = {props.isAuthenticated}/>
        <SideDrawer 
        open={showSideDrawer}
        closed={SideDrawerClosedHandler}
        isAuthenticated = {props.isAuthenticated}/>
        <main className = {classes.Content}>
            {props.children}
        </main>
        </Aux>
    )


}
const mapStateToProps = state=>{
    return{
        isAuthenticated:state.auth.token!==null
    }
}
export default connect(mapStateToProps)(Layout);