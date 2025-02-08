import React from "react";
import styles from "./popular.module.scss";
import thsirt from "../../../../assets/images/popular.webp";
import new_in from '../../../../assets/images/newin-app.png'
const Popular = () => {
  return (
    <div className={styles.popular}>
      <picture>
        <img src={thsirt} alt="thsirt" />
      </picture>
      <picture>
        <img src={new_in} alt="thsirt" />
      </picture>
      <button>New in</button>
    </div>
  );
};

export default Popular;
