import React, { useState, useEffect } from "react";
import styles from "./detailinfo.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavoriteThunk,
  deleteFavoriteThunk,
  wishlistStatus,
} from "../../../../redux/reducers/wishlistSlice";

const DetailInfo = ({ data, setSelectedImage, setSelectedColor, selectedColor }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false); // Favori state'i
  const { status, loading } = useSelector((state) => state.favorites);

  const selectedVariant = data.variants?.find(
    (variant) => variant.color === selectedColor
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      
      const isAnyColorFavorite = favorites.some(
        (fav) => fav.productId === data._id && fav.selectedColor === selectedColor
      );
  
      setIsFavorite(isAnyColorFavorite);
    } else {
      dispatch(wishlistStatus({ productId: data._id, selectedColor }))
        .then((result) => {
          setIsFavorite(result.payload || false);
        })
        .catch((error) => {
          console.error("Wishlist status fetch error:", error);
        });
    }
  }, [data._id, selectedColor, dispatch]);

  const handleFavoriteToggle = (color = "") => {
    const selectedColorToSend = color || data.defaultColor;
    const productData = {
      productId: data._id,
      selectedColor: selectedColorToSend,
      images: data.images,
      price: data.price,
      description: data.description,
      imagesLocal: data.images && data.images.length > 0 ? data.images : data.variants,
      defaultColor: data.defaultColor ? data.defaultColor : ""
    };

    const token = localStorage.getItem("token");
    if (token) {
      if (isFavorite) {
        dispatch(deleteFavoriteThunk(productData)).then(() => {
          setIsFavorite(false);
        });
      } else {
        dispatch(addFavoriteThunk(productData)).then(() => {
          setIsFavorite(true);
        });
      }
    } else {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      
      const index = favorites.findIndex(
        (fav) =>
          fav.productId === productData.productId &&
          fav.selectedColor === productData.selectedColor
      );
  
      if (index !== -1) {
        favorites.splice(index, 1);
        setIsFavorite(false);
      } else {
        favorites.push(productData);
        setIsFavorite(true);
      }
  
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  };

  return (
    <div className={styles.detail_info}>
      <div className={styles.texts}>
        <h4>{data.description}</h4>
        <h3>{data.price}.00$</h3>

        <div className={styles.images}>
          {data.variants && data.variants.length > 0
            ? data.variants.map((variant, index) => (
                <img
                  key={index}
                  src={variant.images[0]}
                  alt={`Variant ${variant.color}`}
                  onClick={() => {
                    setSelectedColor(variant.color);
                    setSelectedImage(variant.images[0]);
                  }}
                />
              ))
            : data.images.length > 0 && (
                <img
                  src={data.images[0]}
                  alt="Product"
                  onClick={() => setSelectedImage(data.images[0])}
                />
              )}
        </div>

        <div className={styles.sizes}>
          {data.sizes.map((size, index) => {
            return <button key={index}>{size}</button>;
          })}
        </div>

        <div className={styles.buttons}>
          <button>Add to my basket</button>
          <button onClick={() => handleFavoriteToggle(selectedColor)}>
            {isFavorite ? (
              <svg
                role="presentation"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#e04f4f"
              >
                <path
                  d="M19.0711 13.1421L13.4142 18.799C12.6332 19.58 11.3668 19.58 10.5858 18.799L4.92894 13.1421C2.97632 11.1895 2.97632 8.02369 4.92894 6.07106C6.88157 4.11844 10.0474 4.11844 12 6.07106C13.9526 4.11844 17.1185 4.11844 19.0711 6.07106C21.0237 8.02369 21.0237 11.1895 19.0711 13.1421Z"
                />
              </svg>
            ) : (
              <svg
                role="presentation"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
              >
                <path
                  d="M19.0711 13.1421L13.4142 18.799C12.6332 19.58 11.3668 19.58 10.5858 18.799L4.92894 13.1421C2.97632 11.1895 2.97632 8.02369 4.92894 6.07106C6.88157 4.11844 10.0474 4.11844 12 6.07106C13.9526 4.11844 17.1185 4.11844 19.0711 6.07106C21.0237 8.02369 21.0237 11.1895 19.0711 13.1421Z"
                />
              </svg>
            )}
          </button>
        </div>

        <div className={styles.accordion}>
          <button className={styles.header} onClick={() => setIsOpen(!isOpen)}>
            <span>Ref {selectedVariant ? selectedVariant._id : data._id}</span>
            {!isOpen ? (
              <svg
                role="presentation"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M8 4V12"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M4 8H12"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            ) : (
              <svg
                role="presentation"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M4 8H12"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            )}
          </button>

          <div className={`${styles.content} ${isOpen ? styles.open : ""}`}>
            <p>{data.info}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailInfo;
