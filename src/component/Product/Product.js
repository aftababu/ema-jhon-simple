import React from "react";
import "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const Product = (props) => {
  const { key, img, name, seller, price, stock } = props.product;
  // console.log(props);
  return (
    <div className="product">
      <div className="product-image">
        <img src={img} alt="" />
      </div>
      <div className="product-detail">
        <h4 key={key} className="product-name">
          <Link to={`/product/${key}`}>{name}</Link>
        </h4>
        <br />
        <p>by: {seller}</p>
        <br />
        <p>${price}</p>
        <br />
        <p>
          <small>onle {stock} left in stock-order soon</small>
        </p>
        {props.showAddToCart && (
          <button
            className="main-btn"
            onClick={() => props.handleAddProduct(props.product)}
          >
            <FontAwesomeIcon icon={faShoppingCart} />
            Add To Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
