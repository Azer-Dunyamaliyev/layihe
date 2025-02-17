import React, { useState } from "react";
import Stepper from "react-stepper-horizontal";
import styles from "./checkoutheader.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";

const steps = ["Details", "Delivery", "Payment"];

const CheckoutHeader = () => {
  const [activeStep, setActiveStep] = useState(1);

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
    validateOnBlur: true, // Blur olduğunda doğrulama yapılacak
    validateOnChange: true, // Input değiştiğinde doğrulama yapılacak
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

              <button type="submit">Submit</button>
            </form>
          </div>
        );
      case 2:
        return <div>Payment Content</div>;
      default:
        return <div>Unknown Step</div>;
    }
  };

  return (
    <div className={styles.checkoutHeader}>
      <Stepper
        steps={steps.map((step, index) => ({
          title: step,
          onClick: handleStep(index),
        }))}
        activeStep={activeStep}
        activeColor="#000"
        completeColor="#000"
        circleFontSize={12}
        size={25}
      />

      <div className={styles.content}>{getStepContent(activeStep)}</div>

      <div className={styles.buttons}>
        {activeStep > 1 && (
          <button onClick={handleBack} className={styles.backButton}>
            Back
          </button>
        )}

        {activeStep < steps.length - 1 ? (
          <button onClick={handleNext} className={styles.nextButton}>
            Next
          </button>
        ) : (
          <button
            onClick={() => alert("All steps completed!")}
            className={styles.finishButton}
          >
            Finish
          </button>
        )}
      </div>
    </div>
  );
};

export default CheckoutHeader;
