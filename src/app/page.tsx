'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n';
import Header from '@/components/Header';
import BalloonField from '@/components/BalloonField';
import CollectedSkills from '@/components/CollectedSkills';
import Footer from '@/components/Footer';
import { SKILL_PROJECTS, type SkillProject } from '@/data/skills';

export default function HomePage() {
  const [locale, setLocale] = useState<Locale>('en');

  // Какие скиллы уже "лопнули"
  const [poppedSkillIds, setPoppedSkillIds] = useState<string[]>([]);

  // Какие скиллы уже собраны снизу в виде карточек
  const [collectedSkills, setCollectedSkills] = useState<SkillProject[]>([]);

  const handleSkillPopped = (skillId: string) => {
    // 1) помечаем скилл как лопнутый
    setPoppedSkillIds(prev =>
      prev.includes(skillId) ? prev : [...prev, skillId],
    );

    // 2) добавляем карточку снизу, если её ещё нет
    setCollectedSkills(prev => {
      if (prev.some(skill => skill.id === skillId)) {
        return prev;
      }
      const skill = SKILL_PROJECTS.find(s => s.id === skillId);
      if (!skill) return prev;
      return [...prev, skill];
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50">
      <Header locale={locale} onChangeLocale={setLocale} />

      <main className="flex-1 flex flex-col gap-6 px-4 sm:px-6 lg:px-8 py-6 max-w-5xl w-full mx-auto">
        <BalloonField
          locale={locale}
          poppedSkillIds={poppedSkillIds}
          onPopSkill={handleSkillPopped}
        />

        <CollectedSkills locale={locale} skills={collectedSkills} />
      </main>

      <Footer locale={locale} />
    </div>
  );
}
