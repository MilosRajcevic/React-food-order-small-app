import React, { useContext, useState } from "react";

import CartItem from "./CartItem.js";
import Card from "../UI/Card/Card";
import Modal from "../UI/Modal/Modal.js";
import CartContext from "../../store/cart-context.js";
import CartForm from "./CartForm.js";
import useFetch from "../Hooks/use-fetch.js";

import classes from "./Cart.module.css";

function Cart(props) {
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const { isLoading, error, sendRequest: sentOrder } = useFetch();

  const ctx = useContext(CartContext);

  const totalAmount = ctx.totalAmount.toFixed(2);

  const cartItemAddHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };

  const cartFormHandler = () => {
    setFormIsOpen(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmit(false);
    await sentOrder({
      url: "https://react-http-6bf30-default-rtdb.firebaseio.com/orders.json",
      method: "POST",
      body: { user: userData, orderItems: ctx.items },
    });

    setIsSubmit(true);
    ctx.clearCart();
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

  const modalActions = (
    <div className={classes.actions}>
      <button
        type="button"
        onClick={props.onClose}
        className={classes["button-alt"]}
      >
        Close
      </button>
      {hasItems && (
        <button onClick={cartFormHandler} className={classes.button}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContnet = (
    <Card>
      <ul>{cartItem}</ul>
      <div className={classes.total}>
        <h2>Total amount</h2>
        <span>${totalAmount}</span>
      </div>
      {formIsOpen && (
        <CartForm onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!formIsOpen && modalActions}
    </Card>
  );

  let modalContent = cartModalContnet;

  if (error) modalContent = <p>We have some problems, try again!</p>;

  if (isLoading) modalContent = <p>Sending order data...</p>;

  if (!error && isSubmit)
    modalContent = (
      <React.Fragment>
        <p>Succesufully sent the order!</p>
        <div className={classes.actions}>
          <button
            type="button"
            onClick={props.onClose}
            className={classes.button}
          >
            Close
          </button>
        </div>
      </React.Fragment>
    );

  return (
    <Modal onClose={props.onClose} className={classes["cart-items"]}>
      {modalContent}
    </Modal>
  );
}

export default Cart;
