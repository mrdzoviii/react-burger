import React from 'react';
import CheckoutSummary from "../../components/order/checkout-summary/CheckoutSummary";

class Checkout extends React.Component{

    state = {
        ingredients:{
            salad:1,
            meat:1,
            cheese:1,
            bacon:1
        }
    };

    componentDidMount() {
        const ingredients={};
        const query=new URLSearchParams(this.props.location.search);
        for (let param of query.entries()){
            ingredients[param[0]]=+param[1];
        };
        this.setState({ingredients});
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
            </div>
        )
    }

}
export default Checkout;