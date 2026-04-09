import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      console.log('Спроба входу для:', email);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Помилка входу:', error);
    }
  };

  const register = async (email: string, password: string, name: string): Promise<void> => {
    try {
      console.log('Реєстрація користувача:', name, email);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Помилка реєстрації:', error);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      console.log('Користувач вийшов');
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Помилка виходу:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth повинен використовуватися всередині AuthProvider');
  }
  return context;
};