import React, { useEffect, useState } from "react";
import LayOut from "../../component/layOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../API/EndPoint";
import ProductCard from "../../component/Product/ProductCard";
import Load from "../../component/Loader/Load";

function ProductDetail() {
  const { productId } = useParams();
  // console.log(productId);
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        // console.log(res)
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [productId]);
  return (
    <LayOut>
      {isLoading ? (
        <Load />
      ) : (
        <ProductCard
          product={product}
          flex={true}
          renderDesc={true}
          renderAdd={true}
        />
      )}
    </LayOut> //isLoading if present display load if not display productcard.
  );
}

export default ProductDetail;
