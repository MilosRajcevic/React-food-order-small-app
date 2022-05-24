import React from "react";

import clasess from "./Header.module.css";
import mealsImage from "../../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

function Header(props) {
  return (
    <React.Fragment>
      <header className={clasess.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={clasess.image}>
        <img src={mealsImage} alt="food table" />
      </div>
    </React.Fragment>
  );
}
export default Header;
