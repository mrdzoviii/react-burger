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
    {controls.map(control => (
      <BuildControl
        label={control.label}
        key={control.label}
        type={control.type}
      />
    ))}
  </div>
);

export default BuildControls;
