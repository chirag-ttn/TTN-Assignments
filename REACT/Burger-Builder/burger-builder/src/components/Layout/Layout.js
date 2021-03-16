import React, { Component } from 'react';
import Aux from '../../hoc/Aux'
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
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
        <Toolbar clicked={this.toggleSideBar}/>
        <SideDrawer 
        open={this.state.showSideDrawer}
        closed={this.SideDrawerClosedHandler}/>
        <main className = {classes.Content}>
            {this.props.children}
        </main>
        </Aux>
    )
}

}

export default layout;