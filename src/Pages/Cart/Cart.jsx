import React, { useContext } from "react";
import LayOut from "../../component/layOut/LayOut";
import classes from "./cart.module.css";
import { DataContext } from "../../component/DataProvider/DataProvider";
import ProductCard from "../../component/Product/ProductCard";
import CurrencyFormat from "../../component/currencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { type } from "../../Utility/Action.type";

function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  // console.log(basket); //total  is sum of the priviouse amount value and item of current vaule  eg let a =[4,5,6] and let total =a.reducer((prev,cur)=>{return prev+curr},3(intail or starting value of the perivouse)) colg total =4+5+6 =15+3 =18
  const increment = (item) => {
    dispatch({
      type: type.ADD_TO_BASKET,
      item,
    });
  };
  const decrement = (id) => {
    dispatch({
      type: type.REMOVE_FROM_BASKET,
      id,
    });
  };
  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.Cart_container}>
          <h2>Hello</h2>
          <h3>Your shoping basket</h3>
          <hr />
          {basket?.length == 0 ? (
            <p>opps ! no items in your Cart</p>
          ) : (
            basket?.map((item, i) => {
              return (
                <section className={classes.card_product}>
                  <ProductCard
                    key={i}
                    product={item}
                    renderDesc={true}
                    flex={true}
                    renderAdd={false}
                  />
                  <div className={classes.btn_container}>
                    <button
                      className={classes.btn}
                      onClick={() => increment(item)}
                    >
                      <BiSolidUpArrow />
                    </button>
                    <span>{item.amount}</span>
                    <button
                      className={classes.btn}
                      onClick={() => decrement(item.id)}
                    >
                      <BiSolidDownArrow />
                    </button>
                  </div>
                </section>
              );
            })
          )}
        </div>
        {basket?.length !== 0 && (
          <div className={classes.subtotal}>
            <div>
              <p>SubTotal({basket?.length}items)</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payments">continue to checkout</Link>
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Cart;
