// src/components/Header.tsx
'use client';

import type { Locale } from '@/lib/i18n';
import { LOCALES, LOCALE_LABELS } from '@/lib/i18n';

type HeaderProps = {
  locale: Locale;
  onChangeLocale: (locale: Locale) => void;
};

export default function Header({ locale, onChangeLocale }: HeaderProps) {
  const t = {
    en: {
      name: 'Sergii Pavlov',
      role: 'Front-End / Full-Stack Developer',
      classicView: 'Classic view',
      inProgress: 'Interactive portfolio in progress',
    },
    uk: {
      name: 'Сергій Павлов',
      role: 'Front-End / Full-Stack розробник',
      classicView: 'Класичний перегляд',
      inProgress: 'Інтерактивне портфоліо в розробці',
    },
  }[locale];

  return (
    <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-sm text-slate-400">{t.inProgress}</span>
          <h1 className="text-lg sm:text-xl font-semibold text-slate-50">
            {t.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">{t.role}</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Кнопка классического вида — пока заглушка */}
          <button
            type="button"
            className="hidden sm:inline-flex items-center rounded-full border border-slate-700 px-3 py-1 text-xs font-medium text-slate-200 hover:border-slate-500 hover:bg-slate-900 transition"
            disabled
            title="Soon"
          >
            {t.classicView}
          </button>

          {/* Переключатель языка */}
          <div className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/60 p-1">
            {LOCALES.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => onChangeLocale(loc)}
                className={[
                  'px-2 py-1 text-xs font-semibold rounded-full transition',
                  loc === locale
                    ? 'bg-slate-100 text-slate-900'
                    : 'text-slate-300 hover:text-slate-50',
                ].join(' ')}
              >
                {LOCALE_LABELS[loc]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
