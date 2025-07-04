import styles from './ExpenseLoader.module.css';

const ExpenseLoader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loader}>
        <span className={styles.symbol}>$</span>
      </div>
    </div>
  );
};

export default ExpenseLoader;
