import React from 'react';
import { BookOpen, Search, Lightbulb, TrendingUp } from 'lucide-react';

interface EmptyStateProps {
  onWordClick?: (word: string) => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onWordClick }) => {
  const featuredWords = [
    { word: 'serendipity', definition: 'Pleasant surprise or fortunate accident' },
    { word: 'ephemeral', definition: 'Lasting for a very short time' },
    { word: 'ubiquitous', definition: 'Present everywhere at once' },
    { word: 'eloquent', definition: 'Fluent and persuasive in speaking' },
    { word: 'paradigm', definition: 'A typical example or pattern' },
    { word: 'quintessential', definition: 'Most perfect example of a quality' },
    { word: 'mellifluous', definition: 'Sweet or musical; pleasant to hear' },
    { word: 'perspicacious', definition: 'Having keen insight or discernment' }
  ];

  const categories = [
    { name: 'Academic', words: ['paradigm', 'hypothesis', 'methodology', 'empirical'] },
    { name: 'Literary', words: ['mellifluous', 'eloquent', 'verbose', 'laconic'] },
    { name: 'Psychology', words: ['cognitive', 'behavioral', 'intrinsic', 'empathy'] },
    { name: 'Philosophy', words: ['existential', 'metaphysical', 'epistemology', 'ontology'] }
  ];

  return (
    <div className="text-center py-16">
      <div className="relative mb-8">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-12 h-12 text-primary" />
        </div>
        <div className="absolute -top-2 -right-2">
          <div className="w-8 h-8 bg-surface border-2 border-border rounded-full flex items-center justify-center">
            <Search className="w-4 h-4 text-text-secondary" />
          </div>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-text-primary mb-4">
        Discover the meaning of words
      </h2>
      <p className="text-text-secondary max-w-md mx-auto leading-relaxed mb-8">
        Explore our comprehensive dictionary with hundreds of thousands of words. 
        Search for definitions, pronunciations, examples, and etymology.
      </p>

      {/* Featured Words */}
      <div className="mb-12">
        <div className="flex items-center justify-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">Featured Words</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {featuredWords.map((item) => (
            <button
              key={item.word}
              onClick={() => onWordClick?.(item.word)}
              className="p-4 bg-surface hover:bg-surface-hover rounded-xl border border-border
                       transition-all duration-200 text-left hover:shadow-md group"
            >
              <div className="font-semibold text-primary group-hover:text-primary-hover capitalize mb-1">
                {item.word}
              </div>
              <div className="text-sm text-text-secondary">
                {item.definition}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Word Categories */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Lightbulb className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">Explore by Category</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {categories.map((category) => (
            <div key={category.name} className="p-4 bg-surface rounded-xl border border-border">
              <h4 className="font-semibold text-text-primary mb-3">{category.name}</h4>
              <div className="space-y-2">
                {category.words.map((word) => (
                  <button
                    key={word}
                    onClick={() => onWordClick?.(word)}
                    className="block w-full text-left text-sm text-text-secondary hover:text-primary
                             transition-colors capitalize"
                  >
                    {word}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/20 max-w-2xl mx-auto">
        <h4 className="font-semibold text-text-primary mb-2">💡 Search Tips</h4>
        <div className="text-sm text-text-secondary space-y-1">
          <p>• Try searching for complex words like "perspicacious" or "serendipity"</p>
          <p>• Use the random word button for vocabulary building</p>
          <p>• Explore different word forms (e.g., "run", "running", "ran")</p>
          <p>• Check out technical terms from various fields</p>
        </div>
      </div>
    </div>
  );
};