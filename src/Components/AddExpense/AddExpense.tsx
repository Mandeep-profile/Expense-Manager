import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./AddExpense.module.css";
import { addExpense } from "./ExpenseSlice";
import { toast } from "react-toastify";
import { 
  Receipt, 
  DollarSign, 
  Calendar, 
  Tag, 
  Plus,
  ShoppingCart,
  Car,
  Gamepad2,
  MoreHorizontal
} from "lucide-react";

const AddExpense = () => {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    category: "",
    date: "",
  });

  const dispatch = useDispatch();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleExpenseFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Food': return <ShoppingCart size={20} />;
      case 'Transport': return <Car size={20} />;
      case 'Entertainment': return <Gamepad2 size={20} />;
      default: return <MoreHorizontal size={20} />;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerIcon}>
            <Receipt size={24} />
          </div>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Add New Expense</h1>
            <p className={styles.subtitle}>Track your spending and manage your budget</p>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleExpenseFormSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label htmlFor="category" className={styles.label}>
                <Tag size={16} />
                Category
              </label>
              <div className={styles.selectWrapper}>
                <select
                  id="category"
                  name="category"
                  className={styles.select}
                  value={formData.category}
                  onChange={handleFormChange}
                  required
                >
                  <option value="">Choose a category</option>
                  <option value="Food">🍽️ Food & Dining</option>
                  <option value="Transport">🚗 Transportation</option>
                  <option value="Entertainment">🎮 Entertainment</option>
                  <option value="Other">📦 Other</option>
                </select>
                {formData.category && (
                  <div className={styles.categoryIcon}>
                    {getCategoryIcon(formData.category)}
                  </div>
                )}
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                <Receipt size={16} />
                Expense Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="e.g. Grocery shopping, Gas bill..."
                className={styles.input}
                value={formData.name}
                onChange={handleFormChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="amount" className={styles.label}>
                <DollarSign size={16} />
                Amount
              </label>
              <div className={styles.amountWrapper}>
                <span className={styles.currencySymbol}>₹</span>
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  placeholder="0.00"
                  className={`${styles.input} ${styles.amountInput}`}
                  value={formData.amount}
                  onChange={handleFormChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="date" className={styles.label}>
                <Calendar size={16} />
                Date
              </label>
              <input
                id="date"
                name="date"
                type="date"
                className={styles.input}
                value={formData.date}
                onChange={handleFormChange}
                max={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>

          <div className={styles.summary}>
            <div className={styles.summaryContent}>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Category:</span>
                <span className={styles.summaryValue}>
                  {formData.category || 'Not selected'}
                </span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Amount:</span>
                <span className={styles.summaryValue}>
                  {formData.amount ? `₹${formData.amount}` : '₹0.00'}
                </span>
              </div>
            </div>
          </div>

          <button type="submit" className={styles.submitButton}>
            <Plus size={20} />
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;