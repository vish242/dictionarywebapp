import { useState } from 'react';
import { DictionaryEntry } from '../types/dictionary';

interface UseDictionaryReturn {
  data: DictionaryEntry[] | null;
  loading: boolean;
  error: string | null;
  searchWord: (word: string) => Promise<void>;
}

export const useDictionary = (): UseDictionaryReturn => {
  const [data, setData] = useState<DictionaryEntry[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchWord = async (word: string) => {
    if (!word.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.trim()}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Word not found. Please check the spelling and try again.');
        }
        throw new Error('Failed to fetch word definition. Please try again.');
      }

      const result = await response.json();
      setData(result);
      
      // Save to search history
      const history = JSON.parse(localStorage.getItem('dictionary-history') || '[]');
      const newHistory = [word.toLowerCase(), ...history.filter((h: string) => h !== word.toLowerCase())].slice(0, 10);
      localStorage.setItem('dictionary-history', JSON.stringify(newHistory));
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, searchWord };
};