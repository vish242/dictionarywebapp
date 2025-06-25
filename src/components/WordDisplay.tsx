import React, { useState } from 'react';
import { Volume2, Heart, BookOpen, Quote, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { DictionaryEntry } from '../types/dictionary';
import { useAudio } from '../hooks/useAudio';

interface WordDisplayProps {
  entries: DictionaryEntry[];
}

export const WordDisplay: React.FC<WordDisplayProps> = ({ entries }) => {
  const { isPlaying, playAudio } = useAudio();
  const [expandedMeanings, setExpandedMeanings] = useState<number[]>([0]);
  const [isFavorited, setIsFavorited] = useState(false);

  if (!entries?.length) return null;

  const mainEntry = entries[0];
  const audioUrl = mainEntry.phonetics.find(p => p.audio)?.audio;

  const toggleMeaning = (index: number) => {
    setExpandedMeanings(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
    // Here you could save to localStorage or a favorites system
  };

  const allSynonyms = mainEntry.meanings.flatMap(m => m.synonyms || []);
  const allAntonyms = mainEntry.meanings.flatMap(m => m.antonyms || []);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Word Header */}
      <div className="bg-surface rounded-2xl p-6 shadow-sm border border-border">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-text-primary mb-2 capitalize">
              {mainEntry.word}
            </h1>
            {mainEntry.phonetic && (
              <p className="text-lg text-text-secondary font-mono mb-2">
                {mainEntry.phonetic}
              </p>
            )}
            <div className="flex flex-wrap gap-2 mb-4">
              {mainEntry.meanings.map((meaning, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                >
                  {meaning.partOfSpeech}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {audioUrl && (
              <button
                onClick={() => playAudio(audioUrl)}
                disabled={isPlaying}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground 
                         rounded-xl hover:bg-primary-hover transition-all duration-200
                         disabled:opacity-50 shadow-sm hover:shadow-md"
              >
                <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-pulse' : ''}`} />
                {isPlaying ? 'Playing...' : 'Listen'}
              </button>
            )}
            <button 
              onClick={toggleFavorite}
              className={`p-2 transition-colors ${
                isFavorited 
                  ? 'text-red-500 hover:text-red-600' 
                  : 'text-text-secondary hover:text-red-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Quick Summary */}
        {mainEntry.meanings[0]?.definitions[0] && (
          <div className="mt-4 p-4 bg-primary/5 rounded-xl border border-primary/20">
            <p className="text-text-primary font-medium">
              {mainEntry.meanings[0].definitions[0].definition}
            </p>
          </div>
        )}
      </div>

      {/* Etymology and Additional Info */}
      {entries.length > 1 && (
        <div className="bg-surface rounded-2xl p-6 shadow-sm border border-border">
          <h3 className="text-lg font-semibold text-text-primary mb-3">Additional Forms</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {entries.slice(1, 5).map((entry, index) => (
              <div key={index} className="p-3 bg-surface-hover rounded-lg">
                <div className="font-medium text-text-primary capitalize">{entry.word}</div>
                {entry.phonetic && (
                  <div className="text-sm text-text-secondary font-mono">{entry.phonetic}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Meanings */}
      <div className="space-y-4">
        {mainEntry.meanings.map((meaning, meaningIndex) => (
          <div key={meaningIndex} className="bg-surface rounded-2xl shadow-sm border border-border overflow-hidden">
            <button
              onClick={() => toggleMeaning(meaningIndex)}
              className="w-full p-6 text-left hover:bg-surface-hover transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-semibold text-text-primary capitalize">
                    {meaning.partOfSpeech}
                  </h2>
                  <span className="text-sm text-text-secondary">
                    ({meaning.definitions.length} definition{meaning.definitions.length !== 1 ? 's' : ''})
                  </span>
                </div>
                {expandedMeanings.includes(meaningIndex) ? (
                  <ChevronUp className="w-5 h-5 text-text-secondary" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-text-secondary" />
                )}
              </div>
            </button>

            {expandedMeanings.includes(meaningIndex) && (
              <div className="px-6 pb-6 space-y-4">
                {meaning.definitions.map((definition, defIndex) => (
                  <div key={defIndex} className="border-l-4 border-primary/20 pl-4">
                    <div className="flex items-start gap-2 mb-2">
                      <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full 
                                     flex items-center justify-center text-sm font-medium">
                        {defIndex + 1}
                      </span>
                      <p className="text-text-primary leading-relaxed">
                        {definition.definition}
                      </p>
                    </div>
                    
                    {definition.example && (
                      <div className="flex items-start gap-2 mt-3 p-3 bg-surface-hover rounded-lg ml-8">
                        <Quote className="w-4 h-4 text-text-secondary mt-0.5 flex-shrink-0" />
                        <p className="text-text-secondary italic">
                          "{definition.example}"
                        </p>
                      </div>
                    )}
                    
                    {(definition.synonyms?.length || definition.antonyms?.length) && (
                      <div className="mt-3 ml-8 space-y-2">
                        {definition.synonyms?.length && (
                          <div>
                            <span className="text-sm font-medium text-text-secondary">Synonyms: </span>
                            <span className="text-primary">
                              {definition.synonyms.slice(0, 5).join(', ')}
                            </span>
                          </div>
                        )}
                        {definition.antonyms?.length && (
                          <div>
                            <span className="text-sm font-medium text-text-secondary">Antonyms: </span>
                            <span className="text-red-500">
                              {definition.antonyms.slice(0, 5).join(', ')}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                {(meaning.synonyms?.length || meaning.antonyms?.length) && (
                  <div className="mt-6 pt-4 border-t border-border space-y-3">
                    {meaning.synonyms?.length && (
                      <div>
                        <span className="text-sm font-medium text-text-secondary">More synonyms: </span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {meaning.synonyms.slice(0, 12).map((synonym, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-primary/10 text-primary rounded text-sm"
                            >
                              {synonym}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {meaning.antonyms?.length && (
                      <div>
                        <span className="text-sm font-medium text-text-secondary">More antonyms: </span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {meaning.antonyms.slice(0, 12).map((antonym, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-red-50 text-red-600 rounded text-sm"
                            >
                              {antonym}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Word Statistics */}
      <div className="bg-surface rounded-2xl p-6 shadow-sm border border-border">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Word Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{mainEntry.meanings.length}</div>
            <div className="text-sm text-text-secondary">Parts of Speech</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {mainEntry.meanings.reduce((acc, m) => acc + m.definitions.length, 0)}
            </div>
            <div className="text-sm text-text-secondary">Definitions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{allSynonyms.length}</div>
            <div className="text-sm text-text-secondary">Synonyms</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{allAntonyms.length}</div>
            <div className="text-sm text-text-secondary">Antonyms</div>
          </div>
        </div>
      </div>

      {/* Source Attribution */}
      {mainEntry.sourceUrls?.length && (
        <div className="text-center">
          <p className="text-sm text-text-secondary flex items-center justify-center gap-2">
            <ExternalLink className="w-4 h-4" />
            Source:{' '}
            <a
              href={mainEntry.sourceUrls[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {new URL(mainEntry.sourceUrls[0]).hostname}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};