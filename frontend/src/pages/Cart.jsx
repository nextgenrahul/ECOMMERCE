import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/images/assets';
import { Link } from 'react-router-dom';

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    updateQuantity,
    navigate,
    isLoggedin,
  } = useContext(AppContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        const matchingProduct = products.find((e) => e._id === items);
        if (matchingProduct) {
          for (const sizeKey in cartItems[items]) {
            if (cartItems[items][sizeKey] > 0) {
              tempData.push({
                _id: items,
                size: sizeKey,
                slug: matchingProduct.slug,
                quantity: cartItems[items][sizeKey],
              });
            }
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <section className="bg-white text-black min-h-screen">
      <div className="px-6 md:px-12 max-w-[1600px] mx-auto pt-10 pb-20">
        
        {/* Section Title */}
        <div className="border-t border-neutral-100 pt-8 mb-12">
          <div className="flex items-col sm:items-row justify-between items-start sm:items-end gap-2">
            <div>
              <span className="text-[9px] font-black tracking-[0.35em] text-neutral-400 uppercase block mb-1">
                SYSTEM MANIFEST
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tighter uppercase text-black">
                YOUR BAG<span className="text-neutral-300"> //</span>
              </h2>
            </div>
            <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
              [{cartData.length} ITEM{cartData.length !== 1 ? 'S' : ''}]
            </span>
          </div>
        </div>

        {cartData.length === 0 ? (
          /* Empty Manifest State */
          <div className="border border-dashed border-neutral-200 py-24 flex flex-col items-center justify-center text-center px-4 rounded-sm bg-neutral-50/50">
            <span className="text-xs font-black tracking-[0.25em] text-neutral-400 uppercase mb-3">
              BAG RETRIEVAL EMPTY
            </span>
            <p className="text-[11px] tracking-wide text-neutral-400 max-w-xs mb-8">
              No product item signatures have been allocated to your active checkout session matrix.
            </p>
            <Link
              to="/collection"
              className="px-8 py-3 bg-black text-white text-xs font-black tracking-widest uppercase border border-black transition-all hover:bg-white hover:text-black"
            >
              RETURN TO CATALOG
            </Link>
          </div>
        ) : (
          /* Two-Column Split Layout Grid */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            
            {/* Left Column: Active Items List */}
            <div className="lg:col-span-2 divide-y divide-neutral-100 border-b border-neutral-100">
              {cartData.map((item) => {
                const productData = products.find((product) => product._id === item._id);
                if (!productData) return null;

                const primaryImage = productData.image && productData.image.length > 0 ? productData.image[0] : "";
                const uniqueItemKey = `${item._id}-${item.size}`;

                return (
                  <div
                    key={uniqueItemKey}
                    className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 group animate-fade-in"
                  >
                    {/* Item Meta Specifications */}
                    <div className="flex items-start gap-6 flex-1">
                      <Link to={`/product/${productData.slug}`} className="bg-neutral-50 border border-neutral-100 p-1 flex-shrink-0">
                        <img
                          className="w-16 h-20 object-cover filter grayscale hover:grayscale-0 transition-all duration-300"
                          src={primaryImage}
                          alt={productData.name}
                        />
                      </Link>
                      
                      <div className="space-y-1.5 text-left">
                        <h4 className="text-xs font-bold tracking-wide text-neutral-800 uppercase group-hover:text-black transition-colors">
                          {productData.name}
                        </h4>
                        <div className="flex items-center gap-4 text-xs">
                          <p className="font-black text-black">
                            {currency} {Number(productData.price).toLocaleString()}
                          </p>
                          {item.size !== "undefined" && item.size !== "" && (
                            <span className="text-[10px] font-black bg-neutral-100 px-2 py-0.5 border border-neutral-200 tracking-wider">
                              SIZE: {item.size}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Operational Controls Block */}
                    <div className="flex items-center justify-between sm:justify-end gap-8 border-t border-dashed border-neutral-100 sm:border-0 pt-4 sm:pt-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black text-neutral-400 tracking-wider uppercase">QTY:</span>
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val !== "" && val !== "0") {
                              updateQuantity(item._id, item.size, Number(val), productData.sizes);
                            }
                          }}
                          className="w-14 border border-black bg-white px-2 py-1 text-center text-xs font-bold focus:outline-none"
                        />
                      </div>

                      <button
                        onClick={() => updateQuantity(item._id, item.size, 0, productData.sizes)}
                        className="p-2 text-neutral-400 hover:text-black transition-colors"
                        title="Remove signature node"
                      >
                        <img
                          className="w-4 filter brightness-0 opacity-60 hover:opacity-100 transition-opacity"
                          src={assets.bin_icon}
                          alt="Delete"
                        />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Right Column: Checkout Processing Container */}
            <div className="bg-neutral-50/50 border border-neutral-100 p-6 space-y-4 rounded-sm">
              <CartTotal />
              
              <button
                onClick={() => navigate(isLoggedin ? "/place-order" : "/login")}
                className="w-full bg-black text-white text-[10px] font-black tracking-widest py-4 border border-black transition-all hover:bg-white hover:text-black uppercase"
              >
                PROCEED TO CHECKOUT
              </button>

              <div className="flex items-center justify-center gap-2 text-[9px] font-bold text-neutral-400 tracking-widest uppercase pt-2">
                <span className="h-1 w-1 bg-neutral-300 rounded-full" />
                <span>Encrypted Logistics Session</span>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};

export default Cart;