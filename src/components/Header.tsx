// src/components/Header.tsx
'use client';

import type { Locale } from '@/lib/i18n';
import { LOCALES, LOCALE_LABELS } from '@/lib/i18n';

type ViewMode = 'interactive' | 'classic';

type HeaderProps = {
  locale: Locale;
  onChangeLocale: (locale: Locale) => void;
  mode: ViewMode;
  onChangeMode: (mode: ViewMode) => void;
};

export default function Header({
  locale,
  onChangeLocale,
  mode,
  onChangeMode,
}: HeaderProps) {
  const t = {
    en: {
      name: 'Sergii Pavlov',
      role: 'Front-End / Full-Stack Developer',
      classicView: 'Classic view',
      interactiveView: 'Interactive view',
      inProgress: 'Interactive portfolio in progress',
      tagline: 'Interactive UIs, AI assistants & full-stack web apps.',
    },
    uk: {
      name: 'Сергій Павлов',
      role: 'Front-End / Full-Stack розробник',
      classicView: 'Класичний перегляд',
      interactiveView: 'Інтерактивний перегляд',
      inProgress: 'Інтерактивне портфоліо в розробці',
      tagline: 'Інтерактивні інтерфейси, AI-асистенти та full‑stack вебдодатки.',
    },
  }[locale];

  const isInteractive = mode === 'interactive';

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950 backdrop-blur">
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col">
          <h1 className="text-lg sm:text-xl font-semibold text-slate-50">
            {t.name}
          </h1>
          <p className="text-[11px] sm:text-sm text-slate-400">{t.role}</p>
          <p className="mt-0.5 text-[10px] sm:text-xs text-sky-300">
            {t.tagline}
          </p>
        </div>

        <div className="flex items-center justify-between gap-2 sm:justify-end sm:gap-3">
          {/* Кнопка переключения вида: всегда видима, даже на мобилке */}
          <button
            type="button"
            className="inline-flex items-center rounded-full border border-slate-700 px-3 py-1 text-[11px] sm:text-xs font-medium text-slate-200 hover:border-slate-500 hover:bg-slate-900 transition whitespace-nowrap"
            onClick={() => onChangeMode(isInteractive ? 'classic' : 'interactive')}
          >
            {isInteractive ? t.classicView : t.interactiveView}
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
