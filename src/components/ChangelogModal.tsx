
import React, { useState } from 'react';
import { changelogData } from '../changelogData';
import type { ChangelogEntry } from '../types';

interface ChangelogModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ChangelogModal: React.FC<ChangelogModalProps> = ({ isOpen, onClose }) => {
    const [showAll, setShowAll] = useState(false);
    const initialDisplayCount = 5;

    if (!isOpen) return null;

    const displayedLogs = showAll ? changelogData : changelogData.slice(0, initialDisplayCount);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-70 z-50 flex justify-center items-center p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="changelog-title">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <header className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-800 rounded-t-2xl z-10">
                    <h2 id="changelog-title" className="text-2xl font-bold text-sky-700 dark:text-sky-400">Version History</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" aria-label="Close changelog">
                        <svg className="h-6 w-6 text-slate-500 dark:text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </header>

                <main className="flex-grow p-6 overflow-y-auto">
                    <div className="space-y-8">
                        {displayedLogs.map((entry: ChangelogEntry) => (
                            <div key={entry.version} className="border-l-4 border-sky-500 dark:border-sky-400 pl-4 transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 -ml-4 -mr-4 p-4 rounded-r-lg">
                                <div className="flex items-baseline space-x-3 mb-2">
                                    <span className="bg-sky-100 text-sky-800 dark:bg-sky-900/70 dark:text-sky-300 text-sm font-bold px-3 py-1 rounded-full">{`v${entry.version}`}</span>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{entry.date}</p>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">by <span className="font-semibold text-slate-700 dark:text-slate-300">{entry.author}</span></p>
                                <ul className="list-disc list-inside space-y-1.5 text-slate-700 dark:text-slate-300 marker:text-sky-500 dark:marker:text-sky-400">
                                    {entry.changes.map((change, index) => (
                                        <li key={index}>{change}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </main>

                {changelogData.length > initialDisplayCount && (
                    <footer className="p-6 border-t border-slate-200 dark:border-slate-700 text-center sticky bottom-0 bg-white dark:bg-slate-800 rounded-b-2xl z-10">
                        <button 
                            onClick={() => setShowAll(!showAll)}
                            className="text-sky-600 dark:text-sky-400 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800 focus:ring-sky-400 rounded px-3 py-1"
                        >
                            {showAll ? 'Show Less' : 'Show More'}
                        </button>
                    </footer>
                )}
            </div>
        </div>
    );
};

export default ChangelogModal;