import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import RelatedProduct from "../components/RelatedProduct";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import axios from "axios";

const Product = () => {
  const { slug } = useParams();
  const { products, currency, addToCart, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const [groupColors, setGroupColors] = useState([]);
  const [showReviewMd, setShowReviewMd] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  // Fetch product data
  const fetchProductData = useCallback(() => {
    const foundProduct = products.find((item) => item.slug === slug);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image && foundProduct.image.length > 0 ? foundProduct.image[0] : "");
      setSelectedSize(null); // Reset selection context on route mutation
    }
  }, [products, slug]);

  // Fetch color relation matrix
  const fetchColorRelation = useCallback(async (groupIdMain) => {
    if (!groupIdMain) return;
    try {
      const res = await axios.get(`${backendUrl}/api/product/getAllGroupIdData`, {
        params: { groupId: groupIdMain }
      });
      if (res.data.success) {
        setGroupColors(res.data.data);
      }
    } catch (error) {
      console.error("Color sync exception:", error.message);
    }
  }, [backendUrl]);

  // Review List Query
  const reviewListByProduct = useCallback(async (productId) => {
    if (!productId) return;
    try {
      const response = await axios.get(`${backendUrl}/api/review/reviewListByProduct`, {
        params: { productId }
      });
      if (response.data.success) {
        setReviews(response.data.reviews);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  }, [backendUrl]);

  // Add Review Action
  const addReview = async (e) => {
    e.preventDefault();
    if (!comment.trim() || !rating) {
      toast.error("Please provide both structural rating and textual comment.");
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/review/addReview`,
        { comment, rating, productId: productData._id },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success(response.data.message || "Review logged inside ledger");
        setComment("");
        setRating(0);
        setShowReviewMd(false);
        reviewListByProduct(productData._id);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Review submission exception");
    }
  };

  // Lifecycle Coordination Effects
  useEffect(() => {
    fetchProductData();
  }, [slug, products, fetchProductData]);

  useEffect(() => {
    if (productData?.productGroupId) {
      fetchColorRelation(productData.productGroupId);
    } else {
      setGroupColors([]);
    }
    if (productData?._id) {
      reviewListByProduct(productData._id);
    }
  }, [productData, fetchColorRelation, reviewListByProduct]);

  if (!productData) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-xs font-black tracking-widest text-neutral-400 uppercase">
        LOCATING MATRIX PROFILE...
      </div>
    );
  }

  return (
    <section className="bg-white text-black min-h-screen px-6 md:px-12 max-w-[1600px] mx-auto pt-10 pb-20">
      
      {/* Top Editorial Splitting Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-neutral-100 pt-8">
        
        {/* ASSET SUITE: Thumbnail Deck + Main View Showcase Panel */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 overflow-hidden">
          
          {/* Vertical Thumbnail Deck */}
          <div className="flex md:flex-col overflow-x-auto md:overflow-y-auto gap-3 md:w-20 w-full flex-shrink-0 scrollbar-none">
            {productData.image?.map((item, index) => (
              <button
                key={index}
                onClick={() => setImage(item)}
                className={`w-16 h-20 md:w-full aspect-[3/4] bg-neutral-50 p-1 border flex-shrink-0 transition-all ${
                  image === item ? "border-black bg-neutral-100" : "border-neutral-200 opacity-60"
                }`}
              >
                <img src={item} className="w-full h-full object-cover filter grayscale" alt="" />
              </button>
            ))}
          </div>

          {/* Core Focal Image Stage */}
          <div className="flex-1 bg-neutral-50 border border-neutral-100 p-4 flex items-center justify-center relative group">
            <div className="aspect-[3/4] w-full max-h-[600px] overflow-hidden flex items-center justify-center">
              <img
                src={image}
                alt={productData.name}
                className="max-h-full max-w-full object-contain transition-transform duration-700 ease-out group-hover:scale-102 filter grayscale contrast-105"
              />
            </div>
            <span className="absolute bottom-4 right-4 text-[9px] font-mono font-bold tracking-widest text-neutral-400 uppercase">
              [ASSET // MASTER]
            </span>
          </div>
        </div>

        {/* PROFILE MATRIX: Core Data Properties Specification Sheet */}
        <div className="lg:col-span-5 flex flex-col text-left space-y-6">
          
          {/* Header Area */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-black animate-pulse" />
              <span className="text-[9px] font-black tracking-[0.35em] text-neutral-400 uppercase">
                PRODUCTION RUN REGISTRY
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tighter uppercase leading-none text-black">
              {productData.name}
            </h1>
            
            {/* Minimal Technical Performance Metrics */}
            <div className="flex items-center gap-4 pt-1">
              <div className="flex items-center text-xs tracking-widest font-black">
                <span className="text-black">★★★★</span>
                <span className="text-neutral-200">★</span>
                <span className="text-[10px] text-neutral-400 ml-2 font-mono">(122)</span>
              </div>
              <span className="text-neutral-200">//</span>
              <span className="text-[9px] font-black tracking-widest text-neutral-400 uppercase">
                INDEX RA-81
              </span>
            </div>
          </div>

          {/* Pricing Tier Display */}
          <p className="text-3xl font-black tracking-tight text-black">
            {currency}{Number(productData.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>

          {/* Profile Core Parameters Narrative Block */}
          <p className="text-xs tracking-wide leading-relaxed text-neutral-500 font-medium border-l-2 border-neutral-100 pl-4">
            {productData.description}
          </p>

          {/* Dynamic Variant Matrix Selection: Clothing Sizes */}
          {productData.category === "Clothing" && (
            <div className="space-y-3 pt-4 border-t border-neutral-100">
              <span className="text-[10px] font-black tracking-[0.25em] text-neutral-400 uppercase block">
                SELECT CLASSIFICATION SIZE
              </span>
              <div className="flex flex-wrap gap-2">
                {productData.sizes?.map((item, index) => {
                  if (item.stock === 0) return null;
                  const isSelected = selectedSize === item.size;
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedSize(item.size)}
                      className={`px-4 py-2.5 border text-xs font-black tracking-widest uppercase transition-all ${
                        isSelected
                          ? "border-black bg-black text-white"
                          : "border-neutral-200 text-neutral-600 hover:border-black bg-white"
                      }`}
                    >
                      <span>{item.size}</span>
                      <span className={`text-[9px] block font-medium tracking-normal lowercase mt-0.5 ${isSelected ? "text-neutral-300" : "text-neutral-400"}`}>
                        stk: {item.stock}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Group Variations Segment: Dynamic Color Anchors */}
          {groupColors && groupColors.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-neutral-100">
              <span className="text-[10px] font-black tracking-[0.25em] text-neutral-400 uppercase block">
                AVAILABLE COLOR COORDINATES
              </span>
              <div className="flex flex-wrap gap-3">
                {groupColors.map((item) => {
                  const isSelected = slug === item.slug;
                  return (
                    <button
                      key={item.productId}
                      onClick={() => navigate(`/product/${item.slug}`)}
                      className={`w-6 h-6 transition-transform duration-200 hover:scale-105 relative ${
                        isSelected ? "ring-2 ring-black ring-offset-2" : "border border-neutral-300"
                      }`}
                      style={{ backgroundColor: item.colorHex }}
                      title={item.colorName}
                    >
                      {isSelected && (
                        <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-white mix-blend-difference">✕</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action Framework Core Operators Group */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-neutral-100">
            <button
              onClick={() => {
                if (productData.category === "Clothing") {
                  if (selectedSize) {
                    addToCart(productData._id, selectedSize);
                  } else {
                    toast.error("Size parameters required for structural clothing components.");
                  }
                } else {
                  addToCart(productData._id);
                }
              }}
              className="w-full bg-black text-white border border-black py-4 text-[10px] font-black tracking-widest uppercase transition-all duration-300 hover:bg-white hover:text-black"
            >
              COMMIT TO CART BAG
            </button>

            <button
              onClick={() => setShowReviewMd(true)}
              className="w-full bg-neutral-50 text-black border border-neutral-200 py-4 text-[10px] font-black tracking-widest uppercase transition-all duration-300 hover:bg-black hover:text-white hover:border-black"
            >
              WRITE LEDGER STATEMENT
            </button>
          </div>

          {/* Logistics Terms Footer Accent */}
          <div className="text-[9px] font-bold tracking-widest text-neutral-400 uppercase pt-4 border-t border-dashed border-neutral-100 space-y-1">
            <p>❯ Authentic profile specification verified.</p>
            <p>❯ Cash on delivery clearance available nationwide.</p>
            <p>❯ Seven-day mechanical inspection return window.</p>
          </div>

        </div>
      </div>

      {/* Narrative Documentation Split Tabs Row */}
      <div className="mt-28 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-black pt-12">
        
        {/* Specification Description Column */}
        <div className="space-y-4 text-left">
          <div className="border-b border-neutral-100 pb-2">
            <h4 className="text-[10px] font-black tracking-[0.25em] uppercase text-black">
              ARCHIVAL SPECIFICATION DOCUMENT
            </h4>
          </div>
          <p className="text-xs tracking-wide leading-relaxed text-neutral-500 font-medium">
            Engineered outside the traditional obsolescence trajectory. This object incorporates precise fabric weave density tracking parameters alongside optimized structural seams to guarantee architectural shape retention under heavy operations.
          </p>
        </div>

        {/* Customer Feed Ledger History */}
        <div className="space-y-4 text-left">
          <div className="border-b border-neutral-100 pb-2 flex justify-between items-center">
            <h4 className="text-[10px] font-black tracking-[0.25em] uppercase text-black">
              COMMUNITY FEED MATRIX
            </h4>
            <span className="text-[10px] font-mono font-bold text-neutral-400">[{reviews.length} VERIFIED LOGS]</span>
          </div>

          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 divide-y divide-neutral-100">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="pt-4 first:pt-0 space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-black font-black tracking-widest font-mono">VAL // {review.rating}.00</span>
                    <span className="text-neutral-400 uppercase font-bold">— {review.userId?.name || "ANONYMOUS NODE"}</span>
                  </div>
                  <p className="text-xs font-medium italic text-neutral-500 tracking-wide">
                    "{review.comment}"
                  </p>
                </div>
              ))
            ) : (
              <p className="text-xs font-medium text-neutral-400 uppercase tracking-widest py-4">
                No telemetry data entries logged yet.
              </p>
            )}
          </div>
        </div>

      </div>

      {/* Complementary Architecture Recommendations Panel */}
      <div className="mt-20">
        <RelatedProduct
          currentProductId={productData._id}
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>

      {/* EDITORIAL REVIEW DATA ENTRY SLIDING DRAWER MODAL */}
      {showReviewMd && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div onClick={() => { setShowReviewMd(false); setRating(0); setComment(""); }} className="absolute inset-0 bg-black/20 backdrop-blur-xs" />
          
          <div className="bg-white w-full max-w-md border-2 border-black p-6 md:p-8 shadow-2xl z-10 relative rounded-sm">
            
            <div className="mb-6 flex items-center justify-between">
              <div>
                <span className="text-[9px] font-black tracking-[0.3em] text-neutral-400 uppercase block mb-1">DATA LOG ENTRY</span>
                <h3 className="text-md font-black tracking-widest uppercase text-black">METRIC FEEDBACK //</h3>
              </div>
            </div>

            <form onSubmit={addReview} className="space-y-6">
              
              {/* Star Selection Array Matrix */}
              <div className="flex justify-center gap-2 py-2 border-y border-neutral-100 bg-neutral-50/50">
                {[...Array(5)].map((_, index) => {
                  const currentRating = index + 1;
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setRating(currentRating)}
                      onMouseEnter={() => setHover(currentRating)}
                      onMouseLeave={() => setHover(null)}
                      className="transition-transform duration-100 active:scale-90"
                    >
                      <FaStar
                        size={22}
                        className={`transition-colors ${
                          currentRating <= (hover || rating) ? "text-black" : "text-neutral-200"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Text Area Description Code */}
              <textarea
                rows="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full border border-neutral-200 text-xs font-semibold tracking-wider p-4 h-32 resize-none bg-neutral-50 focus:bg-white focus:border-black outline-none transition-all placeholder-neutral-400 uppercase"
                placeholder="TYPE PRODUCTION RUN EVALUATION STATEMENT..."
                required
              />

              <div className="flex items-center justify-end gap-3 text-[10px] font-black tracking-widest uppercase">
                <button
                  type="button"
                  onClick={() => {
                    setShowReviewMd(false);
                    setComment("");
                    setRating(0);
                  }}
                  className="px-5 py-3 border border-neutral-200 text-neutral-400 hover:text-black hover:border-black transition-all"
                >
                  ABORT RUN
                </button>
                <button
                  type="submit"
                  className="px-5 py-3 bg-black text-white border border-black transition-all hover:bg-white hover:text-black"
                >
                  TRANSMIT ENTRY
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </section>
  );
};

export default Product;