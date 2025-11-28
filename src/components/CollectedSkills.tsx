// src/components/CollectedSkills.tsx
'use client';

import type { Locale } from '@/lib/i18n';
import type { SkillProject } from '@/data/skills';

type CollectedSkillsProps = {
  locale: Locale;
  skills: SkillProject[];
};

export default function CollectedSkills({
  locale,
  skills,
}: CollectedSkillsProps) {
  const t = {
    en: {
      title: 'Unlocked skills & projects',
      subtitle:
        'Cards appear here after you pop matching balloons above.',
      empty: 'Pop a few balloons above to unlock your first skill cards.',
    },
    uk: {
      title: 'Відкриті скіли та проєкти',
      subtitle:
        'Картки зʼявляються тут після того, як ви лопаєте відповідні кульки вище.',
      empty: 'Лопніть кілька кульок вище, щоб відкрити перші картки скілів.',
    },
  }[locale];

  return (
    <section className="space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-50">
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">{t.subtitle}</p>
        </div>
      </div>

      {skills.length === 0 ? (
        <p className="text-xs sm:text-sm text-slate-500">
          {t.empty}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {skills.map(skill => (
            <article
              key={skill.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/80 shadow-sm hover:border-slate-500 hover:shadow-md transition flex flex-col overflow-hidden"
            >
              {/* Заглушка вместо картинки */}
              <div className="h-24 sm:h-28 bg-gradient-to-r from-sky-500/40 via-cyan-400/30 to-violet-500/40 flex items-center justify-center">
                <span className="text-sm sm:text-base font-semibold text-slate-50">
                  {skill.label}
                </span>
              </div>

              <div className="p-3 sm:p-4 flex flex-col gap-2 flex-1">
                <p className="text-xs sm:text-sm text-slate-300">
                  {skill.shortDescription[locale]}
                </p>

                <div className="mt-auto pt-2">
                  <button
                    type="button"
                    className="text-xs font-semibold text-sky-400 hover:text-sky-300 underline underline-offset-2"
                    disabled
                  >
                    {locale === 'en'
                      ? 'View details (soon)'
                      : 'Детальніше (скоро)'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
