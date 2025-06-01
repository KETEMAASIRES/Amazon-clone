import React, { useContext, useEffect, useState } from "react";
import LayOut from "../../component/layOut/LayOut";
import { DataContext } from "../../component/DataProvider/DataProvider";
import classes from "./order.module.css";
import { db } from "../../Utility/FireBase";
import ProductCard from "../../component/Product/ProductCard";

function Order() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (user) {
      db.collection(`users`)
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          // console.log(snapshot);
          setOrders(
            snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
          );
        });
    } else {
      setOrders([]);
    }
  }, [user]);
  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>your orders</h2>
          {orders?.length == 0 && (
            <div style={{ padding: "20px" }}>You don't have any orders yet</div>
          )}
          {/* {order items} */}
          <div>
            {orders?.map((eachorder, i) => {
              return (
                <div>
                  <hr />
                  <p>order ID :{eachorder?.id}</p>
                  {eachorder?.data?.basket?.map((order) => (
                    <ProductCard flex={true} product={order} key={order.id} />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Order;
