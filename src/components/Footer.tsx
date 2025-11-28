// src/components/Footer.tsx
'use client';

import type { Locale } from '@/lib/i18n';

type FooterProps = {
  locale: Locale;
};

export default function Footer({ locale }: FooterProps) {
  const t = {
    en: {
      madeBy: 'Built by',
      note: 'Portfolio in progress: balloons, animations, and modals are coming next.',
    },
    uk: {
      madeBy: 'Зроблено',
      note: 'Портфоліо в процесі: далі додамо кульки, анімації та модальні вікна.',
    },
  }[locale];

  return (
    <footer className="border-t border-slate-800 bg-slate-950/90">
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <p className="text-xs text-slate-500">
          {t.madeBy} Sergii Pavlov © {new Date().getFullYear()}
        </p>
        <p className="text-[11px] text-slate-500 max-w-md">{t.note}</p>
      </div>
    </footer>
  );
}
