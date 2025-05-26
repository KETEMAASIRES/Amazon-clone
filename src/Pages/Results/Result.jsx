import React, { useState, useEffect } from "react";
import LayOut from "../../component/layOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../API/EndPoint";
import classes from "./Result.module.css";
import ProductCard from "../../component/Product/ProductCard";

function Result() {
  const [Result, setResult] = useState([]);
  const { categoryType } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    axios
      .get(`${productUrl}/products/category/${categoryType}`)
      .then((res) => {
        // console.log(res)
        setResult(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results </h1>
        <p style={{ padding: "30px" }}>Category / {categoryType}</p>
        <hr />
        {isLoading ? (
          <Load />
        ) : (
          <div className={classes.products_container}>
            {Result?.map((product) => (
              <ProductCard key={product.id} product={product} renderAdd={true} renderDesc={false} />
            ))}
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Result;
