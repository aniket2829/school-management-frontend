import React from 'react';
import { ToastItem } from '../toast/context/toastProvider';

export default function Toast({ message, type }: ToastItem) {
  return <div className={`toast toast-${type}`}>{message}</div>;
}
