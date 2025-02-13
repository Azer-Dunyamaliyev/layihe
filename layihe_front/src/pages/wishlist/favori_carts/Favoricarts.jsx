import React, { useEffect, useState } from "react";
import styles from "./favoricarts.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFavoriteThunk,
  getWishList,
} from "../../../redux/reducers/wishlistSlice";
import Favoricart from "../favori_cart/Favoricart";

const Favoricarts = () => {
  const dispatch = useDispatch();
  const { favorites, loading, error } = useSelector((state) => state.favorites);
  
  // Error state
  const [errorMessage, setErrorMessage] = useState('');

  const handleDeleteFavorite = (productId) => {
    dispatch(deleteFavoriteThunk({ userId: "USER_ID", productId }))
      .then(() => setErrorMessage('')) // Eğer başarılı ise hata mesajını temizle
      .catch((err) => setErrorMessage(err.message)); // Hata durumunda mesajı set et
  };
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getWishList());
    } else {
      const localFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
    }
  }, [dispatch]);

  return (
    <div className={styles.favori}>
      <div className="container">
        <div className={styles.content}>
          {loading && <p>Loading...</p>}
          {errorMessage && <p>{errorMessage}</p>} {/* Hata mesajı burada */}
          {!loading &&
            !errorMessage && // errorMessage'ı burada kontrol et
            (favorites.length > 0 ? (
              <div className={styles.carts}>
                {favorites &&
                  favorites.map((item, index) => (
                    <Favoricart
                      key={index}
                      item={item}
                      handleDeleteFavorite={() =>
                        handleDeleteFavorite(item.productId._id)
                      }
                    />
                  ))}
              </div>
            ) : (
              <div className={styles.texts}>
                <h2>Your wishlist is empty</h2>
                <p>
                  <span>
                    <svg
                      width="24"
                      height="24"
                      role="img"
                      aria-hidden="true"
                      className="Icon_icon-content-1__kPDLF"
                      xmlns="http://www.w3.org/2000/svg"
                      xml="preserve"
                      viewBox="0 0 24 24"
                    >
                      <path d="m9 19.707-5.854-5.853.708-.708L9 18.293 20.146 7.146l.708.708z"></path>
                    </svg>
                  </span>
                  Use the hearts to add or remove favourites
                </p>
                <p>
                  <span>
                    <svg
                      width="24"
                      height="24"
                      role="img"
                      aria-hidden="true"
                      className="Icon_icon-content-1__kPDLF"
                      xmlns="http://www.w3.org/2000/svg"
                      xml="preserve"
                      viewBox="0 0 24 24"
                    >
                      <path d="m9 19.707-5.854-5.853.708-.708L9 18.293 20.146 7.146l.708.708z"></path>
                    </svg>
                  </span>
                  Access your wishlist from any device
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Favoricarts;
