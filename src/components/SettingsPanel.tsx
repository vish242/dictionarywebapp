import React, { useState } from 'react';
import { Settings, Palette, Type, X } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

export const SettingsPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, updateTheme, updateFont } = useSettings();

  const themes = [
    { value: 'light' as const, label: 'Light', description: 'Clean and bright' },
    { value: 'dark' as const, label: 'Dark', description: 'Easy on the eyes' },
    { value: 'sepia' as const, label: 'Sepia', description: 'Warm and comfortable' },
    { value: 'contrast' as const, label: 'High Contrast', description: 'Maximum readability' },
  ];

  const fonts = [
    { value: 'inter' as const, label: 'Inter', description: 'Modern and clean' },
    { value: 'merriweather' as const, label: 'Merriweather', description: 'Classic serif' },
    { value: 'fira' as const, label: 'Fira Code', description: 'Monospace clarity' },
    { value: 'opensans' as const, label: 'Open Sans', description: 'Friendly and readable' },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-40 p-3 bg-surface text-text-primary rounded-full 
                 shadow-lg hover:shadow-xl transition-all duration-200 border border-border
                 hover:scale-105"
        aria-label="Open settings"
      >
        <Settings className="w-5 h-5" />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-80 bg-surface shadow-2xl z-50 overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-text-primary">Settings</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-text-secondary hover:text-text-primary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-8">
              {/* Theme Selection */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Palette className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-text-primary">Color Theme</h3>
                </div>
                <div className="space-y-2">
                  {themes.map((theme) => (
                    <label
                      key={theme.value}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-hover 
                               cursor-pointer transition-colors"
                    >
                      <input
                        type="radio"
                        name="theme"
                        value={theme.value}
                        checked={settings.theme === theme.value}
                        onChange={() => updateTheme(theme.value)}
                        className="w-4 h-4 text-primary"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-text-primary">{theme.label}</div>
                        <div className="text-sm text-text-secondary">{theme.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Font Selection */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Type className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-text-primary">Font Family</h3>
                </div>
                <div className="space-y-2">
                  {fonts.map((font) => (
                    <label
                      key={font.value}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-hover 
                               cursor-pointer transition-colors"
                    >
                      <input
                        type="radio"
                        name="font"
                        value={font.value}
                        checked={settings.font === font.value}
                        onChange={() => updateFont(font.value)}
                        className="w-4 h-4 text-primary"
                      />
                      <div className="flex-1">
                        <div className={`font-medium text-text-primary font-${font.value}`}>
                          {font.label}
                        </div>
                        <div className="text-sm text-text-secondary">{font.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="pt-4 border-t border-border">
                <h4 className="font-medium text-text-primary mb-2">Preview</h4>
                <div className="p-4 bg-surface-hover rounded-xl">
                  <h5 className="font-bold text-lg text-text-primary mb-1">Dictionary</h5>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    A reference work that lists words and gives their meaning, 
                    pronunciation, and etymology.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};