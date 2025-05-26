import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";

import Payment from "./Pages/Payments/Payment";
import Order from "./Pages/Oreders/Order";
import Cart from "./Pages/Cart/Cart";
import Result from "./Pages/Results/Result";
import ProductDetail from "./Pages/productDetail/ProductDetail";
import Auth from "./Pages/Auth/Auth";

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/payments" element={<Payment />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/category/:categoryType" element={<Result />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;
