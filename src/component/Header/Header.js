import React, { useContext } from "react";
import logo from "../../images/logo.png";
import "./Header.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  // console.log(loggedInUser);
  return (
    <div className="header">
      <img src={logo} alt="" />
      <nav>
        <Link to="/">Shop</Link>
        <Link to="/review">Review</Link>
        <Link to="/inventory">Manage Inventory</Link>
        <h4
          style={{
            display: "inline-block",
            textDecoration: "none",
            color: "#fff",
            padding: "10px 14px",
          }}
        >
          {loggedInUser?.displayName}
        </h4>
        {loggedInUser.email && (
          <button onClick={() => setLoggedInUser({})}>Sign Out</button>
        )}
      </nav>
    </div>
  );
};

export default Header;
