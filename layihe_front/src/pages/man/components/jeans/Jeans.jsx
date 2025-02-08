import React from "react";
import styles from "./jeans.module.scss";
import jeans from "../../../../assets/images/jeans_man.png";
import jeans2 from "../../../../assets/images/jeans_man2.png";
const Jeans = () => {
  return (
    <div className={styles.jeans}>
      <picture>
        <img src={jeans} alt="jeans" />
      </picture>
      <picture>
        <img src={jeans2} alt="jeans2" />
      </picture>
      <button>Jeans</button>
    </div>
  );
};

export default Jeans;
