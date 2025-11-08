'use client';

import { useState } from 'react';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add backend integration for password change
  };

  return (
    <div className="change-password-container">
      <h2 className="section-heading">Change Password</h2>
      <form onSubmit={handlePasswordChange} className="form">
        <h3>Current Password</h3>
        <div className="password-container">
          <input
            type={showCurrentPassword ? 'text' : 'password'}
            placeholder="••••••••••"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="password-input input"
            required
          />
          {currentPassword.length > 0 && (
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? <RiEyeOffFill /> : <RiEyeFill />}
            </button>
          )}
        </div>

        <h3>New Password</h3>
        <div className="password-container">
          <input
            type={showNewPassword ? 'text' : 'password'}
            placeholder="••••••••••"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="password-input input"
            required
          />
          {newPassword.length > 0 && (
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <RiEyeOffFill /> : <RiEyeFill />}
            </button>
          )}
        </div>

        <h3>Confirm Password</h3>
        <div className="password-container">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="••••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="password-input input"
            required
          />
          {confirmPassword.length > 0 && (
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <RiEyeOffFill /> : <RiEyeFill />}
            </button>
          )}
        </div>

        <button type="submit" className="btn-primary">
          Update Password
        </button>
      </form>
    </div>
  );
}
