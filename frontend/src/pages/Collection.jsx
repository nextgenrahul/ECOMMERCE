import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/images/assets.js";
import { AppContext } from "../context/AppContext.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import Title from "../components/Title.jsx";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const navigate = useNavigate();
  const { products, search, showSearch, categoryAllData } = useContext(AppContext);
  const [searchParams] = useSearchParams();

  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [subObj, setSubObj] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [filterProducts, setFilterProducts] = useState([]);

  // Check if navigation is driven by the AI engine search bar parameter
  const isAiMode = searchParams.get("aiMode") === "true";

  const getSubCategories = (categoryName) => {
    const match = categoryAllData.find(
      (item) => item.category.toLowerCase() === categoryName.toLowerCase()
    );
    return match?.subCategories || [];
  };

  const applyFilterAndSort = () => {
    if (!products) return;
    let productsCopy = [...products];

    // 1. Text Search Filter (Fallback to standard filter if not processed by AI Backend engine)
    if (showSearch && search && !isAiMode) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 2. Classification Filter Sets
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    // 3. Sorting Calculations
    if (sortType === "low-high") {
      productsCopy.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      productsCopy.sort((a, b) => b.price - a.price);
    }

    setFilterProducts(productsCopy);
  };

  const updateURLParams = (updatedCategories, updatedSubs) => {
    const params = new URLSearchParams(searchParams);
    
    if (updatedCategories.length > 0) {
      params.set("category", updatedCategories.join("_"));
    } else {
      params.delete("category");
    }

    if (updatedSubs.length > 0) {
      params.set("subCategory", updatedSubs.join("_"));
    } else {
      params.delete("subCategory");
    }

    navigate(`?${params.toString()}`);
  };

  const toggleCategory = (e) => {
    const value = e.target.value;
    let newCategory = [...category];
    let newSubCategory = [...subCategory];

    if (newCategory.includes(value)) {
      newCategory = newCategory.filter((item) => item !== value);
      setSubObj((prev) => {
        const copy = { ...prev };
        delete copy[value];
        return copy;
      });
      const subsToRemove = getSubCategories(value);
      newSubCategory = newSubCategory.filter((s) => !subsToRemove.includes(s));
    } else {
      newCategory.push(value);
      setSubObj((prev) => ({
        ...prev,
        [value]: getSubCategories(value),
      }));
    }

    setCategory(newCategory);
    setSubCategory(newSubCategory);
    updateURLParams(newCategory, newSubCategory);
  };

  const clearAllFilters = () => {
    setCategory([]);
    setSubCategory([]);
    setSubObj({});
    navigate("/collection");
  };

  // Synchronize component state structures directly with URL parameters on mount/sync
  useEffect(() => {
    if (categoryAllData.length === 0) return;

    const catParam = searchParams.get("category");
    const subParam = searchParams.get("subCategory");

    const categoriesFromURL = catParam ? catParam.split("_") : [];
    const subCategoriesFromURL = subParam ? subParam.split("_") : [];

    setCategory(categoriesFromURL);
    setSubCategory(subCategoriesFromURL);

    const subObjFromURL = {};
    categoriesFromURL.forEach((cat) => {
      subObjFromURL[cat] = getSubCategories(cat);
    });
    setSubObj(subObjFromURL);
  }, [categoryAllData, searchParams]);

  // Combined render effect block protects layout states from endless recursive calls
  useEffect(() => {
    applyFilterAndSort();
  }, [category, subCategory, search, showSearch, sortType, products]);

  return (
    <section className="bg-white text-black min-h-screen px-6 md:px-12 max-w-[1600px] mx-auto pt-10 pb-20">
      
      {/* Top Ledger Ribbon */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-100 pb-6 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[9px] font-black tracking-[0.35em] text-neutral-400 uppercase">
              {isAiMode ? "⚡ SYNAPSE VECTOR ACTIVE" : "CATALOG ARCHIVE"}
            </span>
            {isAiMode && <span className="h-2 w-2 rounded-full bg-black animate-ping" />}
          </div>
          <Title text1={isAiMode ? "AI CURATED" : "ALL"} text2="COLLECTIONS" />
        </div>

        {/* Global Catalog Controls */}
        <div className="flex items-center gap-4 self-end md:self-auto w-full md:w-auto justify-between md:justify-end">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="md:hidden flex items-center gap-2 text-xs font-black tracking-widest uppercase border border-black px-4 py-2"
          >
            FILTERS <img className={`h-3 transition-transform ${showFilter ? "rotate-90" : ""}`} src={assets.dropdown_icon} alt="" />
          </button>

          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border border-black bg-white text-xs font-black tracking-widest uppercase px-4 py-2.5 outline-none cursor-pointer"
          >
            <option value="relevant">SORT // RELEVANT</option>
            <option value="low-high">PRICE // LOW-HIGH</option>
            <option value="high-low">PRICE // HIGH-LOW</option>
          </select>
        </div>
      </div>

      {/* Dual Column Frame Setup */}
      <div className="flex flex-col md:flex-row gap-10 items-start">
        
        {/* LEFT FLANK: Industrial Selection Sidepanel */}
        <div className={`w-full md:w-64 space-y-8 flex-shrink-0 ${showFilter ? "block" : "hidden md:block"}`}>
          
          {/* Active Filter Management Heading */}
          <div className="flex items-center justify-between border-b border-black pb-2">
            <span className="text-xs font-black tracking-widest uppercase">FILTERS //</span>
            {(category.length > 0 || subCategory.length > 0) && (
              <button
                onClick={clearAllFilters}
                className="text-[10px] font-black text-neutral-400 hover:text-black tracking-widest uppercase transition-colors"
              >
                [CLEAR ALL]
              </button>
            )}
          </div>

          {/* Categories Option Box */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black tracking-[0.25em] text-neutral-400 uppercase">CATEGORIES</h4>
            <div className="flex flex-col gap-2.5 text-xs font-semibold tracking-wide uppercase text-neutral-600">
              {categoryAllData?.map((item) => (
                <label key={item._id} className="flex items-center gap-3 cursor-pointer select-none hover:text-black transition-colors">
                  <input
                    type="checkbox"
                    value={item.category}
                    onChange={toggleCategory}
                    checked={category.includes(item.category || "")}
                    className="accent-black h-3.5 w-3.5 border-neutral-300 rounded-none"
                  />
                  <span>{item.category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sub Categories Dynamic Box */}
          {Object.keys(subObj).length > 0 && (
            <div className="space-y-6 pt-6 border-t border-neutral-100">
              <h4 className="text-[10px] font-black tracking-[0.25em] text-neutral-400 uppercase">SUB CLASSIFICATIONS</h4>
              <div className="space-y-4">
                {Object.entries(subObj).map(([categoryName, subCategories]) => (
                  <div key={categoryName} className="space-y-2">
                    <p className="text-[10px] font-black tracking-widest text-black underline underline-offset-4 mb-2">{categoryName}</p>
                    {subCategories?.map((sub, index) => (
                      <label key={`${categoryName}-${index}`} className="flex items-center gap-3 cursor-pointer select-none text-xs font-semibold tracking-wide uppercase text-neutral-500 hover:text-black transition-colors pl-2">
                        <input
                          type="checkbox"
                          value={sub}
                          checked={subCategory.includes(sub)}
                          className="accent-black h-3.5 w-3.5"
                          onChange={(e) => {
                            const value = e.target.value;
                            let newSub = [...subCategory];
                            if (newSub.includes(value)) {
                              newSub = newSub.filter((item) => item !== value);
                            } else {
                              newSub.push(value);
                            }
                            setSubCategory(newSub);
                            updateURLParams(category, newSub);
                          }}
                        />
                        <span>{sub}</span>
                      </label>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT FLANK: Infinite Grid Canvas */}
        <div className="flex-1 w-full">
          {filterProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-12">
              {filterProducts.map((item) => (
                <div key={item._id} className="animate-fade-in">
                  <ProductItem
                    name={item.name}
                    id={item._id}
                    slug={item.slug}
                    price={item.price}
                    image={item.image}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full border border-dashed border-neutral-200 py-32 flex flex-col items-center justify-center rounded-sm bg-neutral-50/30">
              <span className="text-xs font-black tracking-[0.25em] text-neutral-400 uppercase mb-2">ZERO ARCHIVE MATCHES</span>
              <p className="text-[11px] text-neutral-400 font-medium">Reset classification states or adjust your query criteria.</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default Collection;