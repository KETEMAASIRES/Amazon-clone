import React from "react";
import classes from "./catagory.module.css";
import { Link } from "react-router-dom";

function CatagoryCard({ data }) {
  // console.log(data);
  return (
    <div className={classes.catagory}>
      <Link to={`/category/${data.category}`}>
        <span>
          <h2>{data.title}</h2>
        </span>
        <img src={data.image} alt="" />
        <p>Shop Now</p>
      </Link>
    </div>
  );
}

export default CatagoryCard;
