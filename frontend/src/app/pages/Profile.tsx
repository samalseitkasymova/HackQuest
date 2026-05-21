import { motion } from "motion/react";
import { User, Mail, Calendar, MapPin, Award, Trophy, Target } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function Profile() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Profile</h1>
        <p className="text-gray-400">Manage your account and view your progress</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-1"
        >
          <Card className="bg-[#1A2234] border-[#7B61FF]/20">
            <CardContent className="p-6 text-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#00F5FF] to-[#7B61FF] flex items-center justify-center text-4xl font-bold text-white mx-auto mb-4 shadow-[0_0_30px_rgba(0,245,255,0.3)]">
                JD
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">John Doe</h2>
              <div className="px-4 py-2 rounded-full bg-[#7B61FF]/20 text-[#7B61FF] text-sm font-medium inline-block mb-6 border border-[#7B61FF]/30">
                Junior Hacker - Level 12
              </div>

              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3 text-gray-400">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">john.doe@email.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Joined January 2026</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">United States</span>
                </div>
              </div>

              <Button className="w-full mt-6 bg-gradient-to-r from-[#00F5FF] to-[#7B61FF] hover:opacity-90 text-white">
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats & Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Total XP", value: "12,450", icon: Trophy, color: "#00F5FF" },
              { label: "Missions", value: "38", icon: Target, color: "#7B61FF" },
              { label: "Achievements", value: "15", icon: Award, color: "#00FF9D" },
            ].map((stat, index) => (
              <Card key={index} className="bg-[#1A2234] border-[#7B61FF]/20">
                <CardContent className="p-4 text-center">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3"
                    style={{
                      backgroundColor: `${stat.color}20`,
                      boxShadow: `0 0 15px ${stat.color}30`,
                    }}
                  >
                    <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Activity */}
          <Card className="bg-[#1A2234] border-[#7B61FF]/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { action: "Completed Phishing Detection", time: "2 days ago", color: "#00FF9D" },
                  { action: "Started Web Vulnerability Hunt", time: "5 days ago", color: "#00F5FF" },
                  { action: "Achieved White Hat badge", time: "1 week ago", color: "#7B61FF" },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-[#151B2E] rounded-xl border border-[#7B61FF]/10"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: activity.color }}
                      />
                      <span className="text-white">{activity.action}</span>
                    </div>
                    <span className="text-gray-500 text-sm">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
