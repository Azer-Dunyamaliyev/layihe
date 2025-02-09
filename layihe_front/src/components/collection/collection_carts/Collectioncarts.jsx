import React, { useEffect, useState } from "react";
import styles from "./collectioncarts.module.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryThunk, getNameCategoryThunk } from "../../../redux/reducers/productsSlice";
import Collectioncart from "../collection_cart/Collectioncart";

const Collectioncarts = () => {
  const { name, category } = useParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    if (name && !category) {
      dispatch(getCategoryThunk({ name }));
    } else if (name && category) {
      dispatch(getNameCategoryThunk({ name, category }));
    }
  }, [dispatch, name, category]);

  useEffect(() => {
    if (category && products.length > 0) {
      const filtered = products.filter((product) => product.category === category);
      setFilteredProducts(filtered);
    } else if (!category && products.length > 0) {
      setFilteredProducts(products);
    }
  }, [category, products]);
  const shuffledProducts = shuffleArray(filteredProducts);

  if (loading) return <div style={{ textAlign: "center" }}>Loading...</div>;
  if (error) return <div style={{ textAlign: "center" }}>Error: {error}</div>;

  return (
    <div className={styles.fashion}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.carts}>
            {shuffledProducts.length > 0 ? (
              shuffledProducts.map((item, index) => (
                <Collectioncart key={index} item={item} />
              ))
            ) : (
              <p>No products available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collectioncarts;
