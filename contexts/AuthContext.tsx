
import React, { createContext, useState, useCallback, useMemo } from 'react';
import type { AuthContextType, User, LoginPayload, Role } from '../types';
import { loginWithSui } from '../services/authService';

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessionToken, setSessionToken] = useState<string | null>(() => localStorage.getItem('sessionToken'));
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (payload: LoginPayload) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await loginWithSui(payload);
      setSessionToken(response.sessionToken);
      setUser(response.user);
      localStorage.setItem('sessionToken', response.sessionToken);
      localStorage.setItem('user', JSON.stringify(response.user));
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred during login.');
      // Ensure we clear any stale data if login fails
      setSessionToken(null);
      setUser(null);
      localStorage.removeItem('sessionToken');
      localStorage.removeItem('user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setSessionToken(null);
    setUser(null);
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('user');
  }, []);

  const value = useMemo(() => ({
    sessionToken,
    user,
    isLoading,
    error,
    login,
    logout,
  }), [sessionToken, user, isLoading, error, login, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
