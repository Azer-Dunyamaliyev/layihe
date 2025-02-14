import React from "react";
import styles from "./info.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";

const Info = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Enter a valid email")
        .required("Complete this field to continue"),
    }),
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
            <div>
                  <input
                    id="email"
                    name="email"
                    placeholder="E-mail"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className={
                      formik.errors.email && formik.touched.email
                        ? styles.errorInput
                        : ""
                    }
                  />
                </div>
                {formik.errors.email && formik.touched.email && (
                  <p className={styles.errorText}>{formik.errors.email}</p>
                )}

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
