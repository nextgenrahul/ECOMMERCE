import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/images/assets";
import RelatedProduct from "../components/RelatedProduct";

const Product = () => {
  const { productId } = useParams();
  const { products, currency } = useContext(AppContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
    const [size, setSize] = useState("");


  const fetchProductData = async () => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Image */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                src={item}
                key={index}
                onClick={() => setImage(item)} // ✅ Click to change main image
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="Main Product" />
          </div>
        </div>
        {/* ---------Product Info------------ */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img className="w-3.5" src={assets.star_icon} alt="" />
            <img className="w-3.5" src={assets.star_icon} alt="" />
            <img className="w-3.5" src={assets.star_icon} alt="" />
            <img className="w-3.5" src={assets.star_icon} alt="" />
            <img className="w-3.5" src={assets.star_dull_icon} alt="" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size </p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border border-gray-50  py-2 px-4 bg-gray-100 ${
                    item === size ? "border-orange-500" : ""
                  }`}
                  key={index}
                >
                  {" "}
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => addToCart(productData._id, size)} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/* ----------- Description & Review Section ----------- */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            E-commerce is the buying and selling of goods or services over the
            internet. It enables businesses to reach global customers, offers
            convenience, secure payments, and transforms traditional shopping
            into digital experiences.
          </p>
          <p>
            E-commerce streamlines procurement by enabling real-time inventory
            updates, automated reordering, and supplier integration, ensuring
            timely availability of goods while reducing operational costs and
            improving supply chain efficiency."
          </p>
        </div>
        {/* Display Related Product */}
         <RelatedProduct
        category={productData.category}
        subCategory={productData.subCategory}
      />
      </div>
    </div>
  ) : null;
};

export default Product;
