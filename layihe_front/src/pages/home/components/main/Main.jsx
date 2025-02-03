import React from "react";
import styles from "./main.module.scss";
const Main = () => {
  return (
    <div className={styles.main}>
      <div className="container">
        <div className={styles.content}>
          <h1>Designed in <span>Barcelona</span> since 1984</h1>
        </div>
      </div>
    </div>
  );
};

export default Main;
