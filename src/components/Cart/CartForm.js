import React from "react";

import classes from "./CartForm.module.css";
import useInput from "../Hooks/use-input";

function CartForm(props) {
  const {
    inputText: enteredName,
    inputValidation: enteredNameIsValid,
    hasError: enteredNameHasError,
    inputBlurHandler: nameBlurChangeHandler,
    inputChangeHandler: nameInputChangeHandler,
    reset: nameResetHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    inputText: enteredStreet,
    inputValidation: enteredStreetIsValid,
    hasError: enteredStreetHasError,
    inputBlurHandler: streetBlurChangeHandler,
    inputChangeHandler: streetInputChangeHandler,
    reset: streetResetHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    inputText: enteredPostalCode,
    inputValidation: enteredPostalCodeIsValid,
    hasError: enteredPostalCodeHasError,
    inputBlurHandler: postalCodeBlurChangeHandler,
    inputChangeHandler: postalCodeInputChangeHandler,
    reset: postalCodeResetHandler,
  } = useInput((value) => value.trim().length === 5);

  const {
    inputText: enteredCity,
    inputValidation: enteredCityIsValid,
    hasError: enteredCityHasError,
    inputBlurHandler: cityBlurChangeHandler,
    inputChangeHandler: cityInputChangeHandler,
    reset: cityResetHandler,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;

  if (
    enteredNameIsValid &&
    enteredCityIsValid &&
    enteredPostalCodeIsValid &&
    enteredStreetIsValid
  ) {
    formIsValid = true;
  }

  const nameClass = enteredNameHasError
    ? `${classes.control + " " + classes.invalid}`
    : `${classes.control}`;

  const cityClass = enteredCityHasError
    ? `${classes.control + " " + classes.invalid}`
    : `${classes.control}`;

  const postalCodeClass = enteredPostalCodeHasError
    ? `${classes.control + " " + classes.invalid}`
    : `${classes.control}`;

  const streetClass = enteredStreetHasError
    ? `${classes.control + " " + classes.invalid}`
    : `${classes.control}`;

  const confirmHandler = (event) => {
    event.preventDefault();

    if (
      !enteredNameIsValid &&
      !enteredPostalCodeIsValid &&
      !enteredStreetIsValid &&
      !enteredCityIsValid
    )
      return;

    nameResetHandler();
    streetResetHandler();
    postalCodeResetHandler();
    cityResetHandler();

    props.onConfirm({
      name: enteredName,
      street: enteredCity,
      postalcode: enteredPostalCode,
      city: enteredCity,
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClass}>
        <label htmlFor="name">Your name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameBlurChangeHandler}
          value={enteredName}
        ></input>
        {enteredNameHasError && (
          <p className={classes["control__error-text"]}>
            Please enter a valid name!
          </p>
        )}
      </div>

      <div className={streetClass}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          onChange={streetInputChangeHandler}
          onBlur={streetBlurChangeHandler}
          value={enteredStreet}
        ></input>
        {enteredStreetHasError && (
          <p className={classes["control__error-text"]}>
            Please enter a valid street!
          </p>
        )}
      </div>

      <div className={postalCodeClass}>
        <label htmlFor="postal">Postal code</label>
        <input
          type="text"
          id="postal"
          onChange={postalCodeInputChangeHandler}
          onBlur={postalCodeBlurChangeHandler}
          value={enteredPostalCode}
        ></input>
        {enteredPostalCodeHasError && (
          <p className={classes["control__error-text"]}>
            Please eneter valid postal code (5 characters long)!
          </p>
        )}
      </div>

      <div className={cityClass}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={cityInputChangeHandler}
          onBlur={cityBlurChangeHandler}
          value={enteredCity}
        ></input>
        {enteredCityHasError && (
          <p className={classes["control__error-text"]}>
            Please enter a valid city!
          </p>
        )}
      </div>

      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} disabled={!formIsValid}>
          Confirm
        </button>
      </div>
    </form>
  );
}

export default CartForm;
