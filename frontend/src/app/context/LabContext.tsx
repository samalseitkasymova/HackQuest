import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type LabContextType = {
  completedLabs: number[];
  unlockedLabs: number[];
  xp: number;
  completeLab: (labId: number) => void;
  unlockLab: (labId: number) => void;
  addXp: (amount: number) => void;
  resetProgress: () => void;
};

const LabContext = createContext<LabContextType | undefined>(undefined);

export const useLabContext = () => {
  const ctx = useContext(LabContext);
  if (!ctx) throw new Error('useLabContext must be used within LabProvider');
  return ctx;
};

export function LabProvider({ children }: { children: ReactNode }) {
  const [completedLabs, setCompletedLabs] = useState<number[]>([]);
  const [unlockedLabs, setUnlockedLabs] = useState<number[]>([1]);
  const [xp, setXp] = useState<number>(0);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedCompleted = localStorage.getItem("completedLabs");
      const storedUnlocked = localStorage.getItem("unlockedLabs");
      const storedXp = localStorage.getItem("xp");

      if (storedCompleted) {
        setCompletedLabs(JSON.parse(storedCompleted));
      }

      if (storedUnlocked) {
        setUnlockedLabs(JSON.parse(storedUnlocked));
      }

      if (storedXp) {
        setXp(JSON.parse(storedXp));
      }
    } catch (e) {
      console.error("Failed to load lab progress from localStorage", e);
    }
  }, []);

  // Save to localStorage when values change
  useEffect(() => {
    try {
      localStorage.setItem("completedLabs", JSON.stringify(completedLabs));
      localStorage.setItem("unlockedLabs", JSON.stringify(unlockedLabs));
      localStorage.setItem("xp", JSON.stringify(xp));
    } catch (e) {
      console.error("Failed to save lab progress to localStorage", e);
    }
  }, [completedLabs, unlockedLabs, xp]);

  const completeLab = (labId: number) => {
    setCompletedLabs((prev) => {
      if (prev.includes(labId)) return prev;
      return [...prev, labId];
    });
  };

  const unlockLab = (labId: number) => {
    setUnlockedLabs((prev) => {
      if (prev.includes(labId)) return prev;
      return [...prev, labId];
    });
  };

  const addXp = (amount: number) => {
    setXp((v) => v + amount);
  };

  const resetProgress = () => {
    setCompletedLabs([]);
    setUnlockedLabs([1]);
    setXp(0);

    try {
      localStorage.removeItem("completedLabs");
      localStorage.removeItem("unlockedLabs");
      localStorage.removeItem("xp");
    } catch (e) {
      console.error("Failed to clear localStorage", e);
    }
  };

  return (
    <LabContext.Provider value={{ completedLabs, unlockedLabs, xp, completeLab, unlockLab, addXp, resetProgress }}>
      {children}
    </LabContext.Provider>
  );
}
