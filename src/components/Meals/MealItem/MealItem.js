import React from "react";

import classes from "./MealItem.module.css";
import MealItemForm from "../MealItemForm/MealItemForm";

function MealItem(props) {
  return props.meals.map((meal) => (
    <li key={meal.id} className={classes.meal}>
      <div>
        <h3>{meal.name}</h3>
        <p className={classes.description}>{meal.description}</p>
        <span className={classes.price}>${meal.price.toFixed(2)}</span>
      </div>
      <MealItemForm id={meal.id} meal={meal} />
    </li>
  ));
}

export default MealItem;
