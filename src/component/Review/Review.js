import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faFilePdf,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { getStoredCart } from "../../utilities/fakedb";
import fakeData from "../../fakeData";
import ReviewItem from "../ReviewItem/ReviewItem";

const Review = (props) => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const saveCart = getStoredCart();
    const productKey = Object.keys(saveCart);
    const cartProduct = productKey.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = saveCart[key];
      return product;
    });
    setCart(cartProduct);
  }, []);
  return (
    <>
      <h1>cartReview : {cart.length}</h1>
      {cart.map((pd) => (
        <ReviewItem product={pd}></ReviewItem>
      ))}
    </>
  );
};

export default Review;
