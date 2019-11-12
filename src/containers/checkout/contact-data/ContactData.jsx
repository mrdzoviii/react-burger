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
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your email:"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your street:"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      postalCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your postal code:"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your country:"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: "",
        valid: true
      }
    },
    loading: false,
    formIsValid: false,
    ingredients: {}
  };

  handleInputChange = (event, name) => {
    const updatedForm = { ...this.state.orderForm };
    const updatedFormField = { ...this.state.orderForm[name] };
    updatedFormField.value = event.target.value;
    updatedFormField.touched = true;
    if (updatedFormField.validation) {
      updatedFormField.valid = this.checkValidity(
        updatedFormField.value,
        updatedFormField.validation
      );
    }
    let formIsValid = true;
    for (let key in updatedForm) {
      formIsValid = formIsValid && updatedForm[key].valid;
    }
    console.log(formIsValid);
    updatedForm[name] = updatedFormField;
    this.setState({ orderForm: updatedForm, formIsValid });
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

  checkValidity = (value, rules) => {
    let isValid = false;
    if (rules.required) {
      isValid = value.trim() !== "";
    }
    if (rules.minLength) {
      isValid = isValid && value.trim().length >= rules.minLength;
    }
    if (rules.maxLength) {
      isValid = isValid && value.trim().length <= rules.maxLength;
    }
    return isValid;
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
              invalid={!element.config.valid}
              elementType={element.config.elementType}
              elementConfig={element.config.elementConfig}
              shouldValidate={element.config.validation}
              value={element.config.value}
              touched={element.config.touched}
              changed={e => this.handleInputChange(e, element.id)}
            />
          ))}
          <Button
            btnType="Success"
            disabled={!this.state.formIsValid}
            //type="submit"
          >
            ORDER
          </Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
