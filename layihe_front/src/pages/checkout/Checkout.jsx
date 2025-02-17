import React from "react";
import Layout from "../../layout/Layout";
import styles from "./chackout.module.scss";
import CheckoutHeader from "./checkout_header/CheckoutHeader";
const Checkout = () => {
  return (
    <div className={styles.checkout}>
      <Layout showFooter={false}>
        <CheckoutHeader />
      </Layout>
      <div className={styles.sidebar}></div>
    </div>
  );
};

export default Checkout;
