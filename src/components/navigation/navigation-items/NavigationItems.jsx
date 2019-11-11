import React from 'react';
import classes from "./NavigationItems.module.css"
import NavigationItem from "./navigation-item/NavigationItem";
const NavigationItems= ()=>(
    <ul className={classes.NavigationItems}>
        <NavigationItem  link='/'>BurgerBuilder</NavigationItem>
        <NavigationItem  link='/orders'>Orders</NavigationItem>
    </ul>
);
export default NavigationItems;