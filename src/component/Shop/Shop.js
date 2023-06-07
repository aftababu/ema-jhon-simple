import React, { useEffect, useState } from "react";
import { Cart, Product } from "../index";
import "./Shop.css";
import { addToDb, clearTheCart, getStoredCart } from "../../utilities/fakedb";
import { Link } from "react-router-dom";
const Shop = (props) => {
  // const first10 = fakeData.slice(0, 10);
  const [products, setProduct] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4200/product")
      .then((res) => res.json())
      .then((data) => setProduct(data));
    const saveCart = getStoredCart();
    const productKey = Object.keys(saveCart);
    fetch("http://localhost:4200/productKeys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productKey),
    })
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);
  const handleAddProduct = (product) => {
    // console.log("first", product);
    // const newCart = [...cart, product];
    const sameProduct = cart.find((pd) => pd.key === product.key);
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter((pd) => pd.key !== product.key);
      newCart = [...others, sameProduct];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    setCart(newCart);
    addToDb(product.key);
  };
  return (
    <div className="twin-container">
      <div className="product-container">
        {products.slice(0, 10).map((product) => (
          <Product
            key={product.key}
            showAddToCart={true}
            handleAddProduct={handleAddProduct}
            product={product}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <Link to={"/review"}>
            <button className="main-btn">Review Order</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
