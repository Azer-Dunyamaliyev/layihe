import React from "react";
import Layout from "../../layout/Layout";
import { useFormik } from "formik";
import styles from "./login.module.scss";
import { Link } from "react-router-dom";
const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Layout>
      <div className={styles.login}>
        <div className="container">
          <div className={styles.content}>
            <div className={styles.sign_in}>
              <h2>Sign in</h2>
              <form onSubmit={formik.handleSubmit}>
                <input
                  id="email"
                  name="email"
                  placeholder="E-mail"
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                <div className={styles.password}>
                  <input
                    id="password"
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  <button>
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
                      <path d="M12 6.266c-5.24 0-8.653 5.242-8.796 5.464l-.173.27.173.27c.143.222 3.557 5.464 8.796 5.464s8.653-5.242 8.796-5.464l.173-.27-.173-.27c-.143-.222-3.557-5.464-8.796-5.464m0 10.468c-4.046 0-7.01-3.693-7.766-4.734.755-1.041 3.72-4.734 7.766-4.734s7.01 3.693 7.766 4.734c-.755 1.041-3.72 4.734-7.766 4.734M12 9c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3m0 5c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2"></path>
                    </svg>
                  </button>
                </div>

                <button type="submit">Sign in</button>
                <Link>Create Account</Link>
              </form>
              <Link>Forgotten your password?</Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
