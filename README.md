# 💰 Expanso - Smart Expense Management App

## 📋 Table of Contents

- [✨ Features](#-features)
- [🎨 UI/UX Highlights](#-uiux-highlights)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [📱 Screenshots](#-screenshots)
- [🔐 Authentication Flow](#-authentication-flow)
- [📊 Dashboard Features](#-dashboard-features)
- [🎯 User Journey](#-user-journey)
- [📄 License](#-license)

---

## ✨ Features

### 🔐 **Smart Authentication System**
- **Intelligent Routing**: Automatically detects new vs returning users
- **Secure Login/Signup**: Email and password authentication
- **Protected Routes**: Role-based access control

### 👤 **User Onboarding**
- **Multi-step Setup**: Guided profile completion
- **Personal Information**: Name, email, and preferences
- **Financial Configuration**: Income, currency, and goals
- **Progress Tracking**: Visual step indicators

### 📊 **Dashboard & Analytics**
- **Financial Overview**: Balance, income, expenses, and savings
- **Interactive Stats**: Real-time financial metrics
- **Quick Actions**: Easy expense and income management
- **Responsive Design**: Perfect on all devices

### 📈 **Insights**
- **Monthly Trends**: Income vs expense tracking
- **Visual Charts**: Pie charts and bar graphs

### ⚙️ **Settings & Profile**
- **Profile Management**: Update personal information
- **Password Security**: Change password functionality
- **Account Actions**: Logout and account deletion

### 🎨 **Premium UI/UX**
- **Glass Morphism**: Modern frosted glass effects
- **3D Animations**: Interactive floating elements
- **Micro-interactions**: Smooth hover and click effects
- **Responsive Design**: Mobile-first approach

---

## 🎨 UI/UX Highlights

### 🌟 **Interactive Visual Elements**
- **3D Credit Cards**: Realistic floating card animations
- **Currency Coins**: Spinning coin effects with multiple currencies
- **Floating Elements**: Background particles and orbital movements

### 🎭 **Advanced Animations**
- **Page Transitions**: Smooth navigation between screens
- **Loading States**: Elegant loading animations
- **Hover Effects**: Interactive button and card responses
- **Form Validation**: Real-time input feedback

### 🎪 **Error Handling**
- **Custom 404 Page**: Beautiful error page with navigation
- **Form Validation**: Real-time input validation
- **Toast Notifications**: Success and error messages

---

## 🛠️ Tech Stack

### **Frontend**
- **React 19.1.0** - Modern React with hooks and functional components
- **TypeScript 5.8.3** - Type-safe development
- **Vite 7.0.4** - Lightning-fast build tool
- **React Router DOM 7.7.1** - Client-side routing

### **Styling**
- **CSS Modules** - Scoped styling for components
- **Lucide React** - Beautiful icon library
- **Custom Animations** - CSS keyframes and transitions

### **State Management**
- **Local Storage** - Client-side data persistence
- **React Hooks** - useState, useEffect, useNavigate
- **Redux ToolKit** - Scalable state management

### **Development Tools**
- **ESLint** - Code linting and formatting
- **TypeScript ESLint** - TypeScript-specific linting

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v16 or higher)
- npm or yarn package manager

### **Installation**

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   ```
   http://localhost:5173
   ```

### **Build for Production**
```bash
npm run build
npm run preview
```

---

## 📱 Screenshots

### 🔐 Authentication Pages
- **Smart Login/Signup**: Automatically shows appropriate form
- **Interactive Visuals**: 3D credit cards and floating animations
- **Form Validation**: Real-time input feedback

### 👤 User Setup
- **Multi-step Process**: Guided onboarding experience
- **Progress Indicators**: Visual step completion
- **Responsive Design**: Perfect on all devices

### 📊 Dashboard
- **Financial Overview**: Comprehensive stats display
- **Quick Actions**: Easy access to main features
- **Modern UI**: Glass morphism and smooth animations

---

### **Protected Routes**
- **Authentication Required**: Dashboard, AddExpense, Settings
- **Setup Required**: Dashboard access after setup completion
- **Smart Redirects**: Automatic routing based on user state

---

## 📊 Dashboard Features

### **Financial Stats Cards**
- **Total Balance**: Current account balance with trend
- **Monthly Income**: Income tracking with growth indicators
- **Monthly Expenses**: Expense monitoring with comparisons
- **Savings**: Savings calculation with goal progress

### **Quick Actions**
- **Add Expense**: Quick expense entry
- **Add Income**: Income recording
- **Settings**: Profile management

### **Responsive Design**
- **Mobile Sidebar**: Collapsible navigation
- **Adaptive Layout**: Grid system for all screen sizes
- **Touch Friendly**: Optimized for mobile interactions

---

## 🎯 User Journey

### **New User Flow**
1. **Landing** → Auto-redirect to Signup
2. **Signup** → Account creation
3. **User Setup** → Profile completion (3 steps)
4. **Dashboard** → Main application

### **Returning User Flow**
1. **Landing** → Auto-redirect to Login
2. **Login** → Authentication
3. **Dashboard** → Direct access (if setup complete)
4. **User Setup** → Complete setup (if incomplete)

### **Authenticated User**
1. **Any Auth Page** → Auto-redirect to Dashboard
2. **Direct Access** → All protected routes available

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <h3>🌟 Made with ❤️ for better financial management</h3>
  <p>If you found this project helpful, please give it a ⭐!</p>
  