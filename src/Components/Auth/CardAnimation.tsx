import styles from "./Auth.module.css"

const CardAnimation = () => {
  return (
        <div className={styles.leftSection}>
              <div className={styles.visualContainer}>
              
                <div className={styles.financialElements}>
                  <div className={styles.floatingCard}>
                    <div className={styles.cardHeader}>
                      <div className={styles.cardChip}></div>
                      <div className={styles.cardType}>VISA</div>
                    </div>
                    <div className={styles.cardNumber}>•••• •••• •••• 1234</div>
                    <div className={styles.cardFooter}>
                      <div className={styles.cardName}>User Name</div>
                      <div className={styles.cardExpiry}>12/31</div>
                    </div>
                  </div>
                  
                  <div className={styles.floatingCoins}>
                    <div className={styles.coin}>$</div>
                    <div className={styles.coin}>₹</div>
                    <div className={styles.coin}>£</div>
                  </div>
                  
                  <div className={styles.transactionList}>
                    <div className={styles.transaction}>
                      <div className={styles.transactionIcon}>🛒</div>
                      <div className={styles.transactionDetails}>
                        <div className={styles.transactionName}>Grocery Store</div>
                        <div className={styles.transactionAmount}>-$45.20</div>
                      </div>
                    </div>
                    <div className={styles.transaction}>
                      <div className={styles.transactionIcon}>💼</div>
                      <div className={styles.transactionDetails}>
                        <div className={styles.transactionName}>Salary</div>
                        <div className={styles.transactionAmount}>+$3,200</div>
                      </div>
                    </div>
                    <div className={styles.transaction}>
                      <div className={styles.transactionIcon}>☕</div>
                      <div className={styles.transactionDetails}>
                        <div className={styles.transactionName}>Coffee Shop</div>
                        <div className={styles.transactionAmount}>-$12.50</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={styles.welcomeMessage}>
                  <h3>Join Thousands of Users</h3>
                  <p>Managing their finances smarter with Expanso's powerful tools</p>
                </div>
              </div>
            </div>
  )
}

export default CardAnimation