import { useState } from "react";
import { motion } from "motion/react";
import { Edit2, Trash2, Lock, Unlock, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useAdminLabContext } from "../context/AdminLabContext";
import LabForm from "../components/admin/LabForm";
import { Lab } from "../types/Lab";

export default function AdminLabsPage() {
  const { labs, addLab, updateLab, deleteLab, toggleLab } =
    useAdminLabContext();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLab, setEditingLab] = useState<Lab | undefined>(undefined);

  const handleAddLab = (labData: Omit<Lab, "id">) => {
    addLab(labData);
    setIsFormOpen(false);
  };

  const handleEditLab = (lab: Lab) => {
    setEditingLab(lab);
    setIsFormOpen(true);
  };

  const handleUpdateLab = (labData: Omit<Lab, "id">) => {
    if (editingLab) {
      updateLab(editingLab.id, labData);
      setEditingLab(undefined);
      setIsFormOpen(false);
    }
  };

  const handleDeleteLab = (id: number) => {
    if (window.confirm("Are you sure you want to delete this lab?")) {
      deleteLab(id);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingLab(undefined);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Новичок":
        return "text-[#00FF9D]";
      case "Средний":
        return "text-[#00F5FF]";
      case "Сложный":
        return "text-[#FFA500]";
      case "Эксперт":
        return "text-red-500";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Lab Management</h1>
          <p className="text-gray-400 mt-2">
            Total Labs: {labs.length} | Enabled: {labs.filter((l) => l.unlocked).length}
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingLab(undefined);
            setIsFormOpen(true);
          }}
          className="bg-gradient-to-r from-[#00F5FF] to-[#7B61FF] text-white hover:opacity-90 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create Lab
        </Button>
      </div>

      {isFormOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <LabForm
            lab={editingLab}
            onSubmit={editingLab ? handleUpdateLab : handleAddLab}
            onCancel={handleCloseForm}
          />
        </motion.div>
      )}

      {/* Labs Table */}
      <Card className="bg-[#1A2234] border-[#7B61FF]/20 overflow-hidden">
        <CardHeader>
          <CardTitle className="text-white">All Laboratories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#7B61FF]/20">
                  <th className="px-4 py-3 text-sm font-semibold text-[#00F5FF]">
                    Title
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-[#00F5FF]">
                    Category
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-[#00F5FF]">
                    Difficulty
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-[#00F5FF]">
                    XP
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-[#00F5FF]">
                    Status
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-[#00F5FF]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {labs.map((lab) => (
                  <motion.tr
                    key={lab.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="border-b border-[#7B61FF]/10 hover:bg-[#0B0F1A]/50 transition-colors"
                  >
                    <td className="px-4 py-3 text-white font-medium">
                      {lab.title}
                    </td>
                    <td className="px-4 py-3 text-gray-300">{lab.category}</td>
                    <td className={`px-4 py-3 font-medium ${getDifficultyColor(lab.difficulty)}`}>
                      {lab.difficulty}
                    </td>
                    <td className="px-4 py-3 text-[#00F5FF] font-bold">
                      +{lab.xpReward}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          lab.unlocked
                            ? "bg-[#00FF9D]/20 text-[#00FF9D]"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {lab.unlocked ? "Enabled" : "Disabled"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        {/* Edit Button */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleEditLab(lab)}
                          className="p-2 rounded-md bg-[#7B61FF]/20 text-[#00F5FF] hover:bg-[#7B61FF]/40 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </motion.button>

                        {/* Toggle Button */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleLab(lab.id)}
                          className={`p-2 rounded-md transition-colors ${
                            lab.unlocked
                              ? "bg-[#00FF9D]/20 text-[#00FF9D] hover:bg-[#00FF9D]/40"
                              : "bg-red-500/20 text-red-400 hover:bg-red-500/40"
                          }`}
                          title={lab.unlocked ? "Disable" : "Enable"}
                        >
                          {lab.unlocked ? (
                            <Unlock className="w-4 h-4" />
                          ) : (
                            <Lock className="w-4 h-4" />
                          )}
                        </motion.button>

                        {/* Delete Button */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDeleteLab(lab.id)}
                          className="p-2 rounded-md bg-red-500/20 text-red-400 hover:bg-red-500/40 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {labs.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p>No laboratories found. Create one to get started!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#1A2234] border-[#7B61FF]/20">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-[#00F5FF]">{labs.length}</div>
            <div className="text-gray-400 mt-2">Total Laboratories</div>
          </CardContent>
        </Card>
        <Card className="bg-[#1A2234] border-[#7B61FF]/20">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-[#00FF9D]">
              {labs.filter((l) => l.unlocked).length}
            </div>
            <div className="text-gray-400 mt-2">Enabled Labs</div>
          </CardContent>
        </Card>
        <Card className="bg-[#1A2234] border-[#7B61FF]/20">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-[#7B61FF]">
              {labs.reduce((sum, lab) => sum + lab.xpReward, 0)}
            </div>
            <div className="text-gray-400 mt-2">Total Available XP</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}