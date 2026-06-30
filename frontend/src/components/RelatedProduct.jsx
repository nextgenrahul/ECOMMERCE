import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import ProductItem from './ProductItem';

const RelatedProduct = ({ currentProductId, category, subCategory }) => {
  const { products } = useContext(AppContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      // Modern matching filters: match classifications while excluding current active item
      const filteredMatches = products.filter((item) => {
        const matchesCategory = category === item.category;
        const matchesSub = subCategory === item.subCategory;
        const isNotCurrent = item._id !== currentProductId;
        return matchesCategory && matchesSub && isNotCurrent;
      });

      // Uniformly limit to a clean 4-item editorial row display layout
      setRelated(filteredMatches.slice(0, 4));
    }
  }, [products, category, subCategory, currentProductId]);

  if (related.length === 0) return null;

  return (
    <section className="py-24 px-6 md:px-12 max-w-[1600px] mx-auto border-t border-neutral-100">
      
      {/* Asymmetric Section Header Layout */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-16">
        <div className="max-w-xl">
          <span className="text-[10px] font-black tracking-[0.3em] text-neutral-400 uppercase block mb-3">
            COMPLEMENTARY ACCENTS
          </span>
          <h3 className="text-xl md:text-2xl font-black tracking-tighter uppercase text-black">
            COMPLETE THE SYSTEM<span className="text-neutral-300"> //</span>
          </h3>
        </div>
        
        <div className="max-w-xs lg:text-right">
          <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
            UNIFORM SYNC MATRIX
          </span>
        </div>
      </div>

      {/* Grid Rendering Execution Frame */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
        {related.map((item) => (
          <div 
            key={item._id} 
            className="transition-all duration-300 hover:opacity-90"
          >
            <ProductItem 
              id={item._id} 
              slug={item.slug} 
              name={item.name} 
              price={item.price} 
              image={item.image} 
            />
          </div>
        ))}
      </div>

    </section>
  );
};

export default RelatedProduct;