'use client';

import React, { useContext } from 'react';
import { ToastContext } from '@/context/ToastContext';
import '../styles/toast.css';

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }

  return {
    showToast: context.showToast,
  };
}

export function Toast() {
  const context = useContext(ToastContext);

  if (!context) {
    console.error('Toast must be used within ToastProvider');
    return null;
  }

  const { toasts, removeToast } = context;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          <div className="toast-content">
            <span className="toast-message">{toast.message}</span>
            <button
              className="toast-close"
              onClick={() => removeToast(toast.id)}
              aria-label="Close notification"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
