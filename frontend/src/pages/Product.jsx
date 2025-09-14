import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/images/assets";
import RelatedProduct from "../components/RelatedProduct";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import axios from "axios";

const Product = () => {
  const { slug } = useParams();
  const { products, currency, addToCart, backendUrl } = useContext(AppContext);

  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [activeProductId, setActiveProductId] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [groupColors, setGroupColors] = useState([]);
  const [showReviewMd, setShowReviewMd] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  const navigate = useNavigate();

  // Fetch product data
  const fetchProductData = useCallback(() => {
    const foundProduct = products.find((item) => item.slug === slug);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]);
    }
  }, [products, slug]);

  // Navigate to product
  const productNavigate = (slug) => {
    navigate(`/product/${slug}`);
  };

  // Fetch color relation
  const fetct_color_relation = useCallback(
    async (groupIdMain) => {
      try {
        if (groupIdMain) {
          const res = await axios.get(
            `${backendUrl}/api/product/getAllGroupIdData`,
            { params: { groupId: groupIdMain } }
          );

          if (res.data.success) {
            setGroupColors(res.data.data);
          } else {
            console.log("No data:", res.data.message);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    },
    [backendUrl]
  );

  // Add Review
  const addReview = async () => {
    try {
      if (comment && rating) {
        const reviewObj = {
          comment,
          rating,
          productId: productData._id,
        };

        const response = await axios.post(
          `${backendUrl}/api/review/addReview`,
          reviewObj,
          { withCredentials: true }
        );

        if (response.data.success) {
          reviewListByProduct();
          toast.success(response.data.message);
          setComment("");
          setRating(0);
          setShowReviewMd(false);
        } else {
          toast.error(response.data.message);
        }
      } else {
        toast.error("Please provide both rating and comment.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while submitting review.");
    }
  };

  // Review List
  const reviewListByProduct = useCallback(async () => {
    if (productData._id) {
      try {
        const response = await axios.get(
          `${backendUrl}/api/review/reviewListByProduct`,
          { params: { productId: productData._id } }
        );

        if (response.data.success) {
          setReviews(response.data.reviews);
        } else {
          console.log("No reviews found");
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }
  }, [backendUrl, productData._id]);

  // Effects
  useEffect(() => {
    fetchProductData();
  }, [slug, products, fetchProductData]);

  useEffect(() => {
    if (productData?.productGroupId) {
      fetct_color_relation(productData.productGroupId);
    }
  }, [productData?.productGroupId, fetct_color_relation]);

  useEffect(() => {
    if (productData?._id) {
      reviewListByProduct();
    }
  }, [productData?._id, reviewListByProduct]);

  return productData ? (
    <div className="border-t pt-10 transition-opacity ease-in duration-500 opacity-100 px-10">
      {/* Product Section */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 overflow-hidden flex flex-col-reverse gap-3 sm:flex-row">
          {/* Thumbnail Images */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:justify-normal sm:w-[14%] w-full pr-1">
            {productData.image.map((item, index) => (
              <img
                key={index}
                src={item}
                onClick={() => setImage(item)}
                className={`w-[18%] sm:w-full sm:mb-2 flex-shrink-0 cursor-pointer border rounded-lg object-cover transition-all duration-200 hover:shadow-md hover:border-gray-400 ${image === item ? "border-2 border-orange-500 shadow" : "border border-gray-200"
                  }`}
                alt={`Thumbnail ${index + 1}`}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="w-full sm:w-[72%]">
            <div className="w-full aspect-[4/5] bg-white border border-gray-200 rounded-xl shadow-sm flex items-center justify-center overflow-hidden">
              <img
                src={image}
                alt="Main Product"
                className="max-h-[92%] max-w-[92%] object-contain"
              />
            </div>
          </div>
        </div>

        {/* Product Info */}
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

          {/* Sizes */}
          {productData.category === "Clothing" && (
            <div className="my-6">
              <p className="text-base font-medium mb-2">Select Size</p>
              <div className="flex flex-wrap gap-3">
                {productData.sizes?.map((item, index) => {
                  const isSelected = selectedSize === item.size;
                  return item.stock !== 0 ? (
                    <div
                      key={index}
                      onClick={() => setSelectedSize(item.size)}
                      className={`w-24 p-2 rounded shadow border cursor-pointer hover:shadow-md transition ${isSelected
                        ? "border-orange-500 bg-orange-50"
                        : "bg-white"
                        }`}
                    >
                      <p className="text-sm font-semibold text-center">
                        {item.size}
                      </p>
                      <p className="text-xs text-gray-500 text-center">
                        Stock: {item.stock}
                      </p>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}

          {/* Group Colors */}
          {groupColors && (
            <div className="my-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                {groupColors.length === 0 ? "" : "Color Group Products"}
              </h2>

              {groupColors.length !== 0 && (
                <div className="flex flex-wrap gap-4">
                  {groupColors.map((item) => {
                    const isSelected =
                      activeProductId === item.productId || slug === item.slug;

                    return (
                      <div
                        key={item.productId}
                        onClick={() => {
                          productNavigate(item.slug);
                          setActiveProductId(item.productId);
                        }}
                        className={`w-12 h-12 rounded-full cursor-pointer transition-transform duration-200 hover:scale-105 ${isSelected
                          ? "ring-2 ring-orange-500 ring-offset-2"
                          : "ring-1 ring-gray-300"
                          }`}
                        style={{ backgroundColor: item.colorHex }}
                        title={item.colorName}
                      ></div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 mt-4">
            <button
              onClick={() => addToCart(productData._id, selectedSize)}
              className="bg-black text-white border-2 border-black px-7 py-3 text-sm rounded-md transition-all duration-300 hover:bg-white hover:text-black active:bg-gray-800"
            >
              ADD TO CART
            </button>

            {productData._id && (
              <button
                onClick={() => setShowReviewMd(true)}
                className="text-black border-2 border-yellow-400 bg-yellow-100 px-7 py-3 text-sm rounded-md transition-all duration-300 hover:bg-yellow-300 active:bg-yellow-400"
              >
                Rate
              </button>
            )}
          </div>

          <hr className="mt-8 sm:w-4/5" />

          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description & Reviews */}
      <div className="mt-20 flex flex-col md:flex-row gap-6">
        {/* Description */}
        <div className="w-full md:w-1/2">
          <div className="border-b">
            <p className="px-5 py-3 text-sm font-medium text-gray-700">
              Description
            </p>
          </div>
          <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-600">
            <p>
              E-commerce is the buying and selling of goods or services over the
              internet. It enables businesses to reach global customers, offers
              convenience, secure payments, and transforms traditional shopping
              into digital experiences.
            </p>
          </div>
        </div>

        {/* Reviews */}
        <div className="w-full md:w-1/2">
          <div className="border-b">
            <p className="px-5 py-3 text-sm font-medium text-gray-700">
              Reviews ({reviews.length})
            </p>
          </div>
          <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-600">
            <h3 className="text-lg font-semibold mb-2 text-black">
              Customer Reviews
            </h3>
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="mb-3 border-b pb-2">
                  <p className="text-yellow-500">⭐ {review.rating} / 5</p>
                  <p className="text-sm text-gray-800 italic">
                    "{review.comment}"
                  </p>
                  <p className="text-xs text-gray-500">
                    – {review.userId?.name}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-20">
        <RelatedProduct
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>

      {/* Review Modal */}
      {showReviewMd && (
        <div className="fixed inset-0 bg-[#f8f8f698] bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md p-6 rounded-xl shadow-2xl">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Leave a Review
            </h1>

            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, index) => {
                const currentRating = index + 1;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setRating(currentRating)}
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(null)}
                  >
                    <FaStar
                      size={30}
                      className={`transition-colors ${currentRating <= (hover || rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                        }`}
                    />
                  </button>
                );
              })}
            </div>

            <textarea
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Write your thoughts about the product..."
            ></textarea>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={addReview}
                className="bg-yellow-400 text-white font-semibold px-5 py-2 rounded-md hover:bg-yellow-500 transition"
              >
                Submit
              </button>
              <button
                onClick={() => {
                  setShowReviewMd(false);
                  setComment("");
                  setRating(0);
                }}
                className="bg-gray-700 text-white px-5 py-2 rounded-md hover:bg-gray-800 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : null;
};

export default Product;
