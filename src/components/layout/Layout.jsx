import React from "react";
import Aux from "../../hoc/Auxiliary";
import classes from "./Layout.module.css";
import Toolbar from "../navigation/toolbar/Toolbar";

const Layout = props => (
  <Aux>
      <Toolbar/>
      <main className={classes.Content}>{props.children}</main>

  </Aux>
);

export default Layout;
