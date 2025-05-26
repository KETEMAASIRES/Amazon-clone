import React from "react";
import { catagoryInfo } from "./CatagoryFlitor";
import CatagoryCard from "./CatagoryCard";
import classes from "./catagory.module.css";

function Catagory() {
  //   console.log(catagoryInfo);
  return (
    <section className={classes.catagory_container}>
      {catagoryInfo.map((infos, i) => (
        <CatagoryCard key={i} data={infos} />
      ))}
    </section>
  );
}

export default Catagory;
