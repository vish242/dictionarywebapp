import React, { useState, useEffect } from 'react';
import { Search, Clock, X, Lightbulb } from 'lucide-react';

interface SearchBarProps {
  onSearch: (word: string) => void;
  loading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Popular words for suggestions
  const popularWords = [
    'serendipity', 'ephemeral', 'ubiquitous', 'eloquent', 'paradigm',
    'quintessential', 'mellifluous', 'cacophony', 'surreptitious', 'perspicacious',
    'magnanimous', 'vicarious', 'gregarious', 'fastidious', 'meticulous',
    'audacious', 'tenacious', 'voracious', 'sagacious', 'loquacious',
    'ambiguous', 'superfluous', 'ostentatious', 'pretentious', 'contentious',
    'facetious', 'capricious', 'auspicious', 'propitious', 'fortuitous',
    'gratuitous', 'circuitous', 'assiduous', 'deciduous', 'innocuous',
    'perspicuous', 'conspicuous', 'incongruous', 'ambivalent', 'benevolent',
    'malevolent', 'prevalent', 'relevant', 'coherent', 'inherent',
    'adherent', 'reverent', 'different', 'efficient', 'sufficient',
    'deficient', 'proficient', 'magnificent', 'significant', 'resilient',
    'brilliant', 'excellent', 'turbulent', 'equivalent', 'subsequent',
    'consequent', 'frequent', 'eloquent', 'delinquent', 'adjacent',
    'abundant', 'redundant', 'pendant', 'descendant', 'ascendant',
    'transcendent', 'independent', 'dependent', 'correspondent', 'respondent'
  ];

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('dictionary-history') || '[]');
    setHistory(savedHistory);
  }, []);

  useEffect(() => {
    if (query.length > 1) {
      const filtered = popularWords.filter(word => 
        word.toLowerCase().includes(query.toLowerCase()) && 
        word.toLowerCase() !== query.toLowerCase()
      ).slice(0, 8);
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowHistory(false);
      setShowSuggestions(false);
    }
  };

  const handleWordClick = (word: string) => {
    setQuery(word);
    onSearch(word);
    setShowHistory(false);
    setShowSuggestions(false);
  };

  const clearHistory = () => {
    localStorage.removeItem('dictionary-history');
    setHistory([]);
  };

  const getRandomWord = () => {
    const randomWord = popularWords[Math.floor(Math.random() * popularWords.length)];
    setQuery(randomWord);
    onSearch(randomWord);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              if (history.length > 0) setShowHistory(true);
              if (suggestions.length > 0) setShowSuggestions(true);
            }}
            placeholder="Search for any word... (try 'serendipity', 'ephemeral', 'ubiquitous')"
            className="w-full pl-12 pr-32 py-4 text-lg bg-surface border-2 border-border rounded-2xl 
                     focus:outline-none focus:border-primary transition-all duration-200
                     placeholder-text-secondary shadow-sm hover:shadow-md"
            disabled={loading}
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
            <button
              type="button"
              onClick={getRandomWord}
              className="bg-surface-hover text-text-secondary px-3 py-2 rounded-xl
                       hover:bg-primary hover:text-primary-foreground transition-all duration-200 
                       shadow-sm hover:shadow-md"
              title="Random word"
            >
              <Lightbulb className="w-4 h-4" />
            </button>
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-xl
                       hover:bg-primary-hover transition-all duration-200 
                       disabled:opacity-50 disabled:cursor-not-allowed
                       shadow-sm hover:shadow-md"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                'Search'
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <>
          <div 
            className="fixed inset-0 z-10"
            onClick={() => setShowSuggestions(false)}
          />
          <div className="absolute top-full mt-2 w-full bg-surface border border-border rounded-xl shadow-lg z-20 max-h-64 overflow-y-auto">
            <div className="p-3 border-b border-border">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-text-secondary" />
                <span className="text-sm font-medium text-text-secondary">Suggestions</span>
              </div>
            </div>
            {suggestions.map((word, index) => (
              <button
                key={index}
                onClick={() => handleWordClick(word)}
                className="w-full text-left px-4 py-2 hover:bg-surface-hover transition-colors
                         text-text-primary capitalize"
              >
                {word}
              </button>
            ))}
          </div>
        </>
      )}

      {/* History Dropdown */}
      {showHistory && history.length > 0 && !showSuggestions && (
        <>
          <div 
            className="fixed inset-0 z-10"
            onClick={() => setShowHistory(false)}
          />
          <div className="absolute top-full mt-2 w-full bg-surface border border-border rounded-xl shadow-lg z-20 max-h-64 overflow-y-auto">
            <div className="flex items-center justify-between p-3 border-b border-border">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-text-secondary" />
                <span className="text-sm font-medium text-text-secondary">Recent searches</span>
              </div>
              <button
                onClick={clearHistory}
                className="text-xs text-text-secondary hover:text-text-primary transition-colors"
              >
                Clear
              </button>
            </div>
            {history.map((word, index) => (
              <button
                key={index}
                onClick={() => handleWordClick(word)}
                className="w-full text-left px-4 py-2 hover:bg-surface-hover transition-colors
                         text-text-primary capitalize"
              >
                {word}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};