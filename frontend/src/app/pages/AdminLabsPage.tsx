import { useState } from "react";
import { api } from "../services/api";

export default function AdminLabsPage() {
  const [lab, setLab] = useState({
    title: "",
    category: "SQL Injection",
    difficulty: "Easy",
    description: "",
    briefing: "",
    vulnerableCode: "",
    hint: "",
    correctAnswer: "",
    points: 100,
    timeLimit: 30,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setLab({
      ...lab,
      [e.target.name]: e.target.value,
    });
  };

  const createLab = async () => {
    try {
      await api.createLab(lab);

      alert("Лабораторная работа создана!");

      setLab({
        title: "",
        category: "SQL Injection",
        difficulty: "Easy",
        description: "",
        briefing: "",
        vulnerableCode: "",
        hint: "",
        correctAnswer: "",
        points: 100,
        timeLimit: 30,
      });
    } catch (err) {
      console.error(err);
      alert("Ошибка создания");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-3xl font-bold text-white mb-6">
        🧪 Создать лабораторную работу
      </h1>

      <div className="space-y-4">

        <input
          className="w-full p-3 rounded bg-[#0B1120] text-white"
          placeholder="Название"
          name="title"
          value={lab.title}
          onChange={handleChange}
        />

        <select
          className="w-full p-3 rounded bg-[#0B1120] text-white"
          name="category"
          value={lab.category}
          onChange={handleChange}
        >
          <option>SQL Injection</option>
          <option>XSS</option>
          <option>Phishing</option>
          <option>Password Security</option>
        </select>

        <select
          className="w-full p-3 rounded bg-[#0B1120] text-white"
          name="difficulty"
          value={lab.difficulty}
          onChange={handleChange}
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <textarea
          className="w-full p-3 rounded bg-[#0B1120] text-white"
          placeholder="Описание"
          name="description"
          value={lab.description}
          onChange={handleChange}
        />

        <textarea
          className="w-full p-3 rounded bg-[#0B1120] text-white"
          placeholder="Брифинг"
          name="briefing"
          value={lab.briefing}
          onChange={handleChange}
        />

        <textarea
          className="w-full p-3 rounded bg-[#0B1120] text-white"
          placeholder="Уязвимый код"
          name="vulnerableCode"
          value={lab.vulnerableCode}
          onChange={handleChange}
        />

        <input
          className="w-full p-3 rounded bg-[#0B1120] text-white"
          placeholder="Подсказка"
          name="hint"
          value={lab.hint}
          onChange={handleChange}
        />

        <input
          className="w-full p-3 rounded bg-[#0B1120] text-white"
          placeholder="Правильный payload"
          name="correctAnswer"
          value={lab.correctAnswer}
          onChange={handleChange}
        />

        <button
          onClick={createLab}
          className="w-full bg-cyan-500 hover:bg-cyan-400 p-3 rounded text-white font-bold"
        >
          Создать лабораторию
        </button>

      </div>
    </div>
  );
}