import React from "react";
import styles from "./detail.module.scss";
import Layout from "../../../../layout/Layout";
const Detail = () => {
  return (
    <Layout>
      <div className={styles.detail}>
        <div className="container">
          <div className={styles.content}>
            <div className={styles.texts}>
              <h3>My details</h3>
              <ul>
                <li>
                  <div className={styles.user_detail}>
                    <div className={styles.title}>
                      <label htmlFor="">NAME</label>
                      <h5>Murad</h5>
                    </div>
                    <button>Edit</button>
                  </div>
                </li>
                <li>
                  <div className={styles.user_detail}>
                    <div className={styles.title}>
                      <label htmlFor="">E-MAIL</label>
                      <h5>muradsafuy@gmail.com</h5>
                    </div>
                    <button>Edit</button>
                  </div>
                </li>
                <li>
                  <div className={styles.user_detail}>
                    <div className={styles.title}>
                      <label htmlFor="">PASSWORD</label>
                      <h5>••••••••••</h5>
                    </div>
                    <button>Edit</button>
                  </div>
                </li>
                <li>
                  <div className={styles.user_detail}>
                    <div className={styles.title}>
                      <label htmlFor="">Date of birth</label>
                      <h5></h5>
                    </div>
                    <button>Add</button>
                  </div>
                </li>
                <li>
                  <div className={styles.user_detail}>
                    <div className={styles.title}>
                      <label htmlFor="">Gender</label>
                      <span>Prefer not to say</span>
                      <h5></h5>
                    </div>
                    <button>Add</button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Detail;
