import React from "react";
import { Link } from "react-router-dom";
import classes from "./signUp.module.css";
import { img, linkamazon } from "../../Utility/Action.type";

function Auth() {
  return (
    <section className={classes.loglin}>
      <Link>
        <img src={img} alt="" />
      </Link>
      <div className={classes.loglin_container}>
        <h1>Sign In</h1>
        <form action="">
          <div>
            <label  htmlFor="email">E-mail</label>
            <input className={classes.emailsize} type="email" id="email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input className={classes.passwordinput} type="password" id="password" />
          </div>
          <button>Sign In</button>
        </form>
        <p>
          By continuing, you agree to Amazon's{" "}
          <Link to={linkamazon} style={{ textDecoration: 'none', color: '#0066c0' }}>Conditions of Use</Link>
        </p>
        <button className={classes.register_button}>Creat your amazon account</button>
      </div>
    </section>
  );
}

export default Auth;
