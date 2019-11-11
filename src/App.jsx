import React, {Component} from "react";
import Layout from "./components/layout/Layout";
import BurgerBuilder from "./containers/burger-builder/BurgerBuilder";
import Checkout from "./containers/checkout/Checkout";
import {BrowserRouter,Switch,Route} from "react-router-dom";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
            <div>
                <Layout>
                    <Switch>
                        <Route path='/checkout' component={Checkout} exact></Route>
                        <Route path='/' component={BurgerBuilder}></Route>
                    </Switch>
                </Layout>
            </div>
            </BrowserRouter>
        );
    }
}

export default App;
