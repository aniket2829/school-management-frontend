"use client"

import { createContext, useCallback, useContext, useState } from 'react';

export type ToastType = 'info' | 'success' | 'error';

export interface ToastItem {
  id: number;
  message: string; 
  type: ToastType;
}

interface ToastProviderProps {
  children: React.ReactNode;
}

export interface ToastContextType {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

let idCounter = 0;

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'info', duration = 3000) => {
      const id = idCounter++;
      const newToast: ToastItem = { id, message, type };

      setToasts(prev => [...prev, newToast]);

      setTimeout(() => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
      }, duration);
    },[]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-container">
        {toasts.map(toast => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}


export default function Toast({ message, type }: ToastItem) {
  return <div className={`toast toast-${type}`}>{message}</div>;
}
