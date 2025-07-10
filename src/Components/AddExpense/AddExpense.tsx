import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./AddExpense.module.css";
import { addExpense } from "./ExpenseSlice";
import { toast } from "react-toastify";
// import TagInput from "./TagInput";

const AddExpense = () => {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    category: "",
    date: "",
  });

  const dispatch = useDispatch();

  const handleFormChange = (e: React.FormEvent<HTMLFormElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleExpenseFormSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const {name, category, date, amount} = formData

    if(!name || !category || !date || !amount){
      toast.error("All Fields are required");
      return;
    }

    dispatch(
      addExpense({
        id: Date.now(),
        name: formData.name,
        category: formData.category,
        date: formData.date,
        amount: formData.amount,
      })
    );
    setFormData({
      name: "",
      amount: "",
      category: "",
      date: "",
    });
    toast.success("New Expense Added")
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.flexContainer}>
        <form className={styles.formSection} onSubmit={handleExpenseFormSubmit}>
          <h2 className={styles.formHeading}>Add Expense</h2>
          {/* <TagInput /> */}
          <label htmlFor="category" className={styles.label}>
            Category
          </label>
          <select
            id="category"
            name="category"
            className={styles.categorySelect}
            value={formData.category}
            onChange={handleFormChange}
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>

          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>
              Expense Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. Grocery shopping"
              className={styles.input}
              value={formData.name}
              onChange={handleFormChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="amount" className={styles.label}>
              Amount
            </label>
            <input
              id="amount"
              name="amount"
              type="number"
              placeholder="e.g. 1200"
              className={styles.input}
              value={formData.amount}
              onChange={handleFormChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="date" className={styles.label}>
              Date
            </label>
            <input
              id="date"
              name="date"
              type="date"
              className={styles.input}
              value={formData.date}
              onChange={handleFormChange}
            />
          </div>
          <button className={styles.button}>
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
