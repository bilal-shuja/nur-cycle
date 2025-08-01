
import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../locales/en';
import es from '../locales/es';
import fr from '../locales/fr';
import hi from '../locales/hi';
import gu from '../locales/gu';
import pa from '../locales/pa';
import ar from '../locales/ar';
import zh from '../locales/zh';
import zu from '../locales/zu';
import yu from '../locales/yu';
import sw from '../locales/sw';
import ko from '../locales/ko';


export interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (language: string) => void;
  getLocalizedText: (key: string, params?: Record<string, string>) => string;
}

const translations = { en, es, fr, hi, gu, pa, ar, zh, zu, yu, sw, ko };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('nurcycle-language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const setLanguage = (language: string) => {
    setCurrentLanguage(language);
    localStorage.setItem('nurcycle-language', language);
  };

  const getLocalizedText = (key: string, params?: Record<string, string>): string => {
    const languageTranslations = translations[currentLanguage as keyof typeof translations] || translations.en;
    let text = languageTranslations[key as keyof typeof languageTranslations] || key;

    // Handle parameter substitution
    if (params) {
      Object.keys(params).forEach(param => {
        text = text.replace(new RegExp(`{{${param}}}`, 'g'), params[param]);
      });
    }

    return text;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, getLocalizedText }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
