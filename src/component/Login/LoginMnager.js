import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  FacebookAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "./Login";

export const initializeLoginFrameWork = () => {
  const app = initializeApp(firebaseConfig);

  return app;
};
export const handleGoogleSignIn = () => {
  const googleProvider = new GoogleAuthProvider();
  return signInWithPopup(auth, googleProvider)
    .then((res) => {
      const { displayName, email, photoURL } = res.user;
      const signInUser = {
        isSignIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
      };
      return signInUser;
      // console.log(displayName, email, photoURL);
    })
    .catch((err) => {
      console.log(err);
      console.log(err.message);
    });
};

export const handleSignOut = () => {
  return signOut(auth)
    .then((res) => {
      const signOutUser = {
        isSignIn: false,
        name: "",
        email: "",
        photo: "",
      };
      console.log(res);
      return signOutUser;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const handleFbSignIn = () => {
  const fbProvider = new FacebookAuthProvider();
  const auth = getAuth();
  return signInWithPopup(auth, fbProvider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
      user.success = true;
      return user;
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      // const credential = FacebookAuthProvider.credentialFromResult(result);
      // const accessToken = credential.accessToken;
      // console.log(user);
      // // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);
      console.log(error);
      // ...
    });
};

export const createUserwithEmailandPassword = (name, email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((res) => {
      const user = res.user;
      const newUserInfo = user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      verifyEmail();
      return newUserInfo;
      // Signed in
      // console.log(newUserInfo, user);
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.code;
      // newUserInfo.email = "";
      // newUserInfo.password = "";
      newUserInfo.success = false;
      // e.target.password.value = "";
      return newUserInfo;

      // console.log(newUserInfo, user);
    });
};

export const signInwithEmailandPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((res) => {
      // Signed in
      // const user = userCredential.user;
      const newUserInfo = res.user;
      newUserInfo.success = true;
      return newUserInfo;
      // console.log(location.state);

      // console.log("sign in user ", res.user);
      // ...
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.code;
      // newUser.email = "";
      // newUser.password = "";
      newUserInfo.success = false;
      // e.target.password.value = "";
      // setUser(newUser);
      // console.log(newUser);
      return newUserInfo;
    });
};

export const updateUserName = (name) => {
  const user = auth.currentUser;
  updateProfile(user, {
    displayName: name,
  })
    .then((res) => {
      console.log("name updated succesfully");
    })
    .catch((error) => {
      console.log(error);
    });
};

const verifyEmail = (email) => {
  // const auth = getAuth();
  sendEmailVerification(auth.currentUser).then(() => {
    // Email verification sent!
    // ...
  });
};

export const resetPassword = (email) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};
