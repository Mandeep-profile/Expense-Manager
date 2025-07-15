import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Save,
  LogOut,
  Trash2,
} from "lucide-react";
import styles from "./Settings.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentuser") || "{}");
    setCurrentUser(user);
    setProfileData({
      name: user.name || "",
      email: user.email || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  }, []);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      profileData.newPassword &&
      profileData.newPassword !== profileData.confirmPassword
    ) {
      toast.error("New passwords do not match");
      return;
    }

    // Update user data
    const users = JSON.parse(localStorage.getItem("expansoUsers") || "[]");
    const updatedUsers = users.map((user: any) =>
      user.email === currentUser.email
        ? {
            ...user,
            name: profileData.name,
            ...(profileData.newPassword && {
              password: profileData.newPassword,
            }),
          }
        : user
    );

    localStorage.setItem("expansoUsers", JSON.stringify(updatedUsers));
    localStorage.setItem(
      "currentuser",
      JSON.stringify({
        ...currentUser,
        name: profileData.name,
      })
    );

    toast.success("Profile updated successfully");
    setProfileData((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("currentuser");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      const users = JSON.parse(localStorage.getItem("expansoUsers") || "[]");
      const updatedUsers = users.filter(
        (user: any) => user.email !== currentUser.email
      );
      localStorage.setItem("expansoUsers", JSON.stringify(updatedUsers));
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("currentuser");
      toast.success("Account deleted successfully");
      navigate("/");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.contentCard}>
          <div className={styles.sectionContent}>
            <div className={styles.sectionHeader}>
              <h1>Profile Settings</h1>
              <p>Update your personal information and profile settings</p>
            </div>

            <div className={styles.profileImageSection}>
              <div className={styles.profileImage}>
                <User size={40} />
              </div>
            </div>

            <form onSubmit={handleProfileUpdate} className={styles.form}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  <User size={16} />
                  Full Name
                </label>
                <input
                  type="text"
                  className={styles.input}
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  placeholder="Enter your full name"
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  <Mail size={16} />
                  Email Address
                </label>
                <input
                  type="email"
                  className={styles.input}
                  value={profileData.email}
                  disabled
                  placeholder="Enter your email"
                />
                <small className={styles.helpText}>
                  Email cannot be changed
                </small>
              </div>

              <div className={styles.passwordSection}>
                <h4>Change Password</h4>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>
                    <Lock size={16} />
                    Current Password
                  </label>
                  <div className={styles.inputContainer}>
                    <input
                      type={showPassword ? "text" : "password"}
                      className={styles.input}
                      value={profileData.currentPassword}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          currentPassword: e.target.value,
                        }))
                      }
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      className={styles.passwordToggle}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>
                    <Lock size={16} />
                    New Password
                  </label>
                  <div className={styles.inputContainer}>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      className={styles.input}
                      value={profileData.newPassword}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          newPassword: e.target.value,
                        }))
                      }
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      className={styles.passwordToggle}
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>
                    <Lock size={16} />
                    Confirm New Password
                  </label>
                  <div className={styles.inputContainer}>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className={styles.input}
                      value={profileData.confirmPassword}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          confirmPassword: e.target.value,
                        }))
                      }
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      className={styles.passwordToggle}
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <button type="submit" className={styles.saveButton}>
                <Save size={16} />
                Save Changes
              </button>
            </form>
          </div>

          <div className={styles.dangerZone}>
            <h3>Account Actions</h3>
            <div className={styles.dangerActions}>
              <button className={styles.logoutButton} onClick={handleLogout}>
                <LogOut size={16} />
                Logout
              </button>
              <button
                className={styles.deleteButton}
                onClick={handleDeleteAccount}
              >
                <Trash2 size={16} />
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
