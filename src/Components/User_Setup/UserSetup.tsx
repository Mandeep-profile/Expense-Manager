import { useState } from "react";
import styles from "./UserSetup.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserSetup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    income: "",
    goal: "",
    currency: "INR",
    startDate: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, income, currency, startDate } = user;
    if (!name || !email || !income || !currency || !startDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    localStorage.setItem("userDetails", JSON.stringify(user));
    toast.success("User details saved!");
    navigate("/dashboard");
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.formCard} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Profile Setup</h2>

        <div className={styles.inputGroup}>
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="example@email.com"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="income">Monthly Income (₹ / $) *</label>
          <input
            type="number"
            id="income"
            name="income"
            value={user.income}
            onChange={handleChange}
            placeholder="50000"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="goal">Savings Goal (Optional)</label>
          <input
            type="number"
            id="goal"
            name="goal"
            value={user.goal}
            onChange={handleChange}
            placeholder="100000"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="currency">Preferred Currency *</label>
          <select name="currency" id="currency" value={user.currency} onChange={handleChange}>
            <option value="INR">₹ INR</option>
            <option value="USD">$ USD</option>
            <option value="EUR">€ EUR</option>
            <option value="GBP">£ GBP</option>
          </select>
        </div>

        <button className={styles.submitButton}>Save & Continue</button>
      </form>
    </div>
  );
};

export default UserSetup;
