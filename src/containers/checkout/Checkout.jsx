import React from 'react';
import CheckoutSummary from "../../components/order/checkout-summary/CheckoutSummary";
import {Route, Switch} from "react-router-dom";
import ContactData from "./contact-data/ContactData";

class Checkout extends React.Component{

    state = {
        ingredients:null,
        totalPrice: 0,
    };

    componentWillMount() {
        const ingredients={};
        let totalPrice;
        const query=new URLSearchParams(this.props.location.search);
        for (let param of query.entries()){
            if(param[0]==='price'){
                totalPrice=+param[1];
            }else {
                ingredients[param[0]] = +param[1];
            }
        };
        this.setState({ingredients,totalPrice});
    }

    checkoutCancelHandler = ()=>{
        this.props.history.goBack();
    };

    checkoutContinueHandler= () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render(){
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                                 onCheckoutClose={this.checkoutCancelHandler}
                                 onCheckoutContinue={this.checkoutContinueHandler}/>
                <Route path={`${this.props.match.path}/contact-data`} render={(props)=><ContactData ingredients={this.state.ingredients}
                                                                                               totalPrice={this.state.totalPrice} {...this.props}/>}/>
            </div>
        )
    }

}
export default Checkout;