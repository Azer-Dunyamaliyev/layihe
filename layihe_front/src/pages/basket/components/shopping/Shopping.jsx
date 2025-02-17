import React, { useEffect } from "react";
import styles from "./shopping.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrdersThunk } from "../../../../redux/reducers/ordersSlice";
const Shopping = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const userId = "USER_ID";

  const totalPrice = orders.reduce((total, order) => {
    const orderTotal = order.orders.reduce((orderSum, item) => {
      return orderSum + item.totalPrice;
    }, 0);

    return total + orderTotal;
  }, 0);

  const deliveryFee = totalPrice < 1000 ? totalPrice * 0.1 : 0;
  const totalWithDelivery = totalPrice + deliveryFee;

  useEffect(() => {
    dispatch(getUserOrdersThunk(userId));
  }, [dispatch]);
  return (
    <div className={styles.shopping}>
      <div className={styles.texts}>
        <div className={styles.text}>
          <p>
            Subtotal:<span>{totalPrice}$</span>
          </p>
          <p>
            Delivery: <span>{deliveryFee > 0 ? `${deliveryFee.toFixed(2)}$` : "Free"}</span>
          </p>
          <div>
            <p>
              Total
              <span>{ `${totalWithDelivery.toFixed(2)}$`}</span>
            </p>
            <h6>Taxes included</h6>
          </div>
          <button>Buy</button>
        </div>
        <div className={styles.lists}>
          <p>
            <span>
              <svg
                width="24"
                height="24"
                aria-hidden="true"
                className="Icon_icon-content-1__kPDLF AdditionalInfo_icon__9Gliw"
                xmlns="http://www.w3.org/2000/svg"
                xml="preserve"
                viewBox="0 0 24 24"
              >
                <path d="m9 19.707-5.854-5.853.708-.708L9 18.293 20.146 7.146l.708.708z"></path>
              </svg>
            </span>
            Free shipping for purchases over 1000.00$
          </p>
          <p>
            <span>
              <svg
                width="24"
                height="24"
                aria-hidden="true"
                className="Icon_icon-content-1__kPDLF AdditionalInfo_icon__9Gliw"
                xmlns="http://www.w3.org/2000/svg"
                xml="preserve"
                viewBox="0 0 24 24"
              >
                <path d="m9 19.707-5.854-5.853.708-.708L9 18.293 20.146 7.146l.708.708z"></path>
              </svg>
            </span>
            Free returns within 30 days
          </p>
        </div>
      </div>
    </div>
  );
};

export default Shopping;
