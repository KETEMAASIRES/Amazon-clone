import React, { useContext, useState } from "react";
import {
  Link,
  Navigate,
  redirect,
  useLocation,
  useNavigate,
} from "react-router-dom";
import classes from "./signUp.module.css";
import { img, linkamazon, type } from "../../Utility/Action.type";
import { auth } from "../../Utility/FireBase";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../component/DataProvider/DataProvider";
import { ClipLoader } from "react-spinners";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [{ user }, dispatch] = useContext(DataContext);
  const [loading, setLoading] = useState({ signIn: false, signUp: false });
  const navigate = useNavigate();
  const navStateData = useLocation();
  // console.log(navStateData);

  // console.log(user);
  // console.log(email,password);
  const authUpdater = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, signIn: true });
    // console.log(e.target.name);
    if (e.target.name === "SignIn") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userinfo) => {
          // console.log(userinfo);
          dispatch({
            type: type.SET_USER,
            user: userinfo.user,
          });
          setLoading({ ...loading, signIn: false });
          navigate(navStateData?.state?.redirect || "/"); //if have navigate if inter navstatedata then state then redirect if not enter to home page
        })
        .catch((error) => {
          setError(error.message);
          // console.log(error.message);
          setLoading({ ...loading, signIn: false });
        });
    } else {
      setLoading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userinfo) => {
          // console.log(userinfo);
          dispatch({
            type: type.SET_USER,
            user: userinfo.user,
          });
          setLoading({ ...loading, signUp: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((error) => {
          setError(error.message);
          setLoading({ ...loading, signUp: false });
        });
    }
  };

  return (
    <section className={classes.loglin}>
      <Link to="/">
        <img src={img} alt="" />
      </Link>
      <div className={classes.loglin_container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "0.85rem",
              color: "#d9534f",
              backgroundColor: "#f8d7da",
              padding: "6px 10px",
              borderRadius: "4px",
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}

        <form action="">
          <div>
            <label htmlFor="email">E-mail</label>]
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={classes.emailsize}
              type="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={classes.passwordinput}
              type="password"
              id="password"
            />
          </div>
          <button type="submit" name="SignIn" onClick={authUpdater}>
            {loading.signIn ? <ClipLoader color="green" /> : "SignIn"}
          </button>
          {error && (
            <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
          )}
        </form>
        <p>
          By continuing, you agree to Amazon's{" "}
          <Link
            to={linkamazon}
            style={{ textDecoration: "none", color: "#0066c0" }}
          >
            Conditions of Use
          </Link>
        </p>
        <button
          type="submit"
          onClick={authUpdater}
          name="Signup"
          className={classes.register_button}
        >
          {loading.signUp ? (
            <ClipLoader color="green" />
          ) : (
            "Creat your amazon account"
          )}
        </button>
        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;
