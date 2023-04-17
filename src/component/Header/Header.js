import React from "react";
import logo from "../../images/logo.png";
import "./Header.css";
const Header = () => {
  return (
    <div className="header">
      <img src={logo} alt="" />
      <nav>
        <a href="/">Shop</a>
        <a href="/review">Review</a>
        <a href="/inventory">Order</a>
      </nav>
    </div>
  );
};

export default Header;
