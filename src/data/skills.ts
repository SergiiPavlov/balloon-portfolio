// src/data/skills.ts
import type { Locale } from '@/lib/i18n';

export type SkillProject = {
  /** Internal id, used for logic when balloons pop */
  id: string;
  /** Skill name – this is what is shown on the balloon */
  label: string;
  /** Project name shown in cards and modals */
  projectName: string;
  /** Screenshot path under public/ */
  image: string;
  shortDescription: Record<Locale, string>;
  modalDescription: Record<Locale, string>;
  /** Live URL of the project */
  projectUrl: string;
  /** Optional GitHub repository URL */
  githubUrl?: string;
  /** Technology stack shown as small badges */
  stack: string[];
  /** Tailwind gradient classes for the balloon color (bright!) */
  balloonColor: string;
};

// Each entry below is: SKILL -> best matching real project
export const SKILL_PROJECTS: SkillProject[] = [
  {
    id: 'react-artistshub',
    label: 'React',
    projectName: 'ArtistsHub — Music & Media Assistant',
    image: '/projects/artistshub-hero.png',
    shortDescription: {
      en: 'React-based app with custom YouTube mini player and AI assistant for music and movies.',
      uk: 'Додаток на React з власним мініплеєром YouTube та AI-асистентом для музики й фільмів.',
    },
    modalDescription: {
      en: 'ArtistsHub is a web app where you can discover artists, music and movies with an AI assistant that helps pick tracks, long-form content and controls the YouTube mini player via chat and voice.',
      uk: 'ArtistsHub — вебдодаток для пошуку виконавців, музики й фільмів з AI-асистентом, який допомагає обирати треки, фільми та керувати мініплеєром YouTube через чат і голос.',
    },
    projectUrl: 'https://sergiipavlov.github.io/Artisthub-continuation',
    githubUrl: 'https://github.com/SergiiPavlov/Artisthub-continuation',
    stack: ['React', 'Custom player', 'YouTube embeds', 'State management'],
    balloonColor: 'from-sky-400 via-cyan-400 to-blue-500',
  },
  {
    id: 'next-volunteers-odesa',
    label: 'Next.js',
    projectName: 'Volunteers Odesa — Charity Platform',
    image: '/projects/volontery-hero.png',
    shortDescription: {
      en: 'Next.js charity landing with donation and help flows.',
      uk: 'Лендінг на Next.js для волонтерського фонду з фокусом на донатах.',
    },
    modalDescription: {
      en: 'This project is a landing page for a Ukrainian charity initiative. I used Next.js to build a clean layout, reusable sections and prepare the site for future integration with payment and CMS.',
      uk: 'Цей проєкт — лендінг для української волонтерської ініціативи. Я використовую Next.js для побудови чистого лейауту, багаторазових секцій та підготовки сайту до інтеграції з оплатою і CMS.',
    },
    projectUrl: 'https://volunteers-odesa.vercel.app/',
    githubUrl: 'https://github.com/SergiiPavlov/volunteers-odesa',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Responsive layout'],
    balloonColor: 'from-emerald-300 via-teal-400 to-emerald-500',
  },
  {
    id: 'typescript-junior-ua',
    label: 'TypeScript',
    projectName: 'Junior UA — Jobs & Events',
    image: '/projects/junior-ua-hero.png',
    shortDescription: {
      en: 'Jobs and events platform built with strongly typed Next.js and an AI assistant that helps juniors navigate the market.',
      uk: 'Платформа з вакансіями та подіями на типобезпечному Next.js з AI-асистентом, що допомагає джунам орієнтуватися на ринку.',
    },
    modalDescription: {
      en: 'Junior UA is a platform inspired by junior.guru. I used TypeScript across the app to describe the job model, search and filters, and integrated an AI assistant that can help juniors understand vacancies and find relevant positions.',
      uk: 'Junior UA — платформа, натхненна junior.guru. Я використовую TypeScript по всьому додатку для моделі вакансій, пошуку та фільтрів, а також інтегрую AI-асистента, який допомагає джунам розуміти вакансії та знаходити релевантні пропозиції.',
    },
    projectUrl: 'https://junior-guru-web.vercel.app',
    githubUrl: 'https://github.com/SergiiPavlov/junior.guru',
    stack: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'SSR / ISR'],
    balloonColor: 'from-fuchsia-400 via-purple-500 to-pink-500',
  },
  {
    id: 'node-notehub',
    label: 'Node.js',
    projectName: 'NoteHub — Notes with Auth',
    image: '/projects/notehub-hero.png',
    shortDescription: {
      en: 'Notes app with Node.js backend, auth and CRUD operations.',
      uk: 'Додаток для нотаток з бекендом на Node.js, авторизацією та CRUD-операціями.',
    },
    modalDescription: {
      en: 'NoteHub combines a React frontend with a Node.js API: users can sign up, create notes, filter them by tag and paginate results. I implemented protected routes, request validation and interaction with a remote API.',
      uk: 'NoteHub поєднує фронтенд на React із Node.js API: користувачі можуть реєструватися, створювати нотатки, фільтрувати їх за тегами та перегортати сторінки. Я реалізував захищені маршрути, валідацію запитів і роботу з віддаленим API.',
    },
    projectUrl: 'https://09-auth-gx6z.vercel.app/',
    githubUrl: 'https://github.com/SergiiPavlov/09-auth',
    stack: ['Node.js', 'Express', 'REST API', 'Auth', 'React client'],
    balloonColor: 'from-lime-300 via-emerald-400 to-lime-400',
  },
  {
    id: 'fullstack-psoriatynin',
    label: 'Full‑Stack',
    projectName: 'Psoriatynin — Product Website',
    image: '/projects/psoriatynin-hero.png',
    shortDescription: {
      en: 'Product site with layout, forms, results section and basic SEO.',
      uk: 'Продуктовий сайт з лейаутом, формами, розділом результатів та базовим SEO.',
    },
    modalDescription: {
      en: 'Psoriatynin is a marketing site for a dermatological cream. I worked on the full stack of the page: structure, responsive layout, components for ingredients, clinical tests, results, and integration with order/contact forms.',
      uk: 'Psoriatynin — маркетинговий сайт дерматологічного крему. Я працював над усім стеком сторінки: структурою, адаптивним лейаутом, компонентами для складу, клінічних тестів, результатів та інтеграцією з формами замовлення й контактів.',
    },
    projectUrl: 'https://psoriatynin.biz.ua',
    githubUrl: 'https://github.com/SergiiPavlov/psor-codex',
    stack: ['Next.js', 'Full‑stack layout', 'Forms', 'SEO basics'],
    balloonColor: 'from-amber-300 via-yellow-400 to-orange-500',
  },
  {
    id: 'i18n-zadonetske',
    label: 'i18n & Maps',
    projectName: 'Zadonetske — Village Microsite',
    image: '/projects/zadonetske-hero.png',
    shortDescription: {
      en: 'Microsite with local content, routes and (planned) interactive map.',
      uk: 'Мікросайт із локальним контентом, маршрутами та (запланованою) інтерактивною картою.',
    },
    modalDescription: {
      en: 'This microsite tells the story of the village Zadonetske. I focus on clear content blocks, multilingual structure and preparing the layout for future integration of a map and dynamic content from a CMS.',
      uk: 'Мікросайт розповідає історію села Задонецьке. Я фокусуюсь на зрозумілих контентних блоках, багатомовній структурі та підготовці лейауту до майбутньої інтеграції карти та динамічного контенту з CMS.',
    },
    projectUrl: 'https://village-development-iota.vercel.app/',
    githubUrl: 'https://github.com/SergiiPavlov/village-development',
    stack: ['Next.js', 'i18n', 'Content structure', 'Maps (planned)'],
    balloonColor: 'from-teal-300 via-cyan-400 to-sky-500',
  },
];
