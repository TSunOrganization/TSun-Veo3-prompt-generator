
import React, { useState } from 'react';
import { AppLogo } from '../constants';
import ChangelogModal from './ChangelogModal';
import ThemeToggleButton from './ThemeToggleButton';

const Header = () => {
    const [isChangelogOpen, setIsChangelogOpen] = useState(false);

    return (
        <>
            <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-sm dark:border-b dark:border-slate-800 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <AppLogo />
                            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 tracking-tight">TSun Veo3 Prompt Generator</h1>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setIsChangelogOpen(true)}
                                aria-label="Open changelog"
                                className="px-4 py-2 text-sm font-semibold text-sky-600 dark:text-sky-400 bg-sky-100 dark:bg-sky-900/70 rounded-full hover:bg-sky-200 dark:hover:bg-sky-800/60 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:ring-sky-500"
                            >
                                Changelog
                            </button>
                            <ThemeToggleButton />
                        </div>
                    </div>
                </div>
            </header>
            <ChangelogModal isOpen={isChangelogOpen} onClose={() => setIsChangelogOpen(false)} />
        </>
    );
};

export default Header;
