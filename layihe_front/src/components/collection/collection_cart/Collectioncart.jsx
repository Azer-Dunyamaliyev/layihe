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
  const [selectedColor, setSelectedColor] = useState(
    item.variants && item.variants.length > 1 ? item.defaultColor : ""
  );
  const { status, loading } = useSelector((state) => state.favorites);
  const [isFavorite, setIsFavorite] = useState(false);

  // Varsayılan renk için favori durumu kontrolü
  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const productFavorites = favorites.filter((fav) => fav.productId === item._id);
  
      // Aynı ürünün herhangi bir rengi favoride mi?
      const isAnyColorFavorite = productFavorites.length > 0;
      setIsFavorite(isAnyColorFavorite);
    } else {
      dispatch(wishlistStatus({ productId: item._id, selectedColor: "" })) // Boş gönderiyoruz, tüm renkleri kontrol edecek
        .then((result) => {
          setIsFavorite(result.payload || false);
        })
        .catch((error) => {
          console.error("Wishlist status fetch error:", error);
        });
    }
  }, [item._id, dispatch]);
  

  // Renk değiştirme fonksiyonu
  const handleVariantChange = (color) => {
    if (!color) return;
  
    setSelectedColor(color);
  
    // Seçilen renk için uygun görselleri bul ve güncelle
    const selectedVariant = item.variants.find((variant) => variant.color === color);
    if (selectedVariant) {
      setSelectedImage(selectedVariant.images[0]); // İlk görseli ana görsel olarak ata
      setHoverImage(selectedVariant.images[1] || selectedVariant.images[0]); // Hover görselini güncelle
    }
  };
  

  // Favori durumunun değiştirilmesi
  const handleFavoriteToggle = (color = "") => {
    const selectedColorToSend = color || item.defaultColor;

    const productData = {
      userId: "USER_ID", // Gerçek kullanıcı ID'si ile değiştirin
      productId: item._id,
      selectedColor: selectedColorToSend,
      images: item.images,
    };

    const token = localStorage.getItem("token");

    if (token) {
      if (isFavorite) {
        dispatch(deleteFavoriteThunk(productData)).then(() => {
          setIsFavorite(false); // SVG'yi boş yapmak için
        });
      } else {
        dispatch(addFavoriteThunk(productData)).then(() => {
          setIsFavorite(true); // SVG'yi doldurmak için
        });
      }
    }
  };

  // Resimlerin güncellenmesi
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
        {isFavorite ? (
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
