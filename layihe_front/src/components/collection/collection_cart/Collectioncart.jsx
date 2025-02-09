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
  const [hoverImage, setHoverImage] = useState(initialImages[1] || initialImages[0]);

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
    </div>
  );
};

export default Collectioncart;
