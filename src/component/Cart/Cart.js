import React from "react";
import { Link } from "react-router-dom";

const Cart = (props) => {
  // let total = 0;
  const cart = props.cart;
  const total = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  // debugger;
  let shippingCost = 0;
  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    // total = total + product.price;

    if (product.price > 35) {
      shippingCost += 0;
    } else if (product.price > 15) {
      shippingCost += 4.99;
    } else if (product.price > 0) {
      shippingCost += 12.99;
    }
  }
  const tax = total / 10;
  const formetNumber = (num) => {
    const precision = num.toFixed(2);
    return precision;
  };

  return (
    <div>
      <h4>Ordered Summary</h4>
      <p>Item Ordered:{props.cart.length}</p>
      <p>Product price:{formetNumber(total)}</p>
      <p>Shipping Cost: {shippingCost}</p>
      <p>Tax : {formetNumber(tax)}</p>
      <p>total: {formetNumber(total + shippingCost + tax)}</p>
      <br />
      {props.children}
    </div>
  );
};

export default Cart;
