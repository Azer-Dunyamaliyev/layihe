import React, { useState, useEffect } from "react";
import styles from "./collectioncart.module.scss";
import { useParams } from "react-router-dom";

const Collectioncart = ({ item }) => {
  const { name, category } = useParams();

  // Varsayılan olarak defaultColor'a göre bir variant bulalım
  const defaultVariant = item.variants.find(
    (variant) => variant.color === item.defaultColor
  );

  // Eğer defaultColor'a göre bir variant varsa, o görselleri alalım.
  // Yoksa, item.images'i alalım.
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

      {/* Variantli ürünler için renk seçimleri */}
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

      <button className={styles.favori}>
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
      </button>
    </div>
  );
};

export default Collectioncart;
