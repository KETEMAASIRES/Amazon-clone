import { useContext, useEffect, useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import CarouselEffect from "./component/Carousel/CarouselEffect";
// import Catagory from "./component/Catagory/Catagory";
// import Header from "./component/Header/Header";
// import Product from "./component/Product/Product";
import Routing from "./Router";

// import Landing from "./Pages/Landing/Landing";
// import Routing from "./Router";
// import Payment from "./Pages/Payments/Payment";
// import Order from "./Pages/Oreders/Order";
// import Cart from "./Pages/Cart/Cart";
// import SignUp from "./Pages/Auth/SignUp";
// import { Route, Router, Routes } from "react-router-dom";
import { type } from "./Utility/Action.type";
import { auth } from "./Utility/FireBase";
import { DataContext } from "./component/DataProvider/DataProvider";

function App() {
  const [{user}, dispatch] = useContext(DataContext)
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // console.log(first);
        dispatch({
          type: type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: type.SET_USER,
          user: null,
        });
      }
    });
  }, []);
  return <Routing />;
}

export default App;
