import { motion } from "motion/react";
import { Trophy, Medal, Award, TrendingUp, Zap, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useLabContext } from "../context/LabContext";
import { useAchievementContext } from "../context/AchievementContext";

interface Player {
  id: number;
  username: string;
  xp: number;
  completedLabs: number;
  achievements: number;
}

export default function Leaderboard() {
  const { xp, completedLabs } = useLabContext();
  const { achievements } = useAchievementContext();

  const completedCount = completedLabs.length;
  const unlockedAchievements = achievements.filter((a) => a.unlocked).length;

  // Create players array with current player data
  let players: Player[] = [
    {
      id: 1,
      username: "You",
      xp: xp,
      completedLabs: completedCount,
      achievements: unlockedAchievements,
    },
    {
      id: 2,
      username: "CyberHunter",
      xp: 3200,
      completedLabs: 4,
      achievements: 5,
    },
    {
      id: 3,
      username: "ShadowRoot",
      xp: 2500,
      completedLabs: 3,
      achievements: 4,
    },
    {
      id: 4,
      username: "PacketSniffer",
      xp: 1800,
      completedLabs: 2,
      achievements: 3,
    },
    {
      id: 5,
      username: "ZeroDay",
      xp: 900,
      completedLabs: 1,
      achievements: 1,
    },
  ];

  // Sort by XP descending
  players = players.sort((a, b) => b.xp - a.xp);

  // Get top 3
  const topThree = players.slice(0, 3);

  // Find current player rank
  const yourRank = players.findIndex((p) => p.username === "You") + 1;

  // Medal colors for top 3
  const medalColors = {
    1: "#FFD700", // Gold
    2: "#C0C0C0", // Silver
    3: "#CD7F32", // Bronze
  };

  const getMedalEmoji = (position: number) => {
    const emojis = { 1: "🥇", 2: "🥈", 3: "🥉" };
    return emojis[position as keyof typeof emojis] || "";
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
          <Trophy className="w-10 h-10 text-[#FFD700]" />
          Global Leaderboard
        </h1>
        <p className="text-gray-400">Compete with cybersecurity experts worldwide</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            label: "Total Players",
            value: players.length.toString(),
            icon: Trophy,
            color: "#FFD700",
          },
          {
            label: "Top Score",
            value: `${players[0].xp.toLocaleString()} XP`,
            icon: Zap,
            color: "#00F5FF",
          },
          {
            label: "Your Rank",
            value: `#${yourRank}`,
            icon: Award,
            color: "#00FF9D",
          },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-[#1A2234] border-[#7B61FF]/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: `${stat.color}20`,
                      boxShadow: `0 0 15px ${stat.color}30`,
                    }}
                  >
                    <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Top 3 Podium */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">🏆 Top 3 Hackers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topThree.map((player, index) => {
            const position = index + 1;
            const color =
              medalColors[position as keyof typeof medalColors];
            return (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                className={index === 0 ? "md:order-2" : index === 1 ? "md:order-1" : "md:order-3"}
              >
                <Card
                  className="bg-gradient-to-br from-[#1A2234] to-[#151B2E]"
                  style={{
                    borderColor: `${color}40`,
                    boxShadow: `0 0 30px ${color}30`,
                  }}
                >
                  <CardContent className="p-6">
                    <div className="text-center">
                      {/* Medal */}
                      <div className="text-5xl mb-4">
                        {getMedalEmoji(position)}
                      </div>

                      {/* Username */}
                      <h3 className="text-xl font-bold text-white mb-2">
                        {player.username}
                      </h3>

                      {/* Rank Badge */}
                      <div
                        className="inline-block px-4 py-2 rounded-full font-bold text-white mb-4"
                        style={{ backgroundColor: color }}
                      >
                        #{position}
                      </div>

                      {/* Stats */}
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">XP:</span>
                          <span className="text-[#00F5FF] font-bold">
                            {player.xp.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Labs:</span>
                          <span className="text-[#00FF9D] font-bold">
                            {player.completedLabs}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Achievements:</span>
                          <span className="text-[#7B61FF] font-bold">
                            {player.achievements}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Full Leaderboard Table */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">📊 Full Rankings</h2>
        <Card className="bg-[#1A2234] border-[#7B61FF]/20 overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#7B61FF]/20 bg-[#151B2E]">
                    <th className="px-6 py-4 text-sm font-semibold text-[#00F5FF]">
                      Rank
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-[#00F5FF]">
                      Username
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-[#00F5FF]">
                      XP
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-[#00F5FF]">
                      Completed Labs
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-[#00F5FF]">
                      Achievements
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {players.map((player, index) => {
                    const rank = index + 1;
                    const isCurrentUser = player.username === "You";
                    return (
                      <motion.tr
                        key={player.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`border-b border-[#7B61FF]/10 hover:bg-[#0B0F1A]/50 transition-colors ${
                          isCurrentUser ? "bg-[#00F5FF]/5" : ""
                        }`}
                      >
                        <td
                          className={`px-6 py-4 font-bold ${
                            rank <= 3
                              ? "text-lg"
                              : "text-gray-300"
                          }`}
                          style={{
                            color:
                              rank === 1
                                ? "#FFD700"
                                : rank === 2
                                ? "#C0C0C0"
                                : rank === 3
                                ? "#CD7F32"
                                : "inherit",
                          }}
                        >
                          #{rank}
                        </td>
                        <td
                          className={`px-6 py-4 font-medium ${
                            isCurrentUser
                              ? "text-[#00F5FF] font-bold"
                              : "text-white"
                          }`}
                        >
                          {player.username}
                          {isCurrentUser && (
                            <span className="ml-2 text-xs bg-[#00F5FF]/20 text-[#00F5FF] px-2 py-1 rounded">
                              YOU
                            </span>
                          )}
                        </td>
                        <td
                          className={`px-6 py-4 font-bold ${
                            isCurrentUser ? "text-[#00F5FF]" : "text-[#7B61FF]"
                          }`}
                        >
                          {player.xp.toLocaleString()}
                        </td>
                        <td
                          className={`px-6 py-4 font-bold ${
                            isCurrentUser ? "text-[#00F5FF]" : "text-[#00FF9D]"
                          }`}
                        >
                          {player.completedLabs}
                        </td>
                        <td
                          className={`px-6 py-4 font-bold ${
                            isCurrentUser ? "text-[#00F5FF]" : "text-[#7B61FF]"
                          }`}
                        >
                          {player.achievements}
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* API Ready Notice */}
      <div className="bg-[#1A2234] border border-[#7B61FF]/20 rounded-lg p-4 text-sm text-gray-400">
        <code>
          {/* TODO: GET /api/leaderboard */}
          🔗 Ready for Backend Integration: GET /api/leaderboard
        </code>
      </div>
    </div>
  );
}

