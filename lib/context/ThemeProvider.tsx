'use client';
import React, { createContext, useState, useContext } from 'react';

const defaultValues = {
    theme: 'light',
    loading: true
}

const ThemeContext = createContext(defaultValues);

interface ThemeProps {
    children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProps> = ({ children }) => {
    const [theme, setTheme] = useState('light');
    const [loading, setLoading] = useState(true);
    const value = {
        theme,
        loading
    }
    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;

export const useThemeProvider = () => {
    return useContext(ThemeContext);
};
