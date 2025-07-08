import styles from "./AddExpense.module.css";

const AddExpense = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.flexContainer}>
        <div className={styles.formSection}>
          <h2 className={styles.formHeading}>Add Expense</h2>

          <label htmlFor="category" className={styles.label}>
            Category
          </label>
          <select id="category" name="category" className={styles.categorySelect}>
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>

          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>Expense Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. Grocery shopping"
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="amount" className={styles.label}>Amount</label>
            <input
              id="amount"
              name="amount"
              type="number"
              placeholder="e.g. 1200"
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="date" className={styles.label}>Date</label>
            <input
              id="date"
              name="date"
              type="date"
              className={styles.input}
            />
          </div>
          <button className={styles.button}>Add Expense</button>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
