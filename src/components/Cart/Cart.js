import React, { useContext } from "react";

import CartItem from "./CartItem.js";
import Card from "../UI/Card/Card";
import Modal from "../UI/Modal/Modal.js";
import CartContext from "../../store/cart-context.js";

import classes from "./Cart.module.css";

function Cart(props) {
  const ctx = useContext(CartContext);

  const totalAmount = ctx.totalAmount.toFixed(2);

  const cartItemAddHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = (id) => {
    console.log(id);
    ctx.removeItem(id);
  };

  const cartItem = [...ctx.items].map((item) => {
    console.log(item.id);
    return (
      <CartItem
        addItem={cartItemAddHandler.bind(null, item)}
        removeItem={cartItemRemoveHandler.bind(null, item.id)}
        key={item.id}
        name={item.name}
        price={item.price}
        amount={item.amount}
      />
    );
  });

  const hasItems = ctx.items.length > 0;

  return (
    <Modal onClose={props.onClose} className={classes["cart-items"]}>
      <Card>
        <ul>{cartItem}</ul>
        <div className={classes.total}>
          <h2>Total amount</h2>
          <span>${totalAmount}</span>
        </div>
        <div className={classes.actions}>
          <button
            type="button"
            onClick={props.onClose}
            className={classes["button-alt"]}
          >
            Close
          </button>
          {hasItems && <button className={classes.button}>Order</button>}
        </div>
      </Card>
    </Modal>
  );
}

export default Cart;
