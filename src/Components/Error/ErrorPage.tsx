import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  ArrowLeft, 
  Search, 
  CreditCard,
  Compass,
  RefreshCw,
  MapPin,
  Zap
} from 'lucide-react';
import styles from './ErrorPage.module.css';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/dashboard');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className={styles.wrapper}>
      {/* Floating Background Elements */}
      <div className={styles.backgroundElements}>
        <div className={styles.floatingElement}></div>
        <div className={styles.floatingElement}></div>
        <div className={styles.floatingElement}></div>
        <div className={styles.floatingElement}></div>
      </div>

      {/* Logo Section */}
      <div className={styles.logoSection}>
        <div className={styles.logoContainer}>
          <div className={styles.logoIconContainer}>
            <CreditCard size={24} />
          </div>
          <div>
            <span className={styles.logoText}>Expanso</span>
            <div className={styles.tagline}>Manage Expenses Effortlessly</div>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        {/* Main Error Content */}
        <div className={styles.errorContent}>
          {/* Animated 404 Number */}
          <div className={styles.errorNumber}>
            <span className={styles.digit}>4</span>
            <div className={styles.zeroContainer}>
              <div className={styles.outerRing}>
                <div className={styles.innerRing}>
                  <div className={styles.centerDot}></div>
                </div>
              </div>
            </div>
            <span className={styles.digit}>4</span>
          </div>

          {/* Error Message */}
          <div className={styles.errorMessage}>
            <h1>Oops! Page Not Found</h1>
            <p>The page you're looking for seems to have wandered off into the financial void. Don't worry, we'll help you get back on track!</p>
          </div>

          {/* Interactive Elements */}
          <div className={styles.interactiveElements}>
            {/* Floating Financial Icons */}
            <div className={styles.floatingIcons}>
              <div className={styles.floatingIcon}>
                <Compass size={24} />
              </div>
              <div className={styles.floatingIcon}>
                <MapPin size={20} />
              </div>
              <div className={styles.floatingIcon}>
                <Zap size={22} />
              </div>
              <div className={styles.floatingIcon}>
                <Search size={18} />
              </div>
            </div>

            {/* Animated Credit Card */}
            <div className={styles.errorCard}>
              <div className={styles.cardHeader}>
                <div className={styles.cardChip}></div>
                <div className={styles.cardType}>ERROR</div>
              </div>
              <div className={styles.cardNumber}>404 404 404 404</div>
              <div className={styles.cardFooter}>
                <div className={styles.cardName}>PAGE NOT FOUND</div>
                <div className={styles.cardExpiry}>∞</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.actionButtons}>            
            <button className={styles.secondaryButton} onClick={handleGoBack}>
              <ArrowLeft size={20} />
              Go Back
            </button>
            
            <button className={styles.tertiaryButton} onClick={handleRefresh}>
              <RefreshCw size={20} />
              Refresh Page
            </button>
          </div>
        </div>

        <div className={styles.decorativeElements}>
          <div className={styles.orbit}>
            <div className={styles.planet}></div>
          </div>
          <div className={styles.orbit}>
            <div className={styles.planet}></div>
          </div>
          <div className={styles.orbit}>
            <div className={styles.planet}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;