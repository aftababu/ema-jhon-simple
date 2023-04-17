import React, { useState } from "react";
import fakeData from "../../fakeData";
import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import { addToDb } from "../../utilities/fakedb";
const Shop = (props) => {
  const first10 = fakeData.slice(0, 10);
  const [product, setProduct] = useState(first10);
  const [cart, setCart] = useState([]);
  const handleAddProduct = (product) => {
    // console.log("first", product);
    const newCart = [...cart, product];
    setCart(newCart);
    addToDb(product.key);
  };
  return (
    <div className="shop-container">
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
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
<h1>shop</h1>;
