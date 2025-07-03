import { useEffect, useState } from "react";
import { FormData } from "../../Utils/JsonData";
import personImg from "../../assets/Person__Image.png";
import ExpansoLogo from "../../assets/Expanso_Logo.png";
import { Link } from "react-router-dom";
import MainImage from "../../assets/MainImage.png";
import styles from "./Auth.module.css";

const Signup = () => {
  const [showImage, setShowImage] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2000); 

    const hideTimer = setTimeout(() => {
      setShowImage(false); 
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <>
      {showImage ? (
        <div className={styles.imageContainer}>
          <img
            src={MainImage}
            alt="Main Image"
            className={`${styles.MainImg} ${fadeOut ? styles.slideUpOut : ""}`}
          />
        </div>
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.Expansodiv}>
            <img
              className={styles.Expansoimage}
              src={ExpansoLogo}
              alt="Expanso App Logo"
            />
            <span className={styles.logoText}>Expanso</span>
          </div>
          <div className={styles.tagline}>Manage Expenses Effortlessly</div>

          <div className={styles.flexContainer}>
            <img
              className={styles.Personimage}
              src={personImg}
              alt="Person Image"
            />

            <div className={styles.formSection}>
              <h2 className={styles.formHeading}>Create Account</h2>
              {FormData.map((field) => (
                <div key={field.id} className={styles.inputGroup}>
                  <label htmlFor={field.id} className={styles.label}>
                    {field.label}
                  </label>
                  <input
                    className={styles.input}
                    type={field.type}
                    placeholder={field.placeholder}
                    id={field.id}
                    autoComplete="off"
                  />
                </div>
              ))}
              <button className={styles.button}>Create Account</button>
              <p className={styles.account}>
                Already have an account?{" "}
                <Link to="/login" className={styles.link}>
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
