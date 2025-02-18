import React, { useState, useEffect } from "react";
import {
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import styles from "./checkoutheader.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteAllOrdersThunk, updateOrderStatusThunk } from "../../../redux/reducers/ordersSlice";
import { updateUserInfoThunk } from "../../../redux/reducers/userSlice";

const steps = ["Details", "Delivery", "Payment"];

const CheckoutHeader = () => {
  const [activeStep, setActiveStep] = useState(1); 
  const [isFinish, setIsFinish] = useState(false); 
  const { orderId } = useParams(); 
  const dispatch = useDispatch();
  useEffect(() => {
    const savedStep = localStorage.getItem("activeStep");
    if (savedStep) {
      setActiveStep(parseInt(savedStep, 10)); 
    }
  }, []);

  useEffect(() => {
    if (!isFinish) { 
      localStorage.setItem("activeStep", activeStep);
    }
  }, [activeStep, isFinish]);

  const validationSchema = Yup.object({
    name: Yup.string().required("First Name is required"),
    surname: Yup.string().required("Last Name is required"),
    address: Yup.string().required("Address is required"),
    zip: Yup.string().required("ZIP/Postal code is required"),
    country: Yup.string().required("Country is required"),
    town: Yup.string().required("Town is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      address: "",
      zip: "",
      country: "",
      town: "",
    },
    validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const formikPaymnet = useFormik({
    initialValues: {
      cardNumber: "",
      holder: "",
      month: "",
      year: "",
      cvv: "",
    },
    validationSchema: Yup.object({
      cardNumber: Yup.string()
        .matches(/^[0-9]{16}$/, "Card Number must be 16 digits")
        .required("Card Number is required"),
      holder: Yup.string().required("Card Holder is required"),
      month: Yup.string()
        .matches(/^(0[1-9]|1[0-2])$/, "Month must be 2 digits (01-12)")
        .required("Expiration Month is required"),
      year: Yup.string()
        .matches(/^[0-9]{4}$/, "Year must be 4 digits")
        .required("Expiration Year is required"),
      cvv: Yup.string()
        .matches(/^[0-9]{3}$/, "CVV must be 3 digits")
        .required("CVV is required"),
    }),
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleStep = (step) => () => {
    if (step > activeStep) {
      setActiveStep(step);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 1:
        return (
          <div className={styles.delivery}>
            <form onSubmit={formik.handleSubmit}>
              <div className={styles.user}>
                <h2>Personal details</h2>
                <div className={styles.user_inputs}>
                  <div className={styles.input}>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="First Name *"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <div className={styles.error}>{formik.errors.name}</div>
                    )}
                  </div>
                  <div className={styles.input}>
                    <input
                      id="surname"
                      name="surname"
                      type="text"
                      placeholder="Last Name *"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.surname}
                    />
                    {formik.touched.surname && formik.errors.surname && (
                      <div className={styles.error}>
                        {formik.errors.surname}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className={styles.user_details}>
                <h2>Delivery details</h2>
                <div className={styles.details_inputs}>
                  <div className={styles.row}>
                    <div className={styles.input}>
                      <input
                        id="address"
                        name="address"
                        type="text"
                        placeholder="Address *"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address}
                      />
                      {formik.touched.address && formik.errors.address && (
                        <div className={styles.error}>
                          {formik.errors.address}
                        </div>
                      )}
                    </div>

                    <div className={styles.post}>
                      <div className={styles.input}>
                        <input
                          id="zip"
                          name="zip"
                          type="text"
                          placeholder="ZIP/Postal code *"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.zip}
                        />
                        {formik.touched.zip && formik.errors.zip && (
                          <div className={styles.error}>
                            {formik.errors.zip}
                          </div>
                        )}
                      </div>
                      <div className={styles.input}>
                        <input
                          id="country"
                          name="country"
                          type="text"
                          placeholder="Country *"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.country}
                        />
                        {formik.touched.country && formik.errors.country && (
                          <div className={styles.error}>
                            {formik.errors.country}
                          </div>
                        )}
                      </div>
                      <div className={styles.input}>
                        <input
                          id="town"
                          name="town"
                          type="text"
                          placeholder="Town *"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.town}
                        />
                        {formik.touched.town && formik.errors.town && (
                          <div className={styles.error}>
                            {formik.errors.town}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        );
      case 2:
        return (
          <div className={styles.payment}>
            <form onSubmit={formikPaymnet.handleSubmit}>
              <div className={styles.user_payment}>
                <h2>Details for card</h2>
                <div className={styles.user_payment_inputs}>
                  <div className={styles.input}>
                    <input
                      id="cardNumber"
                      name="cardNumber"
                      type="text"
                      placeholder="Card Number *"
                      onChange={formikPaymnet.handleChange}
                      onBlur={formikPaymnet.handleBlur}
                      value={formikPaymnet.values.cardNumber}
                    />
                    {formikPaymnet.touched.cardNumber &&
                      formikPaymnet.errors.cardNumber && (
                        <div className={styles.error}>
                          {formikPaymnet.errors.cardNumber}
                        </div>
                      )}
                  </div>
                  <div className={styles.input}>
                    <input
                      id="holder"
                      name="holder"
                      type="text"
                      placeholder="Card Holder *"
                      onChange={formikPaymnet.handleChange}
                      onBlur={formikPaymnet.handleBlur}
                      value={formikPaymnet.values.holder}
                    />
                    {formikPaymnet.touched.holder &&
                      formikPaymnet.errors.holder && (
                        <div className={styles.error}>
                          {formikPaymnet.errors.holder}
                        </div>
                      )}
                  </div>
                </div>
              </div>

              <div className={styles.card_details}>
                <div className={styles.input}>
                  <input
                    id="month"
                    name="month"
                    type="text"
                    placeholder="Month *"
                    onChange={formikPaymnet.handleChange}
                    onBlur={formikPaymnet.handleBlur}
                    value={formikPaymnet.values.month}
                  />
                  {formikPaymnet.touched.month &&
                    formikPaymnet.errors.month && (
                      <div className={styles.error}>
                        {formikPaymnet.errors.month}
                      </div>
                    )}
                </div>
                <div className={styles.input}>
                  <input
                    id="year"
                    name="year"
                    type="text"
                    placeholder="Year *"
                    onChange={formikPaymnet.handleChange}
                    onBlur={formikPaymnet.handleBlur}
                    value={formikPaymnet.values.year}
                  />
                  {formikPaymnet.touched.year && formikPaymnet.errors.year && (
                    <div className={styles.error}>
                      {formikPaymnet.errors.year}
                    </div>
                  )}
                </div>
                <div className={styles.input}>
                  <input
                    id="cvv"
                    name="cvv"
                    type="text"
                    placeholder="CVV *"
                    onChange={formikPaymnet.handleChange}
                    onBlur={formikPaymnet.handleBlur}
                    value={formikPaymnet.values.cvv}
                  />
                  {formikPaymnet.touched.cvv && formikPaymnet.errors.cvv && (
                    <div className={styles.error}>
                      {formikPaymnet.errors.cvv}
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        );
      default:
        return <div>Unknown Step</div>;
    }
  };

  const updateOrderStatus = () => {
    const status = "Approved";
    dispatch(updateOrderStatusThunk({ orderId, status }));
  };

  const updateUserInfo = () => {
    const userData = {
      name: formik.values.name,
      surname: formik.values.surname,
      address: formik.values.address,
      zip: formik.values.zip,
      country: formik.values.country,
      town: formik.values.town,
    };
    dispatch(updateUserInfoThunk(userData));
  };

  const updateUserInfoPaypal = () => {
    const userPaypal = {
      cardNumber: formikPaymnet.values.cardNumber,
      holder: formikPaymnet.values.holder,
      month: formikPaymnet.values.month,
      year: formikPaymnet.values.year,
      cvv: formikPaymnet.values.cvv,
    };
    dispatch(updateUserInfoThunk(userPaypal));
  };

  const handleFinish = async () => {
    if (formik.isValid && formik.dirty && formikPaymnet.isValid && formikPaymnet.dirty) {
      try {
        await updateOrderStatus(); 
        await updateUserInfo();
        await updateUserInfoPaypal();
        await dispatch(deleteAllOrdersThunk());
      } catch (error) {
        console.error("İşlem sırasında bir hata oluştu:", error);
      }
    }
  };
  

  return (
    <div className={styles.checkoutHeader}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        onClick={handleStep}
        sx={{ width: "100%", backgroundColor: "transparent" }}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div className={styles.content}>{getStepContent(activeStep)}</div>

      <div className={styles.paragraph}>
        <p>
          By continuing, I confirm that I was able to read and understand the
          information on the use of my personal data, as explained in the
          Privacy Policy.
        </p>
      </div>

      <div className={styles.buttons}>
        {activeStep > 1 && (
          <button onClick={handleBack} className={styles.back}>
            Return
          </button>
        )}

        {activeStep < steps.length - 1 ? (
          <button
            onClick={handleNext}
            className={styles.next}
            disabled={!(formik.isValid && formik.dirty) && !(formikPaymnet.isValid && formikPaymnet.dirty)}
          >
            Continue
          </button>
        ) : (
          <button
            onClick={() => {
              setIsFinish(true);
              handleFinish()
            }}
            className={styles.next}
            disabled={!(formikPaymnet.isValid && formikPaymnet.dirty)}
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
};

export default CheckoutHeader;
