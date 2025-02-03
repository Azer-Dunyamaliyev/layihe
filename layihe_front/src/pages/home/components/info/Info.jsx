import React from "react";
import styles from "./info.module.scss";
import { useFormik } from 'formik';
const Info = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className={styles.info}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.text}>
            <h2>
              Get information about special promotions,individual discounts and
              the latest news
            </h2>
            <form onSubmit={formik.handleSubmit}>
              <input
                id="email"
                name="email"
                placeholder="E-Mail"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />

              <button type="submit">Sign up now</button>
            </form>
            <button>I Want To Unsubscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
