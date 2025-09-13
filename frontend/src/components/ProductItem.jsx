import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, slug, image, name, price }) => {
  const { currency } = useContext(AppContext);

  return (
    <Link
      to={`/product/${slug}`}
      className="block rounded-2xl border border-gray-200 hover:border-gray-300 shadow-2xl hover:shadow-md transition-all duration-300 bg-white group cursor-pointer"
    >
      <div className="aspect-[4/5] overflow-hidden rounded-t-2xl">
        <img
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
          src={image[0]}
          alt={name}
        />
      </div>

      <div className="p-4">
        <p className="text-gray-800 font-medium text-sm truncate group-hover:text-gray-900">
          {name}
        </p>
        <p className="text-gray-600 text-sm font-semibold mt-1">
          {currency} {price}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
