
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import LightModeIcon from './icons/LightModeIcon';
import DarkModeIcon from './icons/DarkModeIcon';

const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:ring-sky-500 transition-colors duration-200"
        >
            {theme === 'light' ? (
                <LightModeIcon className="h-6 w-6" />
            ) : (
                <DarkModeIcon className="h-6 w-6" />
            )}
        </button>
    );
};

export default ThemeToggleButton;