'use client';

import { useEffect, useRef, useState } from 'react';
import type { Locale } from '@/lib/i18n';
import Header from '@/components/Header';
import BalloonField from '@/components/BalloonField';
import CollectedSkills from '@/components/CollectedSkills';
import AllProjectsGrid from '@/components/AllProjectsGrid';
import Footer from '@/components/Footer';
import { SKILL_PROJECTS, type SkillProject } from '@/data/skills';

type ViewMode = 'interactive' | 'classic';

export default function HomePage() {
  const [locale, setLocale] = useState<Locale>('en');
  const [mode, setMode] = useState<ViewMode>('interactive');

  // Какие скиллы уже "лопнули"
  const [poppedSkillIds, setPoppedSkillIds] = useState<string[]>([]);

  // Какие скиллы уже собраны снизу в виде карточек
  const [collectedSkills, setCollectedSkills] = useState<SkillProject[]>([]);

  // Звук (музыка + эффекты)
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Глобальный звук "клика" для UI (как лёгкий щелчок айфона)
  const uiClickRef = useRef<HTMLAudioElement | null>(null);

  const handleSkillPopped = (skillId: string) => {
    // 1) помечаем скилл как лопнутый
    setPoppedSkillIds((prev) =>
      prev.includes(skillId) ? prev : [...prev, skillId],
    );

    // 2) добавляем карточку снизу, если её ещё нет
    setCollectedSkills((prev) => {
      if (prev.some((skill) => skill.id === skillId)) {
        return prev;
      }
      const skill = SKILL_PROJECTS.find((item) => item.id === skillId);
      if (!skill) return prev;
      return [...prev, skill];
    });
  };

  const handleReset = () => {
    setPoppedSkillIds([]);
    setCollectedSkills([]);
  };

  // Глобальный обработчик кликов по UI-элементам (кнопки, ссылки и т.п.)
  useEffect(() => {
    if (!soundEnabled) {
      return;
    }

    if (!uiClickRef.current) {
      uiClickRef.current = new Audio('/sounds/ui-click.mp3');
      uiClickRef.current.volume = 0.6;
    }

    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      // Не проигрываем этот звук внутри области прицела (там уже есть свой звук выстрела)
      if (target.closest('.balloon-aim-area')) {
        return;
      }

      const clickable = target.closest(
        'button, a, [role="button"], input, select, textarea',
      );

      if (!clickable) return;
      if (!soundEnabled) return;

      try {
        const audio = uiClickRef.current;
        if (audio) {
          audio.currentTime = 0;
          void audio.play();
        }
      } catch {
        // игнорируем ошибки
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [soundEnabled]);

  const t = {
    en: {
      reset: 'Reset progress',
    },
    uk: {
      reset: 'Скинути прогрес',
    },
  }[locale];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50">
      <Header
        locale={locale}
        onChangeLocale={setLocale}
        mode={mode}
        onChangeMode={setMode}
      />

      <main className="flex-1 flex flex-col gap-6 px-4 sm:px-6 lg:px-8 py-6 max-w-5xl w-full mx-auto">
        {mode === 'interactive' ? (
          <>
            <BalloonField
              locale={locale}
              poppedSkillIds={poppedSkillIds}
              onPopSkill={handleSkillPopped}
              soundEnabled={soundEnabled}
            />

            <CollectedSkills
              locale={locale}
              skills={collectedSkills}
              soundEnabled={soundEnabled}
              onToggleSound={() => setSoundEnabled((prev) => !prev)}
            />

            {poppedSkillIds.length > 0 && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-xs text-slate-300 hover:text-slate-50 hover:border-slate-500 hover:bg-slate-900 transition"
                >
                  {t.reset}
                </button>
              </div>
            )}
          </>
        ) : (
          <AllProjectsGrid locale={locale} />
        )}
      </main>

      <Footer locale={locale} />
    </div>
  );
}
