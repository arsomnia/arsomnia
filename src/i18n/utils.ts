import es from './es.json';
import fr from './fr.json';
import en from './en.json';

export const languages = {
  es: 'Español',
  fr: 'Français',
  en: 'English',
};

export const defaultLang = 'en';

// Temporary: the public site is English only.
// Set this to true to restore the language switch and the /es and /fr pages.
export const i18nEnabled = false;

export const ui = {
  es,
  fr,
  en,
} as const;

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: string) {
    const keys = key.split('.');
    let value: any = ui[lang];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };
}

