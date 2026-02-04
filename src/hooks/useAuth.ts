import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { User } from '../types';

export const useAuth = () => {
  const { user, loading, error, initializeAuth } = useAuthStore();

  useEffect(() => {
    const unsubscribe = initializeAuth();
    return unsubscribe;
  }, [initializeAuth]);

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    isCustomer: user?.role === 'customer',
    isManager: user?.role === 'manager',
    isAdmin: user?.role === 'admin',
    isVerified: user?.verification_status === 'approved'
  };
};