import React, { useState } from "react";
import styles from "./favoricart.module.scss";

const Favoricart = ({ item,handleDeleteFavorite }) => {
  const { productId, selectedColor } = item;
  const [isHovered, setIsHovered] = useState(false);
  if (!productId) return null;

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const getImage = (variant) => {
    if (variant && variant.images) {
      return variant.images[0];
    } else if (productId.images) {
      return productId.images[0];
    }
    return "";
  };

  const getHoverImage = (variant) => {
    if (variant && variant.images) {
      return variant.images[1];
    } else if (productId.images) {
      return productId.images[1];
    }
    return "";
  };

  const selectedVariant = productId.variants
    ? productId.variants.find((variant) => variant.color === selectedColor)
    : null;
  
  const selectedImage = getImage(selectedVariant);
  const hoverImage = getHoverImage(selectedVariant);

  return (
    <div className={styles.cart} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <img src={isHovered ? hoverImage : selectedImage} alt={productId.name} width="100" />
      <div className={styles.texts}>
        <h5>{productId.description}</h5>
        <h6>{productId.price}.00$</h6>
      </div>
      <button className={styles.favori} onClick={handleDeleteFavorite}>
        <svg
          role="presentation"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="favorite-icon filled"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="black"
          />
        </svg>
      </button>
    </div>
  );
};

export default Favoricart;
