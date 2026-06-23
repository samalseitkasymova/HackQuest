import { Outlet, Link, useLocation } from "react-router";
import { Home, FlaskConical, Target, Trophy, User, Settings, Shield, LogOut, Terminal } from "lucide-react";
import { motion } from "motion/react";
import { getUser } from "../services/api";

const navigation = [
  { name: "Home", path: "/app", icon: Home },
  { name: "Testing", path: "/app/testing", icon: FlaskConical },
  { name: "Lab", path: "/app/lab", icon: Terminal },
  { name: "Missions", path: "/app/missions", icon: Target },
  { name: "Leaderboard", path: "/app/leaderboard", icon: Trophy },
  { name: "Profile", path: "/app/profile", icon: User },
];

export default function DashboardLayout() {
  const location = useLocation();
  const user = getUser();

  return (
    <div className="min-h-screen bg-[#0B0F1A] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1A2234] border-r border-[#7B61FF]/20 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-[#7B61FF]/20">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-[#00F5FF]" />
            <span className="text-xl font-bold bg-gradient-to-r from-[#00F5FF] to-[#7B61FF] bg-clip-text text-transparent">
              HackQuest
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <motion.div
                  whileHover={{ x: 5 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative ${
                    isActive
                      ? "bg-gradient-to-r from-[#00F5FF]/20 to-[#7B61FF]/20 text-[#00F5FF] shadow-[0_0_20px_rgba(0,245,255,0.2)]"
                      : "text-gray-400 hover:text-white hover:bg-[#151B2E]"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#00F5FF] rounded-r-full"
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}

          {/* Admin Link (separated) */}
          {user?.role === "ADMIN" && (
  <div className="pt-4 mt-4 border-t border-[#7B61FF]/20">
    <Link to="/app/admin">
      <motion.div
        whileHover={{ x: 5 }}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
          location.pathname === "/app/admin"
            ? "bg-gradient-to-r from-[#00F5FF]/20 to-[#7B61FF]/20 text-[#00F5FF]"
            : "text-gray-400 hover:text-white hover:bg-[#151B2E]"
        }`}
      >
        <Settings className="w-5 h-5" />
        <span className="font-medium">Административная панель</span>
      </motion.div>
    </Link>
  </div>
)}
</nav>

        {/* User section */}
        <div className="p-4 border-t border-[#7B61FF]/20">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#151B2E]">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00F5FF] to-[#7B61FF] flex items-center justify-center text-white font-bold">
  {user?.username?.slice(0, 2).toUpperCase()}
</div>

<div className="flex-1">
  <div className="text-sm font-medium text-white">
    {user?.username}
  </div>

  <div className="text-xs text-gray-400">
    {user?.role === "ADMIN" ? "Администратор" : "Игрок"}
  </div>
</div>
            <button
  onClick={() => {
    localStorage.removeItem("hq_user");
    window.location.href = "/login";
  }}
  className="text-gray-400 hover:text-[#00F5FF] transition-colors"
>
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}