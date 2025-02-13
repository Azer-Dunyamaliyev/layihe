import React, { useState, useEffect } from "react";
import styles from "./collectioncart.module.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavoriteThunk,
  deleteFavoriteThunk,
  wishlistStatus,
} from "../../../redux/reducers/wishlistSlice";

const Collectioncart = ({ item }) => {
  const dispatch = useDispatch();
  const [favoriteStatus, setFavoriteStatus] = useState({});
  const [selectedColor, setSelectedColor] = useState(
    item.variants && item.variants.length > 1 ? item.defaultColor : ""
  );
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const selectedVariant = item.variants.find(
      (variant) => variant.color === selectedColor
    );

    if (selectedVariant) {
      setSelectedImage(selectedVariant.images[0]);
      setHoverImage(selectedVariant.images[1] || selectedVariant.images[0]);
    }
  }, [selectedColor, item.variants]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const colorFavorites = {};

      favorites.forEach((fav) => {
        if (fav.productId === item._id) {
          colorFavorites[fav.selectedColor] = true;
        }
      });

      setFavoriteStatus(colorFavorites);
    } else {
      dispatch(wishlistStatus(item._id))
        .then((result) => {
          if (result.payload !== undefined) {
            setFavoriteStatus(result.payload);
          }
        })
        .catch((error) => {
          console.error("Wishlist status fetch error:", error);
        });
    }
  }, [item._id, dispatch]);

  const handleFavoriteToggle = (color = "") => {
    console.log("Clicked color:", color);
  
    const selectedColorToSend = color || item.defaultColor;
    console.log("Selected Color to Send:", selectedColorToSend);
  
    const productData = {
      userId: "USER_ID",
      productId: item._id,
      selectedColor: selectedColorToSend,
      images: item.images,
    };
  
    console.log("Product Data before dispatch:", productData);
  
    const token = localStorage.getItem("token");
  
    if (token) {
      if (favoriteStatus[selectedColorToSend]) {
        dispatch(deleteFavoriteThunk(productData)).then(() => {
          setFavoriteStatus((prev) => ({
            ...prev,
            [selectedColorToSend]: false,
          }));
          setIsFavorite(false); // SVG'yi boş yapmak için
        });
      } else {
        dispatch(addFavoriteThunk(productData)).then(() => {
          setFavoriteStatus((prev) => ({
            ...prev,
            [selectedColorToSend]: true,
          }));
          setIsFavorite(true); // SVG'yi doldurmak için
        });
      }
    }
  };
  

  const handleVariantChange = (color) => {
    if (!color) return;

    setSelectedColor(color);

    const selectedVariant = item.variants.find(
      (variant) => variant.color === color
    );

    if (selectedVariant) {
      setSelectedImage(selectedVariant.images[0]);
      setHoverImage(selectedVariant.images[1] || selectedVariant.images[0]);
    }
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
    if (item.category === category && item.name === name) {
      setSelectedImage(initialImages[0]);
      setHoverImage(initialImages[1] || initialImages[0]);
    } else if (item.category === category) {
      setSelectedImage(initialImages[0]);
      setHoverImage(initialImages[1] || initialImages[0]);
    } else {
      setSelectedImage(initialImages[0]);
      setHoverImage(initialImages[1] || initialImages[0]);
    }
  }, [category, name, item.category, item.name, item.images, defaultVariant]);

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

      <button
        className={styles.favori}
        onClick={() => handleFavoriteToggle(selectedColor)}
      >
        {favoriteStatus[selectedColor] ? (
          <svg
            role="presentation"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="black"
            className="favorite-icon filled"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        ) : (
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
