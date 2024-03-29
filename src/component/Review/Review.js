import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStoredCart } from "../../utilities/fakedb";
import ReviewItem from "../ReviewItem/ReviewItem";
import { deleteFromDb } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
// import happyImg from "../../images/giphy.gif";
const Review = (props) => {
  const [cart, setCart] = useState([]);
  // const [orderPlaced, setOrderPlaced] = useState(false);
  useEffect(() => {
    const saveCart = getStoredCart();
    const productKey = Object.keys(saveCart);
    fetch("http://localhost:4200/productKeys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productKey),
    })
      .then((res) => res.json())
      .then((data) => setCart(data));
    // const cartProduct = productKey.map((key) => {
    //   const product = fakeData.find((pd) => pd.key === key);
    //   product.quantity = saveCart[key];
    //   return product;
    // });
    // setCart(cartProduct);
  }, []);
  const removeProduct = (productKey) => {
    // console.log("remove", productKey);
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    deleteFromDb(productKey);
  };
  const navigate = useNavigate();
  const handleProceedCheckout = () => {
    navigate("/shipment");
  };
  // let thankyou;
  // if (orderPlaced) {
  //   thankyou = <img src={happyImg}></img>;
  // }
  return (
    <>
      <div className="twin-container">
        <div className="product-container">
          {/* <h1>cartReview : {cart.length}</h1> */}
          {cart.map((pd) => (
            <ReviewItem product={pd} removeProduct={removeProduct}></ReviewItem>
          ))}

        </div>

        <div className="cart-container">
          <Cart cart={cart}>
            <button className="main-btn" onClick={handleProceedCheckout}>
              Proceed Checkout
            </button>
          </Cart>
        </div>
      </div>
    </>
  );
};

export default Review;
