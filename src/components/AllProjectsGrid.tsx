// src/components/AllProjectsGrid.tsx
'use client';

import Image from 'next/image';
import type { Locale } from '@/lib/i18n';
import { SKILL_PROJECTS } from '@/data/skills';

type AllProjectsGridProps = {
  locale: Locale;
};

export default function AllProjectsGrid({ locale }: AllProjectsGridProps) {
  const t = {
    en: {
      title: 'All skills & projects',
      subtitle:
        'Classic view of your portfolio. Each card links a core skill with a real project.',
      live: 'Open live site',
      github: 'View on GitHub',
      skillLabel: 'Skill',
      techStack: 'Tech stack',
      aboutTitle: 'About me',
      aboutBody1:
        "I'm a junior front-end / full-stack developer from Ukraine, focusing on interactive, playful interfaces and real-world projects.",
      aboutBody2:
        'I enjoy building AI-assisted experiences with React, Next.js, TypeScript and Node.js, often around volunteer and community initiatives.',
      whatIDoTitle: 'What I do',
      whatIDoItems: [
        'SPA and landing pages with React/Next.js',
        'Admin panels and dashboards',
        'AI-powered assistants (chat & content search)',
        'Web projects for volunteers and communities',
      ],
      downloadCv: 'Download CV',
      downloadCvAria: 'Download my CV as PDF',
    },
    uk: {
      title: 'Усі скіли та проєкти',
      subtitle:
        'Класичний перегляд портфоліо. Кожна картка поєднує ключовий скіл з реальним проєктом.',
      live: 'Відкрити сайт',
      github: 'Переглянути на GitHub',
      skillLabel: 'Скіл',
      techStack: 'Технології',
      aboutTitle: 'Про мене',
      aboutBody1:
        'Я junior front-end / full-stack розробник з України, фокусуюся на інтерактивних інтерфейсах та реальних проєктах.',
      aboutBody2:
        'Люблю створювати AI-асистентів та зручні вебдодатки на React, Next.js, TypeScript і Node.js, а також працювати над волонтерськими та комʼюніті-ініціативами.',
      whatIDoTitle: 'Чим я займаюсь',
      whatIDoItems: [
        'SPA та лендінги на React/Next.js',
        'Адмін-панелі та дашборди',
        'AI-асистенти (чат та пошук контенту)',
        'Веб-проєкти для волонтерства та комʼюніті',
      ],
      downloadCv: 'Завантажити CV',
      downloadCvAria: 'Завантажити моє CV у форматі PDF',
    },
  }[locale];

  return (
    <section className="space-y-4">
      {/* About me block above the grid in classic view */}
      <div className="rounded-3xl border border-emerald-500/60 bg-emerald-950/30 shadow-[0_0_40px_rgba(16,185,129,0.55)] px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 text-center max-w-3xl mx-auto">
        <h2 className="text-lg sm:text-xl font-semibold text-slate-50">
          {t.aboutTitle}
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-300">
          {t.aboutBody1}
        </p>
        <p className="mt-1 text-xs sm:text-sm text-slate-300">
          {t.aboutBody2}
        </p>
      </div>
      {/* What I do + Download CV */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-4 max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-slate-50">
              {t.whatIDoTitle}
            </h3>
            <ul className="mt-1 space-y-0.5 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              {t.whatIDoItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="sm:self-start">
            <a
              href="/Sergii_Pavlov_Fullstack_Developer.pdf"
              download
              className="inline-flex items-center justify-center rounded-full border border-emerald-400 bg-emerald-400/90 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-slate-950 hover:bg-emerald-300 hover:border-emerald-300 transition"
              aria-label={t.downloadCvAria}
            >
              {t.downloadCv}
            </a>
          </div>
        </div>
      </div>


      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-slate-50">
              {t.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">{t.subtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {SKILL_PROJECTS.map((skill) => (
            <article
              key={skill.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/80 shadow-sm hover:border-slate-500 hover:shadow-md transition flex flex-col overflow-hidden"
            >
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-slate-900">
                <Image
                  src={skill.image}
                  alt={skill.projectName}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>

              <div className="p-3 sm:p-4 flex flex-col gap-2 flex-1">
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-slate-50">
                    {skill.projectName}
                  </h3>
                  <p className="mt-1 text-[11px] sm:text-xs text-slate-300">
                    {skill.shortDescription[locale]}
                  </p>
                </div>

                <div className="mt-auto pt-2 space-y-1">
                  <p className="text-[11px] sm:text-xs text-slate-400">
                    <span className="font-semibold text-slate-300">
                      {t.skillLabel}:{' '}
                    </span>
                    {skill.label}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.stack.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/80 px-2 py-0.5 text-[10px] font-medium text-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
                  {skill.githubUrl && (
                    <a
                      href={skill.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-100 hover:bg-slate-800 hover:border-slate-500 transition"
                    >
                      {t.github}
                    </a>
                  )}
                  <a
                    href={skill.projectUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-sky-400 bg-sky-600/80 px-4 py-1.5 text-xs font-semibold text-slate-900 hover:bg-sky-500 hover:border-sky-400 transition"
                  >
                    {t.live}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
