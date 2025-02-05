import React from "react";
import styles from "./account.module.scss";
import Layout from "../../layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/reducers/userSlice";
const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, username } = useSelector((state) => state.users);
  const handleLogout = () => {
    navigate("/");
    dispatch(logout());
  };
  return (
    <Layout>
      <div className={styles.account}>
        <div className="container">
          <div className={styles.content}>
            <div className={styles.texts}>
                {token ? (
                    <h3>{username}</h3>
                ): (
                    <h3>User</h3>
                )}
              <ul>
                <li>
                  <div className={styles.title}>
                    <span>
                      <svg
                        role="presentation"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M4 8H20V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V8Z"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M8 4H16L20 8H4L8 4Z"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M8 12H12"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </span>
                    <Link>My purchases</Link>
                  </div>
                  <span>
                    <svg
                      width="15"
                      height="24"
                      role="img"
                      aria-hidden="true"
                      className="Icon_icon-content-1__kPDLF ListItem_iconArrow__hVHTC"
                      xmlns="http://www.w3.org/2000/svg"
                      xml="preserve"
                      viewBox="0 0 24 24"
                    >
                      <path d="m13.9 5.4.7-.7L22 12l-7.4 7.4-.7-.7 6.1-6.1H2v-1h18.1z"></path>
                    </svg>
                  </span>
                </li>
                <li>
                  <div className={styles.title}>
                    <span>
                      <svg
                        role="presentation"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M8.53033 6.53033C8.82322 6.23744 8.82322 5.76256 8.53033 5.46967C8.23744 5.17678 7.76256 5.17678 7.46967 5.46967L8.53033 6.53033ZM5 9L4.46967 8.46967C4.17678 8.76256 4.17678 9.23744 4.46967 9.53033L5 9ZM7.46967 12.5303C7.76256 12.8232 8.23744 12.8232 8.53033 12.5303C8.82322 12.2374 8.82322 11.7626 8.53033 11.4697L7.46967 12.5303ZM5 16.25C4.58579 16.25 4.25 16.5858 4.25 17C4.25 17.4142 4.58579 17.75 5 17.75V16.25ZM7.46967 5.46967L4.46967 8.46967L5.53033 9.53033L8.53033 6.53033L7.46967 5.46967ZM4.46967 9.53033L7.46967 12.5303L8.53033 11.4697L5.53033 8.46967L4.46967 9.53033ZM5 9.75H16V8.25H5V9.75ZM19.25 13C19.25 14.7949 17.7949 16.25 16 16.25V17.75C18.6234 17.75 20.75 15.6234 20.75 13H19.25ZM16 9.75C17.7949 9.75 19.25 11.2051 19.25 13H20.75C20.75 10.3766 18.6234 8.25 16 8.25V9.75ZM5 17.75H16V16.25H5V17.75Z"
                          fill="black"
                        ></path>
                      </svg>
                    </span>
                    <Link>Returns</Link>
                  </div>
                  <span>
                    <svg
                      width="15"
                      height="24"
                      role="img"
                      aria-hidden="true"
                      className="Icon_icon-content-1__kPDLF ListItem_iconArrow__hVHTC"
                      xmlns="http://www.w3.org/2000/svg"
                      xml="preserve"
                      viewBox="0 0 24 24"
                    >
                      <path d="m13.9 5.4.7-.7L22 12l-7.4 7.4-.7-.7 6.1-6.1H2v-1h18.1z"></path>
                    </svg>
                  </span>
                </li>
                <li onClick={() => navigate('/detail')}>
                  <div className={styles.title}>
                    <span>
                      <svg
                        role="presentation"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M21 12C21 13.8569 20.4376 15.5825 19.4739 17.0157C17.858 19.4189 15.1136 21 12 21C8.88636 21 6.14202 19.4189 4.52609 17.0157C3.56237 15.5825 3 13.8569 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                          stroke="black"
                          stroke-width="1.5"
                        ></path>
                        <path
                          d="M14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9Z"
                          stroke="black"
                          stroke-width="1.5"
                        ></path>
                        <path
                          d="M15 15H8.99998C7.18822 15 5.6578 16.2045 5.16583 17.8564C6.81645 19.7808 9.26583 21 12 21C14.7341 21 17.1835 19.7808 18.8341 17.8564C18.3421 16.2045 16.8117 15 15 15Z"
                          stroke="black"
                          stroke-width="1.5"
                        ></path>
                      </svg>
                    </span>
                    <Link>Personal details</Link>
                  </div>
                  <span>
                    <svg
                      width="15"
                      height="24"
                      role="img"
                      aria-hidden="true"
                      className="Icon_icon-content-1__kPDLF ListItem_iconArrow__hVHTC"
                      xmlns="http://www.w3.org/2000/svg"
                      xml="preserve"
                      viewBox="0 0 24 24"
                    >
                      <path d="m13.9 5.4.7-.7L22 12l-7.4 7.4-.7-.7 6.1-6.1H2v-1h18.1z"></path>
                    </svg>
                  </span>
                </li>
                <li>
                  <div className={styles.title}>
                    <span>
                      <svg
                        role="presentation"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M3 4V18C3 19.1046 3.89543 20 5 20H17H19C20.1046 20 21 19.1046 21 18V8H17"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M3 4H17V18C17 19.1046 17.8954 20 19 20V20"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M13 8L7 8"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M13 12L9 12"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </span>
                    <Link>Addresses</Link>
                  </div>
                  <span>
                    <svg
                      width="15"
                      height="24"
                      role="img"
                      aria-hidden="true"
                      className="Icon_icon-content-1__kPDLF ListItem_iconArrow__hVHTC"
                      xmlns="http://www.w3.org/2000/svg"
                      xml="preserve"
                      viewBox="0 0 24 24"
                    >
                      <path d="m13.9 5.4.7-.7L22 12l-7.4 7.4-.7-.7 6.1-6.1H2v-1h18.1z"></path>
                    </svg>
                  </span>
                </li>
                <li>
                  <div className={styles.title}>
                    <span>
                      <svg
                        role="presentation"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M3 5H21V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V5Z"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M3 5L12 14L21 5"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </span>
                    <Link>Newsletter</Link>
                  </div>
                  <span>
                    <svg
                      width="15"
                      height="24"
                      role="img"
                      aria-hidden="true"
                      className="Icon_icon-content-1__kPDLF ListItem_iconArrow__hVHTC"
                      xmlns="http://www.w3.org/2000/svg"
                      xml="preserve"
                      viewBox="0 0 24 24"
                    >
                      <path d="m13.9 5.4.7-.7L22 12l-7.4 7.4-.7-.7 6.1-6.1H2v-1h18.1z"></path>
                    </svg>
                  </span>
                </li>
                <li>
                  <div className={styles.title}>
                    <span>
                      <svg
                        role="presentation"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="11.9999"
                          r="9"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></circle>
                        <rect
                          x="12"
                          y="16"
                          width="0.01"
                          height="0.01"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-linejoin="round"
                        ></rect>
                        <path
                          d="M10.5858 7.58572C10.9754 7.1961 11.4858 7.00083 11.9965 6.99994C12.5095 6.99904 13.0228 7.1943 13.4142 7.58572C13.8047 7.97625 14 8.48809 14 8.99994C14 9.51178 13.8047 10.0236 13.4142 10.4141C13.0228 10.8056 12.5095 11.0008 11.9965 10.9999L12 11.9999"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </span>
                    <Link>Customer service</Link>
                  </div>
                  <span>
                    <svg
                      width="15"
                      height="24"
                      role="img"
                      aria-hidden="true"
                      className="Icon_icon-content-1__kPDLF ListItem_iconArrow__hVHTC"
                      xmlns="http://www.w3.org/2000/svg"
                      xml="preserve"
                      viewBox="0 0 24 24"
                    >
                      <path d="m13.9 5.4.7-.7L22 12l-7.4 7.4-.7-.7 6.1-6.1H2v-1h18.1z"></path>
                    </svg>
                  </span>
                </li>
              </ul>
              <button onClick={handleLogout}>Sign out</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
