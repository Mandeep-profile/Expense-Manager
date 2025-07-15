import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  GridViewOutlined,
  AddCardOutlined,
  SummarizeOutlined,
  SettingsOutlined,
  PersonOutlined,
  MenuOutlined,
  CloseOutlined,
  ChevronLeftOutlined,
  ChevronRightOutlined
} from '@mui/icons-material';
import ExpansoLogo from "../../assets/Expanso_Logo.png"
import styles from './DashboardSidebar.module.css';

const DashboardSidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("currentuser") || '{"name": "User"}');

  const menuItems = [
    {
      path: '/dashboard',
      icon: <GridViewOutlined />,
      label: 'Dashboard',
      description: 'Overview & Analytics'
    },
    {
      path: '/addexpense',
      icon: <AddCardOutlined />,
      label: 'Add Expense',
      description: 'Record new expenses'
    },
    {
      path: '/report',
      icon: <SummarizeOutlined />,
      label: 'Reports',
      description: 'Financial insights'
    },
    {
      path: '/settings',
      icon: <SettingsOutlined />,
      label: 'Settings',
      description: 'Account preferences'
    }
  ];

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const closeMobile = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      {!isMobileOpen ? <button className={styles.mobileMenuButton} onClick={toggleMobile}>
        <MenuOutlined />
      </button> : " "}

      {isMobileOpen && (
        <div className={styles.mobileBackdrop} onClick={closeMobile}></div>
      )}

      <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''} ${isMobileOpen ? styles.mobileOpen : ''}`}>
  
        <div className={styles.backgroundElements}>
          <div className={styles.floatingElement1}></div>
          <div className={styles.floatingElement2}></div>
          <div className={styles.floatingElement3}></div>
        </div>

        <div className={styles.header}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
               <img src={ExpansoLogo} alt="Expanso Logo" className={styles.expansologo}/>
            </div>
            {!isCollapsed && (
              <div className={styles.logoText}>
                <span className={styles.logoName}>Expanso</span>
                <span className={styles.logoTagline}>Expense Manager</span>
              </div>
            )}
          </div>

          <button 
            className={styles.collapseButton} 
            // onClick={toggleCollapse}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRightOutlined /> : <ChevronLeftOutlined />}
          </button>

          <button className={styles.mobileCloseButton} onClick={closeMobile}>
            <CloseOutlined />
          </button>
        </div>

        <nav className={styles.navigation}>
          <ul className={styles.menuList}>
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `${styles.menuItem} ${isActive ? styles.active : ''}`
                  }
                  onClick={closeMobile}
                >
                  <span className={styles.menuIcon}>{item.icon}</span>
                  {!isCollapsed && (
                    <div className={styles.menuContent}>
                      <span className={styles.menuLabel}>{item.label}</span>
                      <span className={styles.menuDescription}>{item.description}</span>
                    </div>
                  )}
                  <div className={styles.activeIndicator}></div>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.userSection}>
          <div className={styles.userInfo}>
            <div className={styles.userAvatar}>
              <PersonOutlined />
            </div>
            {!isCollapsed && (
              <div className={styles.userDetails}>
                <span className={styles.userName}>{user.name}</span>
              </div>
            )}
          </div>
          
          {/* <button 
            className={styles.logoutButton} 
            onClick={handleLogout}
            title="Logout"
          >
            <LogoutOutlined />
            {!isCollapsed && <span>Logout</span>}
          </button> */}
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;