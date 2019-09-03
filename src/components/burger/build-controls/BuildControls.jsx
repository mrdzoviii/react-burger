import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./build-control/BuildControl";

export const controls = [
  { label: "Salad", type: "salad" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
  { label: "Bacon", type: "bacon" }
];

const BuildControls = props => (
  <div className={classes.BuildControls}>
    <p>
      Current price :<strong>{props.price.toFixed(2)}</strong> $
    </p>
    {controls.map(control => (
      <BuildControl
        label={control.label}
        key={control.label}
        added={() => props.ingredientsAdded(control.type)}
        removed={() => props.ingredientsRemoved(control.type)}
        disable={props.disabled[control.type]}
      />
    ))}
    <button onClick={props.order} className={classes.OrderButton} disabled={!props.purchasable}>ORDER NOW</button>
  </div>
);

export default BuildControls;
