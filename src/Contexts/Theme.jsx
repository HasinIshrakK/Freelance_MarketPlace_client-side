import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {

    const theme = document.documentElement.getAttribute('data-theme');

    const [themeMode, setThemeMode] = useState(null);

    useEffect(() => {
        if (theme === 'light') {
            setThemeMode(true)
        } else {
            setThemeMode(false)
        };
    }, [])

    const themeToggle = () => {
        const newTheme = !themeMode;
        setThemeMode(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme ? 'light' : 'dark');
    };


    return (
        <ThemeContext value={{ themeMode, themeToggle }}>
            {children}
        </ThemeContext>
    );
};

export default ThemeProvider;