import React from "react";
import Product from "../Product/Product";

const ReviewItem = (props) => {
  const { name, product, quantity, key, img } = props.product;
  // console.log(props.removeProduct);
  return (
    <div
      className="review-item"
      style={{
        margin: "20px 12px",
        borderBottom: "1px solid gray",
        paddingBottom: "10px",
        display: "flex",
        gap: "30px",
        alignItems: "center",
      }}
    >
      <div>
        <img src={img} alt="" />
      </div>
      <div>
        <h4 className="product-name">{name}</h4>
        <p>Quantity {quantity}</p>
        <br />
        <button className="main-btn" onClick={() => props.removeProduct(key)}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default ReviewItem;
