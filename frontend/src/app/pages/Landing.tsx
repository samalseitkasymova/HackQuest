import { motion } from "motion/react";
import { Link } from "react-router";
import { Shield, Target, Trophy, Zap, Code, Lock, Terminal, Award } from "lucide-react";
import { Button } from "../components/ui/button";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        {/* Animated glow orbs */}
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-[#00F5FF] rounded-full opacity-20 blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-[#7B61FF] rounded-full opacity-20 blur-[120px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 border-b border-[#7B61FF]/20 bg-[#0B0F1A]/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-[#00F5FF]" />
            <span className="text-2xl font-bold bg-gradient-to-r from-[#00F5FF] to-[#7B61FF] bg-clip-text text-transparent">
              CyberGame
            </span>
          </div>
          <Link to="/login">
            <Button className="bg-[#00F5FF] hover:bg-[#00F5FF]/90 text-[#0B0F1A] shadow-[0_0_20px_rgba(0,245,255,0.3)]">
              Login
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-6 pt-20 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-[#00F5FF] via-[#7B61FF] to-[#00FF9D] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,245,255,0.5)]">
              CyberGame
            </span>
            <br />
            <span className="text-white">Master Cybersecurity</span>
            <br />
            <span className="text-white">Through Play</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Level up your hacking skills with real-world challenges, interactive missions, and competitive gameplay. 
            Learn security the fun way.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/register">
              <Button className="bg-gradient-to-r from-[#00F5FF] to-[#7B61FF] hover:opacity-90 text-white px-8 py-6 text-lg shadow-[0_0_30px_rgba(0,245,255,0.4)]">
                Start Learning
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="border-[#00F5FF] text-[#00F5FF] hover:bg-[#00F5FF]/10 px-8 py-6 text-lg"
            >
              Watch Demo
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 container mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Target,
              title: "Gamified Learning",
              description: "Level up as you learn with XP, achievements, and skill trees",
              color: "#00F5FF",
            },
            {
              icon: Terminal,
              title: "Real-world Simulations",
              description: "Practice in safe environments that mirror actual scenarios",
              color: "#7B61FF",
            },
            {
              icon: Trophy,
              title: "Leaderboard",
              description: "Compete globally and climb the ranks",
              color: "#00FF9D",
            },
            {
              icon: Lock,
              title: "CTF Challenges",
              description: "Test your skills with capture-the-flag missions",
              color: "#00F5FF",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="relative group"
            >
              <div className="bg-[#1A2234] border border-[#7B61FF]/20 rounded-2xl p-6 h-full hover:border-[#7B61FF]/50 transition-colors">
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                  style={{ 
                    backgroundColor: `${feature.color}20`,
                    boxShadow: `0 0 20px ${feature.color}40`
                  }}
                >
                  <feature.icon className="w-7 h-7" style={{ color: feature.color }} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
                
                {/* Glow effect on hover */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${feature.color}15, transparent 70%)`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 container mx-auto px-6 pb-32">
        <div className="bg-gradient-to-r from-[#1A2234] to-[#151B2E] border border-[#7B61FF]/20 rounded-3xl p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Active Students", value: "10K+", icon: Award },
              { label: "Challenges", value: "500+", icon: Code },
              { label: "XP Earned", value: "5M+", icon: Zap },
              { label: "Countries", value: "120+", icon: Trophy },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-[#00FF9D]" />
                <div className="text-4xl font-bold text-[#00F5FF] mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-6 pb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-[#00F5FF]/10 to-[#7B61FF]/10 border border-[#00F5FF]/30 rounded-3xl p-12 text-center"
        >
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of students mastering cybersecurity
          </p>
          <Link to="/login">
            <Button className="bg-gradient-to-r from-[#00F5FF] to-[#7B61FF] hover:opacity-90 text-white px-12 py-6 text-lg shadow-[0_0_40px_rgba(0,245,255,0.5)]">
              Get Started Now
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#7B61FF]/20 bg-[#0B0F1A]/80 backdrop-blur-sm py-8">
        <div className="container mx-auto px-6 text-center text-gray-400">
          <p>© 2026 CyberGame. Master cybersecurity through gamification.</p>
        </div>
      </footer>
    </div>
  );
}
