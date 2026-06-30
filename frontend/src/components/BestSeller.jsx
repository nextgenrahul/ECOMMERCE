import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(AppContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      const bestProduct = products.filter((item) => item.bestseller);
      setBestSeller(bestProduct.slice(0, 5));
    }
  }, [products]);

  return (
    <section className="py-20 px-6 md:px-12 max-w-[1600px] mx-auto border-t border-neutral-100">
      
      {/* Asymmetric Left-Heavy Layout Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
        <div className="max-w-xl">
          <span className="text-[10px] font-black tracking-[0.3em] text-neutral-400 uppercase block mb-3">
            Curated Editions
          </span>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase text-black">
            BEST SELLERS<span className="text-neutral-300"> //</span>
          </h2>
        </div>
        
        <div className="max-w-md lg:text-right">
          <p className="text-xs tracking-wide leading-relaxed text-neutral-500 font-medium">
            A precise collection of our most requested foundational garments. Built without compromise, engineered for permanent daily rotation.
          </p>
        </div>
      </div>

      {/* High-Performance Micro Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-12">
        {bestSeller.map((item) => (
          <div 
            key={item._id} 
            className="transition-all duration-300 hover:opacity-80"
          >
            <ProductItem 
              id={item._id} 
              name={item.name} 
              image={item.image} 
              slug={item.slug} 
              price={item.price} 
            />
          </div>
        ))}
      </div>

      {/* Fallback state if catalog sync is pending */}
      {bestSeller.length === 0 && (
        <div className="w-full py-12 flex items-center justify-center border border-dashed border-neutral-200">
          <span className="text-xs font-semibold tracking-widest text-neutral-400 uppercase">
            Syncing curation matrix...
          </span>
        </div>
      )}
    </section>
  );
};

export default BestSeller;