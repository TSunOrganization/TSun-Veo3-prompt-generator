
import React, { useState } from 'react';

interface PromptCardProps {
  title?: string;
  description: string;
}

const PromptCard: React.FC<PromptCardProps> = ({ title, description }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(description).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000); // Reset icon after 2 seconds
    }).catch(err => {
      console.error('Failed to copy prompt:', err);
    });
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-2xl dark:hover:shadow-sky-500/10 transition-shadow duration-300 ease-in-out flex flex-col h-full border border-slate-100 dark:border-slate-700 overflow-hidden">
      
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-bold text-sky-700 dark:text-sky-400 truncate">{title || 'Video Prompt'}</h3>
        
        <button
          onClick={handleCopyClick}
          aria-label="Copy prompt"
          className="ml-4 flex-shrink-0 p-2 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800 focus:ring-sky-500"
        >
          {isCopied ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg 
              className="h-5 w-5 text-slate-500 dark:text-slate-400" 
              viewBox="0 0 64 64" 
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
            >
              <g>
                <path d="m34.29 28.9c-1.89-.72-3.85-1.08-5.83-1.08-2.03 0-4.16.38-6.32 1.14-.27.1-.48.3-.58.57-1.48 4.07-1.48 8.04.01 12.11.1.27.3.47.57.56 4.05 1.48 8.09 1.48 12.14 0 .26-.1.47-.3.56-.56 1.5-4.1 1.49-8.08-.01-12.18-.09-.27-.29-.47-.54-.56z"/>
                <path d="m41.16 21.77c-3.87-1.47-7.91-1.43-12.14.06-.28.09-.48.3-.58.57-.42 1.15-.72 2.29-.91 3.46 2.56-.13 5.06.25 7.47 1.17.79.3 1.42.94 1.71 1.74.89 2.41 1.29 4.79 1.24 7.17 1.07-.19 2.14-.47 3.2-.86.26-.1.47-.3.56-.57 1.5-4.1 1.5-8.08-.01-12.17-.08-.26-.29-.47-.54-.57z"/>
                <path d="m47.15 18.62c-.32-.87-.98-1.54-1.82-1.86-4.15-1.58-8.46-2.38-12.8-2.38-4.45 0-9.1.84-13.82 2.49-.9.32-1.6 1.01-1.93 1.89-3.25 8.93-3.24 17.62.03 26.55.32.87 1 1.55 1.88 1.87 8.86 3.25 17.74 3.25 26.61 0 .87-.32 1.55-1 1.87-1.88 3.29-8.97 3.29-17.7-.02-26.68zm-3.55 16.57c-.3.82-.94 1.46-1.75 1.76-1.34.49-2.7.83-4.06 1.03-.19 1.44-.53 2.88-1.07 4.33-.3.82-.94 1.46-1.76 1.76-2.24.82-4.52 1.24-6.76 1.24s-4.51-.42-6.75-1.24c-.82-.3-1.46-.94-1.76-1.76-1.66-4.54-1.66-8.95-.01-13.48.3-.83.96-1.48 1.8-1.77 1.35-.47 2.69-.8 4.01-1 .2-1.46.55-2.92 1.07-4.35.31-.84.97-1.49 1.81-1.77 4.65-1.64 9.18-1.67 13.5-.04.79.3 1.41.93 1.71 1.73 1.68 4.57 1.69 9 .02 13.56z"/>
                <path d="m50.91 17.25c-.71-1.96-2.23-3.5-4.16-4.23-4.6-1.75-9.36-2.63-14.22-2.63-4.94 0-10 .9-15.14 2.71-2.03.71-3.62 2.28-4.36 4.3-3.53 9.72-3.52 19.57.03 29.28.72 1.99 2.27 3.54 4.26 4.26 9.74 3.57 19.62 3.57 29.35 0 1.99-.72 3.54-2.28 4.26-4.26 3.58-9.77 3.57-19.67-.02-29.43zm-1.85 28.74c-.52 1.43-1.64 2.55-3.07 3.07-4.65 1.71-9.37 2.57-14 2.57s-9.34-.86-13.99-2.57c-1.43-.52-2.55-1.64-3.07-3.07-3.43-9.4-3.44-18.53-.03-27.92.53-1.45 1.68-2.58 3.14-3.09 9.78-3.43 19.15-3.46 27.99-.1 1.39.53 2.47 1.64 2.99 3.04 3.48 9.45 3.49 18.63.04 28.07z"/>
              </g>
            </svg>
          )}
        </button>
      </div>
      
      <div className="flex-grow p-6 overflow-y-auto max-h-72">
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{description}</p>
      </div>
    </div>
  );
};

export default PromptCard;