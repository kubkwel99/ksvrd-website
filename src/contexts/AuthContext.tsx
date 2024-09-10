'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: string | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedAuth = localStorage.getItem('isAuthenticated');
      const storedUser = localStorage.getItem('user');
       console.log('Stored Auth:', storedAuth); // Debugging line
      console.log('Stored User:', storedUser)

      if (storedAuth === 'true' && storedUser) {
        setIsAuthenticated(true);
        setUser(storedUser);
      }
    }
  }, []);

  const login = (username: string, password: string) => {
    const dummyUsername = 'admin';
    const dummyPassword = 'pionier21';

    if (username === dummyUsername && password === dummyPassword) {
      setIsAuthenticated(true);
      setUser(username);
      if (typeof window !== 'undefined') {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', username);
        console.log('Auth set in localStorage')
      }
    } else {
      alert('Zlé zadané prihlasovacie meno alebo heslo.');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      console.log('Auth removed from localStorage');
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
