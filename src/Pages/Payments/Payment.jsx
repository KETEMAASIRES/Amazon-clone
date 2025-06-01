import React, { useContext, useState } from "react";
import LayOut from "../../component/layOut/LayOut";
import classes from "./payment.module.css";
import { DataContext } from "../../component/DataProvider/DataProvider";
import ProductCard from "../../component/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../component/currencyFormat/CurrencyFormat";
import { axiosInstance } from "../../API/axios";

import { ClipLoader } from "react-spinners";

import { db } from "../../Utility/FireBase";
import { useNavigate } from "react-router-dom";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  console.log(db);
  const totalItem = basket?.reduce((amount, item) => {
    return amount + item.amount;
  }, 0);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const [cardErr, setCardErr] = useState(null);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const handleChange = (e) => {
    e?.error?.message ? setCardErr(e?.error?.message) : setCardErr("");
  };
  const handlePayment = async (e) => {
    e.preventDefault();
    //contact back-end function and client side /react side conformation use stripe pluse orders save to fireBase then clear basket.
    try {
      setProcessing(true);
      const response = await axiosInstance({
        method: "post",
        url: `/payment/create?total=${total * 100}`,
      });
      // console.log(response.data);
      const clientSecret = response.data?.clientSecret;
      // console.log(clientSecret);
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });
      console.log(paymentIntent);
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
      // await setDoc(doc(db, "users", user.uid, "orders", paymentIntent.id), {
      //   basket,
      //   amount: paymentIntent.amount,
      //   created: paymentIntent.created,
      // });
      setProcessing(false);
      navigate("/orders", { state: { msg: "you have new order place" } });
      dispatch({ type: "cleanCart" });
    } catch (error) {
      console.log(error.message);
      setProcessing(false);
    }
  };
  return (
    <LayOut>
      <div className={classes.payment_container}>
        checkout ({totalItem}) items
      </div>
      <section className={classes.payment}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 react lane</div>
            <div>san diego</div>
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          .<h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard key={item.id} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {cardErr && <small style={{ color: "red" }}>{cardErr}</small>}
                <CardElement onChange={handleChange} />
                <div className={classes.payment_price}>
                  <div
                    className={classes.total_price}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                      paddingLeft: "40px",
                    }}
                  >
                    <span>Total order</span>
                    <p>
                      <CurrencyFormat amount={total} />
                    </p>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loader}>
                        <ClipLoader color="grey" size={14} />
                        <p>please wait........</p>
                      </div>
                    ) : (
                      "Pay now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
