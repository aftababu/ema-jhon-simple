import { createContext, useState } from "react";
import "./App.css";
import {
  Header,
  Inventory,
  Login,
  PrivateRoute,
  Productdetail,
  Review,
  Shipment,
  Shop,
} from "./component";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

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
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/shipment" element={<Shipment />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="*" element={<h1>page Not found</h1>} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
