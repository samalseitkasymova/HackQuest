import { motion } from "motion/react";
import { Users, BookOpen, Target, TrendingUp, Activity, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const userActivityData = [
  { day: "Mon", users: 320 },
  { day: "Tue", users: 450 },
  { day: "Wed", users: 380 },
  { day: "Thu", users: 520 },
  { day: "Fri", users: 490 },
  { day: "Sat", users: 280 },
  { day: "Sun", users: 210 },
];

const performanceData = [
  { category: "Web Security", avgScore: 78 },
  { category: "Cryptography", avgScore: 65 },
  { category: "Network", avgScore: 72 },
  { category: "Social Eng.", avgScore: 85 },
  { category: "Database", avgScore: 68 },
];

const recentActivities = [
  { user: "Sarah Chen", action: "Completed SQL Injection Master", time: "2 mins ago", type: "mission" },
  { user: "Alex Rodriguez", action: "Achieved Expert level", time: "15 mins ago", type: "achievement" },
  { user: "Emma Wilson", action: "Started Network Penetration", time: "28 mins ago", type: "mission" },
  { user: "Michael Brown", action: "Scored 95% on Web Vulnerabilities", time: "1 hour ago", type: "test" },
  { user: "Lisa Anderson", action: "Unlocked Crypto Master badge", time: "2 hours ago", type: "achievement" },
];

export default function Admin() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-gray-400">Manage platform and monitor user activity</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Users", value: "10,243", icon: Users, color: "#00F5FF", change: "+12%" },
          { label: "Active Tests", value: "89", icon: BookOpen, color: "#7B61FF", change: "+5%" },
          { label: "Total Missions", value: "156", icon: Target, color: "#00FF9D", change: "+8" },
          { label: "Avg. Performance", value: "73%", icon: TrendingUp, color: "#00F5FF", change: "+3%" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-[#1A2234] border-[#7B61FF]/20">
              <CardContent className="p-6">
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
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="analytics" className="space-y-6">
        <TabsList className="bg-[#1A2234] border border-[#7B61FF]/20">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="activity">Activity Logs</TabsTrigger>
        </TabsList>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Activity Chart */}
            <Card className="bg-[#1A2234] border-[#7B61FF]/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[#00F5FF]" />
                  Weekly User Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={userActivityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#7B61FF20" />
                    <XAxis dataKey="day" stroke="#8892A6" />
                    <YAxis stroke="#8892A6" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1A2234",
                        border: "1px solid #7B61FF40",
                        borderRadius: "8px",
                        color: "#E8EAED",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="users"
                      stroke="#00F5FF"
                      strokeWidth={3}
                      dot={{ fill: "#00F5FF", r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Performance Chart */}
            <Card className="bg-[#1A2234] border-[#7B61FF]/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#7B61FF]" />
                  Category Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#7B61FF20" />
                    <XAxis dataKey="category" stroke="#8892A6" fontSize={12} />
                    <YAxis stroke="#8892A6" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1A2234",
                        border: "1px solid #7B61FF40",
                        borderRadius: "8px",
                        color: "#E8EAED",
                      }}
                    />
                    <Bar dataKey="avgScore" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7B61FF" />
                        <stop offset="100%" stopColor="#00F5FF" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users">
          <Card className="bg-[#1A2234] border-[#7B61FF]/20">
            <CardHeader>
              <CardTitle className="text-white">User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-400 text-center py-12">
                User management interface would be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-[#1A2234] border-[#7B61FF]/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#00F5FF]" />
                  Manage Tests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <button className="w-full py-3 bg-gradient-to-r from-[#00F5FF]/20 to-[#7B61FF]/20 hover:from-[#00F5FF]/30 hover:to-[#7B61FF]/30 border border-[#00F5FF]/30 rounded-xl text-white font-medium transition-all">
                    + Create New Test
                  </button>
                  <div className="text-gray-400 text-sm text-center py-8">
                    Test library and editor would be displayed here
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1A2234] border-[#7B61FF]/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#00FF9D]" />
                  Manage Missions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <button className="w-full py-3 bg-gradient-to-r from-[#00FF9D]/20 to-[#7B61FF]/20 hover:from-[#00FF9D]/30 hover:to-[#7B61FF]/30 border border-[#00FF9D]/30 rounded-xl text-white font-medium transition-all">
                    + Create New Mission
                  </button>
                  <div className="text-gray-400 text-sm text-center py-8">
                    Mission library and editor would be displayed here
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Activity Logs Tab */}
        <TabsContent value="activity">
          <Card className="bg-[#1A2234] border-[#7B61FF]/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#00F5FF]" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 bg-[#151B2E] rounded-xl border border-[#7B61FF]/10 hover:border-[#7B61FF]/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00F5FF] to-[#7B61FF] flex items-center justify-center text-white font-bold text-sm">
                        {activity.user.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <div className="text-white font-medium">{activity.user}</div>
                        <div className="text-gray-400 text-sm">{activity.action}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          activity.type === "mission"
                            ? "bg-[#00F5FF]/20 text-[#00F5FF]"
                            : activity.type === "achievement"
                            ? "bg-[#00FF9D]/20 text-[#00FF9D]"
                            : "bg-[#7B61FF]/20 text-[#7B61FF]"
                        }`}
                      >
                        {activity.type}
                      </span>
                      <span className="text-gray-500 text-sm">{activity.time}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
