import { createContext, useState } from "react";
import "./App.css";
import Header from "./component/Header/Header";
import Login from "./component/Login/Login";

import Productdetail from "./component/Productdetail/Productdetail";
import Review from "./component/Review/Review";
import Shipment from "./component/Shipment/Shipment";
import Shop from "./component/Shop/Shop";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import PrivateRoute from "./component/PrivateRoute/PrivateRoute";

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <h3>email : {loggedInUser?.email}</h3>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Shop />} exact />
        <Route path="/review" element={<Review />} />
        <Route path="/product/:productkey" element={<Productdetail />} />

        <Route element={<PrivateRoute />}>
          <Route path="/inventory" element={<h1>Inventory is coming</h1>} />
          <Route path="/shipment" element={<Shipment />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="*" element={<h1>gskjhsgdkajgvdkshagdksjdkljas</h1>} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
