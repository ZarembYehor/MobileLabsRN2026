import React, { createContext, useContext, useState, ReactNode } from 'react';

// 1. Описуємо типи для значень контексту
interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

// 2. Створюємо контекст (передаємо undefined як початкове значення)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Типізація для пропсів провайдера
interface AuthProviderProps {
  children: ReactNode;
}

// 3. Створюємо Provider
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      // TODO: Реальний API-запит
      console.log('Спроба входу для:', email);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Помилка входу:', error);
    }
  };

  const register = async (email: string, password: string, name: string): Promise<void> => {
    try {
      // TODO: Реальний API-запит
      console.log('Реєстрація користувача:', name, email);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Помилка реєстрації:', error);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      // TODO: Очищення токенів
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

// 4. Створюємо кастомний хук із типізацією
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth повинен використовуватися всередині AuthProvider');
  }
  return context;
};