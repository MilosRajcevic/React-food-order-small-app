import { useState } from "react";

function useInput(validaitonValue) {
  const [inputText, setInputText] = useState("");
  const [isValid, setIsValid] = useState(false);

  const inputValidation = validaitonValue(inputText);
  const hasError = !inputValidation && isValid;

  const inputChangeHandler = (event) => {
    setInputText(event.target.value);
  };

  const inputBlurHandler = (event) => {
    setIsValid(true);
  };

  const reset = () => {
    setInputText("");
    setIsValid(false);
  };

  return {
    inputText,
    inputValidation,
    hasError,
    inputBlurHandler,
    inputChangeHandler,
    reset,
  };
}

export default useInput;
