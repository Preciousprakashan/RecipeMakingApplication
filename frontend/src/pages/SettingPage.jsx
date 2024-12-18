import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "../styles/SettingPage.css";

const SettingPage = () => {
  const [showPasswordForm, setShowPasswordForm] = useState(false); // Toggle for password form
  const [showEditForm, setShowEditForm] = useState(false); // Toggle for edit profile form

  const navigate = useNavigate(); // To handle navigation (Log out)

  // Log Out Handler
  const handleLogout = () => {
    console.log("User logged out");
    navigate("/");
  };

  // Edit Profile Handler
  const handleEditProfile = () => {
    setShowEditForm(true);
    setShowPasswordForm(false);
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar2">
        <div className="sidebar2-header">
          <h3>Delizia</h3>
        </div>
        <div className="sidebar2-menu">
          <button className="menu-item" >
            <span className="icon"></span> Viewed Recipes
          </button>
          <button className="menu-item">
            <span className="icon"></span> Notification
          </button>
          
          <button className="menu-item" onClick={handleLogout}>
            <span className="icon"></span> Log Out
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="content">
        {/* Background Image */}
        <div className="header-background">
          <img
            src="assets/background.jpg" // Replace with actual image URL
            alt="Header Background"
            className="background-image"
          />
        </div>

        {/* Header Section */}
        <div className="header-section">
          <div className="profile-info">
            <img
              src="/assets/profile.jpg" // Replace with actual profile image URL
              alt="User Profile"
              className="profile-image"
            />
            <div>
              <h2>Frankie</h2>
              <p>frankie@untitledui.com</p>
            </div>
          </div>
          <div className="header-buttons">
            <button className="edit-btn" onClick={handleEditProfile}>
              Edit Profile
            </button>
            <button
              className="password-btn"
              onClick={() => {
                setShowPasswordForm(true);
                setShowEditForm(false);
              }}
            >
              Change Password
            </button>
          </div>
        </div>

        {/* Edit Profile Form */}
        {showEditForm && (
          <div className="form-section">
            <h3>Edit Profile</h3>
            <div className="form-row">
              <label>Full Name</label>
              <input type="text" placeholder="Enter full name" />
            </div>
            <div className="form-row">
              <label>UserName</label>
              <input type="text" placeholder="Enter user name" />
            </div>
            <div className="form-row">
              <label>Email</label>
              <input type="email" placeholder="Enter email ID" />
            </div>
            <div className="buttons">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowEditForm(false)}
              >
                Cancel
              </button>
              <button type="button" className="update-btn">
                Update
              </button>
            </div>
          </div>
        )}

        {/* Password Change Section */}
        {showPasswordForm && (
          <div className="form-section">
            <h3>Change Password</h3>
            <div className="form-row">
              <label>Current Password</label>
              <input type="password" placeholder="Enter current password" />
            </div>
            <div className="form-row">
              <label>New Password</label>
              <input type="password" placeholder="Enter new password" />
            </div>
            <div className="form-row">
              <label>Confirm Password</label>
              <input type="password" placeholder="Confirm new password" />
            </div>
            <div className="buttons">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowPasswordForm(false)}
              >
                Cancel
              </button>
              <button type="button" className="update-btn">
                Update Password
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingPage;
