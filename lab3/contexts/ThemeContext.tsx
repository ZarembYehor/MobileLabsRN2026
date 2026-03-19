import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ThemeColors {
  background: string;
  text: string;
  tabBar: string;
  inactive: string;
  card: string;
}

interface ThemeContextType {
  isDark: boolean;
  theme: ThemeColors;
  toggleTheme: () => void;
}

export const themes: { light: ThemeColors; dark: ThemeColors } = {
  light: {
    background: '#ffffff',
    text: '#000000',
    tabBar: 'tomato',
    inactive: 'gray',
    card: '#f8f8f8',
  },
  dark: {
    background: '#121212',
    text: '#ffffff',
    tabBar: '#bb86fc',
    inactive: '#888888',
    card: '#1e1e1e',
  }
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark(prev => !prev);
  const theme = isDark ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider value={{ isDark, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};