import React, { useContext } from "react";
import classes from "./header.module.css";
import { SlLocationPin } from "react-icons/sl";
import { BiCart } from "react-icons/bi";
import LowerHeader from "./LowerHeader";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { DataContext, DataProvider } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/FireBase";

function Header() {
  // const [{ basket }, dispatch] = useContext({DataProvider});
  const [{ user, basket }, dispatch] = useContext(DataContext);
  // console.log(user);
  const totalItem = basket?.reduce((amount, item) => {
    return amount + item.amount;
  }, 0);
  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header_container}>
          <div className={classes.logo_container}>
            {/* logo */}
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon-logo"
              />
            </Link>
            {/* delivery */}
            <span>{/* icon */}</span>
            <div className={classes.delivery}>
              <span>
                <SlLocationPin />
              </span>
              <div>
                <p>deliverd to</p>
                <span>United States of America</span>
              </div>
            </div>
          </div>
          <div className={classes.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" name="" id="" placeholder="Search product" />
            <BsSearch className="classes.icon-svg" size={40} />
          </div>

          <div className={classes.order_container}>
            <Link to="" className={classes.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg/1920px-Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg.png"
                alt="US Flag"
                style={{ width: "30px" }}
              />
              <select name="" id="">
                <option value="">En</option>
              </select>
            </Link>
            {/* three component */}
            {/* Link to={!user && "/auth"}>user is not exist lets go auth page but user exist lets go readr ={user ? (
                  <>
                    <p> Hello {user?.email?.split("@")[0]} </p>
                    <span>signOut</span> if   */}
            <Link to={!user && "/auth"}>
              <div>
                {user ? (
                  <>
                    <p> Hello {user?.email?.split("@")[0]} </p>
                    <span onClick={() => auth.signOut()}>signOut</span>
                  </>
                ) : (
                  <>
                    <p>Hello signin</p>
                    <span>Account & Lists</span>
                  </>
                )}
              </div>
            </Link>
            {/* orders */}
            <Link to="/orders">
              <p>returns</p>
              <span>& orders</span>
            </Link>
            {/* cart */}
            <Link to="/cart" className={classes.cart}>
              <BiCart size={35} />
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
}

export default Header;
