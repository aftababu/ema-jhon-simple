import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  createUserwithEmailandPassword,
  handleFbSignIn,
  handleGoogleSignIn,
  handleSignOut,
  initializeLoginFrameWork,
  resetPassword,
  signInwithEmailandPassword,
  updateUserName,
} from "./LoginMnager";
import { getAuth, updateProfile } from "firebase/auth";

initializeLoginFrameWork();
export const auth = getAuth();
function Login() {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  // const { from } = location?.state || { from: "/" };

  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
    error: "",
    success: false,
  });

  const signIn = () => {
    handleGoogleSignIn().then((res) => {
      handleResponse(res, true);
    });
  };

  const signOut = () => {
    handleSignOut().then((res) => {
      handleResponse(res, false);
    });
  };
  const fbSignIn = () => {
    handleFbSignIn().then((res) => {
      handleResponse(res, true);
    });
  };
  const handleResponse = (res, Redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (Redirect) {
      navigate(from);
    }
  };
  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === "name") {
      isFieldValid = /^[a-z ,.'-]+$/i.test(e.target.value);
    }
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }

    if (e.target.name === "password") {
      const isPassWordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPassWordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      // newUserInfo.name = e.target.value;
      setUser(newUserInfo);
      console.log(user);
    } else {
      const newUserInfo = { ...user };
      newUserInfo["name"] = "";
      newUserInfo["email"] = "";
      newUserInfo["password"] = "";
      setUser(newUserInfo);
      console.log(newUserInfo);
    }
  };
  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserwithEmailandPassword(user.name, user.email, user.password).then(
        (res) => {
          // setUser(res);
          // setLoggedInUser(res);
          updateUserName(user.name);
          handleResponse(res, true);
          // console.log(user);
          // navigate("/login");
        }
      );
    }
    if (!newUser && user.email && user.password) {
      signInwithEmailandPassword(user.email, user.password).then((res) => {
        handleResponse(res, true);
      });
    }
    e.preventDefault();
  };

  return (
    <div style={{ textAlign: "center" }}>
      {user?.isSignIn ? (
        <button onClick={() => signOut()}>sign out</button>
      ) : (
        <>
          <button onClick={() => signIn()}>sign in</button>
          <button onClick={() => fbSignIn()}>Sign In With Facebook</button>
        </>
      )}
      {user.isSignIn && (
        <div>
          <h2>Welcome {user.name}</h2>
          <p>email : {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}{" "}
      <br />
      <input
        type="checkbox"
        name="newUser"
        onChange={() => setNewUser(!newUser)}
      />
      <label htmlFor="newUser">NewUser</label>
      <form onSubmit={handleSubmit}>
        {newUser && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            onBlur={handleBlur}
          />
        )}

        <br />
        <input
          type="email"
          placeholder="Email"
          name="email"
          onBlur={handleBlur}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onBlur={handleBlur}
          required
        />
        <br />
        <input type="submit" value={newUser ? "Sign Up" : "Sign in"} />
      </form>
      <button onClick={() => resetPassword(user.email)}>forgot password</button>
      <h3 style={{ color: "red" }}>{user.error}</h3>
      {user.success && (
        <h3 style={{ color: "green" }}>
          user {newUser ? "Created" : "Loged In"} SuccesFully
        </h3>
      )}
    </div>
  );
}

export default Login;
