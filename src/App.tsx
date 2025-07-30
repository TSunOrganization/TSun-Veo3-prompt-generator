
import React, { useState, useCallback } from 'react';
import { type GeneratedPrompt, type PromptFormat } from './types';
import { generatePrompts } from './services/geminiService';
import Header from './components/Header';
import GeneratorControls from './components/InspirationPrompt';
import PromptCard from './components/PromptCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { INSPIRATION_PROMPT } from './constants';

const TagSuggestions = ({ tags }: { tags: string[] }) => (
    <div className="max-w-4xl mx-auto mb-8 text-center">
        <h3 className="text-lg font-semibold text-sky-600 dark:text-sky-400 mb-3 tracking-wide uppercase">Suggested Tags</h3>
        <div className="flex flex-wrap justify-center gap-2">
            {tags.map(tag => (
                <span key={tag} className="bg-sky-100 text-sky-800 dark:bg-sky-900/70 dark:text-sky-300 text-sm font-medium px-3 py-1 rounded-full">
                    {tag}
                </span>
            ))}
        </div>
    </div>
);

function App() {
  const [prompts, setPrompts] = useState<GeneratedPrompt[]>([]);
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [inspiration, setInspiration] = useState<string>(INSPIRATION_PROMPT);
  const [charLimit, setCharLimit] = useState<number>(1000);
  const [promptFormat, setPromptFormat] = useState<PromptFormat>('simple');
  const [numPrompts, setNumPrompts] = useState<number>(6);
  const [logoName, setLogoName] = useState<string>('');


  const handleGeneratePrompts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setPrompts([]);
    setSuggestedTags([]);

    try {
      const result = await generatePrompts({
          inspiration,
          charLimit,
          format: promptFormat,
          numPrompts,
          logoName,
      });
      setPrompts(result.prompts);
      setSuggestedTags(result.suggestedTags);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [inspiration, charLimit, promptFormat, numPrompts, logoName]);

  return (
    <div className="min-h-screen font-sans text-slate-800 dark:text-slate-200">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <GeneratorControls
            inspiration={inspiration}
            onInspirationChange={setInspiration}
            logoName={logoName}
            onLogoNameChange={setLogoName}
            charLimit={charLimit}
            onCharLimitChange={setCharLimit}
            promptFormat={promptFormat}
            onPromptFormatChange={setPromptFormat}
            numPrompts={numPrompts}
            onNumPromptsChange={setNumPrompts}
          />
          <div className="mt-12">
            <button
              onClick={handleGeneratePrompts}
              disabled={isLoading || !logoName.trim()}
              className="inline-flex items-center justify-center px-8 py-4 bg-sky-600 text-white font-bold rounded-full shadow-lg hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-800 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:bg-slate-400 disabled:dark:bg-slate-600 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner />
                  <span className="ml-3">Generating...</span>
                </>
              ) : (
                'Generate Prompts'
              )}
            </button>
          </div>
        </div>

        <div className="mt-16">
          {error && <ErrorMessage message={error} />}
          
          {suggestedTags.length > 0 && <TagSuggestions tags={suggestedTags} />}
          
          {prompts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {prompts.map((prompt, index) => (
                <PromptCard key={index} title={prompt.title} description={prompt.description} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;