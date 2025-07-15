import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ExpansoLogo from "../../assets/Expanso_Logo.png"
import personImg from "../../assets/Person__Image.png";
import { LoginFormData } from "../../Utils/JsonData";
import { Link } from "react-router-dom";
import styles from "./Auth.module.css";
import { toast } from "react-toastify";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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

  const handleLoginAccount = (e: React.FormEvent) => {
    e.preventDefault();

    const { email, password } = loginAccountData;

    if (!email || !password) {
      toast.error("All Fields are required");
      return;
    }

    const users = JSON.parse(localStorage.getItem("expansoUsers") || "[]");

    const matchedUser = users.find(
      (user: any) =>
        user.email.toLowerCase() === loginAccountData.email.toLowerCase() &&
        user.password === loginAccountData.password
    );

    if (matchedUser) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("currentuser", JSON.stringify(matchedUser));
      navigate("/dashboard");
    } else {
      toast.error("Invalid Credentials");
    }
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const getFieldIcon = (fieldName: string) => {
    switch (fieldName) {
      case "email":
        return <Mail size={20} />;
      case "password":
        return <Lock size={20} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* Floating Background Elements */}
      <div className={styles.backgroundElements}>
        <div className={styles.floatingElement}></div>
        <div className={styles.floatingElement}></div>
        <div className={styles.floatingElement}></div>
      </div>

      {/* Logo Section */}
      <div className={styles.logoSection}>
        <div className={styles.Expansodiv}>
          <div className={styles.logoIconContainer}>
            <img
              src={ExpansoLogo}
              alt="Expanso Logo"
              className={styles.expansologo}
            />
          </div>
          <div>
            <span className={styles.logoText}>Expanso</span>
            <div className={styles.tagline}>Manage Expenses Effortlessly</div>
          </div>
        </div>
      </div>

      <div className={styles.flexContainer}>
        <div className={styles.leftSection}>
          <div className={styles.illustrationContainer}>
            <img
              className={styles.Personimage}
              src={personImg}
              alt="Person Illustration"
            />
            <div className={styles.illustrationOverlay}>
              <h3>Welcome Back!</h3>
              <p>Continue managing your finances with Expanso</p>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className={styles.rightSection}>
          <div className={styles.formContainer}>
            <div className={styles.formHeader}>
              <h2 className={styles.formHeading}>Welcome Back</h2>
              <p className={styles.formSubtitle}>Sign in to your account</p>
            </div>

            <form onSubmit={handleLoginAccount} className={styles.form}>
              {LoginFormData.map((field) => (
                <div key={field.id} className={styles.inputGroup}>
                  <label htmlFor={field.id} className={styles.label}>
                    {getFieldIcon(field.name)}
                    {field.label}
                  </label>
                  <div className={styles.inputContainer}>
                    <input
                      className={styles.input}
                      type={
                        field.name === "password" && showPassword
                          ? "text"
                          : field.type
                      }
                      placeholder={field.placeholder}
                      id={field.id}
                      name={field.name}
                      value={
                        loginAccountData[
                          field.name as keyof typeof loginAccountData
                        ]
                      }
                      autoComplete="off"
                      onChange={handleLoginChange}
                      required
                    />
                    {field.name === "password" && (
                      <button
                        type="button"
                        className={styles.passwordToggle}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Validation Messages */}
                  {field.name === "email" && loginAccountData.email && (
                    <div
                      className={`${styles.validationMessage} ${
                        isValidEmail(loginAccountData.email)
                          ? styles.success
                          : styles.error
                      }`}
                    >
                      {isValidEmail(loginAccountData.email) ? (
                        <>
                          <CheckCircle size={14} />
                          Valid email address
                        </>
                      ) : (
                        <>
                          <AlertCircle size={14} />
                          Please enter a valid email address
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}

              <button type="submit" className={styles.button}>
                Sign In
              </button>
            </form>

            <p className={styles.account}>
              Don't have an account?{" "}
              <Link to="/" className={styles.link}>
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
