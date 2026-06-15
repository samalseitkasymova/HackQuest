import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useLabContext } from './LabContext';

export interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  unlocked: boolean;
}

type AchievementContextType = {
  achievements: Achievement[];
  unlockAchievement: (id: number) => void;
  resetAchievements: () => void;
};

const AchievementContext = createContext<AchievementContextType | undefined>(undefined);

export const useAchievementContext = () => {
  const ctx = useContext(AchievementContext);
  if (!ctx) throw new Error('useAchievementContext must be used within AchievementProvider');
  return ctx;
};

const initialAchievements: Achievement[] = [
  { id: 1, title: 'First Blood', description: 'Завершите первую лабораторию', icon: '🏆', xpReward: 100, unlocked: false },
  { id: 2, title: 'SQL Injection Master', description: 'Освойте SQL-инъекции', icon: '🛡️', xpReward: 200, unlocked: false },
  { id: 3, title: 'XSS Master', description: 'Освойте XSS', icon: '💥', xpReward: 150, unlocked: false },
  { id: 4, title: 'Brute Force Expert', description: 'Эксперт в Brute Force', icon: '🔐', xpReward: 150, unlocked: false },
  { id: 5, title: 'Command Injection Specialist', description: 'Специалист по Command Injection', icon: '💻', xpReward: 250, unlocked: false },
  { id: 6, title: 'JWT Hacker', description: 'Эксплойт JWT', icon: '🔑', xpReward: 300, unlocked: false },
];

export function AchievementProvider({ children }: { children: ReactNode }) {
  const { addXp } = useLabContext();
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);

  // load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('achievements');
      if (stored) {
        setAchievements(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load achievements from localStorage', e);
    }
  }, []);

  // save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('achievements', JSON.stringify(achievements));
    } catch (e) {
      console.error('Failed to save achievements to localStorage', e);
    }
  }, [achievements]);

  const unlockAchievement = (id: number) => {
    setAchievements((prev) => {
      if (prev.find((a) => a.id === id && a.unlocked)) return prev;
      const next = prev.map((a) => (a.id === id ? { ...a, unlocked: true } : a));
      const unlocked = next.find((a) => a.id === id);
      if (unlocked) {
        // grant XP for achievement
        try {
          addXp(unlocked.xpReward);
        } catch (e) {
          // ignore if LabContext not available
        }
      }
      return next;
    });
  };

  const resetAchievements = () => {
    setAchievements(initialAchievements.map(a => ({ ...a, unlocked: false })));
    try {
      localStorage.removeItem('achievements');
    } catch (e) {
      console.error('Failed to clear achievements from localStorage', e);
    }
  };

  return (
    <AchievementContext.Provider value={{ achievements, unlockAchievement, resetAchievements }}>
      {children}
    </AchievementContext.Provider>
  );
}
