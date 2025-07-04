import { useEffect, useState } from "react";
import { FormData } from "../../Utils/JsonData";
import personImg from "../../assets/Person__Image.png";
import ExpansoLogo from "../../assets/Expanso_Logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MainImage from "../../assets/MainImage.png";
import { toast } from "react-toastify";
import styles from "./Auth.module.css";

const Signup = () => {
  const [showImage, setShowImage] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [accountData, setAccountData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const navigate = useNavigate();

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

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountData({
      ...accountData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, password, cpassword } = accountData;

    if (!name || !email || !password || !cpassword) {
      toast.error("All Fields are required");
      return;
    }

    if (password !== cpassword) {
      toast.error("Passwords are not same");
      return;
    }

    const users = JSON.parse(localStorage.getItem("expansoUsers") || "[]");

    const userExist = users.some(
      (user: any) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (userExist) {
      toast.info("User already exist with this email");
      return;
    }

    const newUser = { name, email, password, cpassword };
    const updatedUser = [...users, newUser];

    localStorage.setItem("expansoUsers", JSON.stringify(updatedUser));
    setTimeout(() => {
      toast.success("Account Created Succesfully");
    }, 1500);
    navigate("/login");
  };

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
                    name={field.name}
                    autoComplete="off"
                    onChange={handleAccountChange}
                  />
                </div>
              ))}
              <button className={styles.button} onClick={handleCreateAccount}>
                Create Account
              </button>
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
