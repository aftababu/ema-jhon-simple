import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../Product/Product";

const Productdetail = () => {
  const { productkey } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    fetch(`http://localhost:4200/product/${productkey}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [productkey]);

  // console.log(product);
  return (
    <div>
      <h1>product detail</h1>
      <Product showAddToCart={false} product={product}></Product>
    </div>
  );
};

export default Productdetail;
