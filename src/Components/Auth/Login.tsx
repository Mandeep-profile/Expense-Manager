import personImg from "../../assets/Person__Image.png";
import ExpansoLogo from "../../assets/Expanso_Logo.png";
import { LoginFormData } from "../../Utils/JsonData";
import { Link } from "react-router-dom";
import styles from "./Auth.module.css"

const Login = () => {
  return (
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
          <h2 className={styles.formHeading}>Login Account</h2>
          {LoginFormData.map((field) => (
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
          <button className={styles.button}>Login Account</button>
          <p className={styles.account}>
            Don't have an account?{" "}
            <Link to="/" className={styles.link}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login