import React, { useState, createContext, useEffect, useContext } from "react";

const ThemeContext = createContext()

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => setTheme(theme => theme === 'light' ? 'dark' : 'light')

    useEffect(() => {
        if (theme === "light") {
            document.documentElement.setAttribute('data-theme', 'light')
        } else {
            document.documentElement.setAttribute('data-theme', 'dark')
        }
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

const useTheme = () => {
    const context = useContext(ThemeContext)

    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    return context
}

export { ThemeProvider, useTheme };
