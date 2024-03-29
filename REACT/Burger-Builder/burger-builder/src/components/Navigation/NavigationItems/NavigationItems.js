import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from '../NavigationItems/NavigationItems.module.css'
const navigationItems = (props) =>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/' active={true}>BurgerBuilder</NavigationItem>
        <NavigationItem link='/'>Checkout</NavigationItem>
    </ul>
)

export default navigationItems;