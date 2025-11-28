// src/components/CollectedSkills.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import type { Locale } from '@/lib/i18n';
import type { SkillProject } from '@/data/skills';

type CollectedSkillsProps = {
  locale: Locale;
  skills: SkillProject[];
  soundEnabled: boolean;
  onToggleSound: () => void;
};

export default function CollectedSkills({
  locale,
  skills,
  soundEnabled,
  onToggleSound,
}: CollectedSkillsProps) {
  const t = {
    en: {
      title: 'Unlocked skills & projects',
      subtitle:
        'These cards appear when you pop balloons. Each card links to a real project in your stack.',
      empty: 'Pop a balloon above to unlock your first skill card.',
      techStack: 'Tech stack',
      openProject: 'Open project',
      viewCode: 'View on GitHub',
      fromSkill: 'Unlocked from skill: ',
    },
    uk: {
      title: 'Відкриті скіли та проєкти',
      subtitle:
        'Ці картки з’являються після того, як ви лопаєте кульки. Кожна картка веде на реальний проєкт.',
      empty: 'Лопніть кульку вище, щоб відкрити першу картку зі скілом.',
      techStack: 'Техстек',
      openProject: 'Відкрити проєкт',
      viewCode: 'Переглянути на GitHub',
      fromSkill: 'Відкрито зі скіла: ',
    },
  }[locale];

  const [selected, setSelected] = useState<SkillProject | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const hasSkills = skills.length > 0;

  return (
    <section className="space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-50">
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">{t.subtitle}</p>
        </div>

        {/* Переключатель звука */}
        <button
          type="button"
          onClick={onToggleSound}
          className="inline-flex items-center self-start sm:self-auto rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-[11px] sm:text-xs font-medium text-slate-200 hover:border-sky-500 hover:bg-slate-900 transition"
        >
          <span className="uppercase tracking-wide mr-1">Sound</span>
          <span
            className={[
              'rounded-full px-1.5 py-0.5 text-[10px] font-semibold',
              soundEnabled
                ? 'bg-emerald-400 text-slate-900'
                : 'bg-slate-700 text-slate-200',
            ].join(' ')}
          >
            {soundEnabled ? 'ON' : 'OFF'}
          </span>
        </button>
      </div>

      {!hasSkills ? (
        <p className="text-xs sm:text-sm text-slate-500 italic">{t.empty}</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {skills.map((skill) => (
            <article
              key={skill.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/80 shadow-sm hover:border-slate-500 hover:shadow-md transition flex flex-col overflow-hidden"
            >
              <div className="relative h-20 sm:h-24 bg-slate-800/60">
                <Image
                  src={skill.image}
                  alt={skill.label}
                  fill
                  sizes="(min-width: 1280px) 160px, (min-width: 1024px) 120px, (min-width: 640px) 33vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div className="p-2 sm:p-2.5 flex flex-col gap-1.5 flex-1">
                <div className="flex flex-col gap-0.5">
                  <p className="text-[11px] sm:text-xs font-semibold text-slate-50 line-clamp-2">
                    {skill.projectName}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-slate-400">
                    {skill.label}
                  </p>
                </div>

                <p className="text-[11px] sm:text-xs text-slate-300 line-clamp-3">
                  {skill.shortDescription[locale]}
                </p>

                <div className="mt-auto pt-1.5 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setSelected(skill)}
                    className="text-[10px] sm:text-xs font-semibold text-sky-400 hover:text-sky-300 underline underline-offset-2"
                  >
                    {locale === 'en' ? 'View details' : 'Детальніше'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Модалка деталей проєкта */}
      <AnimatePresence>
        {hasMounted && selected && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="max-w-lg w-full rounded-3xl border border-slate-800 bg-slate-900/95 shadow-2xl p-4 sm:p-6 space-y-3"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={selected.projectName}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-slate-50">
                    {selected.projectName}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {t.fromSkill}
                    {selected.label}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-300 hover:text-slate-50 hover:border-slate-500 transition text-xs"
                >
                  ✕
                </button>
              </div>

              <div className="relative h-40 sm:h-52 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/80">
                <Image
                  src={selected.image}
                  alt={selected.projectName}
                  fill
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="space-y-1.5">
                <p className="text-xs sm:text-sm text-slate-200">
                  {selected.modalDescription[locale]}
                </p>
                {selected.techStack && selected.techStack.length > 0 && (
                  <p className="text-[11px] sm:text-xs text-slate-400">
                    <span className="font-semibold text-slate-300">
                      {t.techStack}:
                    </span>{' '}
                    {selected.techStack.join(', ')}
                  </p>
                )}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
                {selected.githubUrl && (
                  <a
                    href={selected.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-900 px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-100 shadow hover:bg-slate-800 hover:border-slate-400 transition"
                  >
                    {t.viewCode}
                  </a>
                )}
                <a
                  href={selected.projectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-sky-400 bg-sky-600 px-4 py-1.5 text-xs sm:text-sm font-semibold text-slate-900 shadow hover:bg-sky-500 hover:border-sky-300 transition"
                >
                  {t.openProject}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
