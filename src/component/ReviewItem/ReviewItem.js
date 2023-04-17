import React from "react";
import Product from "../Product/Product";

const ReviewItem = (props) => {
  const { name, product, quantity } = props.product;
  return (
    <div
      className="review-item"
      style={{
        margin: "20px 12rem",
        borderBottom: "1px solid gray",
        paddingBottom: "10px",
      }}
    >
      <h4 className="product-name">{name}</h4>
      <p>Quantity {quantity}</p>
      <br />
      <button className="main-btn">Remove</button>
    </div>
  );
};

export default ReviewItem;
