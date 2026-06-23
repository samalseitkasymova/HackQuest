import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { motion } from "motion/react";
import { Clock, Lightbulb, AlertCircle, Terminal, Play, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { labs } from "../services/labService";
import { useLabContext } from "../context/LabContext";
import { useAchievementContext } from "../context/AchievementContext";

export default function LabDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const lab = labs.find((l) => l.id === Number(id));
  const nextLab = labs.find((l) => l.id === Number(id) + 1);
  
  const [code, setCode] = useState("");
  const [attempts, setAttempts] = useState(3);
  const [showHint, setShowHint] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [completed, setCompleted] = useState(false);
  const { completedLabs, unlockedLabs, completeLab, unlockLab, addXp } = useLabContext();
  const { unlockAchievement } = useAchievementContext();


  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };
  useEffect(() => {

  if (lab?.duration) {

    setTimeLeft(lab.duration * 60);

  }

}, [lab]);

const handleRunCode = () => {
  if (!lab || !code.trim()) return;

  const isCorrect = code.trim() === lab.correctPayload.trim();

  if (isCorrect) {
    // Success
    setOutput(prev => [
      ...prev,
      "> " + code,
      "",
      "Authentication successful",
      "Access granted",
      `FLAG{success}`,
      `+${lab.xpReward} XP`,
      "",
      "🏆 Achievement unlocked",
      `${lab.title} Master`
    ]);
    // update global progress only if not already completed
    if (!completedLabs.includes(lab.id)) {
      completeLab(lab.id);
      addXp(lab.xpReward);
      unlockLab(lab.id + 1);
      // unlock related achievements
      switch (lab.id) {
        case 1:
          unlockAchievement(1); // First Blood
          unlockAchievement(2); // SQL Injection Master
          break;
        case 2:
          unlockAchievement(3); // XSS Master
          break;
        case 3:
          unlockAchievement(4); // Brute Force Expert
          break;
        case 4:
          unlockAchievement(5); // Command Injection Specialist
          break;
        case 5:
          unlockAchievement(6); // JWT Hacker
          break;
      }
    }
    setCompleted(true);
  } else {
    // Incorrect
    const newAttempts = Math.max(attempts - 1, 0);
    setAttempts(newAttempts);

    setOutput(prev => [
      ...prev,
      "> " + code,
      "",
      "Access denied",
      "Incorrect payload"
    ]);

    if (newAttempts === 0) {
      setOutput(prev => [
        ...prev,
        "",
        "Mission failed",
        "No attempts remaining"
      ]);
    } else {
      setOutput(prev => [
        ...prev,
        `Attempts left: ${newAttempts}`
      ]);
    }
  }
};
  return (
    <div className="p-8 h-screen flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
  {lab?.title || "SQL Injection Lab"}
</h1>
            <p className="text-gray-400">
  {lab?.description}
</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#1A2234] border border-[#FF3366]/30 rounded-xl">
              <AlertCircle className="w-5 h-5 text-[#FF3366]" />
              <span className="text-[#FF3366] font-medium">Attempts: {attempts}/3</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#1A2234] border border-[#7B61FF]/30 rounded-xl">
              <Clock className="w-5 h-5 text-[#00F5FF]" />
              <span className="text-[#00F5FF] font-mono font-bold">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Split View */}
      <div className="flex-1 grid grid-cols-2 gap-6 min-h-0">
        {/* Left Panel - Task Description */}
        <div className="flex flex-col min-h-0">
          <div className="bg-[#1A2234] border border-[#7B61FF]/30 rounded-2xl p-6 flex-1 flex flex-col overflow-hidden">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-[#00F5FF]" />
              Mission Briefing
            </h2>
            
            <div className="flex-1 overflow-auto space-y-4 text-gray-300">
              <div>
                <h3 className="text-[#00F5FF] font-semibold mb-2">Objective:</h3>
                <p>
                  {lab?.briefing}
                </p>
              </div>

              <div>
                <h3 className="text-[#00FF9D] font-semibold mb-2">Target Information:</h3>
                <div className="bg-[#151B2E] rounded-lg p-4 font-mono text-sm">
                  <div>URL: https://vulnerable-app.HackQuest.io/login</div>
                  <div>Database: MySQL 5.7</div>
                  <div>Backend: PHP 7.4</div>
                </div>
              </div>

              <div>
                <h3 className="text-[#7B61FF] font-semibold mb-2">Vulnerable Code:</h3>
                <div className="bg-[#0B0F1A] rounded-lg p-4 font-mono text-sm">
                  <pre className="text-gray-300">
{lab?.vulnerableCode}

                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">Requirements:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Inject SQL to bypass authentication</li>
                  <li>Login as admin without knowing the password</li>
                  <li>Complete within 3 attempts</li>
                </ul>
              </div>
            </div>

            {/* Hint Section */}
            <div className="mt-4 pt-4 border-t border-[#7B61FF]/20">
              {!showHint ? (
                <Button
                  variant="outline"
                  className="w-full border-[#FFA500]/30 text-[#FFA500] hover:bg-[#FFA500]/10"
                  onClick={() => setShowHint(true)}
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Show Hint (-100 XP penalty)
                </Button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#FFA500]/10 border border-[#FFA500]/30 rounded-lg p-4"
                >
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-5 h-5 text-[#FFA500] flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-300">
                      <strong className="text-[#FFA500]">Hint:</strong>
                      {lab?.hint}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Code Editor & Output */}
        <div className="flex flex-col gap-4 min-h-0">
          {/* Code Input */}
          <div className="bg-[#1A2234] border border-[#7B61FF]/30 rounded-2xl p-6 flex-1 flex flex-col min-h-0">
            <h2 className="text-xl font-bold text-white mb-4">Your Payload</h2>
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter your SQL injection payload here...
Example: admin' --"
              className="flex-1 bg-[#0B0F1A] border-[#7B61FF]/20 text-gray-300 font-mono text-sm resize-none"
            />
            <div className="mt-4">
              {!completed ? (
                <Button
                  onClick={handleRunCode}
                  disabled={attempts === 0 || !code.trim()}
                  className="w-full bg-gradient-to-r from-[#00F5FF] to-[#7B61FF] hover:opacity-90 text-white disabled:opacity-50"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Execute Payload
                </Button>
              ) : nextLab ? (
                <Button
                  onClick={() => navigate(`/app/lab/${nextLab.id}`)}
                  className="w-full bg-gradient-to-r from-[#00FF9D] to-[#00F5FF] hover:opacity-90 text-white"
                >
                  Next Lab
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  disabled
                  className="w-full bg-gradient-to-r from-[#00FF9D] to-[#00F5FF] hover:opacity-90 text-white disabled:opacity-50"
                >
                  🏆 All Labs Completed!
                </Button>
              )}
            </div>
          </div>

          {/* Output Terminal */}
          <div className="bg-[#1A2234] border border-[#7B61FF]/30 rounded-2xl p-6 flex-1 flex flex-col min-h-0">
            <h2 className="text-xl font-bold text-white mb-4">Terminal Output</h2>
            <div className="flex-1 bg-[#0B0F1A] rounded-lg p-4 font-mono text-sm overflow-auto">
              {output.length === 0 ? (
                <div className="text-gray-500">Waiting for execution...</div>
              ) : (
                <div className="space-y-1">
                  {output.map((line, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={
                        line.includes("Error") || line.includes("Denied")
                          ? "text-[#FF3366]"
                          : line.includes("Success")
                          ? "text-[#00FF9D]"
                          : "text-[#00F5FF]"
                      }
                    >
                      {line}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
