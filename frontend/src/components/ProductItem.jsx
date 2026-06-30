import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, slug, image, name, price }) => {
  const { currency } = useContext(AppContext);

  // Safely grab the first asset in the array, fallback gracefully if empty
  const primaryImage = image && image.length > 0 ? image[0] : "";

  return (
    <Link
      to={`/product/${slug}`}
      className="block bg-white text-black group cursor-pointer border border-transparent hover:border-neutral-100 p-2 transition-all duration-300"
    >
      {/* High-Density Editorial Aspect Frame */}
      <div className="aspect-[3/4] overflow-hidden bg-neutral-50 relative">
        {primaryImage ? (
          <img
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            src={primaryImage}
            alt={name}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-neutral-100 text-[10px] font-bold tracking-widest text-neutral-400">
            NO ASSET
          </div>
        )}

        {/* Premium Inverted Hover Overlay Shield */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick View Tag Indicator */}
        <span className="absolute bottom-3 left-3 bg-white text-black text-[9px] font-black tracking-widest uppercase px-2 py-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
          VIEW ITEM ❯
        </span>
      </div>

      {/* Meta Information Matrix */}
      <div className="pt-4 pb-2 space-y-1.5 text-left">
        <h4 className="text-xs font-bold tracking-wide text-neutral-800 truncate uppercase group-hover:text-black transition-colors">
          {name}
        </h4>
        
        <div className="flex items-center justify-between text-xs">
          <p className="font-black text-black tracking-tight">
            {currency} {Number(price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
          <span className="text-[9px] font-black tracking-widest text-neutral-300 uppercase group-hover:text-neutral-400 transition-colors">
            CRU.01
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;