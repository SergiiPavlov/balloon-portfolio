// src/components/Footer.tsx
'use client';

import Image from 'next/image';
import type { Locale } from '@/lib/i18n';

type FooterProps = {
  locale: Locale;
};

const EMAIL = 'pavlovsergii106@gmail.com';
const TELEGRAM_USERNAME = 'sergiikhr';
const LINKEDIN_URL = 'https://www.linkedin.com/in/sergii-pavlov';

export default function Footer({ locale }: FooterProps) {
  const t = {
    en: {
      madeBy: 'Built by',
      note: 'Interactive portfolio with skill balloons, AI-assisted projects and sound.',
      linkedinLabel: 'View my LinkedIn profile',
      contactsLabel: 'Contacts',
      email: 'Email',
      telegram: 'Telegram',
      linkedin: 'LinkedIn',
    },
    uk: {
      madeBy: 'Зроблено',
      note: 'Інтерактивне портфоліо зі скілами, AI-проєктами та звуком.',
      linkedinLabel: 'Переглянути мій профіль у LinkedIn',
      contactsLabel: 'Контакти',
      email: 'Email',
      telegram: 'Telegram',
      linkedin: 'LinkedIn',
    },
  }[locale];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950/90">
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              aria-label={t.linkedinLabel}
              className="inline-flex items-center"
            >
              <Image
                src="/logo-sp.svg"
                alt="Personal logo of Sergii Pavlov"
                width={140}
                height={42}
                className="h-10 w-auto opacity-90 hover:opacity-100 transition"
              />
            </a>
            <p className="text-xs text-slate-500">
              {t.madeBy} Sergii Pavlov © {currentYear}
            </p>
          </div>

          <p className="text-[11px] text-slate-500 max-w-md">{t.note}</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-1 border-t border-slate-800/70 mt-1">
          <p className="text-[11px] uppercase tracking-wide text-slate-500">
            {t.contactsLabel}
          </p>
          <nav className="flex flex-wrap items-center gap-3 text-xs">
            <a
              href={`mailto:${EMAIL}`}
              className="text-slate-400 hover:text-sky-300 underline underline-offset-2 decoration-slate-600 hover:decoration-sky-400"
            >
              {t.email}
            </a>
            <span className="text-slate-600">·</span>
            <a
              href={`https://t.me/${TELEGRAM_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-sky-300 underline underline-offset-2 decoration-slate-600 hover:decoration-sky-400"
            >
              {t.telegram}
            </a>
            <span className="text-slate-600">·</span>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-sky-300 underline underline-offset-2 decoration-slate-600 hover:decoration-sky-400"
            >
              {t.linkedin}
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
