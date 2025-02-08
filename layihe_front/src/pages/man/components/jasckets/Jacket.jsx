import React from "react";
import styles from "./jacket.module.scss";
import jacket from "../../../../assets/images/jackets_man.webp";
const Jacket = () => {
  return (
    <div className={styles.jacket}>
      <picture>
        <img src={jacket} alt="jacket" />
      </picture>
      <button>Jacket</button>
    </div>
  );
};

export default Jacket;
