import React, { useContext } from "react";
import { Rating } from "@mui/material";
import CurrencyFormat from "../currencyFormat/CurrencyFormat";
import classes from "./product.module.css";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { type } from "../../Utility/Action.type";

function ProductCard({ product, flex, renderDesc, renderAdd }) {
  const { id, title, price, image, rating, description } = product;
  const [state, dispatch] = useContext(DataContext);
  const AddtoCart = () => {
    dispatch({
      type: type.ADD_TO_BASKET,
      item: {
        id,
        title,
        price,
        image,
        rating,
        description,
      },
    });
  };
  return (
    <div
      className={`${classes.card_container} ${
        flex ? classes.product_flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div style={{ maxWidth: "690px" }}>{description}</div>}
        <div>
          {/* {rating} */}
          <Rating value={rating?.rate} precision={0.1} />
          {/* {count} */}
          <small>{rating?.count}</small>
        </div>
        <div>
          {/* {price} */}
          <CurrencyFormat amount={price} />
        </div>
        {renderAdd && (
          <button className={classes.button} onClick={AddtoCart}>
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
