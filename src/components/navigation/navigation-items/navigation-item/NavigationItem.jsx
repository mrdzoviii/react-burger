import React from 'react';
import classes from './NavigationItem.module.css';
import {NavLink} from "react-router-dom";

const NavigationItem = props => {
    return (
       <NavLink exact className={classes.NavigationItem} to={props.link} activeClassName={classes.active}>{props.children}</NavLink>
    );
};

export default NavigationItem;
