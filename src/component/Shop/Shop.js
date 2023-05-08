import React, { useEffect, useState } from "react";
import fakeData from "../../fakeData";
import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import { addToDb, clearTheCart, getStoredCart } from "../../utilities/fakedb";
import { Link } from "react-router-dom";
const Shop = (props) => {
  const first10 = fakeData.slice(0, 10);
  const [product, setProduct] = useState(first10);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const saveCart = getStoredCart();
    const productKey = Object.keys(saveCart);
    const previousCart = productKey.map((exzistingKey) => {
      const product = fakeData.find((pd) => pd.key === exzistingKey);
      product.quantity = saveCart[exzistingKey];
      return product;
    });
    setCart(previousCart);
    // console.log(saveCart, productKey);
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
        {product.map((product) => (
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
