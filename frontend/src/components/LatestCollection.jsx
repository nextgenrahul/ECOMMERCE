import React, { useContext } from "react";
import Title from "./Title";
import { AppContext } from "../context/AppContext";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
    const { products } = useContext(AppContext);
  return (

    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"Latest"} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut eum quos
          dolor a atque officia adipisci ea consequatur?
        </p>
      </div>
      {/* Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-4">
        {
            products?.map((item, index) => (
                <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
            ))
        }
      </div>
    </div>
  );
};

export default LatestCollection;
