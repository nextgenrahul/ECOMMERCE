import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, slug, image, name, price }) => {
  const { currency } = useContext(AppContext);
  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${slug}`}>
      <div className="overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out"
          src={image[0]}
          alt=""
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency} {price}
      </p>
    </Link>
  );
};

export default ProductItem;
