// src/components/BalloonField.tsx
'use client';

import { useEffect, useState } from 'react';
import type { Locale } from '@/lib/i18n';
import { SKILL_PROJECTS } from '@/data/skills';
import { motion, AnimatePresence } from 'framer-motion';

type BalloonFieldProps = {
  locale: Locale;
  poppedSkillIds: string[];
  onPopSkill: (skillId: string) => void;
};

type BalloonInstance = {
  id: string;
  skillId: string;
  label: string;
  xPercent: number;
  balloonColor: string;
};

const MAX_ACTIVE_BALLOONS = 3;
const SPAWN_INTERVAL_MS = 4000;

export default function BalloonField({
  locale,
  poppedSkillIds,
  onPopSkill,
}: BalloonFieldProps) {
  const [balloons, setBalloons] = useState<BalloonInstance[]>([]);

  const t = {
    en: {
      title: 'Skill balloons playground',
      subtitle:
        'Balloons rise from the bottom. Pop them to unlock skill cards below.',
      hint: 'Each skill appears only until you pop it. After that, this balloon never comes back.',
    },
    uk: {
      title: 'Поле шариків зі скілами',
      subtitle:
        'Кульки підіймаються знизу. Лопайте їх, щоб відкривати картки скілів нижче.',
      hint: 'Кожен скіл зʼявляється доти, доки ви не “лопнете” його. Після цього кулька більше не повертається.',
    },
  }[locale];

  // Спавн новых шариков
  useEffect(() => {
    // Если все скиллы уже лопнули — новых шариков не будет
    if (poppedSkillIds.length >= SKILL_PROJECTS.length) {
      return;
    }

    const intervalId = setInterval(() => {
      setBalloons(current => {
        if (current.length >= MAX_ACTIVE_BALLOONS) {
          return current;
        }

        const activeSkillIds = new Set(current.map(b => b.skillId));

        // Скиллы, которые ещё не лопнули и не висят сейчас в виде шарика
        const availableSkills = SKILL_PROJECTS.filter(
          skill =>
            !poppedSkillIds.includes(skill.id) &&
            !activeSkillIds.has(skill.id),
        );

        if (availableSkills.length === 0) {
          return current;
        }

        const skill =
          availableSkills[
            Math.floor(Math.random() * availableSkills.length)
          ];

        const xPercent = 10 + Math.random() * 80; // от 10% до 90%

        const instance: BalloonInstance = {
          id: `${skill.id}-${Date.now()}-${Math.random()
            .toString(36)
            .slice(2, 6)}`,
          skillId: skill.id,
          label: skill.label,
          xPercent,
          balloonColor: skill.balloonColor,
        };

        return [...current, instance];
      });
    }, SPAWN_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [poppedSkillIds]);

  const handleBalloonAnimationComplete = (id: string) => {
    // Шар долетел до верха — убираем его из списка (если он ещё там)
    setBalloons(current => current.filter(b => b.id !== id));
  };

  const handleBalloonClick = (balloon: BalloonInstance) => {
    // Убираем шарик с поля
    setBalloons(current => current.filter(b => b.id !== balloon.id));
    // Сообщаем наверх, что скилл лопнули
    onPopSkill(balloon.skillId);
  };

  return (
    <section className="flex-1 rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/80 via-slate-900/40 to-slate-950/90 shadow-inner flex flex-col gap-4 py-6 sm:py-8 px-4">
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-50">
          {t.title}
        </h2>
        <p className="text-sm sm:text-base text-slate-400">{t.subtitle}</p>
        <p className="text-xs text-slate-500">{t.hint}</p>
      </div>

      <div className="relative flex-1 min-h-[220px] sm:min-h-[280px] overflow-hidden mt-2">
        <AnimatePresence>
          {balloons.map(balloon => (
            <motion.button
              key={balloon.id}
              type="button"
              onClick={() => handleBalloonClick(balloon)}
              className="absolute bottom-0 -translate-x-1/2 flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-sky-400/80"
              style={{ left: `${balloon.xPercent}%` }}
              initial={{ y: '120%', opacity: 0, scale: 0.95 }}
              animate={{ y: '-120%', opacity: 1, scale: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 12, ease: 'linear' }}
              onAnimationComplete={() =>
                handleBalloonAnimationComplete(balloon.id)
              }
            >
              <div className="relative flex flex-col items-center">
                {/* Сам шарик */}
                <div
                  className={`w-20 h-24 sm:w-24 sm:h-28 rounded-full bg-gradient-to-b ${balloon.balloonColor} shadow-lg shadow-slate-900/70 flex items-center justify-center`}
                >
                  <span className="text-xs sm:text-sm font-semibold text-slate-50 text-center px-2">
                    {balloon.label}
                  </span>
                </div>
                {/* "Хвостик" шарика */}
                <div className="w-2 h-3 sm:w-2.5 sm:h-3.5 bg-slate-900 rounded-b-full -mt-1" />
              </div>
            </motion.button>
          ))}
        </AnimatePresence>

        {/* Подсказка, если ещё нет шариков */}
        {balloons.length === 0 && poppedSkillIds.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-[11px] sm:text-xs text-slate-500">
              {locale === 'en'
                ? 'Waiting for the first balloons to appear...'
                : 'Очікуємо, поки зʼявляться перші кульки...'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
