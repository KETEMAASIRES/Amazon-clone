import React from "react";
import CarouselEffect from "../../component/Carousel/CarouselEffect";
import Catagory from "../../component/Catagory/Catagory";
import Product from "../../component/Product/Product";
import LayOut from "../../component/layOut/LayOut";

function Landing() {
  return (
    <LayOut>
      <CarouselEffect />
      <Catagory />
      <Product />
    </LayOut>
  );
}

export default Landing;
