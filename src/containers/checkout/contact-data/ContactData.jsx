import React, { Component } from "react";
import Button from "../../../components/ui/button/Button";
import classes from "./ContactData.module.css";
import axios from "./../../../axios-order";
import Spinner from "../../../components/ui/spinner/Spinner";
import Input from "../../../components/ui/input/Input";
class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name:"
        },
        value: ""
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your email:"
        },
        value: ""
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your street:"
        },
        value: ""
      },
      postalCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your postal code:"
        },
        value: ""
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your country:"
        },
        value: ""
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: ""
      }
    },
    loading: false,
    ingredients: {}
  };

  orderHandler = e => {
    e.preventDefault();
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
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
        this.setState({ loading: false });
        this.props.history.push("/");
      },
      err => {
        console.log(err.response);
        this.setState({ loading: false });
      }
    );
  };

  render() {
    const formsElementsArray = [];
    for (let key in this.state.orderForm) {
      formsElementsArray.push({ id: key, config: this.state.orderForm[key] });
    }
    if (this.state.loading) {
      return <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your contact data</h4>
        <form>
          {formsElementsArray.map(element => (
            <Input
              key={element.id}
              elementType={element.config.elementType}
              elementConfig={element.config.elementConfig}
              value={element.config.value}
            />
          ))}
          <Button btnType="Success" clicked={this.orderHandler}>
            ORDER
          </Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
