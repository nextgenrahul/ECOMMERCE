import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import ProductItem from './ProductItem';
import Title from './Title';

const RelatedProduct = ({ category, subCategory }) => {
    const { products } = useContext(AppContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if(products.length > 0){
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item) => category === item.category)
            productsCopy = productsCopy.filter((item) => subCategory === item.subCategory)
            setRelated(productsCopy)
        }
    },[products])
  return (
     <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
       {
          related.map((item, index) => (
            <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
          ))
        }
      </div>
    </div>
  )
}

export default RelatedProduct