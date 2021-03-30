import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import {connect} from 'react-redux'
class layout extends Component {
    state={
        showSideDrawer:false
    }
    SideDrawerClosedHandler=()=>{
        this.setState({showSideDrawer:false})
    }
    toggleSideBar=()=>{
        this.setState({showSideDrawer:true})
    }
render(){
    return(<Aux>
        <Toolbar clicked={this.toggleSideBar} isAuthenticated = {this.props.isAuthenticated}/>
        <SideDrawer 
        open={this.state.showSideDrawer}
        closed={this.SideDrawerClosedHandler}
        isAuthenticated = {this.props.isAuthenticated}/>
        <main className = {classes.Content}>
            {this.props.children}
        </main>
        </Aux>
    )
}

}
const mapStateToProps = state=>{
    return{
        isAuthenticated:state.auth.token!==null
    }
}
export default connect(mapStateToProps)(layout);