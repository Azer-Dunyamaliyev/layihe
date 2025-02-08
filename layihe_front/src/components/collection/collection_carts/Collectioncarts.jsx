import React, { useEffect } from "react";
import styles from "./collectioncarts.module.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryThunk } from "../../../redux/reducers/productsSlice";
import Collectioncart from "../collection_cart/Collectioncart";
const Collectioncarts = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  
  useEffect(() => {
    if (name) {
      dispatch(getCategoryThunk({ name }));
    }
  }, [dispatch, name]);

  return (
    <div className={styles.fashion}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.carts}>
            {products && products.map((item,index) => <Collectioncart key={index} item={item}/>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collectioncarts;
