import React from 'react';
import { Card, CardContent } from "../ui/card";
import { useAchievementContext } from "../../context/AchievementContext";

export default function AchievementsSection() {
  const { achievements } = useAchievementContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {achievements.map(a => (
        <div key={a.id} className={`p-4 rounded-xl bg-[#151B2E] ${a.unlocked ? '' : 'opacity-50'}`}>
          <div className="flex items-center gap-3">
            <div className="text-3xl">{a.icon}</div>
            <div>
              <div className={`text-white font-bold`}>{a.title}</div>
              <div className="text-sm text-gray-400">{a.description}</div>
            </div>
            <div className="ml-auto text-sm text-[#00F5FF] font-bold">+{a.xpReward} XP</div>
          </div>
        </div>
      ))}
    </div>
  );
}
