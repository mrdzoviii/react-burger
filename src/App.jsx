import React, {Component} from "react";
import Layout from "./components/layout/Layout";
import BurgerBuilder from "./containers/burger-builder/BurgerBuilder";
import Checkout from "./containers/checkout/Checkout";
import {BrowserRouter,Switch,Route} from "react-router-dom";
import ContactData from "./containers/checkout/contact-data/ContactData";
import Orders from "./containers/orders/Orders";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
            <div>
                <Layout>
                    <Switch>
                        <Route path='/checkout' component={Checkout}></Route>
                        <Route path='/orders' component={Orders}></Route>
                        <Route path='/' component={BurgerBuilder} exact></Route>

                    </Switch>
                </Layout>
            </div>
            </BrowserRouter>
        );
    }
}

export default App;
