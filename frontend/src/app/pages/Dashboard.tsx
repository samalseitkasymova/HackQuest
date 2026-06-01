import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Award, Target, Trophy, TrendingUp, Shield, Zap, Lock, Code } from "lucide-react";
import { Progress } from "../components/ui/progress";
import { api, getUser, saveUser } from "../services/api";

export default function Dashboard() {
  const [user, setUser] = useState(getUser());
  const [rank, setRank] = useState<number | null>(null);

  useEffect(() => {
    async function loadUserData() {
      const saved = getUser();
      if (!saved) return;

      try {
        const freshUser = await api.getUserById(saved.id);
        saveUser(freshUser);
        setUser(freshUser);

        const leaderboard = await api.leaderboard();
        const index = leaderboard.findIndex((item: any) => item.userId === saved.id || item.id === saved.id);
        setRank(index >= 0 ? index + 1 : null);
      } catch (error) {
        console.log("User data loading error:", error);
      }
    }

    loadUserData();
  }, []);

  if (!user) {
    return <div className="p-8 text-white">Сначала войдите в аккаунт</div>;
  }

  const initials = user.username.slice(0, 2).toUpperCase();
  const nextLevel = user.level + 1;
  const nextLevelPoints = user.level * 100;
  const progressValue = Math.min((user.points / nextLevelPoints) * 100, 100);

  const achievements = [
    { name: "White Hat", icon: Shield, color: "#00F5FF", unlocked: user.points >= 0 },
    { name: "Phishing Hunter", icon: Target, color: "#7B61FF", unlocked: user.points >= 100 },
    { name: "Crypto Master", icon: Lock, color: "#00FF9D", unlocked: user.points >= 300 },
    { name: "SQL Slayer", icon: Code, color: "#00F5FF", unlocked: user.points >= 500 },
    { name: "Bug Finder", icon: Zap, color: "#7B61FF", unlocked: user.points >= 800 },
  ];

  const unlockedAchievements = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">
          С возвращением, {user.username}! 👋
        </h1>
        <p className="text-gray-400">Готовы прокачать свои навыки кибербезопасности?</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#1A2234] to-[#151B2E] border border-[#7B61FF]/30 rounded-2xl p-8"
      >
        <div className="flex items-center gap-6 mb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00F5FF] to-[#7B61FF] flex items-center justify-center shadow-[0_0_30px_rgba(0,245,255,0.3)]">
            <span className="text-3xl font-bold text-white">{initials}</span>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">{user.username}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-3 py-1 rounded-full bg-[#7B61FF]/20 text-[#7B61FF] text-sm font-medium border border-[#7B61FF]/30">
                {user.role === "ADMIN" ? "Администратор" : "Игрок"}
              </span>
              <span className="text-gray-400 text-sm">Уровень {user.level}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Прогресс до {nextLevel}-го уровня</span>
            <span className="text-[#00F5FF] font-medium">
              {user.points} / {nextLevelPoints} XP
            </span>
          </div>

          <div className="relative">
            <Progress value={progressValue} className="h-3 bg-[#151B2E]" />
            <motion.div
              className="absolute inset-0 h-3 rounded-full bg-gradient-to-r from-[#00F5FF] to-[#7B61FF]"
              initial={{ width: 0 }}
              animate={{ width: `${progressValue}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{ boxShadow: "0 0 20px rgba(0,245,255,0.5)" }}
            />
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Общее количество очков", value: user.points, icon: TrendingUp, color: "#00F5FF", change: "+0" },
          { label: "Выполненные миссии", value: 0, icon: Target, color: "#7B61FF", change: "+0" },
          { label: "Достижения", value: unlockedAchievements, icon: Award, color: "#00FF9D", change: `+${unlockedAchievements}` },
          { label: "Позиция в рейтинге", value: rank ? `#${rank}` : "—", icon: Trophy, color: "#00F5FF", change: "—" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#1A2234] border border-[#7B61FF]/20 rounded-xl p-6 hover:border-[#7B61FF]/40 transition-colors group"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: `${stat.color}20`,
                  boxShadow: `0 0 15px ${stat.color}30`,
                }}
              >
                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
              </div>

              <span
                className="text-xs font-medium px-2 py-1 rounded-full"
                style={{
                  backgroundColor: `${stat.color}20`,
                  color: stat.color,
                }}
              >
                {stat.change}
              </span>
            </div>

            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Recent Achievements</h2>
          <button className="text-[#00F5FF] hover:text-[#00F5FF]/80 text-sm font-medium">
            View All →
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className={`bg-[#1A2234] border rounded-xl p-6 flex flex-col items-center text-center relative overflow-hidden ${
                achievement.unlocked
                  ? "border-[#7B61FF]/30 hover:border-[#7B61FF]/50"
                  : "border-[#7B61FF]/10 opacity-50"
              }`}
            >
              {!achievement.unlocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#0B0F1A]/70 backdrop-blur-sm">
                  <Lock className="w-8 h-8 text-gray-500" />
                </div>
              )}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-3"
                style={{
                  backgroundColor: `${achievement.color}20`,
                  boxShadow: achievement.unlocked ? `0 0 25px ${achievement.color}40` : "none",
                }}
              >
                <achievement.icon
                  className="w-8 h-8"
                  style={{ color: achievement.unlocked ? achievement.color : "#666" }}
                />
              </div>
              <span className="text-sm font-medium text-white">{achievement.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-br from-[#00F5FF]/10 to-[#7B61FF]/10 border border-[#00F5FF]/30 rounded-2xl p-6 hover:border-[#00F5FF]/50 transition-colors cursor-pointer group"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#00F5FF] to-[#7B61FF] flex items-center justify-center shadow-[0_0_20px_rgba(0,245,255,0.3)] group-hover:shadow-[0_0_30px_rgba(0,245,255,0.5)] transition-shadow">
              <Target className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Continue Learning</h3>
              <p className="text-gray-400 text-sm">Resume your last mission</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-br from-[#00FF9D]/10 to-[#7B61FF]/10 border border-[#00FF9D]/30 rounded-2xl p-6 hover:border-[#00FF9D]/50 transition-colors cursor-pointer group"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#00FF9D] to-[#7B61FF] flex items-center justify-center shadow-[0_0_20px_rgba(0,255,157,0.3)] group-hover:shadow-[0_0_30px_rgba(0,255,157,0.5)] transition-shadow">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Daily Challenge</h3>
              <p className="text-gray-400 text-sm">Earn bonus XP today</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
