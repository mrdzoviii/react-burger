import React from "react";
import Aux from "../../hoc/Auxiliary";
import classes from "./Layout.module.css";

const Layout = props => (
  <Aux>
    <div>
      Toolbar, SideDrawer, BackDrop
      <main className={classes.Content}>{props.children}</main>
    </div>
  </Aux>
);

export default Layout;
