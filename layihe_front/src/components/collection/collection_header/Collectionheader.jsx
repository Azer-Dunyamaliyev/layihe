import React, { useEffect, useState } from "react";
import styles from "./collectionheader.module.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryThunk } from "../../../redux/reducers/productsSlice";

const Collectionheader = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  const uniqueCategories = [
    ...new Map(
      products
        .filter((item) => item.category && item.category.trim() !== "")
        .map((item) => [item.category, item])
    ).values(),
  ];
  const menuItems = ["See all", ...uniqueCategories];
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    if (name) {
      dispatch(getCategoryThunk({ name }));
    }
  }, [dispatch,name]);

  if (loading) return <div style={{ textAlign: "center" }}>Loading...</div>;
  if (error) return <div style={{ textAlign: "center" }}>Error: {error}</div>;
  return (
    <div className={styles.header}>
      <div className="container">
        <div className={styles.content}>
          <ul>
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={index === activeIndex ? styles.active : ""}
                onClick={() => setActiveIndex(index)}
              >
                {typeof item === "string" ? (
                  <Link to={`/category/${name}`}>{item}</Link>
                ) : (
                  <Link to={`/category/${name}/${item.category}`}>
                    {item.category}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Collectionheader;
