import React from "react";
import fakeData from "../../fakeData";

const Inventory = () => {
  const handleAddProduct = () => {
    fetch("http://localhost:4200/addProduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fakeData)
    });
  };
  return (
    <div>
      <form action="">
        <p>
          <span>Name : </span><input type="text" />
        </p>
        <p>
          <span>Price : </span><input type="text" />
        </p>
        <p>
          <span>Quantity : </span><input type="text" />
        </p>
        <p>
          <span>Product Image </span><input type="file" />
        </p>
        <button onClick={handleAddProduct}>Add Products</button>
      </form>
    </div>
  );
};

export default Inventory;
