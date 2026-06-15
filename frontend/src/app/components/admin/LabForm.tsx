import { useState } from "react";
import { Lab } from "../../types/Lab";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface LabFormProps {
  lab?: Lab;
  onSubmit: (lab: Omit<Lab, "id">) => void;
  onCancel: () => void;
}

export default function LabForm({ lab, onSubmit, onCancel }: LabFormProps) {
  const [formData, setFormData] = useState({
    title: lab?.title || "",
    category: lab?.category || "Веб-безопасность",
    description: lab?.description || "",
    difficulty: lab?.difficulty || "Новичок",
    duration: lab?.duration?.toString() || "20",
    xpReward: lab?.xpReward?.toString() || "100",
    briefing: lab?.briefing || "",
    hint: lab?.hint || "",
    vulnerableCode: lab?.vulnerableCode || "",
    correctPayload: lab?.correctPayload || "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: formData.title,
      category: formData.category,
      description: formData.description,
      difficulty: formData.difficulty as "Новичок" | "Средний" | "Сложный" | "Эксперт",
      duration: parseInt(formData.duration),
      xpReward: parseInt(formData.xpReward),
      briefing: formData.briefing,
      hint: formData.hint,
      vulnerableCode: formData.vulnerableCode,
      correctPayload: formData.correctPayload,
      completed: false,
      unlocked: false,
    });
  };

  return (
    <Card className="bg-[#1A2234] border-[#7B61FF]/20">
      <CardHeader>
        <CardTitle className="text-white">
          {lab ? "Edit Laboratory" : "Create New Laboratory"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Title
              </label>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Lab title"
                className="bg-[#0B0F1A] border-[#7B61FF]/30 text-white placeholder-gray-500"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-[#0B0F1A] border border-[#7B61FF]/30 text-white rounded-md p-2 focus:outline-none focus:border-[#7B61FF]"
              >
                <option value="Веб-безопасность">Веб-безопасность</option>
                <option value="База данных">База данных</option>
                <option value="Криптография">Криптография</option>
                <option value="Сетевая безопасность">Сетевая безопасность</option>
                <option value="Системная безопасность">Системная безопасность</option>
                <option value="Аутентификация">Аутентификация</option>
                <option value="Токены">Токены</option>
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Difficulty
              </label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full bg-[#0B0F1A] border border-[#7B61FF]/30 text-white rounded-md p-2 focus:outline-none focus:border-[#7B61FF]"
              >
                <option value="Новичок">Новичок</option>
                <option value="Средний">Средний</option>
                <option value="Сложный">Сложный</option>
                <option value="Эксперт">Эксперт</option>
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Duration (minutes)
              </label>
              <Input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="20"
                className="bg-[#0B0F1A] border-[#7B61FF]/30 text-white placeholder-gray-500"
              />
            </div>

            {/* XP Reward */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                XP Reward
              </label>
              <Input
                type="number"
                name="xpReward"
                value={formData.xpReward}
                onChange={handleChange}
                placeholder="100"
                className="bg-[#0B0F1A] border-[#7B61FF]/30 text-white placeholder-gray-500"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Lab description"
              rows={3}
              className="w-full bg-[#0B0F1A] border border-[#7B61FF]/30 text-white rounded-md p-2 placeholder-gray-500 focus:outline-none focus:border-[#7B61FF]"
            />
          </div>

          {/* Briefing */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Briefing
            </label>
            <textarea
              name="briefing"
              value={formData.briefing}
              onChange={handleChange}
              placeholder="Lab briefing/story"
              rows={4}
              className="w-full bg-[#0B0F1A] border border-[#7B61FF]/30 text-white rounded-md p-2 placeholder-gray-500 focus:outline-none focus:border-[#7B61FF]"
              required
            />
          </div>

          {/* Hint */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Hint
            </label>
            <textarea
              name="hint"
              value={formData.hint}
              onChange={handleChange}
              placeholder="Helpful hint for users"
              rows={2}
              className="w-full bg-[#0B0F1A] border border-[#7B61FF]/30 text-white rounded-md p-2 placeholder-gray-500 focus:outline-none focus:border-[#7B61FF]"
            />
          </div>

          {/* Vulnerable Code */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Vulnerable Code
            </label>
            <textarea
              name="vulnerableCode"
              value={formData.vulnerableCode}
              onChange={handleChange}
              placeholder="Display vulnerable code here"
              rows={5}
              className="w-full bg-[#0B0F1A] border border-[#7B61FF]/30 text-white rounded-md p-2 placeholder-gray-500 focus:outline-none focus:border-[#7B61FF] font-mono text-sm"
              required
            />
          </div>

          {/* Correct Payload */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Correct Payload
            </label>
            <textarea
              name="correctPayload"
              value={formData.correctPayload}
              onChange={handleChange}
              placeholder="The correct payload/answer"
              rows={3}
              className="w-full bg-[#0B0F1A] border border-[#7B61FF]/30 text-white rounded-md p-2 placeholder-gray-500 focus:outline-none focus:border-[#7B61FF] font-mono text-sm"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              className="bg-gradient-to-r from-[#00F5FF] to-[#7B61FF] text-white hover:opacity-90"
            >
              {lab ? "Update Laboratory" : "Create Laboratory"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="text-gray-300 border-[#7B61FF]/30 hover:bg-[#1A2234]"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
