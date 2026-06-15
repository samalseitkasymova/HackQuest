import { motion } from "motion/react";
import { Lock, Unlock, Shield, Clock, Zap, Trophy } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Lab } from "../../types/Lab";
import { useLabContext } from "../../context/LabContext";

interface Props {
  lab: Lab;
}

const difficultyColors = {
  "Новичок": { bg: "#00FF9D", text: "#00FF9D" },
  "Средний": { bg: "#00F5FF", text: "#00F5FF" },
  "Сложный": { bg: "#7B61FF", text: "#7B61FF" },
  "Эксперт": { bg: "#FF3366", text: "#FF3366" },
};

export default function LabCard({ lab }: Props) {

  const { completedLabs, unlockedLabs } = useLabContext();
  const isCompleted = completedLabs.includes(lab.id);
  const isUnlocked = unlockedLabs.includes(lab.id);

  const diffColor =
    difficultyColors[lab.difficulty as keyof typeof difficultyColors];

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className={`relative bg-[#1A2234] border rounded-2xl p-6 transition-all ${
        isUnlocked
          ? "border-[#7B61FF]/30 hover:border-[#7B61FF]/50 hover:shadow-[0_0_30px_rgba(123,97,255,0.2)]"
          : "border-[#7B61FF]/10 opacity-60"
      }`}
    >
      {/* Locked Overlay */}
      {!isUnlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0B0F1A]/80 backdrop-blur-sm rounded-2xl z-10">
          <div className="text-center">
            <Lock className="w-10 h-10 text-gray-500 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">
              Пройдите предыдущие лаборатории
            </p>
          </div>
        </div>
      )}

      {/* Completed Badge */}
      {isCompleted && (
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#00FF9D]/20 text-[#00FF9D] text-xs font-medium border border-[#00FF9D]/30 flex items-center gap-1">
          <Trophy className="w-3 h-3" />
          Завершено
        </div>
      )}

      {/* Content */}
      <div className="mb-4">
        <div className="flex items-start gap-3 mb-3">

          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              backgroundColor: `${diffColor.bg}20`,
              boxShadow: `0 0 20px ${diffColor.bg}30`,
            }}
          >
            {isUnlocked ? (
              <Unlock
                className="w-6 h-6"
                style={{ color: diffColor.text }}
              />
            ) : (
              <Lock className="w-6 h-6 text-gray-500" />
            )}
          </div>

          <div className="flex-1">

            <h3 className="text-2xl font-bold text-white mb-1">
              {lab.title}
            </h3>

            <Badge
              variant="outline"
              className="text-xs"
              style={{
                borderColor: `${diffColor.bg}40`,
                color: diffColor.text,
              }}
            >
              {lab.category}
            </Badge>

          </div>
        </div>

        <p className="text-gray-400 text-sm">
          {lab.description}
        </p>
      </div>

      {/* Info */}
      <div className="flex items-center gap-4 mb-4 text-sm">

        <div className="flex items-center gap-1 text-gray-400">
          <Clock className="w-4 h-4" />
          <span>{lab.duration} мин</span>
        </div>

        <div
          className="flex items-center gap-1 font-medium"
          style={{ color: diffColor.text }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: diffColor.bg }}
          />

          <span>{lab.difficulty}</span>
        </div>

      </div>

      {/* Bottom */}
      <div className="flex items-center justify-between pt-4 border-t border-[#7B61FF]/20">

        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-[#00F5FF]" />
          <span className="text-[#00F5FF] font-bold">
            +{lab.xpReward} XP
          </span>
        </div>

        {!isUnlocked ? (
          <Button disabled className="opacity-60">
            Заблокировано
          </Button>
        ) : isCompleted ? (
          <div className="text-sm text-[#00FF9D] font-medium flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            ✓ Завершено
          </div>
        ) : (
          <Link to={`/app/lab/${lab.id}`}>
            <Button className="bg-gradient-to-r from-[#00F5FF] to-[#7B61FF] hover:opacity-90 text-white">
              Начать лабораторию
            </Button>
          </Link>
        )}
      </div>
    </motion.div>
  );
}