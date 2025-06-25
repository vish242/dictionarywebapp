import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppSettings, Theme, Font } from '../types/dictionary';

interface SettingsContextValue {
  settings: AppSettings;
  updateTheme: (theme: Theme) => void;
  updateFont: (font: Font) => void;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('dictionary-settings');
    return saved ? JSON.parse(saved) : { theme: 'light', font: 'inter' };
  });

  useEffect(() => {
    localStorage.setItem('dictionary-settings', JSON.stringify(settings));
    
    // Apply theme to document
    document.documentElement.className = `theme-${settings.theme} font-${settings.font}`;
  }, [settings]);

  const updateTheme = (theme: Theme) => {
    setSettings(prev => ({ ...prev, theme }));
  };

  const updateFont = (font: Font) => {
    setSettings(prev => ({ ...prev, font }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateTheme, updateFont }}>
      {children}
    </SettingsContext.Provider>
  );
};