import { motion } from "motion/react";
import { Trophy, Medal, Award, TrendingUp, Zap } from "lucide-react";
import { Avatar, AvatarFallback } from "../components/ui/avatar";

const topUsers = [
  { rank: 1, name: "Sarah Chen", level: "Expert", points: 45800, missions: 156, avatar: "SC", color: "#FFD700" },
  { rank: 2, name: "Alex Rodriguez", level: "Senior", points: 43200, missions: 142, avatar: "AR", color: "#C0C0C0" },
  { rank: 3, name: "Emma Wilson", level: "Senior", points: 41500, missions: 138, avatar: "EW", color: "#CD7F32" },
];

const otherUsers = [
  { rank: 4, name: "Michael Brown", level: "Senior", points: 38900, missions: 128, avatar: "MB" },
  { rank: 5, name: "Lisa Anderson", level: "Middle", points: 36700, missions: 119, avatar: "LA" },
  { rank: 6, name: "David Kim", level: "Middle", points: 34200, missions: 112, avatar: "DK" },
  { rank: 7, name: "Sophie Martin", level: "Middle", points: 32800, missions: 108, avatar: "SM" },
  { rank: 142, name: "John Doe (You)", level: "Junior", points: 12450, missions: 38, avatar: "JD", isCurrentUser: true },
];

export default function Leaderboard() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
          <Trophy className="w-10 h-10 text-[#FFD700]" />
          Global Leaderboard
        </h1>
        <p className="text-gray-400">Compete with hackers worldwide</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: "Your Rank", value: "#142", icon: TrendingUp, color: "#00F5FF", change: "↑ 12 this week" },
          { label: "Total XP", value: "12,450", icon: Zap, color: "#7B61FF", change: "+250 today" },
          { label: "Top 25%", value: "Yes", icon: Award, color: "#00FF9D", change: "Keep going!" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#1A2234] border border-[#7B61FF]/20 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: `${stat.color}20`,
                  boxShadow: `0 0 15px ${stat.color}30`,
                }}
              >
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <div>
                <div className="text-sm text-gray-400">{stat.label}</div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
              </div>
            </div>
            <div className="text-xs text-gray-500">{stat.change}</div>
          </motion.div>
        ))}
      </div>

      {/* Top 3 Users - Podium Style */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">Top Hackers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {topUsers.map((user, index) => (
            <motion.div
              key={user.rank}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className={`relative ${index === 0 ? "md:order-2" : index === 1 ? "md:order-1" : "md:order-3"}`}
            >
              <div
                className="bg-gradient-to-br from-[#1A2234] to-[#151B2E] border-2 rounded-2xl p-6 text-center"
                style={{
                  borderColor: user.color,
                  boxShadow: `0 0 30px ${user.color}40`,
                }}
              >
                {/* Rank Badge */}
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg"
                  style={{ backgroundColor: user.color }}
                >
                  <Medal className="w-6 h-6" />
                </div>

                {/* Avatar */}
                <div className="mt-4 mb-4">
                  <div
                    className="w-24 h-24 rounded-full mx-auto flex items-center justify-center text-2xl font-bold text-white shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${user.color}, ${user.color}80)`,
                    }}
                  >
                    {user.avatar}
                  </div>
                </div>

                {/* User Info */}
                <h3 className="text-xl font-bold text-white mb-2">{user.name}</h3>
                <div
                  className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4"
                  style={{
                    backgroundColor: `${user.color}20`,
                    color: user.color,
                  }}
                >
                  {user.level}
                </div>

                {/* Stats */}
                <div className="space-y-2 pt-4 border-t border-[#7B61FF]/20">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Points</span>
                    <span className="font-bold text-[#00F5FF]">{user.points.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Missions</span>
                    <span className="font-bold text-[#00FF9D]">{user.missions}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Other Users - Table Style */}
      <div className="bg-[#1A2234] border border-[#7B61FF]/20 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-[#7B61FF]/20">
          <h2 className="text-xl font-bold text-white">All Rankings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#7B61FF]/20 bg-[#151B2E]">
                <th className="text-left p-4 text-sm font-medium text-gray-400">Rank</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">User</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Level</th>
                <th className="text-right p-4 text-sm font-medium text-gray-400">Points</th>
                <th className="text-right p-4 text-sm font-medium text-gray-400">Missions</th>
              </tr>
            </thead>
            <tbody>
              {otherUsers.map((user, index) => (
                <motion.tr
                  key={user.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`border-b border-[#7B61FF]/10 transition-colors ${
                    user.isCurrentUser
                      ? "bg-[#00F5FF]/10 hover:bg-[#00F5FF]/15"
                      : "hover:bg-[#151B2E]"
                  }`}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-bold ${
                          user.isCurrentUser ? "text-[#00F5FF]" : "text-gray-400"
                        }`}
                      >
                        #{user.rank}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback
                          className="font-bold"
                          style={{
                            background: user.isCurrentUser
                              ? "linear-gradient(135deg, #00F5FF, #7B61FF)"
                              : "#2A3347",
                            color: "white",
                          }}
                        >
                          {user.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <span
                        className={`font-medium ${
                          user.isCurrentUser ? "text-[#00F5FF]" : "text-white"
                        }`}
                      >
                        {user.name}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.level === "Expert"
                          ? "bg-[#FFD700]/20 text-[#FFD700]"
                          : user.level === "Senior"
                          ? "bg-[#7B61FF]/20 text-[#7B61FF]"
                          : user.level === "Middle"
                          ? "bg-[#00F5FF]/20 text-[#00F5FF]"
                          : "bg-[#00FF9D]/20 text-[#00FF9D]"
                      }`}
                    >
                      {user.level}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <span className="font-bold text-[#00F5FF]">{user.points.toLocaleString()}</span>
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-gray-400">{user.missions}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
