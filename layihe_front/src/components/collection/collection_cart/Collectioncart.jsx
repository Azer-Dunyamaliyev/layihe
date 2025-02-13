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
  const { status, loading } = useSelector((state) => state.favorites);
  const [favoriteStatus, setFavoriteStatus] = useState(true);

  // Başlangıçta boş değil, varsayılan renk ile başlasın
  const [selectedColor, setSelectedColor] = useState(
    item.variants && item.variants.length > 1
      ? item.defaultColor
      : item.variants[0]?.color || ""
  );
  const [isFavorite, setIsFavorite] = useState(false);

  // Varsayılan renk için favori durumu kontrolü
  useEffect(() => {
    const token = localStorage.getItem("token");
    const checkFavorites = async () => {
      if (!token) {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const productFavorites = favorites.filter(
          (fav) =>
            fav.productId === item._id && fav.selectedColor === selectedColor
        );
        setIsFavorite(productFavorites.length > 0);
      } else {
        try {
          const result = await dispatch(
            wishlistStatus({ productId: item._id, selectedColor })
          );
          setIsFavorite(result.payload || false);
        } catch (error) {
          console.error("Wishlist status fetch error:", error);
        }
      }
    };
    checkFavorites();
  }, [item._id, selectedColor, dispatch]);

  // Renk değiştirme fonksiyonu
  const handleVariantChange = (color) => {
    if (!color) return;

    setSelectedColor(color);
    // Seçilen renk için uygun görselleri bul ve güncelle
    const selectedVariant = item.variants.find(
      (variant) => variant.color === color
    );
    if (selectedVariant) {
      setSelectedImage(selectedVariant.images[0]); // İlk görseli ana görsel olarak ata
      setHoverImage(selectedVariant.images[1] || selectedVariant.images[0]); // Hover görselini güncelle
    }
  };

  // Favori durumunun değiştirilmesi
  const handleFavoriteToggle = async () => {
    const selectedColorToSend = selectedColor || item.defaultColor;
    console.log("selectedColorToSend:", selectedColorToSend);

    const productData = {
      userId: "USER_ID", // Gerçek kullanıcı ID'si ile değiştirin
      productId: item._id,
      selectedColor: selectedColorToSend,
      images: item.images,
    };

    const token = localStorage.getItem("token");

    // Favori durumunu kontrol etmeden önce
    if (token) {
      try {
        console.log("Favori durumu:", isFavorite);

        if (isFavorite) {
          // Favori zaten varsa, onu sil
          await dispatch(deleteFavoriteThunk(productData));
          setIsFavorite(false); // Durumu güncelle
        } else {
          // Favori yoksa, yeni favori ekle
          await dispatch(addFavoriteThunk(productData));
          setIsFavorite(true); // Durumu güncelle
        }
      } catch (error) {
        console.error("Error updating favorites:", error);
      }
    } else {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const favoriteIndex = favorites.findIndex(
        (fav) =>
          fav.productId === productData.productId &&
          fav.selectedColor === productData.selectedColor
      );

      if (favoriteIndex !== -1) {
        // Eğer favori varsa, onu sil
        favorites.splice(favoriteIndex, 1);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        setIsFavorite(false); // Durumu güncelle
      } else {
        // Favori yoksa, ekle
        favorites.push(productData);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        setIsFavorite(true); // Durumu güncelle
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

      <button className={styles.favori} onClick={handleFavoriteToggle}>
        {isFavorite ? (
          <svg
            role="presentation"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M19.0711 13.1421L13.4142 18.799C12.6332 19.58 11.3668 19.58 10.5858 18.799L4.92894 13.1421C2.97632 11.1895 2.97632 8.02369 4.92894 6.07106C6.88157 4.11844 10.0474 4.11844 12 6.07106C13.9526 4.11844 17.1185 4.11844 19.0711 6.07106C21.0237 8.02369 21.0237 11.1895 19.0711 13.1421Z"
              fill="#e04f4f"
              stroke="#e04f4f"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        ) : (
          <svg
            role="presentation"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M19.0711 13.1421L13.4142 18.799C12.6332 19.58 11.3668 19.58 10.5858 18.799L4.92894 13.1421C2.97632 11.1895 2.97632 8.02369 4.92894 6.07106C6.88157 4.11844 10.0474 4.11844 12 6.07106C13.9526 4.11844 17.1185 4.11844 19.0711 6.07106C21.0237 8.02369 21.0237 11.1895 19.0711 13.1421Z"
              fill="none"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        )}
      </button>
    </div>
  );
};

export default Collectioncart;
