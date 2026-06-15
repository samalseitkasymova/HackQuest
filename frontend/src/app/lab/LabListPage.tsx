import { motion } from "motion/react";
import { FlaskConical } from "lucide-react";
import LabCard from "../components/lab/LabCard";
import { labs } from "../services/labService";
import { useLabContext } from "../context/LabContext";

export default function LabListPage() {
  const { completedLabs, unlockedLabs, xp } = useLabContext();
  const completed = completedLabs.length;
  const unlocked = unlockedLabs.length;
  const totalXp = xp;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
          <FlaskConical className="w-10 h-10 text-[#00F5FF]" />
          Лаборатории
        </h1>
        <p className="text-gray-400">
          Выполняйте лабораторные работы, чтобы получить опыт и открыть новые испытания
        </p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#00FF9D]/20 to-[#00FF9D]/5 border border-[#00FF9D]/30 rounded-xl p-6"
        >
          <div className="text-sm text-gray-400 mb-1">Завершено</div>
          <div className="text-3xl font-bold text-[#00FF9D]">
            {completed} / {labs.length}
          </div>
          <div className="text-sm text-gray-400 mt-2">Продолжай!</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-[#00F5FF]/20 to-[#00F5FF]/5 border border-[#00F5FF]/30 rounded-xl p-6"
        >
          <div className="text-sm text-gray-400 mb-1">Получено опыта</div>
          <div className="text-3xl font-bold text-[#00F5FF]">
            {totalXp}
          </div>
          <div className="text-sm text-gray-400 mt-2">Из лабораторий</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-[#7B61FF]/20 to-[#7B61FF]/5 border border-[#7B61FF]/30 rounded-xl p-6"
        >
          <div className="text-sm text-gray-400 mb-1">Разблокировано</div>
          <div className="text-3xl font-bold text-[#7B61FF]">
            {unlocked} / {labs.length}
          </div>
          <div className="text-sm text-gray-400 mt-2">Ещё больше для изучения</div>
        </motion.div>
      </div>

      {/* Labs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {labs.map((lab) => (
          <LabCard key={lab.id} lab={lab} />
        ))}
      </div>
    </div>
  );
}