import { useState } from "react";
import styles from "./UserSetup.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Mail, 
  DollarSign, 
  Target, 
  Calendar,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Wallet,
  PiggyBank
} from "lucide-react";

const UserSetup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [user, setUser] = useState({
    name: "",
    email: "",
    income: "",
    goal: "",
    currency: "INR",
    startDate: "",
  });

  const navigate = useNavigate();

  const steps = [
    { id: 1, title: "Personal Info", icon: User },
    { id: 2, title: "Financial Details", icon: DollarSign },
    { id: 3, title: "Goals & Preferences", icon: Target }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!user.name || !user.email) {
        toast.error("Please fill in all required fields");
        return;
      }
    } else if (currentStep === 2) {
      if (!user.income || !user.currency) {
        toast.error("Please fill in all required fields");
        return;
      }
    }
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, income, currency, startDate } = user;
    if (!name || !email || !income || !currency || !startDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Get current user from localStorage and update with setup data
    const currentUser = JSON.parse(localStorage.getItem('currentuser') || '{}');
    const updatedUser = { ...currentUser, ...user, setupCompleted: true };
    
    localStorage.setItem("currentuser", JSON.stringify(updatedUser));
    localStorage.setItem("userDetails", JSON.stringify(user));
    toast.success("Profile setup completed successfully!");
    navigate("/dashboard");
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className={styles.stepContent}>
            <div className={styles.stepHeader}>
              <div className={styles.stepIcon}>
                <User size={24} />
              </div>
              <h3>Let's get to know you</h3>
              <p>Tell us about yourself to personalize your experience</p>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="name">
                <User size={16} />
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={user.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email">
                <Mail size={16} />
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className={styles.stepContent}>
            <div className={styles.stepHeader}>
              <div className={styles.stepIcon}>
                <Wallet size={24} />
              </div>
              <h3>Financial Information</h3>
              <p>Help us understand your financial situation</p>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="currency">
                <DollarSign size={16} />
                Preferred Currency *
              </label>
              <select name="currency" id="currency" value={user.currency} onChange={handleChange}>
                <option value="INR">₹ Indian Rupee (INR)</option>
                <option value="USD">$ US Dollar (USD)</option>
                <option value="EUR">€ Euro (EUR)</option>
                <option value="GBP">£ British Pound (GBP)</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="income">
                <TrendingUp size={16} />
                Monthly Income *
              </label>
              <input
                type="number"
                id="income"
                name="income"
                value={user.income}
                onChange={handleChange}
                placeholder="Enter your monthly income"
                required
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className={styles.stepContent}>
            <div className={styles.stepHeader}>
              <div className={styles.stepIcon}>
                <PiggyBank size={24} />
              </div>
              <h3>Set Your Goals</h3>
              <p>Define your financial objectives and start date</p>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="goal">
                <Target size={16} />
                Savings Goal (Optional)
              </label>
              <input
                type="number"
                id="goal"
                name="goal"
                value={user.goal}
                onChange={handleChange}
                placeholder="Enter your savings target"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="startDate">
                <Calendar size={16} />
                Start Date *
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={user.startDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.backgroundElements}>
        <div className={styles.floatingElement}></div>
        <div className={styles.floatingElement}></div>
        <div className={styles.floatingElement}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.progressContainer}>
          <div className={styles.progressHeader}>
            <h1>Complete Your Profile</h1>
            <p>Step {currentStep} of 3</p>
          </div>
          
          <div className={styles.stepsIndicator}>
            {steps.map((step) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={step.id}
                  className={`${styles.step} ${
                    currentStep >= step.id ? styles.active : ''
                  } ${currentStep > step.id ? styles.completed : ''}`}
                >
                  <div className={styles.stepNumber}>
                    {currentStep > step.id ? (
                      <CheckCircle size={20} />
                    ) : (
                      <IconComponent size={20} />
                    )}
                  </div>
                  <span className={styles.stepTitle}>{step.title}</span>
                </div>
              );
            })}
          </div>
          
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className={styles.formCard}>
          <form onSubmit={currentStep === 3 ? handleSubmit : (e) => e.preventDefault()}>
            {renderStepContent()}

            <div className={styles.buttonGroup}>
              {currentStep > 1 && (
                <button
                  type="button"
                  className={styles.previousButton}
                  onClick={handlePrevious}
                >
                  Previous
                </button>
              )}
              
              {currentStep < 3 ? (
                <button
                  type="button"
                  className={styles.nextButton}
                  onClick={handleNext}
                >
                  Next
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button type="submit" className={styles.submitButton}>
                  Complete Setup
                  <CheckCircle size={16} />
                </button>
              )}
            </div>
          </form>
        </div>

        <div className={styles.benefitsSection}>
          <h4>Why complete your profile?</h4>
          <div className={styles.benefits}>
            <div className={styles.benefit}>
              <TrendingUp size={16} />
              <span>Personalized insights</span>
            </div>
            <div className={styles.benefit}>
              <Target size={16} />
              <span>Goal tracking</span>
            </div>
            <div className={styles.benefit}>
              <Wallet size={16} />
              <span>Better budgeting</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSetup;