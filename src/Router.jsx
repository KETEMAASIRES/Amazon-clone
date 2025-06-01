import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";

import Payment from "./Pages/Payments/Payment";
import Order from "./Pages/Oreders/Order";
import Cart from "./Pages/Cart/Cart";
import Result from "./Pages/Results/Result";
import ProductDetail from "./Pages/productDetail/ProductDetail";
import Auth from "./Pages/Auth/Auth";
import { CheckoutProvider, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProctedRout from "./component/protectRout/ProctedRout";

const stripePromise = loadStripe(
  "pk_test_51RTbYsIRhlI6JMGjXlB3TGKQoYmRQS2xguLxDlVwPHVbxY7uTdqbpq6Wuwajs85b266SOM97bIVdDNpQZ0jGPl1P00A7FKd6rR"
);

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/payments"
          element={
            <ProctedRout
              msg={
                "You must be logged in to make a purchase or proceed to payment."
              }
              redirect={"/payments"}
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProctedRout>
          }
        />
        <Route
          path="/orders"
          element={
            <ProctedRout
              msg={"Please log in to access your order history."}
              redirect={"/orders"}
            >
              <Order />
            </ProctedRout>
          }
        />
        <Route path="/category/:categoryType" element={<Result />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;
