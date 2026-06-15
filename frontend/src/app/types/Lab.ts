export interface Lab {
  id: number;
  title: string;
  category: string;
  description: string;
  difficulty: "Новичок" | "Средний" | "Сложный" | "Эксперт";
  xpReward: number;
  duration: number;
  completed: boolean;
  unlocked: boolean;
  briefing: string;
  hint: string;
  vulnerableCode: string;
  correctPayload: string;
  targetInfo?: string;
}