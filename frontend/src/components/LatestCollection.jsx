import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import ProductItem from "./ProductItem";
import axios from "axios";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";

const LatestCollection = () => {
  const { backendUrl } = useContext(AppContext);
  const [searchParams] = useSearchParams();
  
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit] = useState(20);
  const [loading, setLoading] = useState(false);

  // Read AI mode and query parameters directly from the URL
  const searchQuery = searchParams.get("search") || "";
  const isAiMode = searchParams.get("aiMode") === "true";

  const getProductsData = async () => {
    setLoading(true);
    try {
      // Direct integration for the AI Engine or standard vector search routing
      const endpoint = isAiMode 
        ? `${backendUrl}/api/product/aiSearchProducts` 
        : `${backendUrl}/api/product/paginateProducts`;

      const response = await axios.get(endpoint, { 
        params: { 
          page, 
          limit,
          query: searchQuery // Passes natural language search straight to the engine
        } 
      });

      if (response?.data?.success) {
        setProducts(response.data.data);
        setTotalPages(response.data.totalPages);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Trigger search refetch instantly whenever page, text query, or AI mode shifts
  useEffect(() => {
    getProductsData();
  }, [page, searchQuery, isAiMode]);

  // Reset pagination indexes back to 1 on brand new search strings
  useEffect(() => {
    setPage(1);
  }, [searchQuery, isAiMode]);

  return (
    <section className="py-16 px-6 md:px-12 max-w-[1600px] mx-auto bg-white text-black min-h-screen">
      
      {/* Asymmetric Header Structure with Dynamic AI Feedback */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 border-b border-neutral-100 pb-8">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-black tracking-[0.3em] text-neutral-400 uppercase">
              {isAiMode ? "⚡ ENGINE VECTOR SYNAPSE ACTIVE" : "SYSTEM ARCHIVE"}
            </span>
            {isAiMode && <span className="h-2 w-2 rounded-full bg-black animate-ping" />}
          </div>
          
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter uppercase">
            {isAiMode ? "AI CURATED RESPONSE" : "LATEST COLLECTIONS"}
            <span className="text-neutral-300"> //</span>
          </h2>
        </div>

        <div className="max-w-md lg:text-right">
          <p className="text-xs tracking-wide leading-relaxed text-neutral-500 font-medium">
            {isAiMode && searchQuery 
              ? `Displaying neural matches optimized for style footprint matching: "${searchQuery}"`
              : "Browsing all production runs. Machine learning filters apply dynamically based on natural user search inputs."}
          </p>
        </div>
      </div>

      {/* Grid Execution State Management */}
      {loading ? (
        <div className="w-full h-64 flex items-center justify-center">
          <span className="text-xs font-black tracking-[0.25em] text-neutral-400 uppercase animate-pulse">
            Executing matrix filtration...
          </span>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-12">
          {products.map((item) => (
            <div key={item._id} className="transition-all duration-300 hover:opacity-80">
              <ProductItem
                id={item._id}
                slug={item.slug}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full py-20 flex flex-col items-center justify-center border border-dashed border-neutral-200 rounded-sm">
          <span className="text-xs font-black tracking-widest text-neutral-400 uppercase mb-2">No Matches Formed</span>
          <p className="text-[11px] text-neutral-400">Try rephrasing your conceptual mood profile request.</p>
        </div>
      )}

      {/* Premium Minimalist Pagination Blocks */}
      <div className="mt-20 border-t border-neutral-100 pt-8 flex justify-center">
        <ReactPaginate
          previousLabel={"←"}
          nextLabel={"→"}
          breakLabel={"..."}
          pageCount={totalPages}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          forcePage={page - 1}
          onPageChange={(event) => setPage(event.selected + 1)}
          containerClassName={"flex items-center gap-1 text-xs font-bold tracking-wider"}
          pageClassName={"border border-transparent hover:border-black transition-all"}
          pageLinkClassName={"px-3 py-2 block text-neutral-400 hover:text-black"}
          activeClassName={"!border-black bg-black"}
          activeLinkClassName={"!text-white"}
          previousClassName={"font-black text-sm pr-2 text-neutral-400 hover:text-black transition-colors"}
          nextClassName={"font-black text-sm pl-2 text-neutral-400 hover:text-black transition-colors"}
          disabledClassName={"opacity-20 pointer-events-none"}
          breakClassName={"text-neutral-300 px-2"}
        />
      </div>

    </section>
  );
};

export default LatestCollection;