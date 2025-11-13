'use client';

import { useState } from 'react';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import { changePassword } from '@/lib/change-password';
import { useToast } from '@/components/Toast';
import { useAuth } from '@/context/AuthContext';

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();
  const { user } = useAuth();

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await changePassword(user?.email || '', currentPassword, newPassword, confirmPassword);
      showToast('success', data.message);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowCurrentPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
    } catch (err: any) {
        showToast('error', err.message);
    } finally {
      setIsLoading(false);
    }
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

        <button type="submit" className="btn-primary" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  );
}
