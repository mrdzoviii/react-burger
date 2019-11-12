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

  handleInputChange = (event, name) => {
    const updatedForm = { ...this.state.orderForm };
    const updatedFormField = { ...this.state.orderForm[name] };
    updatedFormField.value = event.target.value;
    updatedForm[name] = updatedFormField;
    this.setState({ orderForm: updatedForm });
  };

  orderHandler = e => {
    e.preventDefault();
    const formData = {};
    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData
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
        <form onSubmit={this.orderHandler}>
          {formsElementsArray.map(element => (
            <Input
              key={element.id}
              elementType={element.config.elementType}
              elementConfig={element.config.elementConfig}
              value={element.config.value}
              changed={e => this.handleInputChange(e, element.id)}
            />
          ))}
          <Button btnType="Success" type="submit">
            ORDER
          </Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
