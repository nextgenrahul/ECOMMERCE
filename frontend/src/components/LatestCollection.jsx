import React, { useContext } from "react";
import Title from "./Title";
import { AppContext } from "../context/AppContext";
import ProductItem from "./ProductItem";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { Range } from 'react-range';

const LatestCollection = () => {
  const { backendUrl } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit] = useState(5);

  const getProductsData = async () => {
    try {
      if (page && limit) {
        const response = await axios.get(
          backendUrl + `/api/product/paginateProducts`,
          { params: { page, limit } }
        );
        if (response.data.success) {
          setProducts(response.data.data);
          setTotalPages(response.data.totalPages);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, [page, setPage]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"Latest"} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut eum quos
          dolor a atque officia adipisci ea consequatur?
        </p>
      </div>
      {/* Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-4">
        {products?.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            slug={item.slug}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
      {/* {products && (
        <div className="pagination">
          <span
            className={`${page > 1 ? "" : "pagination_disabled"}`}
            onClick={() => setPage(page > 1 ? page - 1 : 1)}
          >
            ◀
          </span>
          {[...Array(totalPages)]?.map((_, i) => {
            return (
              <span
                className={`${page == i + 1 ? "pagination_selected" : ""}`}
                onClick={() => setPage(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}

          <span
            className={`${page < totalPages ? "" : "pagination_disabled"}`}
            onClick={() => setPage(page + 1)}
          >
            ▶
          </span>
        </div>
      )} */}
      <ReactPaginate
        previousLabel={"← Prev"}
        nextLabel={"Next →"}
        breakLabel={"..."}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={(event) => setPage(event.selected + 1)}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default LatestCollection;
