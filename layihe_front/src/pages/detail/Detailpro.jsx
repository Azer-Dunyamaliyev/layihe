import React from "react";
import Layout from "../../layout/Layout";
import DetailCart from "./components/detail-products/DetailCart";
import DetailCollection from "./components/detail_collection/DetailCollection";
import DetailInfo from "./components/detail_info/DetailInfo";
import styles from "./detailpro.module.scss";
const Detailpro = () => {
  return (
    <Layout>
      <div className={styles.detail}>
        <div className="container">
          <div className={styles.content}>
            <DetailCart />
            <DetailInfo />
          </div>
        </div>
      </div>
      <DetailCollection />
    </Layout>
  );
};

export default Detailpro;
