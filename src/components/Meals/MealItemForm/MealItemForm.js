import React, { useRef, useContext, useState } from "react";
import CartContext from "../../../store/cart-context.js";

import Input from "../../UI/Input/Input.js";

import classes from "./MealItemForm.module.css";

function MealItemForm(props) {
  const ctx = useContext(CartContext);
  const amountInputRef = useRef();
  const [amountIsValid, setAmountIsValid] = useState(true);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    const item = {
      key: props.meal.id,
      id: props.meal.id,
      name: props.meal.name,
      price: props.meal.price,
      amount: enteredAmountNumber,
    };
    ctx.addItem(item);
  };

  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <Input
        label="Amount"
        input={{
          type: "text",
          id: "amount_" + props.id,
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
          ref: amountInputRef,
        }}
      />
      <button type="submit">+ Add</button>
      {!amountIsValid && <p>Please enter the valid amount (1-5)</p>}
    </form>
  );
}
export default MealItemForm;
