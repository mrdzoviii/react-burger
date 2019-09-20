import React from "react";
import Aux from "../../../hoc/Auxiliary";
import Button from "../../ui/button/Button";
class OrderSummary extends React.Component {
  componentWillUpdate() {
    console.log("[OrderSummary] will update");
  }

  componentDidUpdate() {
    console.log("[OrderSummary] did update");
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
        {this.props.ingredients[igKey]}
      </li>
    ));
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Price: {this.props.price.toFixed(2)}</strong> $
        </p>
        <p>Continue to checkout</p>
        <Button clicked={this.props.cancel} btnType="Danger">
          CANCEL
        </Button>
        <Button clicked={this.props.continue} btnType="Success">
          CONTINUE
        </Button>
      </Aux>
    );
  }
}
export default OrderSummary;
