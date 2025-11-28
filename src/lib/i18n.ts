// src/lib/i18n.ts
export type Locale = 'en' | 'uk';

export const LOCALES: Locale[] = ['en', 'uk'];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'EN',
  uk: 'UA',
};
