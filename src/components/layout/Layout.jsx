import React from "react";
import Aux from "../../hoc/Auxiliary";

const Layout = props => (
  <Aux>
    <div>
      Toolbar, SideDrawer, BackDrop
      <main>{props.children}</main>
    </div>
  </Aux>
);

export default Layout;
