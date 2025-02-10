import React, { useState, useEffect } from "react";
import styles from "./collectioncart.module.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavoriteThunk, deleteFavoriteThunk } from "../../../redux/reducers/wishlistSlice";

const Collectioncart = ({ item }) => {
  const dispatch = useDispatch()
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  
    if (!token) {
      setIsFavorite(favorites.includes(item._id));
    }  else {
      
    }
  }, [item._id]);
  
  const handleFavoriteToggle = () => {
    const token = localStorage.getItem("token");
    if (token) {
      if (isFavorite) {
        dispatch(deleteFavoriteThunk({ userId: "USER_ID", productId: item._id }));
      } else {
        dispatch(addFavoriteThunk({ userId: "USER_ID", productId: item._id }));
      }
    } else {
      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  
      if (isFavorite) {
        favorites = favorites.filter((fav) => fav !== item._id);
      } else {
        favorites.push(item._id);
      }
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);
  };

  const { name, category } = useParams();
  const defaultVariant = item.variants.find(
    (variant) => variant.color === item.defaultColor
  );

  
  const initialImages = defaultVariant ? defaultVariant.images : item.images;

  const [selectedImage, setSelectedImage] = useState(initialImages[0]);
  const [hoverImage, setHoverImage] = useState(
    initialImages[1] || initialImages[0]
  );

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Eğer kategori ve name parametreleri varsa, o ürünün görsellerini güncelle
    if (item.category === category && item.name === name) {
      setSelectedImage(initialImages[0]);
      setHoverImage(initialImages[1] || initialImages[0]);
    } else if (item.category === category) {
      // Kategoriye göre görsel seçimi
      setSelectedImage(initialImages[0]);
      setHoverImage(initialImages[1] || initialImages[0]);
    } else {
      // Varsayılan olarak, ilk başta defaultColor'a göre görselleri ayarla
      setSelectedImage(initialImages[0]);
      setHoverImage(initialImages[1] || initialImages[0]);
    }
  }, [category, name, item.category, item.name, item.images, defaultVariant]);

  const handleVariantChange = (color) => {
    const selectedVariant = item.variants.find(
      (variant) => variant.color === color
    );
    if (selectedVariant) {
      setSelectedImage(selectedVariant.images[0]);
      setHoverImage(selectedVariant.images[1] || selectedVariant.images[0]);
    }
  };

  return (
    <div
      className={styles.cart}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.images}>
        <img src={selectedImage} alt="Selected" className={styles.mainImage} />
        <img src={hoverImage} alt="Hover Image" className={styles.hoverImage} />
      </div>

      <div className={styles.texts}>
        <h5>{item.description}</h5>
        <h6>{item.price}.00 $</h6>
      </div>

      {item.variants.length > 0 && (
        <div className={styles.variantInfo}>
          {!isHovered ? (
            <span>{item.variants.length} colors</span>
          ) : (
            <div className={styles.variantSelectors}>
              {item.variants.map((variant, index) => (
                <div
                  key={index}
                  className={styles.variantCircle}
                  style={{ backgroundColor: variant.color }}
                  onClick={() => handleVariantChange(variant.color)}
                />
              ))}
            </div>
          )}
        </div>
      )}

<button className={styles.favori} onClick={handleFavoriteToggle}>
      {isFavorite ? (
        // Dolu SVG
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
      ) : (
        // Boş SVG
        <svg
          role="presentation"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="favorite-icon"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            stroke="black"
            strokeWidth="1.5"
          />
        </svg>
      )}
    </button>
    </div>
  );
};

export default Collectioncart;
