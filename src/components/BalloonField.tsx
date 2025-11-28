// src/components/BalloonField.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import type { Locale } from '@/lib/i18n';
import { SKILL_PROJECTS } from '@/data/skills';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

type BalloonFieldProps = {
  locale: Locale;
  /** Список скиллов, которые уже были лопнуты и превращены в карточки */
  poppedSkillIds: string[];
  /** Колбэк, который вызывается, когда шарик со скиллом лопнули */
  onPopSkill: (skillId: string) => void;
  /** Включён ли звук (музыка + эффекты) */
  soundEnabled: boolean;
};

type BalloonInstance = {
  id: string;
  skillId: string;
  label: string;
  laneIndex: number;
  xPercent: number;
  balloonColor: string;
  isPopping?: boolean;
};

const MAX_BALLOONS = 3;
// Интервал между появлением шариков (мс)
const SPAWN_INTERVAL_MS = 1600;
// Время полёта шарика снизу вверх (сек) — уже ускоренное
const FLOAT_DURATION_SEC = 4;
// Фиксированные «дорожки» по ширине в процентах
const LANES_PERCENT = [18, 38, 58, 78];

export default function BalloonField({
  locale,
  poppedSkillIds,
  onPopSkill,
  soundEnabled,
}: BalloonFieldProps) {
  const t = {
    en: {
      title: 'Skill balloons playground',
      subtitle:
        'Pop floating balloons to unlock skill cards below. Each balloon stands for a real project.',
      hint: 'First balloons are about to appear...',
      allUnlocked: "You've unlocked all skills!",
      lookDown: 'See your unlocked projects',
      celebrationAbout1:
        'I build interactive, AI-assisted front-ends and full-stack web apps.',
      celebrationAbout2:
        'Scroll down to explore real projects behind each unlocked skill.',
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
      title: 'Поле кульок зі скілами',
      subtitle:
        'Лопайте кульки, щоб відкривати картки скілів з реальними проєктами нижче.',
      hint: 'Зараз зʼявляться перші кульки...',
      allUnlocked: 'Ви відкрили всі скіли!',
      lookDown: 'Подивіться відкриті проєкти',
      celebrationAbout1:
        'Я створюю інтерактивні, AI-підсилені інтерфейси та full‑stack вебдодатки.',
      celebrationAbout2:
        'Гортайте вниз, щоб побачити реальні проєкти за кожним відкритим скілом.',
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

  const [balloons, setBalloons] = useState<BalloonInstance[]>([]);

  const totalSkills = SKILL_PROJECTS.length;
  const unlockedCount = poppedSkillIds.length;
  const celebrationActive = unlockedCount === totalSkills && totalSkills > 0;

  // Аудио: фоновая музыка и одиночный звук празднования
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);
  const celebrationPlayedRef = useRef(false);

  const spawnBalloon = () => {
    setBalloons((prev) => {
      // не больше, чем MAX_BALLOONS одновременно
      if (prev.length >= MAX_BALLOONS) return prev;

      // какие скиллы доступны (ещё не лопнуты и не в полёте)
      const availableSkills = SKILL_PROJECTS.filter(
        (skill) =>
          !poppedSkillIds.includes(skill.id) &&
          !prev.some((b) => b.skillId === skill.id),
      );
      if (availableSkills.length === 0) return prev;

      // какие дорожки свободны
      const occupiedLanes = prev.map((b) => b.laneIndex);
      const freeLaneIndexes = LANES_PERCENT.map((_, index) => index).filter(
        (index) => !occupiedLanes.includes(index),
      );
      if (freeLaneIndexes.length === 0) return prev;

      const skill =
        availableSkills[Math.floor(Math.random() * availableSkills.length)];
      const laneIndex =
        freeLaneIndexes[Math.floor(Math.random() * freeLaneIndexes.length)];
      const xPercent = LANES_PERCENT[laneIndex];

      const newBalloon: BalloonInstance = {
        id: `${skill.id}-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
        skillId: skill.id,
        label: skill.label,
        laneIndex,
        xPercent,
        balloonColor: skill.balloonColor,
      };

      return [...prev, newBalloon];
    });
  };

  // Спавним шарики: первый почти сразу, дальше — по интервалу
  useEffect(() => {
    if (poppedSkillIds.length === SKILL_PROJECTS.length) {
      setBalloons([]);
      return;
    }

    spawnBalloon();
    const intervalId = window.setInterval(spawnBalloon, SPAWN_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poppedSkillIds]);

  // Фоновая музыка (легкая петля)
  useEffect(() => {
    if (!soundEnabled) {
      if (bgAudioRef.current) {
        bgAudioRef.current.pause();
      }
      return;
    }

    if (!bgAudioRef.current) {
      bgAudioRef.current = new Audio('/sounds/bg-loop.mp3');
      bgAudioRef.current.loop = true;
      bgAudioRef.current.volume = 0.25;
    }

    bgAudioRef.current
      .play()
      .catch(() => {
        // браузер может блокировать автоплей — просто игнорируем ошибку
      });

    return () => {
      if (bgAudioRef.current) {
        bgAudioRef.current.pause();
      }
    };
  }, [soundEnabled]);

  // Конфетти с помощью canvas-confetti при достижении 100% прогресса + звук празднования
  useEffect(() => {
    if (!celebrationActive) {
      celebrationPlayedRef.current = false;
      return;
    }

    const duration = 2000;
    const end = Date.now() + duration;

    const frame = () => {
      // левый залп
      confetti({
        particleCount: 18,
        angle: 60,
        spread: 60,
        origin: { x: 0.1, y: 0.1 },
      });
      // правый залп
      confetti({
        particleCount: 18,
        angle: 120,
        spread: 60,
        origin: { x: 0.9, y: 0.1 },
      });
      // центральный веер
      confetti({
        particleCount: 20,
        spread: 80,
        origin: { x: 0.5, y: 0.1 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();

    if (soundEnabled && !celebrationPlayedRef.current) {
      const applause = new Audio('/sounds/celebration.mp3');
      applause.volume = 0.7;
      applause.play().catch(() => {});
      celebrationPlayedRef.current = true;
    }
  }, [celebrationActive, soundEnabled]);

  const handlePop = (balloonId: string, skillId: string) => {
    // Отмечаем скилл как открытый
    onPopSkill(skillId);

    if (soundEnabled) {
      try {
        const shot = new Audio('/sounds/shot.mp3');
        shot.volume = 0.45;
        shot.currentTime = 0;
        void shot.play();

        const pop = new Audio('/sounds/balloon-pop-soft.mp3');
        pop.volume = 0.7;
        pop.currentTime = 0;
        window.setTimeout(() => {
          void pop.play();
        }, 90);
      } catch {
        // проигнорировать ошибки аудио
      }
    }

    // Переключаем шарик в состояние «взрыв», он сам исчезнет после анимации
    setBalloons((prev) =>
      prev.map((b) => (b.id === balloonId ? { ...b, isPopping: true } : b)),
    );
  };

  const hasAnyBalloon = balloons.length > 0 || poppedSkillIds.length > 0;

  return (
    <section className="flex-1 rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/80 via-slate-900/40 to-slate-950/90 shadow-inner flex flex-col gap-3 py-5 sm:py-6 px-4">
      <div className="flex items-baseline justify-between gap-2 mb-1">
        <div>
          <h2 className="text-sm sm:text-base md:text-lg font-semibold text-slate-50">
            {t.title}
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-400">{t.subtitle}</p>
        </div>
      </div>

      {/* Фиксированное по высоте поле для анимации, чтобы не прыгать по высоте */}
      <div
        className={[
          'relative h-64 sm:h-72 md:h-80 overflow-hidden rounded-2xl bg-slate-950/70 border border-slate-800 balloon-aim-area',
          celebrationActive
            ? 'ring-2 ring-emerald-400/70 shadow-[0_0_40px_rgba(34,197,94,0.5)]'
            : '',
        ].join(' ')}
      >
        {/* Счётчик открытых скиллов в правом верхнем углу */}
        <div className="absolute top-2 right-2 z-20">
          <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-sm sm:text-base font-semibold text-sky-300 shadow-md">
            {unlockedCount} / {totalSkills}
          </span>
        </div>

        {/* Праздничный баннер сверху + подсказка у нижнего края */}
        <AnimatePresence>
          {celebrationActive && (
            <>
              {/* Баннер: падает сверху и мягко подпрыгивает */}
              <motion.div
                className="absolute top-4 left-1/2 z-30 -translate-x-1/2 pointer-events-none"
                initial={{ y: -40, opacity: 0, scale: 0.9 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  scale: [1, 1.05, 0.98, 1],
                }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.7,
                  ease: 'easeOut',
                }}
              >
                <div className="flex flex-col items-stretch gap-2">
                  {/* Верхний бейдж: только сообщение про все скиллы */}
                  <div className="banner-display rounded-full border border-emerald-500/60 bg-emerald-900/50 px-4 sm:px-6 py-1.5 sm:py-2 shadow-lg backdrop-blur-sm text-center">
                    <p className="text-sm sm:text-base md:text-lg font-semibold tracking-wide text-emerald-200 drop-shadow">
                      {t.allUnlocked}
                    </p>
                  </div>
                  {/* Нижний бейдж: мини-блок «About me» */}
                  <div className="banner-display rounded-full border border-emerald-500/50 bg-emerald-900/40 px-4 sm:px-6 py-1.5 sm:py-2 shadow-lg backdrop-blur-sm text-center">
                    <p className="text-[10px] sm:text-xs md:text-sm text-emerald-100/90">
                      {t.celebrationAbout1}
                    </p>
                    <p className="mt-0.5 text-[9px] sm:text-[10px] md:text-xs text-emerald-100/80">
                      {t.celebrationAbout2}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Подпись + стрелка: падает и «сидит» у нижнего края поля, указывая на карточки */}
              <motion.div
                className="absolute bottom-2 left-1/2 z-30 -translate-x-1/2 pointer-events-none flex flex-col items-center gap-1"
                initial={{ y: 40, opacity: 0, scale: 0.9 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  scale: [1, 1.04, 0.96, 1],
                }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                  duration: 0.8,
                  ease: 'easeOut',
                }}
              >
                <span className="banner-display text-[10px] sm:text-xs text-slate-100/90">
                  {t.lookDown}
                </span>
                <motion.svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300 drop-shadow"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  animate={{
                    y: [0, 4, 0],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <path
                    d="M12 5v14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5 12l7 7 7-7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Поле полёта шариков */}
        <AnimatePresence>
          {balloons.map((balloon) => (
            <motion.div
              key={balloon.id}
              className="absolute bottom-0 pointer-events-none"
              style={{
                left: `${balloon.xPercent}%`,
                transform: 'translateX(-50%)',
              }}
              initial={{ y: '100%', opacity: 0, scale: 0.9 }}
              animate={balloon.isPopping ? 'pop' : 'fly'}
              variants={{
                fly: {
                  y: '-130%',
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: FLOAT_DURATION_SEC,
                    ease: 'linear',
                  },
                },
                pop: {
                  scale: [1, 1.25, 0.7],
                  opacity: [1, 1, 0],
                  transition: {
                    duration: 0.45,
                    ease: 'easeOut',
                  },
                },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.3 },
              }}
              onAnimationComplete={() => {
                // когда анимация закончилась (долетел или «взорвался») — убираем шарик
                setBalloons((prev) => prev.filter((b) => b.id !== balloon.id));
              }}
            >
              <button
                type="button"
                onClick={() => handlePop(balloon.id, balloon.skillId)}
                className="pointer-events-auto focus:outline-none group"
              >
                <div className="flex flex-col items-center gap-1">
                  {/* Сам шарик */}
                  <div
                    className={[
                      'w-14 sm:w-16 h-20 sm:h-24 rounded-full bg-gradient-to-b flex items-center justify-center shadow-lg border border-white/40 group-hover:shadow-xl group-hover:scale-105 transition-transform',
                      balloon.balloonColor,
                    ].join(' ')}
                  >
                    <span className="text-[11px] sm:text-xs font-semibold text-slate-50 drop-shadow">
                      {balloon.label}
                    </span>
                  </div>
                  {/* Хвостик */}
                  <div className="w-[6px] h-4 sm:h-5 bg-slate-100 rounded-b-full -mt-1" />
                </div>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Подсказка в самом начале, когда ещё нет шариков */}
        {!hasAnyBalloon && !celebrationActive && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-[11px] sm:text-xs text-slate-500">{t.hint}</p>
          </div>
        )}
      </div>

      {/* What I do + Download CV (same as classic view) */}
      <div className="mt-3 rounded-3xl border border-slate-800 bg-slate-900/80 px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-4">
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

    </section>
  );
}
