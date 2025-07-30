
import React from 'react';
import { type PromptFormat } from '../types';

interface GeneratorControlsProps {
    inspiration: string;
    onInspirationChange: (value: string) => void;
    logoName: string;
    onLogoNameChange: (value: string) => void;
    charLimit: number;
    onCharLimitChange: (value: number) => void;
    promptFormat: PromptFormat;
    onPromptFormatChange: (value: PromptFormat) => void;
    numPrompts: number;
    onNumPromptsChange: (value: number) => void;
}

const RadioButton = ({ id, name, value, checked, onChange, label }) => (
    <label htmlFor={id} className={`relative flex-1 text-center inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 cursor-pointer focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500 dark:focus-within:ring-offset-slate-800 ${checked ? 'bg-sky-600 text-white shadow' : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600'}`}>
        <input
            id={id}
            type="radio"
            name={name}
            value={value}
            checked={checked}
            onChange={onChange}
            className="absolute h-full w-full opacity-0 cursor-pointer"
        />
        {label}
    </label>
);


const GeneratorControls: React.FC<GeneratorControlsProps> = ({
    inspiration,
    onInspirationChange,
    logoName,
    onLogoNameChange,
    charLimit,
    onCharLimitChange,
    promptFormat,
    onPromptFormatChange,
    numPrompts,
    onNumPromptsChange
}) => {
  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-200 dark:border-slate-700 text-left">
      <div className="space-y-8">
        <div>
          <label htmlFor="inspiration-prompt" className="block text-lg font-semibold text-sky-600 dark:text-sky-400 mb-2 tracking-wide uppercase">
            Your Inspiration Prompt
          </label>
          <textarea
            id="inspiration-prompt"
            rows={6}
            className="w-full p-4 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-shadow duration-200 text-slate-700 dark:text-slate-200 leading-relaxed dark:placeholder:text-slate-400"
            value={inspiration}
            onChange={(e) => onInspirationChange(e.target.value)}
            placeholder="Enter your prompt idea here..."
          />
        </div>

        <div>
           <label htmlFor="logo-name" className="block text-lg font-semibold text-sky-600 dark:text-sky-400 mb-2 tracking-wide uppercase">
            Your Logo Name
          </label>
          <input
            id="logo-name"
            type="text"
            className="w-full p-4 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-shadow duration-200 text-slate-700 dark:text-slate-200 leading-relaxed dark:placeholder:text-slate-400"
            value={logoName}
            onChange={(e) => onLogoNameChange(e.target.value)}
            placeholder="e.g., My Awesome Brand"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-md font-semibold text-slate-700 dark:text-slate-300 mb-3">Character Limit</h3>
              <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-900/70 p-1 rounded-full">
                {[500, 1000, 2000].map(limit => (
                    <RadioButton
                        key={limit}
                        id={`limit-${limit}`}
                        name="charLimit"
                        value={limit}
                        checked={charLimit === limit}
                        onChange={() => onCharLimitChange(limit)}
                        label={`${limit}`}
                    />
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-md font-semibold text-slate-700 dark:text-slate-300 mb-3">Number of Prompts</h3>
              <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-900/70 p-1 rounded-full">
                {[3, 6, 12].map(num => (
                    <RadioButton
                        key={num}
                        id={`num-${num}`}
                        name="numPrompts"
                        value={num}
                        checked={numPrompts === num}
                        onChange={() => onNumPromptsChange(num)}
                        label={`${num}`}
                    />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-md font-semibold text-slate-700 dark:text-slate-300 mb-3">Prompt Format</h3>
              <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-900/70 p-1 rounded-full">
                {(['json', 'simple'] as PromptFormat[]).map(format => (
                    <RadioButton
                        key={format}
                        id={`format-${format}`}
                        name="promptFormat"
                        value={format}
                        checked={promptFormat === format}
                        onChange={() => onPromptFormatChange(format)}
                        label={format.charAt(0).toUpperCase() + format.slice(1)}
                    />
                ))}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratorControls;