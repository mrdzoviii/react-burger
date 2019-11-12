import React from "react";
import classes from "./Input.module.css";

const Input = props => {
  let inputElement;
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    /*case "select":
      inputElement = (
        <select className={classes.InputElement} {...props.elementConfig}>
          {props.elementConfig.options.map((el, id) => (
            <option key={id} value={el.value}>
              {el.displayValue}
            </option>
          ))}
        </select>
      );
      break;*/
    default:
      inputElement = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
