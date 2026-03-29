/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, ReactNode } from 'react';
import * as authService from '../services/api';

// Types for our user
interface User {
  user_id: number;
  username: string;
}

// Types for our context
interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create context with undefined as default (we use a provider)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component that wraps our app
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string) => {
    // Call backend login endpoint through API service
    const data = await authService.login(username, password);

    // Set user in state (JWT token is already in cookie)
    setUser({ user_id: data.user_id, username: data.username });
  };

  const logout = () => {
    // Call backend logout (removes cookie)
    authService.logout();

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
