import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/burger/Burger";
import BuildControls from "../../components/burger/build-controls/BuildControls";
import Modal from "../../components/ui/modal/Modal";
import OrderSummary from "../../components/burger/order-summary/OrderSummary";
import axios from "../../axios-order";
import Spinner from "../../components/ui/spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler";
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false
  };

  componentDidMount() {
    axios.get("/ingredients.json").then(({ data: response }) => {
      const totalPrice=Object.keys(response).map(key=>response[key]*INGREDIENT_PRICES[key]).reduce((sum,el)=>sum+el,0);
      this.setState({ ingredients: response ,totalPrice});

    });
  }

  updatePurchasableState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(key => ingredients[key])
      .reduce((sum, el) => sum + el, 0);
    this.setState({ purchasable: sum > 0 ? true : false });
  }

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchasableState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) return;
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    let newPrice = oldPrice - priceDeduction;
    if(newPrice<=0){
      newPrice=-1*newPrice;
    }
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchasableState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    //alert("You continued");
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Maximilian Shwarzmuller",
        address: {
          street: "Street 15",
          zipCode: "4343",
          country: "Germany"
        },
        email: "danilovic.dd@ggg.com"
      },
      deliveryMethod: "fastest"
    };
    this.setState({ loading: true });
    axios.post("/order.json", order).then(
      response => {
        console.log(response);
        this.setState({ loading: false, purchasing: false });
      },
      err => {
        console.log(err.response);
        this.setState({ loading: false, purchasing: false });
      }
    );
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    Object.keys(disabledInfo).forEach(
      key => (disabledInfo[key] = disabledInfo[key] <= 0)
    );

    let burger = <Spinner></Spinner>;
    let orderSummary = null;
    if (this.state.ingredients) {
      burger = (
        <>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientsAdded={this.addIngredientHandler}
            ingredientsRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            order={this.purchaseHandler}
          />
        </>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          cancel={this.purchaseCancelHandler}
          continue={this.purchaseContinueHandler}
          price={this.state.totalPrice}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner></Spinner>;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
