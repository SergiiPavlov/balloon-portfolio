// src/data/skills.ts
import type { Locale } from '@/lib/i18n';

export type SkillProject = {
  id: string;
  label: string; // текст на шарике
  image: string; // путь к картинке (пока заглушка)
  shortDescription: Record<Locale, string>;
  modalDescription: Record<Locale, string>;
  projectUrl: string;
  // Классы градиента для цвета шарика
  balloonColor: string;
};

export const SKILL_PROJECTS: SkillProject[] = [
  {
    id: 'react',
    label: 'React',
    image: '/images/react-placeholder.png',
    shortDescription: {
      en: 'Building interactive UI components with modern React.',
      uk: 'Створення інтерактивних UI-компонентів на сучасному React.',
    },
    modalDescription: {
      en: 'React projects: SPA, landing pages, and dashboards with reusable components and hooks.',
      uk: 'Проєкти на React: SPA, лендінги та дашборди з багаторазовими компонентами та хуками.',
    },
    projectUrl: 'https://example.com/react-project', // заменишь на свой
    balloonColor: 'from-sky-400 via-sky-500 to-sky-600',
  },
  {
    id: 'nextjs',
    label: 'Next.js',
    image: '/images/next-placeholder.png',
    shortDescription: {
      en: 'SEO-friendly React apps with routing and SSR.',
      uk: 'SEO-дружні React-додатки з роутингом та SSR.',
    },
    modalDescription: {
      en: 'Next.js portfolio and multi-page apps with App Router, API routes, and deployment to Vercel.',
      uk: 'Next.js-портфоліо та мультисторінкові додатки з App Router, API-роутами та деплоєм на Vercel.',
    },
    projectUrl: 'https://example.com/nextjs-project',
    balloonColor: 'from-zinc-200 via-slate-100 to-zinc-300',
  },
  {
    id: 'node',
    label: 'Node.js',
    image: '/images/node-placeholder.png',
    shortDescription: {
      en: 'REST APIs and simple backends with Node.js.',
      uk: 'REST-API та прості бекенди на Node.js.',
    },
    modalDescription: {
      en: 'Node.js projects with Express, authentication, and connection to databases.',
      uk: 'Проєкти на Node.js з Express, авторизацією та підключенням до баз даних.',
    },
    projectUrl: 'https://example.com/node-project',
    balloonColor: 'from-emerald-400 via-emerald-500 to-emerald-600',
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    image: '/images/ts-placeholder.png',
    shortDescription: {
      en: 'Type-safe apps with clearer contracts and less bugs.',
      uk: 'Типобезпечні додатки з чіткішими контрактами та меншою кількістю багів.',
    },
    modalDescription: {
      en: 'Front-end and back-end code written with TypeScript, improving maintainability and reliability.',
      uk: 'Фронтенд та бекенд на TypeScript, що покращує підтримуваність та надійність.',
    },
    projectUrl: 'https://example.com/ts-project',
    balloonColor: 'from-blue-400 via-sky-500 to-blue-600',
  },
  
];
