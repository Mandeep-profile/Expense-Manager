import { useState } from "react";
import { FormData } from "../../Utils/JsonData";
import personImg from "../../assets/Person__Image.png";
import ExpansoLogo from "../../assets/Expanso_Logo.png"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { User, Mail, Lock, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import styles from "./Auth.module.css";
import CardAnimation from "./CardAnimation";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accountData, setAccountData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const navigate = useNavigate();

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
      toast.info("User already exists with this email");
      return;
    }

    const newUser = { name, email, password, cpassword };
    const updatedUsers = [...users, newUser];

    localStorage.setItem("expansoUsers", JSON.stringify(updatedUsers));
    toast.success("Account Created Successfully");
    navigate("/login");
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isPasswordStrong = (password: string) => {
    return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
  };

  const passwordsMatch = accountData.password === accountData.cpassword && accountData.cpassword !== '';

  const getFieldIcon = (fieldName: string) => {
    switch(fieldName) {
      case 'name': return <User size={20} />;
      case 'email': return <Mail size={20} />;
      case 'password':
      case 'cpassword': return <Lock size={20} />;
      default: return null;
    }
  };

  return (
    <>
        <div className={styles.wrapper}>
          <div className={styles.backgroundElements}>
            <div className={styles.floatingElement}></div>
            <div className={styles.floatingElement}></div>
            <div className={styles.floatingElement}></div>
          </div>

          <div className={styles.logoSection}>
            <div className={styles.Expansodiv}>
              <div className={styles.logoIconContainer}>
                <img src={ExpansoLogo} alt="Expanso Logo" className={styles.expansologo}/>
              </div>
              <div>
                <span className={styles.logoText}>Expanso</span>
                <div className={styles.tagline}>Manage Expenses Effortlessly</div>
              </div>
            </div>
          </div>

          <div className={styles.flexContainer}>
            <CardAnimation />

            <div className={styles.rightSection}>
              <div className={styles.formContainer}>
                <div className={styles.formHeader}>
                  <h2 className={styles.formHeading}>Create Account</h2>
                  <p className={styles.formSubtitle}>Start your financial journey today</p>
                </div>

                <form onSubmit={handleCreateAccount} className={styles.form}>
                  {FormData.map((field) => (
                    <div key={field.id} className={styles.inputGroup}>
                      <label htmlFor={field.id} className={styles.label}>
                        {getFieldIcon(field.name)}
                        {field.label}
                      </label>
                      <div className={styles.inputContainer}>
                        <input
                          className={styles.input}
                          type={
                            field.name === 'password' && showPassword ? 'text' :
                            field.name === 'cpassword' && showConfirmPassword ? 'text' :
                            field.type
                          }
                          placeholder={field.placeholder}
                          id={field.id}
                          name={field.name}
                          value={accountData[field.name as keyof typeof accountData]}
                          autoComplete="off"
                          onChange={handleAccountChange}
                          required
                        />
                        {(field.name === 'password' || field.name === 'cpassword') && (
                          <button
                            type="button"
                            className={styles.passwordToggle}
                            onClick={() => {
                              if (field.name === 'password') {
                                setShowPassword(!showPassword);
                              } else {
                                setShowConfirmPassword(!showConfirmPassword);
                              }
                            }}
                          >
                            {(field.name === 'password' ? showPassword : showConfirmPassword) ? 
                              <EyeOff size={20} /> : <Eye size={20} />
                            }
                          </button>
                        )}
                      </div>
                      
                      {/* Validation Messages */}
                      {field.name === 'email' && accountData.email && (
                        <div className={`${styles.validationMessage} ${isValidEmail(accountData.email) ? styles.success : styles.error}`}>
                          {isValidEmail(accountData.email) ? (
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
                      
                      {field.name === 'password' && accountData.password && (
                        <div className={`${styles.validationMessage} ${isPasswordStrong(accountData.password) ? styles.success : styles.error}`}>
                          {isPasswordStrong(accountData.password) ? (
                            <>
                              <CheckCircle size={14} />
                              Strong password
                            </>
                          ) : (
                            <>
                              <AlertCircle size={14} />
                              Password must be 8+ chars with uppercase and number
                            </>
                          )}
                        </div>
                      )}
                      
                      {field.name === 'cpassword' && accountData.cpassword && (
                        <div className={`${styles.validationMessage} ${passwordsMatch ? styles.success : styles.error}`}>
                          {passwordsMatch ? (
                            <>
                              <CheckCircle size={14} />
                              Passwords match
                            </>
                          ) : (
                            <>
                              <AlertCircle size={14} />
                              Passwords do not match
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  <button type="submit" className={styles.button}>
                    Create Account
                  </button>
                </form>

                <p className={styles.account}>
                  Already have an account?{" "}
                  <Link to="/login" className={styles.link}>
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default Signup;