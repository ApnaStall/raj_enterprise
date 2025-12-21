import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { log, error } from "../../utils/logger";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [searchParams] = useSearchParams();
  const categoryFromURL = searchParams.get("category");

  useEffect(() => {
    axios
      .get("http://localhost:5000/product/")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        log("Error fetching products:", err);
      });
  }, []);

  useEffect(() => {
    if (categoryFromURL) {
      const filtered = products.filter(
        (p) =>
          p.product_category &&
          p.product_category.toLowerCase() ===
            categoryFromURL.toLowerCase()
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [categoryFromURL, products]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 items-center mt-10">
      {filteredProducts.map((item) => (
        <ProductCard
          key={item._id}
          _id={item._id}
          image={item.product_image}
          title={item.product_name}
          price={item.product_price}
        />
      ))}
    </div>
  );
};

export default ProductList;
