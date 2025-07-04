import { useState } from "react";
import { useNavigate } from "react-router-dom";
import personImg from "../../assets/Person__Image.png";
import ExpansoLogo from "../../assets/Expanso_Logo.png";
import { LoginFormData } from "../../Utils/JsonData";
import { Link } from "react-router-dom";
import styles from "./Auth.module.css";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [loginAccountData, setLoginAccountData] = useState({
    email: "",
    password: "",
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginAccountData({
      ...loginAccountData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleLoginAccount = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const {email, password} = loginAccountData

    if(!email || !password){
      toast.error("All Fields are required")
      return;
    }
    const users = JSON.parse(localStorage.getItem("expansoUsers") || "[]");

    const matchedUser = users.find(
      (user: any) =>
        user.email.toLowerCase() === loginAccountData.email.toLowerCase() &&
        user.password === loginAccountData.password
    );

    if (matchedUser) {
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("currentuser", JSON.stringify(matchedUser));
      navigate("/dashboard");
    } else {
      toast.error("Invalid Credentials");
    }
  };

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
                name={field.name}
                autoComplete="off"
                onChange={handleLoginChange}
              />
            </div>
          ))}
          <button className={styles.button} onClick={handleLoginAccount}>
            Login Account
          </button>
          <p className={styles.account}>
            Don't have an account?{" "}
            <Link to="/" className={styles.link}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
