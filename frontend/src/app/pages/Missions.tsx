import { motion } from "motion/react";
import { Lock, Unlock, Trophy, Clock, Zap } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

const missions = [
  {
    id: 1,
    title: "Protect the Account",
    description: "Learn password security best practices and implement multi-factor authentication",
    difficulty: "Beginner",
    reward: 500,
    duration: "15 min",
    unlocked: true,
    completed: true,
    category: "Authentication",
  },
  {
    id: 2,
    title: "Phishing Detection",
    description: "Identify and analyze phishing emails to protect against social engineering",
    difficulty: "Beginner",
    reward: 750,
    duration: "20 min",
    unlocked: true,
    completed: true,
    category: "Social Engineering",
  },
  {
    id: 3,
    title: "Web Vulnerability Hunt",
    description: "Discover and exploit common web vulnerabilities in a controlled environment",
    difficulty: "Intermediate",
    reward: 1200,
    duration: "45 min",
    unlocked: true,
    completed: false,
    category: "Web Security",
  },
  {
    id: 4,
    title: "SQL Injection Master",
    description: "Master SQL injection techniques to understand database security",
    difficulty: "Intermediate",
    reward: 1500,
    duration: "60 min",
    unlocked: true,
    completed: false,
    category: "Database",
  },
  {
    id: 5,
    title: "Cryptography Challenge",
    description: "Break encryption codes and understand cryptographic algorithms",
    difficulty: "Advanced",
    reward: 2000,
    duration: "90 min",
    unlocked: true,
    completed: false,
    category: "Cryptography",
  },
  {
    id: 6,
    title: "Network Penetration",
    description: "Conduct network reconnaissance and penetration testing",
    difficulty: "Advanced",
    reward: 2500,
    duration: "120 min",
    unlocked: false,
    completed: false,
    category: "Network Security",
  },
  {
    id: 7,
    title: "Zero-Day Discovery",
    description: "Find and exploit unknown vulnerabilities in complex systems",
    difficulty: "Expert",
    reward: 5000,
    duration: "180 min",
    unlocked: false,
    completed: false,
    category: "Advanced",
  },
  {
    id: 8,
    title: "CTF Championship",
    description: "Compete in a full capture-the-flag competition with multiple challenges",
    difficulty: "Expert",
    reward: 10000,
    duration: "240 min",
    unlocked: false,
    completed: false,
    category: "CTF",
  },
];

const difficultyColors = {
  Beginner: { bg: "#00FF9D", text: "#00FF9D" },
  Intermediate: { bg: "#00F5FF", text: "#00F5FF" },
  Advanced: { bg: "#7B61FF", text: "#7B61FF" },
  Expert: { bg: "#FF3366", text: "#FF3366" },
};

export default function Missions() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
          <Trophy className="w-10 h-10 text-[#00F5FF]" />
          Missions
        </h1>
        <p className="text-gray-400">Complete missions to earn XP and unlock new challenges</p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#00FF9D]/20 to-[#00FF9D]/5 border border-[#00FF9D]/30 rounded-xl p-6"
        >
          <div className="text-sm text-gray-400 mb-1">Completed</div>
          <div className="text-3xl font-bold text-[#00FF9D]">2 / 8</div>
          <div className="text-sm text-gray-400 mt-2">Keep going!</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-[#00F5FF]/20 to-[#00F5FF]/5 border border-[#00F5FF]/30 rounded-xl p-6"
        >
          <div className="text-sm text-gray-400 mb-1">Total XP Earned</div>
          <div className="text-3xl font-bold text-[#00F5FF]">1,250</div>
          <div className="text-sm text-gray-400 mt-2">From missions</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-[#7B61FF]/20 to-[#7B61FF]/5 border border-[#7B61FF]/30 rounded-xl p-6"
        >
          <div className="text-sm text-gray-400 mb-1">Unlocked</div>
          <div className="text-3xl font-bold text-[#7B61FF]">5 / 8</div>
          <div className="text-sm text-gray-400 mt-2">More to explore</div>
        </motion.div>
      </div>

      {/* Missions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {missions.map((mission, index) => {
          const diffColor = difficultyColors[mission.difficulty as keyof typeof difficultyColors];
          
          return (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`relative bg-[#1A2234] border rounded-2xl p-6 transition-all ${
                mission.unlocked
                  ? "border-[#7B61FF]/30 hover:border-[#7B61FF]/50 hover:shadow-[0_0_30px_rgba(123,97,255,0.2)]"
                  : "border-[#7B61FF]/10 opacity-60"
              }`}
            >
              {/* Lock Overlay for Locked Missions */}
              {!mission.unlocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#0B0F1A]/80 backdrop-blur-sm rounded-2xl z-10">
                  <div className="text-center">
                    <Lock className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-400 text-sm">Complete previous missions to unlock</p>
                  </div>
                </div>
              )}

              {/* Completed Badge */}
              {mission.completed && (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#00FF9D]/20 text-[#00FF9D] text-xs font-medium border border-[#00FF9D]/30 flex items-center gap-1">
                  <Trophy className="w-3 h-3" />
                  Completed
                </div>
              )}

              {/* Mission Content */}
              <div className="mb-4">
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: `${diffColor.bg}20`,
                      boxShadow: `0 0 20px ${diffColor.bg}30`,
                    }}
                  >
                    {mission.unlocked ? (
                      <Unlock className="w-6 h-6" style={{ color: diffColor.text }} />
                    ) : (
                      <Lock className="w-6 h-6 text-gray-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">{mission.title}</h3>
                    <Badge
                      variant="outline"
                      className="text-xs"
                      style={{
                        borderColor: `${diffColor.bg}40`,
                        color: diffColor.text,
                      }}
                    >
                      {mission.category}
                    </Badge>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">{mission.description}</p>
              </div>

              {/* Mission Details */}
              <div className="flex items-center gap-4 mb-4 text-sm">
                <div className="flex items-center gap-1 text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{mission.duration}</span>
                </div>
                <div
                  className="flex items-center gap-1 font-medium"
                  style={{ color: diffColor.text }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: diffColor.bg }}
                  />
                  <span>{mission.difficulty}</span>
                </div>
              </div>

              {/* Reward & Action */}
              <div className="flex items-center justify-between pt-4 border-t border-[#7B61FF]/20">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#00F5FF]" />
                  <span className="text-[#00F5FF] font-bold">+{mission.reward} XP</span>
                </div>
                {mission.unlocked && !mission.completed && (
                  <Button
                    className="bg-gradient-to-r from-[#00F5FF] to-[#7B61FF] hover:opacity-90 text-white"
                  >
                    Start Mission
                  </Button>
                )}
                {mission.completed && (
                  <Button
                    variant="outline"
                    className="border-[#00FF9D]/30 text-[#00FF9D] hover:bg-[#00FF9D]/10"
                  >
                    Replay
                  </Button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
