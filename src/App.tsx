import React, { useState } from 'react';
import { Book, Lightbulb } from 'lucide-react';
import { SettingsProvider } from './contexts/SettingsContext';
import { SearchBar } from './components/SearchBar';
import { WordDisplay } from './components/WordDisplay';
import { EmptyState } from './components/EmptyState';
import { ErrorState } from './components/ErrorState';
import { SettingsPanel } from './components/SettingsPanel';
import { useDictionary } from './hooks/useDictionary';

function App() {
  const { data, loading, error, searchWord } = useDictionary();
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (word: string) => {
    setHasSearched(true);
    await searchWord(word);
  };

  return (
    <SettingsProvider>
      <div className="min-h-screen bg-background transition-colors duration-300">
        <SettingsPanel />
        
        {/* Header */}
        <header className="bg-surface border-b border-border sticky top-0 z-30 backdrop-blur-md bg-surface/80">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Book className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-text-primary">
                Professional Dictionary
              </h1>
            </div>
            <p className="text-center text-text-secondary mt-2 text-sm">
              Explore hundreds of thousands of words with definitions, pronunciations, and examples
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Search Section */}
          <div className="mb-12">
            <SearchBar onSearch={handleSearch} loading={loading} />
          </div>

          {/* Content Section */}
          <div className="mb-8">
            {loading && (
              <div className="text-center py-16">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto
                                animate-pulse-glow shadow-lg">
                    <Lightbulb className="w-8 h-8 text-yellow-500 animate-pulse" />
                  </div>
                  <div className="absolute inset-0 w-16 h-16 mx-auto rounded-full bg-yellow-200/30 
                                animate-ping" />
                </div>
                <p className="text-text-primary font-medium text-lg mb-2">
                  🧠 Thinking...
                </p>
                <p className="text-text-secondary">
                  Searching through our comprehensive database of hundreds of thousands of words
                </p>
                <div className="flex items-center justify-center gap-1 mt-4">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            {error && (
              <ErrorState 
                message={error} 
                onRetry={() => window.location.reload()} 
              />
            )}

            {!loading && !error && data && (
              <WordDisplay entries={data} />
            )}

            {!loading && !error && !data && !hasSearched && (
              <EmptyState onWordClick={handleSearch} />
            )}

            {!loading && !error && !data && hasSearched && (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-text-primary mb-4">
                  Word not found
                </h3>
                <p className="text-text-secondary mb-6">
                  Try searching for a different word or check the spelling. 
                  Our database contains hundreds of thousands of English words.
                </p>
                <EmptyState onWordClick={handleSearch} />
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-surface border-t border-border mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center text-text-secondary">
              <p className="mb-2">
                Powered by{' '}
                <a
                  href="https://dictionaryapi.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Free Dictionary API
                </a>
                {' '}• Comprehensive English Dictionary with 500,000+ words
              </p>
              <p className="text-sm">
                Built with React, TypeScript, and Tailwind CSS • 
                Features audio pronunciations, synonyms, antonyms, and examples
              </p>
            </div>
          </div>
        </footer>
      </div>
    </SettingsProvider>
  );
}

export default App;