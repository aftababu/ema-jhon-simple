import "./App.css";
import Header from "./component/Header/Header";

import Productdetail from "./component/Productdetail/Productdetail";
import Review from "./component/Review/Review";
import Shop from "./component/Shop/Shop";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/review" element={<Review />} />
        <Route path="/inventory" element={<h1>Inventory is coming</h1>} />
        <Route path="/product/:productkey" element={<Productdetail />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
