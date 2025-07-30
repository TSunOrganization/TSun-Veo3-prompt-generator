
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const LIGHT_THEME_ICON_URL = "https://bvconuycpdvgzbvbkijl.supabase.co/storage/v1/object/public/sizes/19312f-picture/front/400/color.webp";
const DARK_THEME_ICON_URL = "https://bvconuycpdvgzbvbkijl.supabase.co/storage/v1/object/public/sizes/19312f-picture/front/400/premium.webp";

const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            className="rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:ring-sky-500 transition-transform duration-200 hover:scale-110"
        >
            <img 
                src={theme === 'light' ? LIGHT_THEME_ICON_URL : DARK_THEME_ICON_URL} 
                alt="Animated theme switcher"
                className="h-10 w-10"
                width="40"
                height="40"
            />
        </button>
    );
};

export default ThemeToggleButton;